/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye,
  InfoCircle,
  Lock1,
  SearchNormal1,
  Setting4,
} from "iconsax-react";
import { IoMdMenu } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NoDataMessage from "../../Utils/NoDataMessage";
import CustomTooltip from "../../Utils/CustomTooltip";
import ErrorMessage from "../../Components/ErrorMessage";
import ConsolidatedFilterDrawer from "./ConsolidatedFilterDrawer";

// ---------------------------------------------------------------------------
// Shared Consolidated View logic (exported: InvoiceRegister and
// ConsolidatedExportSettings import these so every view uses the same numbers).
// Helpers for the Invoice Register Consolidated View.
// Plain functions with no React, Redux or API dependencies, so the table,
// stat cards and the PDF export all use the same numbers.
//
// Source: state.reports.getConsolidatedInvoice (POST
// /v2/reports/invoice/consolidated/:hostelId), shaped
//   { invoiceHeader, hostelInformation, floors: [{ floorId, floorName,
//     rooms: [{ roomId, roomName, beds: [{ bedId, bedName, tenantName,
//     tenantCountryCode, tenantMobile, status, actualRent, pendingRent,
//     ebAmount, pendingAdvance, pendingNonRefundable, totalPendingAmount,
//     invoiceCount, invoices: [{ invoiceNumber, invoiceType, invoiceDate,
//     dueDate, invoiceAmount, paidAmount, dueAmount, status, invoiceUrl }] }] }] }],
//     rooms: [...] }   // rooms without a floor (Room -> Bed grouping)
// normaliseConsolidatedBeds() flattens it into one row per bed. Row amounts
// are the backend figures as-is (amounts arrive as strings, e.g. "3900.0").
// ---------------------------------------------------------------------------

export const ROW_STATUS = {
  PENDING: "Pending",
  PARTIALLY_PAID: "Partially Paid",
  PAID: "Paid",
  VACANT: "Vacant",
};

const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

// API dates are DD/MM/YYYY; everything else here expects ISO (YYYY-MM-DD).
export const toIsoDate = (value) => {
  if (!value) return null;
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value).trim());
  return match ? `${match[3]}-${match[2]}-${match[1]}` : value;
};

// Statuses are shown exactly as the API sends them (bed.status /
// invoice.status) — never derived or relabelled here.
const apiStatus = (status) => (status === null || status === undefined ? "" : String(status).trim());

// Which charge column an invoice's due amount lines up under in the
// expanded sub-rows. Types not listed (Booking, Other, Settlement, ...)
// only show in the invoice's Total Pending cell.
const CHARGE_KEY_BY_INVOICE_TYPE = {
  rent: "rent",
  "re-assign rent": "rent",
  "reassign rent": "rent",
  eb: "eb",
  "eb holding": "eb",
  electricity: "eb",
  advance: "advance",
  "additional advance": "advance",
  "non-refundable": "nonRefundable",
  "non refundable": "nonRefundable",
};

const mapInvoice = (invoice, index) => {
  const amount = toNumber(invoice?.invoiceAmount);
  const paid = toNumber(invoice?.paidAmount);
  const totalPending =
    invoice?.dueAmount !== null && invoice?.dueAmount !== undefined
      ? toNumber(invoice?.dueAmount)
      : Math.max(amount - paid, 0);
  const chargeKey =
    CHARGE_KEY_BY_INVOICE_TYPE[String(invoice?.invoiceType || "").toLowerCase()];
  const pending = { rent: 0, eb: 0, advance: 0, nonRefundable: 0 };
  if (chargeKey) pending[chargeKey] = totalPending;

  return {
    invoiceId: invoice?.invoiceNumber || `invoice-${index}`,
    invoiceNo: invoice?.invoiceNumber || "—",
    invoiceType: invoice?.invoiceType || "",
    invoiceDate: toIsoDate(invoice?.invoiceDate),
    dueDate: toIsoDate(invoice?.dueDate),
    invoiceUrl: invoice?.invoiceUrl || null,
    amount,
    paid,
    pending,
    totalPending,
    status: apiStatus(invoice?.status),
  };
};

const mapBed = (bed, room, floorName, floorOrder) => {
  const base = {
    bedId: bed?.bedId ?? `${room?.roomId}-${bed?.bedName}`,
    floorId: room?.floorId ?? null,
    floor: floorName || "—",
    floorOrder,
    roomId: room?.roomId ?? null,
    room: room?.roomName || "—",
    bed: bed?.bedName || "—",
  };

  if (!bed?.tenantName) {
    return {
      ...base,
      isVacant: true,
      tenant: null,
      actualRent: 0,
      pendingRent: 0,
      pendingEb: 0,
      pendingAdvance: 0,
      pendingNonRefundable: 0,
      totalPending: 0,
      pendingInvoiceCount: 0,
      pendingInvoices: [],
      invoices: [],
      status: apiStatus(bed?.status),
    };
  }

  const invoices = (bed?.invoices || []).filter(Boolean).map(mapInvoice);
  const pendingInvoices = invoices?.filter((inv) => inv?.totalPending > 0);
  const totalPending = toNumber(bed?.totalPendingAmount);
  const phone = [bed?.tenantCountryCode, bed?.tenantMobile]
    .filter(Boolean)
    .join(" ");

  return {
    ...base,
    isVacant: false,
    tenant: { id: bed?.bedId, name: bed?.tenantName, phone: phone || "—" },
    actualRent: toNumber(bed?.actualRent),
    pendingRent: toNumber(bed?.pendingRent),
    pendingEb: toNumber(bed?.ebAmount),
    pendingAdvance: toNumber(bed?.pendingAdvance),
    pendingNonRefundable: toNumber(bed?.pendingNonRefundable),
    totalPending,
    pendingInvoiceCount: pendingInvoices?.length,
    pendingInvoices,
    // Every invoice (paid ones included) for the expanded sub-rows; the
    // Invoices count column still counts pending ones only.
    invoices,
    status: apiStatus(bed?.status),
  };
};

const compareText = (a, b) =>
  String(a).localeCompare(String(b), "en", { numeric: true });

// API response -> one row per bed, sorted Floor -> Room -> Bed.
export const normaliseConsolidatedBeds = (response) => {
  const rows = [];
  const floors = Array.isArray(response?.floors) ? response?.floors : [];

  floors?.forEach((floor, floorIndex) => {
    (floor?.rooms || []).forEach((room) => {
      (room?.beds || []).forEach((bed) => {
        if (bed) {
          rows?.push(
            mapBed(bed, room, floor?.floorName || room?.floorName, floorIndex),
          );
        }
      });
    });
  });

  // Rooms sent without a floor wrapper go after the floors.
  (Array.isArray(response?.rooms) ? response?.rooms : [])?.forEach((room) => {
    (room?.beds || []).forEach((bed) => {
      if (bed) rows?.push(mapBed(bed, room, room?.floorName, floors?.length));
    });
  });

  return rows?.sort((a, b) => {
    if (a?.floorOrder !== b?.floorOrder) return a?.floorOrder - b?.floorOrder;
    return compareText(a?.room, b?.room) || compareText(a?.bed, b?.bed);
  });
};

// Stat-card figures straight from the API header (null when absent).
export const getConsolidatedHeader = (response) => {
  const header = response?.invoiceHeader;
  if (!header) return null;
  return {
    totalInvoices: toNumber(header?.totalInvoices),
    totalAmount: toNumber(header?.totalAmount),
    paidAmount: toNumber(header?.paidAmount),
    outstandingAmount: toNumber(header?.outstandingAmount),
    bookingAmount: toNumber(header?.bookingAmount),
    refundedBookingAmount: toNumber(header?.refundedBookingAmount),
    cancelledAmount: toNumber(header?.cancelledAmount),
  };
};

// All Tenants toggle. OFF: only rows with an outstanding balance.
// ON: every occupied bed (paid tenants included) plus vacant beds.
export const filterRowsByAllTenants = (rows = [], includeAllTenants = false) =>
  includeAllTenants ? rows : rows?.filter((row) => row?.totalPending > 0);

// Collection totals computed from rows (fallback when the API header is
// missing). Vacant beds are always excluded.
export const getCollectionSummary = (rows = []) => {
  const occupiedRows = rows?.filter((row) => !row?.isVacant);
  const outstandingInvoices = occupiedRows?.flatMap(
    (row) => row?.pendingInvoices,
  );

  return {
    totalInvoices: outstandingInvoices?.length,
    totalAmount: outstandingInvoices?.reduce((sum, inv) => sum + inv?.amount, 0),
    paidAmount: outstandingInvoices?.reduce((sum, inv) => sum + inv?.paid, 0),
    outstandingAmount: occupiedRows?.reduce(
      (sum, row) => sum + row?.totalPending,
      0,
    ),
    occupiedCount: occupiedRows?.length,
    vacantCount: rows?.length - occupiedRows?.length,
  };
};

// ---------------------------------------------------------------------------
// Filters (Consolidated View). The API already receives these in the request
// body; applying them again here keeps the table, stat cards and export in
// step if the backend ignores one.
// ---------------------------------------------------------------------------

export const DEFAULT_CONSOLIDATED_FILTERS = {
  search: "",
  statuses: [],
  overdueOnly: false,
  floors: [],
};

// Collection Status filter values are the API's paymentStatus keys
// (response filters.paymentStatus: [{ key, label }]), like floors come from
// filters.floors. No API options -> empty list (no status checkboxes).
export const getConsolidatedStatusOptions = (response) =>
  (response?.filters?.paymentStatus || [])
    .filter((option) => option?.key)
    .map((option) => ({ key: option?.key, label: option?.label || option?.key }));

// key -> label, for chips and the export summary.
export const getStatusLabelMap = (statusOptions = []) =>
  Object.fromEntries(statusOptions?.map((option) => [option?.key, option?.label]));

// Row status (badge label) -> paymentStatus key, for filtering loaded rows.
const ROW_STATUS_KEY = {
  [ROW_STATUS.PAID]: "PAID",
  [ROW_STATUS.PENDING]: "PENDING",
  [ROW_STATUS.PARTIALLY_PAID]: "PARTIAL_PAYMENT",
};
const ROW_LEVEL_STATUS_KEYS = Object.values(ROW_STATUS_KEY);

// Overdue is an invoice-level condition, not a row status:
// the invoice still has an outstanding balance and its due date has passed.
export const isInvoiceOverdue = (invoice, today = dayjs()) => {
  if (!invoice?.dueDate) return false;
  if (toNumber(invoice?.totalPending) <= 0) return false;
  return dayjs(invoice?.dueDate).isBefore(dayjs(today), "day");
};

// { from, to } period -> [dayjs, dayjs] for the antd RangePicker (or null).
export const periodToRange = (period) =>
  period?.from && period?.to ? [dayjs(period?.from), dayjs(period?.to)] : null;

// Row-level filters on normalised rows. The period is applied by the API
// (startDate/endDate), so rows are not re-scoped by date here; the third
// argument is kept so existing callers do not change. Overdue keeps only rows
// with an overdue invoice (expanding a row still lists all its invoices); row
// totals stay the backend figures.
export const applyConsolidatedFilters = (
  rows = [],
  filters = DEFAULT_CONSOLIDATED_FILTERS,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _period = null,
  today = dayjs(),
) => {
  const active = { ...DEFAULT_CONSOLIDATED_FILTERS, ...filters };
  let result = rows;

  if (active?.overdueOnly) {
    result = result
      ?.map((row) => {
        const overdue = row?.pendingInvoices?.filter((inv) =>
          isInvoiceOverdue(inv, today),
        );
        return {
          ...row,
          pendingInvoices: overdue,
          pendingInvoiceCount: overdue?.length,
        };
      })
      ?.filter((row) => row?.pendingInvoiceCount > 0);
  }

  const search = active?.search?.trim()?.toLowerCase();
  if (search) {
    result = result?.filter((row) =>
      row?.tenant?.name?.toLowerCase()?.includes(search),
    );
  }

  if (active?.floors?.length > 0) {
    result = result?.filter((row) => active?.floors?.includes(row?.floor));
  }

  // Statuses are paymentStatus keys. Rows can only be re-checked for the three
  // row-level ones (Paid / Pending / Partial Payment); if any other key is
  // selected (Advance in hand, Refunded, …) the API's result is used as-is.
  if (
    active?.statuses?.length > 0 &&
    active?.statuses?.every((key) => ROW_LEVEL_STATUS_KEYS.includes(key))
  ) {
    result = result?.filter((row) =>
      active?.statuses?.includes(ROW_STATUS_KEY[row?.status]),
    );
  }

  return result;
};

export const countActiveFilters = (filters = DEFAULT_CONSOLIDATED_FILTERS) =>
  (filters?.search?.trim() ? 1 : 0) +
  (filters?.statuses?.length > 0 ? 1 : 0) +
  (filters?.overdueOnly ? 1 : 0) +
  (filters?.floors?.length > 0 ? 1 : 0);

// Chips use the same { key, label, value } shape as the List View chips.
export const getConsolidatedFilterChips = (
  filters = DEFAULT_CONSOLIDATED_FILTERS,
  statusOptions = [],
) => {
  const chips = [];
  if (filters?.search?.trim()) {
    chips?.push({ key: "search", label: "Tenant", value: filters?.search?.trim() });
  }
  if (filters?.statuses?.length > 0) {
    const labels = getStatusLabelMap(statusOptions);
    chips?.push({
      key: "statuses",
      label: "Status is",
      value: filters?.statuses?.map((key) => labels[key] || key)?.join(", "),
    });
  }
  if (filters?.overdueOnly) {
    chips?.push({ key: "overdue", label: "Overdue", value: "Yes" });
  }
  if (filters?.floors?.length > 0) {
    chips?.push({ key: "floors", label: "Floor is", value: filters?.floors?.join(", ") });
  }
  return chips;
};

// Unique floors in Floor -> Room -> Bed order, for the filter drawer.
export const getFloorOptions = (beds = []) => {
  const floors = new Map();
  beds?.forEach((bed) => {
    if (!floors?.has(bed?.floor)) floors?.set(bed?.floor, bed?.floorOrder);
  });
  return [...(floors?.entries() || [])]
    .sort((a, b) => a[1] - b[1])
    .map(([floor]) => floor);
};

// Floor options from the API (filters.floors lists every floor, even ones
// with no rows in the current result); falls back to the floors in the rows.
export const getConsolidatedFloorOptions = (response, beds = []) => {
  const apiFloors = (response?.filters?.floors || [])
    .map((floor) => floor?.floorName)
    .filter(Boolean);
  return apiFloors?.length > 0 ? [...new Set(apiFloors)] : getFloorOptions(beds);
};


export const formatAmount = (value) =>
  toNumber(value)?.toLocaleString("en-IN", { maximumFractionDigits: 2 });

export const getInitials = (name = "") =>
  name
    ?.trim()
    ?.split(/\s+/)
    ?.filter(Boolean)
    ?.slice(0, 2)
    ?.map((part) => part[0]?.toUpperCase())
    ?.join("");

// ---------------------------------------------------------------------------
// Table columns. They come from the API (`tableColumns`: fieldName, order,
// isSelected, isLocked), the same way UserList builds Customize Tabs from
// `columnList`. FIELD_MAP links each API fieldName to the row value it shows.
// ---------------------------------------------------------------------------

const FIELD_MAP = {
  Floor: { key: "floor", align: "left" },
  Room: { key: "room", align: "left" },
  Bed: { key: "bed", align: "left" },
  "Tenant Name": { key: "tenant", align: "left" },
  "Contact Number": { key: "contact", align: "left" },
  Status: { key: "status", align: "left" },
  "Actual Rent": { key: "actualRent", align: "right" },
  "Pending Rent": { key: "pendingRent", align: "right", chargeKey: "rent" },
  "Eb Amount": { key: "pendingEb", align: "right", chargeKey: "eb" },
  "Pending Advance": {
    key: "pendingAdvance",
    align: "right",
    chargeKey: "advance",
  },
  "Pending Non-Refundable": {
    key: "pendingNonRefundable",
    align: "right",
    chargeKey: "nonRefundable",
  },
  "Total Pending Amount": { key: "totalPending", align: "right" },
  Invoices: { key: "pendingInvoiceCount", align: "center" },
};

// Used only until the first API response arrives (or if it has no columns).
const FALLBACK_LOCKED = ["Floor", "Room", "Bed", "Total Pending Amount"];
const FALLBACK_TABLE_COLUMNS = Object.keys(FIELD_MAP).map((fieldName, index) => ({
  order: index + 1,
  fieldName,
  isSelected: true,
  isLocked: FALLBACK_LOCKED.includes(fieldName),
}));

// API tableColumns -> ordered column list used by the table, the customizer
// and the export. `known: false` columns have no row value yet; they stay in
// the list (so saving keeps them) but are never rendered.
export const buildConsolidatedColumns = (tableColumns) => {
  const source =
    Array.isArray(tableColumns) && tableColumns?.length > 0
      ? tableColumns
      : FALLBACK_TABLE_COLUMNS;

  return [...source]
    .filter((col) => col?.fieldName)
    .sort((a, b) => toNumber(a?.order) - toNumber(b?.order))
    .map((col) => {
      const mapped = FIELD_MAP[col?.fieldName];
      const locked = Boolean(col?.isLocked);
      return {
        fieldName: col?.fieldName,
        key: mapped?.key || col?.fieldName,
        label: col?.fieldName,
        align: mapped?.align || "left",
        chargeKey: mapped?.chargeKey,
        locked,
        selected: locked || Boolean(col?.isSelected),
        known: Boolean(mapped),
      };
    });
};

// Columns the table renders, in API order.
export const getVisibleColumns = (columns = []) =>
  columns?.filter((column) => column?.known && column?.selected);


// Body for CONSOLIDATED_INVOICE_CUSTOMIZE_SAGA (same shape as UserList).
export const buildColumnCustomizePayload = (columns = []) =>
  columns?.map((column, index) => ({
    fieldName: column?.fieldName,
    isSelected: column?.locked || column?.selected,
    order: index + 1,
  }));


// ---- from ConsolidatedColumnCustomizer.jsx ----
// "Customize Tabs" for the Consolidated View, same behaviour as UserList:
// the list comes from the API (tableColumns), columns can be shown/hidden and
// dragged into a new order, and Save sends them to the customize API.
// Locked columns (isLocked) always stay selected.

function SortableColumnItem({ item, onToggle }) {
  // Locked columns (isLocked: true) can't be dragged or dropped onto.
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item?.fieldName, disabled: Boolean(item?.locked) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <label
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 text-sm mb-0 bg-white ${item?.locked ? "cursor-not-allowed" : "cursor-pointer"
        }`}
    >
      <span data-testid="consolidated-invoice-table-action"
        {...attributes}
        {...listeners}
        onClick={(e) => e?.stopPropagation()}
      >
        <IoMdMenu
          className={`text-xl ${item?.locked
            ? "text-[#D0D5DD] cursor-not-allowed"
            : "text-[#28303F] cursor-grab"
            }`}
        />
      </span>

      <input data-testid="consolidated-invoice-table-toggle-checkbox"
        type="checkbox"
        checked={item?.locked || item?.selected}
        disabled={item?.locked}
        onChange={() => onToggle(item?.fieldName)}
        className="w-4 h-4 accent-[#1E45E1] rounded"
      />

      <span
        className={`flex-1 text-base ${item?.locked ? "text-[#6B7280]" : "text-[#101828]"
          }`}
      >
        {item?.fieldName}
      </span>
      {item?.locked && (
        <span title="Always shown" className="inline-flex">
          <Lock1 size="14" color="#98A2B3" aria-hidden="true" />
        </span>
      )}
    </label>
  );
}

SortableColumnItem.propTypes = {
  item: PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    locked: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

function ConsolidatedColumnCustomizer({
  columns,
  isOpen,
  onOpenChange,
  onSave,
  isSaving = false,
}) {
  const [customizeItems, setCustomizeItems] = useState(columns);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const wrapperRef = useRef(null);

  // Start from the saved columns every time the panel opens.
  useEffect(() => {
    if (isOpen) {
      setCustomizeItems(columns);
      setSearchText("");
      setError("");
    }
  }, [isOpen, columns]);

  // Same rule as UserList: at least one column must stay visible.
  const handleSave = () => {
    setError("");
    const hasSelected = customizeItems?.some(
      (item) => item?.known && (item?.locked || item?.selected),
    );
    if (!hasSelected) {
      setError("Please select at least one column");
      return;
    }
    onSave(customizeItems);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef?.current && !wrapperRef?.current?.contains(event?.target)) {
        onOpenChange(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  const allSelected = customizeItems?.every((i) => i?.locked || i?.selected);

  const filteredCustomizeItems = customizeItems?.filter((item) =>
    item?.fieldName?.toLowerCase()?.includes(searchText?.trim()?.toLowerCase()),
  );

  const hiddenCount = columns?.filter(
    (column) => column?.known && !column?.selected,
  )?.length;

  const handleToggle = (fieldName) => {
    setError("");
    setCustomizeItems((prev) =>
      prev?.map((i) =>
        i?.fieldName === fieldName && !i?.locked
          ? { ...i, selected: !i?.selected }
          : i,
      ),
    );
  };

  const handleSelectAll = () => {
    setError("");
    setCustomizeItems((prev) =>
      prev?.map((i) => ({ ...i, selected: i?.locked ? true : !allSelected })),
    );
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active?.id === over?.id) return;
    // Reorder only the unlocked columns; locked ones keep their positions.
    const unlocked = customizeItems?.filter((i) => !i?.locked);
    const oldIndex = unlocked?.findIndex((i) => i?.fieldName === active?.id);
    const newIndex = unlocked?.findIndex((i) => i?.fieldName === over?.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const moved = arrayMove(unlocked, oldIndex, newIndex);
    let next = 0;
    setCustomizeItems(
      customizeItems?.map((i) => (i?.locked ? i : moved[next++])),
    );
  };

  return (
    <div ref={wrapperRef} className="relative">
      <CustomTooltip text="Customize" direction="top-full" usePortal={true}>
        <button data-testid="consolidated-invoice-table-customize-columns-btn"
          type="button"
          onClick={() => onOpenChange(!isOpen)}
          aria-label="Customize columns"
          aria-expanded={isOpen}
          className={`relative w-[42px] h-[42px] flex items-center justify-center rounded-[5px] bg-white border-[1px] ${isOpen ? "border-[#1E45E1]" : "border-[#F2F2F2]"
            }`}
        >
          <Setting4 size="22" color={isOpen ? "#1E45E1" : "#4B4B4B"} />
          {hiddenCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#1E45E1] text-white text-[10px] font-semibold flex items-center justify-center">
              {hiddenCount}
            </span>
          )}
        </button>
      </CustomTooltip>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Customize Tabs"
          className="absolute left-0 top-full mt-2 z-50 w-[320px] max-sm:fixed max-sm:top-auto max-sm:left-[16px] max-sm:right-[16px] max-sm:w-auto bg-white border-[1px] border-[#E5E7EB] rounded-xl shadow-xl font-gilroy"
        >
          <div className="p-[12px] border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2 justify-between mb-2">
              <div className="text-[16px] text-[#333333] font-semibold">
                Customize Tabs
              </div>
              <button data-testid="consolidated-invoice-table-select-all-btn"
                type="button"
                onClick={handleSelectAll}
                className="text-[#338BFF] text-[13px] font-semibold flex items-center gap-1 bg-transparent border-0 p-0"
              >
                <TiTick className="text-[#338BFF] text-[13px]" />
                <span>{allSelected ? "Unselect all" : "Select all"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 px-[12px] py-2 border-[1px] border-[#E5E7EB] rounded-lg">
              <SearchNormal1 size={16} color="#98A2B3" />
              <input data-testid="consolidated-invoice-table-search-columns-input"
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value)}
                placeholder="Search"
                aria-label="Search columns"
                className="w-full text-sm outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={customizeItems?.map((i) => i?.fieldName)}
              strategy={verticalListSortingStrategy}
            >
              <div className="max-h-[260px] overflow-y-auto px-[12px] py-2 space-y-2 show-scrolls">
                {filteredCustomizeItems?.length === 0 ? (
                  <div className="text-sm text-gray-400 text-center py-3">
                    No results found
                  </div>
                ) : (
                  filteredCustomizeItems?.map((item) => (
                    <SortableColumnItem
                      key={item?.fieldName}
                      item={item}
                      onToggle={handleToggle}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>

          {error && (
            <div className="flex justify-center my-2">
              <ErrorMessage message={error} type="warning" />
            </div>
          )}

          <div className="p-[12px] border-t border-[#E5E7EB] flex gap-2">
            <button data-testid="consolidated-invoice-table-reset-btn"
              type="button"
              onClick={() => {
                setCustomizeItems(columns);
                setError("");
              }}
              className="flex-1 py-2 text-sm border-[1px] border-[#D1D5DC] rounded-lg text-[#344054] bg-white"
            >
              Reset
            </button>
            <button data-testid="consolidated-invoice-table-save-btn"
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 py-2 text-sm bg-[#1E45E1] text-white rounded-lg disabled:opacity-70"
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ConsolidatedColumnCustomizer.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
      locked: PropTypes.bool,
      known: PropTypes.bool,
    }),
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
};

// ---- from ConsolidatedInvoiceTable.jsx ----
const statusBadgeStyles = {
  [ROW_STATUS.PENDING]: { bg: "bg-[rgba(255,189,189,0.4)]", dot: "bg-[#EF4444]" },
  [ROW_STATUS.PARTIALLY_PAID]: {
    bg: "bg-[rgba(255,237,202,0.6)]",
    dot: "bg-[#F59E0B]",
  },
  [ROW_STATUS.PAID]: { bg: "bg-[rgba(179,229,187,0.3)]", dot: "bg-[#22C55E]" },
  [ROW_STATUS.VACANT]: { bg: "bg-[#E7F1FF]", dot: "bg-[#3B82F6]" },
};

const alignClass = { left: "text-left", right: "text-right", center: "text-center" };

const headerCell =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const bodyCell =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] text-[14px] leading-[20px] whitespace-nowrap";

const childCell =
  "h-[52px] px-[16px] border-b border-[#EEF2F6] text-[13px] leading-[18px] whitespace-nowrap";

const stickyCell =
  "sticky right-0 border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)]";

const SKELETON_ROWS = 5;

const formatDate = (value) => (value ? dayjs(value).format("DD MMM YYYY") : "—");

// Any other API status (e.g. "Refund") gets a neutral badge.
const neutralBadgeStyle = { bg: "bg-[#F1F5F9]", dot: "bg-[#64748B]" };

function StatusBadge({ status }) {
  if (!status) return <span className="text-[#6B7280]">—</span>;
  const style = statusBadgeStyles[status] || neutralBadgeStyle;
  return (
    <span
      className={`inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] ${style?.bg}`}
    >
      <span className={`w-[6px] h-[6px] rounded-full ${style?.dot}`} />
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string,
};

function ConsolidatedInvoiceTable({
  viewSwitcher,
  pagination = null,
  beds = [],
  tableColumns = [],
  onColumnsSaved,
  filters = DEFAULT_CONSOLIDATED_FILTERS,
  period = null,
  isLoading = false,
  includeAllTenants: includeAllTenantsProp,
  onIncludeAllTenantsChange,
  showFilter = false,
  onCloseFilter,
  onApplyFilters,
  floorOptions = [],
  statusOptions = [],
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [expandedBedIds, setExpandedBedIds] = useState([]);

  // ---- Customize Tabs: Save -> CONSOLIDATED_INVOICE_CUSTOMIZE_SAGA ----
  const [showCustomize, setShowCustomize] = useState(false);
  const [columnsSaving, setColumnsSaving] = useState(false);
  const [pendingColumns, setPendingColumns] = useState(null);

  const handleSaveColumns = (draftColumns) => {
    if (!state?.login?.selectedHostel_Id) return;
    setPendingColumns(draftColumns);
    setColumnsSaving(true);
    dispatch({
      type: "CONSOLIDATED_INVOICE_CUSTOMIZE_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        customize: buildColumnCustomizePayload(draftColumns),
      },
    });
  };

  useEffect(() => {
    if (state?.reports?.consolidatedInvoiceCustomizeSuccess === 200) {
      setColumnsSaving(false);
      if (pendingColumns && onColumnsSaved) onColumnsSaved(pendingColumns);
      setPendingColumns(null);
      setShowCustomize(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONSOLIDATED_INVOICE_CUSTOMIZE_REDUCER" });
      }, 100);
    }
  }, [state?.reports?.consolidatedInvoiceCustomizeSuccess]);

  useEffect(() => {
    if (state?.reports?.consolidatedInvoiceCustomizeError) {
      setColumnsSaving(false);
      setPendingColumns(null);
      dispatch({ type: "REMOVE_CONSOLIDATED_INVOICE_CUSTOMIZE_ERROR" });
    }
  }, [state?.reports?.consolidatedInvoiceCustomizeError]);

  // The parent can control the toggle (needed by the export settings).
  // Without that prop the table manages it itself.
  const [internalIncludeAll, setInternalIncludeAll] = useState(false);
  const includeAllTenants = includeAllTenantsProp ?? internalIncludeAll;
  const setIncludeAllTenants = (updater) => {
    const next =
      typeof updater === "function" ? updater(includeAllTenants) : updater;
    if (onIncludeAllTenantsChange) onIncludeAllTenantsChange(next);
    else setInternalIncludeAll(next);
  };

  // Header + cells follow the API column list (order and selection).
  const columns = useMemo(() => getVisibleColumns(tableColumns), [tableColumns]);

  const filteredRows = useMemo(
    () => applyConsolidatedFilters(beds, filters, period),
    [beds, filters, period],
  );
  console.log("filteredRows", filteredRows)
  const rows = useMemo(
    () => filterRowsByAllTenants(filteredRows, includeAllTenants),
    [filteredRows, includeAllTenants],
  );

  const hasActiveFilters = countActiveFilters(filters) > 0;

  // Small note about what this view lists; shown as a tooltip.
  const viewNote = includeAllTenants
    ? "Showing all tenants, including fully paid tenants and empty beds."
    : "Only pending and unpaid tenants are listed in this view.";

  const occupiedCount = rows?.filter((row) => !row?.isVacant)?.length;
  const vacantCount = rows?.length - occupiedCount;

  const footerText = includeAllTenants
    ? `Showing ${occupiedCount} tenant stays and ${vacantCount} vacant beds`
    : `Showing ${occupiedCount} pending tenant stays`;

  const toggleExpanded = (bedId) => {
    setExpandedBedIds((prev) =>
      prev?.includes(bedId)
        ? prev?.filter((id) => id !== bedId)
        : [...prev, bedId],
    );
  };

  const renderRowCell = (column, row, isExpanded) => {
    switch (column?.key) {
      case "floor":
      case "room":
      case "bed":
        return (
          <span className="font-semibold text-[#111928]">{row[column?.key]}</span>
        );
      case "tenant":
        if (row?.isVacant) return <span className="text-[#6B7280]">—</span>;
        return (
          <div className="flex items-center gap-[13px]">
            <div className="w-[30px] h-[30px] rounded-full bg-slate-200 text-[#44536A] flex-shrink-0 flex items-center justify-center text-xs font-semibold">
              {getInitials(row?.tenant?.name)}
            </div>
            <span className="font-semibold text-[#111928]">
              {row?.tenant?.name}
            </span>
          </div>
        );
      case "status":
        return <StatusBadge status={row?.status} />;
      case "contact":
        return (
          <span className="text-[#314158]">
            {row?.isVacant ? "—" : row?.tenant?.phone}
          </span>
        );
      case "actualRent":
        return (
          <span className="font-medium text-[#111928]">
            {row?.isVacant ? "—" : `₹${formatAmount(row?.actualRent)}`}
          </span>
        );
      case "totalPending":
        return (
          <span className="font-bold text-[#111928]">
            ₹{formatAmount(row?.totalPending)}
          </span>
        );
      case "pendingInvoiceCount":
        if (row?.isVacant) return <span className="text-[#6B7280]">—</span>;
        if (row?.pendingInvoiceCount === 0) {
          return <span className="font-semibold text-[#6B7280]">0</span>;
        }
        return (
          <button data-testid="consolidated-invoice-table-toggle-expanded-btn"
            type="button"
            onClick={() => toggleExpanded(row?.bedId)}
            aria-expanded={isExpanded}
            aria-label={`${row?.pendingInvoiceCount} pending invoices for ${row?.tenant?.name}`}
            className="font-semibold text-[#1E45E1] hover:underline bg-transparent border-0 px-2"
          >
            {row?.pendingInvoiceCount}
          </button>
        );
      default:
        return (
          <span className="font-medium text-[#111928]">
            ₹{formatAmount(row[column?.key])}
          </span>
        );
    }
  };

  // Invoice sub-rows share the parent's columns so each charge lines up
  // under the tenant total it adds up to.
  const renderInvoiceCell = (column, invoice) => {

    if (column?.chargeKey) {
      return (
        <span className="font-medium text-[#314158]">
          ₹{formatAmount(invoice?.pending[column?.chargeKey])}
        </span>
      );
    }
    switch (column?.key) {
      case "tenant":
        return (
          <div className="flex flex-col pl-[43px]">
            <span className="font-semibold text-[#111928]">
              {invoice?.invoiceNo}
            </span>
            <span className="text-[12px] leading-[16px] text-[#62748E]">
              {invoice?.invoiceType} · {formatDate(invoice?.invoiceDate)}
            </span>
          </div>
        );
      case "actualRent":
        // Invoice row: the invoice's full amount (invoiceAmount), not a pending figure.
        return (
          <span className="font-medium text-[#314158]">
            ₹{formatAmount(invoice?.amount)}
          </span>
        );
      case "status":
        return <StatusBadge status={invoice?.status} />;
      case "contact":
        return (
          <div className="flex flex-col">
            <span
              className={
                isInvoiceOverdue(invoice)
                  ? "text-[#C10007] font-medium"
                  : "text-[#314158]"
              }
            >
              Due {formatDate(invoice?.dueDate)}
              {isInvoiceOverdue(invoice) ? " · Overdue" : ""}
            </span>
            <span className="text-[12px] leading-[16px] text-[#62748E]">
              Paid ₹{formatAmount(invoice?.paid)} of ₹{formatAmount(invoice?.amount)}
            </span>
          </div>
        );
      case "totalPending":
        return (
          <span className="font-semibold text-[#111928]">
            ₹{formatAmount(invoice?.totalPending)}
          </span>
        );
      default:
        return null;
    }
  };

  const renderSkeleton = () =>
    Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
      <tr key={`skeleton-${rowIndex}`} aria-hidden="true">
        {columns?.map((column) => (
          <td key={column?.key} className={`${bodyCell} ${alignClass[column?.align]}`}>
            <span
              className={`inline-block h-3 rounded bg-[#E5E7EB] animate-pulse ${column?.key === "tenant" ? "w-[120px]" : "w-[56px]"
                }`}
            />
          </td>
        ))}
        <td className={`${bodyCell} ${stickyCell} z-[1] bg-white text-center`}>
          <span className="inline-block w-[34px] h-[34px] rounded-[12px] bg-[#E5E7EB] animate-pulse" />
        </td>
      </tr>
    ));

  const renderRows = () =>
    rows?.map((row, index) => {
      console.log("row", row)
      const isNewFloor =
        index > 0 && row?.floorOrder !== rows[index - 1]?.floorOrder;
      const floorBorder = isNewFloor ? "border-t-2 border-t-[#CAD5E2]" : "";
      const canViewDetails = (row?.invoices || []).length > 0;
      const isExpanded = canViewDetails && expandedBedIds?.includes(row?.bedId);
      const rowBg = isExpanded ? "bg-[#F8F9FF]" : "bg-white";
      // Why the Details (eye) button is disabled, shown on hover.
      const detailsDisabledReason = row?.isVacant
        ? "Vacant bed – no tenant, so no invoices"
        : "No pending invoices for this tenant";

      return (
        <Fragment key={row?.bedId}>
          <tr data-testid={`consolidated-row-${row?.bedId}`}>
            {columns?.map((column) => (
              <td
                key={column?.key}
                className={`${bodyCell} ${floorBorder} ${rowBg} ${alignClass[column?.align]} ${column?.key === "room" ? "border-l border-l-[#F1F5F9]" : ""
                  }`}
              >
                {renderRowCell(column, row, isExpanded)}
              </td>
            ))}
            <td
              className={`${bodyCell} ${floorBorder} ${stickyCell} z-[1] ${rowBg} text-center`}
            >
              {(() => {
                const detailsButton = (
                  <button data-testid={`consolidated-invoice-table-toggle-expanded-btn-2-${row?.bedId}`}
                    type="button"
                    aria-label={
                      canViewDetails
                        ? `${isExpanded ? "Hide" : "View"} invoices for ${row?.tenant?.name}`
                        : detailsDisabledReason
                    }
                    aria-expanded={isExpanded}
                    disabled={!canViewDetails}
                    onClick={() => toggleExpanded(row?.bedId)}
                    className={`inline-flex items-center justify-center w-[34px] h-[34px] rounded-[12px] border-[1px] ${isExpanded
                      ? "border-[#1E45E1] bg-[#EFF6FF]"
                      : "border-[#E2E8F0] bg-white"
                      } ${canViewDetails
                        ? "cursor-pointer hover:bg-[#F1F5FF]"
                        : "pointer-events-none opacity-40"
                      }`}
                  >
                    <Eye
                      size="16"
                      color={isExpanded ? "#1E45E1" : "#4A5565"}
                      variant={isExpanded ? "Bold" : "Linear"}
                    />
                  </button>
                );
                if (canViewDetails) return detailsButton;
                // A disabled <button> gets no hover events, so the wrapper owns the
                // hover (button is pointer-events-none) and shows the reason.
                return (
                  <CustomTooltip text={detailsDisabledReason} direction="right-full" usePortal={true}>
                    <span
                      data-testid={`consolidated-invoice-table-details-disabled-${row?.bedId}`}
                      className="inline-flex cursor-not-allowed"
                    >
                      {detailsButton}
                    </span>
                  </CustomTooltip>
                );
              })()}
            </td>
          </tr>

          {isExpanded &&
            (row?.invoices || []).map((invoice) => (
              <tr
                key={`${row?.bedId}-${invoice?.invoiceId}`}
                data-testid={`invoice-row-${invoice?.invoiceId}`}
              >
                {columns?.map((column) => (
                  <td
                    key={column?.key}
                    className={`${childCell} bg-[#F8FAFC] ${alignClass[column?.align]} ${column?.key === "room" ? "border-l border-l-[#F1F5F9]" : ""
                      }`}
                  >
                    {renderInvoiceCell(column, invoice)}
                  </td>
                ))}
                <td className={`${childCell} ${stickyCell} z-[1] bg-[#F8FAFC]`} />
              </tr>
            ))}
        </Fragment>
      );
    });

  const showEmpty = !isLoading && rows?.length === 0;

  return (
    // Fills the space the page leaves (md+); only the table body scrolls.
    <div className="font-gilroy mx-1 mt-[12px] flex flex-col md:flex-1 md:min-h-0">
      <div className="shrink-0 flex flex-wrap items-end justify-between gap-[12px] min-h-[53px]">
        <div className="flex flex-wrap items-start gap-[10px]">
          {viewSwitcher}
          <ConsolidatedColumnCustomizer
            columns={tableColumns}
            isOpen={showCustomize}
            onOpenChange={setShowCustomize}
            onSave={handleSaveColumns}
            isSaving={columnsSaving}
          />
          <CustomTooltip text={viewNote} direction="top-full" usePortal={true}>
            <span
              role="img"
              tabIndex={0}
              aria-label={viewNote}
              className="inline-flex items-center justify-center w-[42px] h-[42px] cursor-help"
            >
              <InfoCircle size="20" color="#62748E" />
            </span>
          </CustomTooltip>
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-[10px] min-h-[42px] w-full sm:w-auto">
          <label
            htmlFor="consolidated-include-all"
            className="text-[13px] sm:text-[14px] leading-[20px] text-[#222] mb-0 cursor-pointer"
          >
            Include Fully Paid Tenants &amp; Empty Beds
          </label>
          <button data-testid="consolidated-invoice-table-consolidated-include-all-btn"
            id="consolidated-include-all"
            type="button"
            role="switch"
            aria-checked={includeAllTenants}
            onClick={() => setIncludeAllTenants((prev) => !prev)}
            className={`relative inline-flex h-[18px] w-[33px] flex-shrink-0 items-center rounded-full transition-colors ${includeAllTenants ? "bg-[#1E45E1]" : "bg-[#CAD5E2]"
              }`}
          >
            <span
              className={`inline-block h-[12px] w-[12px] rounded-full bg-white shadow-[0px_0.75px_2.25px_0px_rgba(0,0,0,0.1),0px_0.75px_1.5px_0px_rgba(0,0,0,0.1)] transition-transform ${includeAllTenants ? "translate-x-[18px]" : "translate-x-[3px]"
                }`}
            />
          </button>
        </div>
      </div>

      {showEmpty ? (
        // Fills the space left on screen (md+) and scrolls if that's shorter
        // than the message, so the empty state is never cut off.
        <div className="mt-[12px] md:flex-1 md:min-h-0 md:overflow-y-auto show-scrolls [&>div]:h-full">
          <NoDataMessage
            label="Pending Collections"
            isSearching={hasActiveFilters}
            isHeightChanged={true}
          />
        </div>
      ) : (
        <div className="mt-[12px] bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-1 md:min-h-0">
          <div
            className="overflow-auto max-h-[70vh] md:max-h-none md:flex-1 md:min-h-0 show-scrolls"
            aria-busy={isLoading}
          >
            <table className="w-max min-w-full border-separate border-spacing-0">
              {/* Column headers stay visible while the rows scroll. */}
              <thead className="sticky top-0 z-[3]">
                <tr>
                  {columns?.map((column) => (
                    <th
                      key={column?.key}
                      className={`${headerCell} ${alignClass[column?.align]}`}
                    >
                      {column?.label}
                    </th>
                  ))}
                  <th className={`${headerCell} ${stickyCell} z-[2] text-center`}>
                    Details
                  </th>
                </tr>
              </thead>

              <tbody>{isLoading ? renderSkeleton() : renderRows()}</tbody>
            </table>
          </div>

          <div className="shrink-0 flex flex-wrap items-center justify-between gap-x-[16px] gap-y-[4px] px-[12px] sm:px-[20px] py-[12px] border-t border-[#E2E8F0] bg-white text-[13px] sm:text-[14px] leading-[20px] text-[#62748E]">
            <span>{isLoading ? "Loading collection sheet…" : footerText}</span>
            <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[8px]">
              <span>Grouped by Floor → Room → Bed</span>
              {pagination}
            </div>
          </div>
        </div>
      )}

      <ConsolidatedFilterDrawer
        show={showFilter}
        onClose={onCloseFilter}
        filters={filters}
        period={period}
        floorOptions={floorOptions}
        onApply={onApplyFilters}
        statusOptions={statusOptions}
      />
    </div>
  );
}

ConsolidatedInvoiceTable.propTypes = {
  viewSwitcher: PropTypes.node,
  // ApiPagination for the server pages, rendered in the footer.
  pagination: PropTypes.node,
  beds: PropTypes.arrayOf(PropTypes.object),
  tableColumns: PropTypes.arrayOf(PropTypes.object),
  onColumnsSaved: PropTypes.func,
  showFilter: PropTypes.bool,
  onCloseFilter: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
  floorOptions: PropTypes.arrayOf(PropTypes.string),
  // API filters.paymentStatus as [{ key, label }].
  statusOptions: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, label: PropTypes.string }),
  ),
  filters: PropTypes.shape({
    search: PropTypes.string,
    statuses: PropTypes.arrayOf(PropTypes.string),
    overdueOnly: PropTypes.bool,
    floors: PropTypes.arrayOf(PropTypes.string),
  }),
  period: PropTypes.shape({
    from: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.object]),
    to: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.object]),
  }),
  isLoading: PropTypes.bool,
  includeAllTenants: PropTypes.bool,
  onIncludeAllTenantsChange: PropTypes.func,
};

export default ConsolidatedInvoiceTable;
