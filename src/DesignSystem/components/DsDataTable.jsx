import React from "react";
import PropTypes from "prop-types";
import Skeleton from "../../Utils/Skeleton";
import ApiPagination from "../../Components/ApiPagination";
import DsButton from "./DsButton";
import DsTextLink from "./DsTextLink";

const SKELETON_ROWS = 3;

// A row click opens the row, unless it came from a control inside the row or
// from a portal (a "⋯" menu renders outside the row but React still bubbles
// its clicks here).
const isRowTarget = (event) =>
  event.currentTarget.contains(event.target) &&
  !event.target.closest("button, a, input, select, textarea, label");

/** Full-width message row: error (Retry), empty, or no results (Clear filters). */
function StateRow({ colSpan, kind, title, message, onAction, actionLabel }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-[16px] py-[48px]">
        <div
          role={kind === "error" ? "alert" : "status"}
          className="mx-auto flex max-w-[420px] flex-col items-center gap-[4px] text-center"
        >
          <span className="text-[16px] font-semibold leading-[23px] text-[color:var(--ds-text-default)]">
            {title}
          </span>
          {message && (
            <span className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">{message}</span>
          )}
          {onAction && kind === "error" && (
            <DsButton className="mt-[8px]" onClick={onAction}>
              {actionLabel}
            </DsButton>
          )}
          {onAction && kind !== "error" && (
            <DsTextLink className="mt-[8px]" onClick={onAction}>
              {actionLabel}
            </DsTextLink>
          )}
        </div>
      </td>
    </tr>
  );
}

StateRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  kind: PropTypes.oneOf(["error", "empty", "noResults"]).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  onAction: PropTypes.func,
  actionLabel: PropTypes.string,
};

/**
 * Data table (Figma Table header cell 23:14: 40px, surface-subtle, 12px
 * label; rows 14px padding, top border) with every list state built in:
 * loading skeleton, error + Retry, empty, "no results for this filter" +
 * Clear filters, and server-style pagination (ApiPagination) once there is
 * more than one default page. Optional clickable rows (Enter opens too).
 * columns: [{ key, header | srHeader, headerClassName, cellClassName, render(row) }]
 */
function DsDataTable({
  caption,
  columns,
  rows,
  rowKey,
  status,
  error,
  onRetry,
  hasQuery,
  onClearQuery,
  emptyTitle,
  emptyMessage,
  pagination,
  pageSize = 10,
  onRowClick,
  rowLabel,
}) {
  const colSpan = columns.length;
  let body;
  if (status === "loading") {
    body = Array.from({ length: SKELETON_ROWS }, (_, index) => (
      <tr key={index} className="border-t-[1px] border-solid border-[color:var(--ds-border-default)]">
        {columns.map((column) => (
          <td key={column.key} className="px-[16px] py-[14px]">
            <Skeleton className="h-[16px] w-[70%]" />
          </td>
        ))}
      </tr>
    ));
  } else if (status === "error") {
    body = (
      <StateRow
        colSpan={colSpan}
        kind="error"
        title="Couldn't load this list"
        message={error}
        onAction={onRetry}
        actionLabel="Retry"
      />
    );
  } else if (rows.length === 0 && hasQuery) {
    body = (
      <StateRow
        colSpan={colSpan}
        kind="noResults"
        title="No results for this filter"
        message="Try another search or clear the filters."
        onAction={onClearQuery}
        actionLabel="Clear filters"
      />
    );
  } else if (rows.length === 0) {
    body = <StateRow colSpan={colSpan} kind="empty" title={emptyTitle} message={emptyMessage} />;
  } else {
    body = rows.map((row) => (
      <tr
        key={rowKey(row)}
        tabIndex={onRowClick ? 0 : undefined}
        aria-label={onRowClick && rowLabel ? rowLabel(row) : undefined}
        onClick={onRowClick ? (event) => isRowTarget(event) && onRowClick(row) : undefined}
        onKeyDown={
          onRowClick
            ? (event) => {
                if (event.key === "Enter" && event.target === event.currentTarget) onRowClick(row);
              }
            : undefined
        }
        className={`border-t-[1px] border-solid border-[color:var(--ds-border-default)] transition-colors hover:bg-[var(--ds-bg-surface-subtle)] ${
          onRowClick
            ? "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--ds-border-focus)]"
            : ""
        }`}
      >
        {columns.map((column) => (
          <td key={column.key} className={`px-[16px] py-[14px] align-middle ${column.cellClassName || ""}`}>
            {column.render(row)}
          </td>
        ))}
      </tr>
    ));
  }

  return (
    <div className="flex w-full flex-col gap-[12px]">
      <div className="w-full overflow-x-auto rounded-[var(--ds-radius-sm)] border-[1px] border-solid border-[color:var(--ds-border-default)]">
        <table className="w-full min-w-[920px] border-collapse" aria-busy={status === "loading"}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-[var(--ds-bg-surface-subtle)]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`h-[40px] whitespace-nowrap px-[16px] text-left text-[12px] font-medium leading-[16px] text-[color:var(--ds-text-secondary)] ${
                    column.headerClassName || ""
                  }`}
                >
                  {column.header || <span className="sr-only">{column.srHeader}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
      </div>
      {/* Compare with the default size so the size picker stays reachable after picking a larger one. */}
      {status === "ready" && pagination.totalRecords > pageSize && (
        <ApiPagination {...pagination} isTenantPagination />
      )}
    </div>
  );
}

DsDataTable.propTypes = {
  caption: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string,
      srHeader: PropTypes.string,
      headerClassName: PropTypes.string,
      cellClassName: PropTypes.string,
      render: PropTypes.func.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.array.isRequired,
  rowKey: PropTypes.func.isRequired,
  status: PropTypes.oneOf(["loading", "error", "ready"]).isRequired,
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
  hasQuery: PropTypes.bool,
  onClearQuery: PropTypes.func.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onSizeChange: PropTypes.func,
  }).isRequired,
  pageSize: PropTypes.number,
  onRowClick: PropTypes.func,
  rowLabel: PropTypes.func,
};

export default DsDataTable;
