import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { reportApiError } from "../lib/myProfileService";
import { PAGE_SIZE, matchesFilters, matchesSearch, paginate } from "../lib/myProfileUtils";

const NO_FILTERS = { roles: [], properties: [], statuses: [] };

/**
 * Shared list state for the Masters / Managed users tables: load through the
 * service, then search, filter and paginate on the client (the list
 * endpoints return everything, real or dummy).
 * @param load () => Promise<Person[]>
 * @param visible (person) => boolean — viewer scope (e.g. a Master's properties)
 */
export default function useProfileTable({ load, visible, initialFilters }) {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ ...NO_FILTERS, ...initialFilters });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(PAGE_SIZE);

  const reload = useCallback(() => {
    setStatus("loading");
    load()
      .then((list) => {
        setRows(list);
        setStatus("ready");
      })
      .catch((err) => {
        setError(reportApiError(err, dispatch));
        setStatus("error");
      });
  }, [load, dispatch]);

  useEffect(() => {
    reload();
  }, [reload]);

  const scoped = useMemo(() => rows.filter(visible), [rows, visible]);
  const filtered = useMemo(
    () => scoped.filter((row) => matchesSearch(row, search) && matchesFilters(row, filters)),
    [scoped, search, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  const currentPage = Math.min(page, totalPages);

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const clearAll = useCallback(() => {
    setFilters(NO_FILTERS);
    setSearch("");
    setPage(1);
  }, []);

  const hasQuery =
    Boolean(search.trim()) || Object.values(filters).some((value) => value.length > 0);

  return {
    status,
    error,
    reload,
    all: scoped,
    filtered,
    pageRows: paginate(filtered, currentPage, size),
    hasQuery,
    search,
    setSearch: (value) => {
      setSearch(value);
      setPage(1);
    },
    filters,
    setFilter,
    clearAll,
    pagination: {
      currentPage,
      totalPages,
      totalRecords: filtered.length,
      size,
      onPageChange: setPage,
      onSizeChange: (value) => {
        setSize(value);
        setPage(1);
      },
    },
  };
}
