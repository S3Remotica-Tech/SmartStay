import React, { Fragment, useMemo, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Eye, InfoCircle } from "iconsax-react";
import NoDataMessage from "../../Utils/NoDataMessage";
import CustomTooltip from "../../Utils/CustomTooltip";
import { consolidatedMockBeds } from "./consolidatedMockData";
import {
  DEFAULT_CONSOLIDATED_FILTERS,
  ROW_STATUS,
  applyConsolidatedFilters,
  countActiveFilters,
  filterRowsByAllTenants,
  formatAmount,
  getInitials,
  isInvoiceOverdue,
} from "./consolidatedHelpers";
import {
  CONSOLIDATED_COLUMNS,
  DEFAULT_VISIBLE_COLUMN_KEYS,
} from "./consolidatedColumns";
import ConsolidatedColumnCustomizer from "./ConsolidatedColumnCustomizer";

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

function StatusBadge({ status }) {
  const style = statusBadgeStyles[status] || statusBadgeStyles[ROW_STATUS.PENDING];
  return (
    <span
      className={`inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] ${style.bg}`}
    >
      <span className={`w-[6px] h-[6px] rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

function ConsolidatedInvoiceTable({
  viewSwitcher,
  beds = consolidatedMockBeds,
  filters = DEFAULT_CONSOLIDATED_FILTERS,
  period = null,
  isLoading = false,
  includeAllTenants: includeAllTenantsProp,
  onIncludeAllTenantsChange,
  visibleColumnKeys: visibleColumnKeysProp,
  onVisibleColumnKeysChange,
}) {
  const [expandedBedIds, setExpandedBedIds] = useState([]);

  // The parent can control the toggle and visible columns (needed by the
  // export settings). Without those props the table manages them itself.
  const [internalIncludeAll, setInternalIncludeAll] = useState(false);
  const [internalVisibleKeys, setInternalVisibleKeys] = useState(
    DEFAULT_VISIBLE_COLUMN_KEYS,
  );
  const includeAllTenants = includeAllTenantsProp ?? internalIncludeAll;
  const setIncludeAllTenants = (updater) => {
    const next =
      typeof updater === "function" ? updater(includeAllTenants) : updater;
    if (onIncludeAllTenantsChange) onIncludeAllTenantsChange(next);
    else setInternalIncludeAll(next);
  };
  const visibleColumnKeys = visibleColumnKeysProp ?? internalVisibleKeys;
  const setVisibleColumnKeys =
    onVisibleColumnKeysChange || setInternalVisibleKeys;

  const columns = useMemo(
    () =>
      CONSOLIDATED_COLUMNS.filter((column) =>
        visibleColumnKeys.includes(column.key),
      ),
    [visibleColumnKeys],
  );

  const filteredRows = useMemo(
    () => applyConsolidatedFilters(beds, filters, period),
    [beds, filters, period],
  );

  const rows = useMemo(
    () => filterRowsByAllTenants(filteredRows, includeAllTenants),
    [filteredRows, includeAllTenants],
  );

  const hasActiveFilters = countActiveFilters(filters) > 0;

  // Small note about what this view lists; shown as a tooltip.
  const viewNote = includeAllTenants
    ? "Showing all tenants, including fully paid tenants and empty beds."
    : "Only pending and unpaid tenants are listed in this view.";

  const occupiedCount = rows.filter((row) => !row.isVacant).length;
  const vacantCount = rows.length - occupiedCount;

  const footerText = includeAllTenants
    ? `Showing ${occupiedCount} tenant stays and ${vacantCount} vacant beds`
    : `Showing ${occupiedCount} pending tenant stays`;

  const toggleExpanded = (bedId) => {
    setExpandedBedIds((prev) =>
      prev.includes(bedId)
        ? prev.filter((id) => id !== bedId)
        : [...prev, bedId],
    );
  };

  const renderRowCell = (column, row, isExpanded) => {
    switch (column.key) {
      case "floor":
      case "room":
      case "bed":
        return (
          <span className="font-semibold text-[#111928]">{row[column.key]}</span>
        );
      case "tenant":
        if (row.isVacant) return <span className="text-[#6B7280]">—</span>;
        return (
          <div className="flex items-center gap-[13px]">
            <div className="w-[30px] h-[30px] rounded-full bg-slate-200 text-[#44536A] flex-shrink-0 flex items-center justify-center text-xs font-semibold">
              {getInitials(row.tenant.name)}
            </div>
            <span className="font-semibold text-[#111928]">
              {row.tenant.name}
            </span>
          </div>
        );
      case "status":
        return <StatusBadge status={row.status} />;
      case "contact":
        return (
          <span className="text-[#314158]">
            {row.isVacant ? "—" : row.tenant.phone}
          </span>
        );
      case "actualRent":
        return (
          <span className="font-medium text-[#111928]">
            {row.isVacant ? "—" : `₹${formatAmount(row.actualRent)}`}
          </span>
        );
      case "totalPending":
        return (
          <span className="font-bold text-[#111928]">
            ₹{formatAmount(row.totalPending)}
          </span>
        );
      case "pendingInvoiceCount":
        if (row.isVacant) return <span className="text-[#6B7280]">—</span>;
        if (row.pendingInvoiceCount === 0) {
          return <span className="font-semibold text-[#6B7280]">0</span>;
        }
        return (
          <button
            type="button"
            onClick={() => toggleExpanded(row.bedId)}
            aria-expanded={isExpanded}
            aria-label={`${row.pendingInvoiceCount} pending invoices for ${row.tenant.name}`}
            className="font-semibold text-[#1E45E1] hover:underline bg-transparent border-0 px-2"
          >
            {row.pendingInvoiceCount}
          </button>
        );
      default:
        return (
          <span className="font-medium text-[#111928]">
            ₹{formatAmount(row[column.key])}
          </span>
        );
    }
  };

  // Invoice sub-rows share the parent's columns so each charge lines up
  // under the tenant total it adds up to.
  const renderInvoiceCell = (column, invoice) => {
    if (column.chargeKey) {
      return (
        <span className="font-medium text-[#314158]">
          ₹{formatAmount(invoice.pending[column.chargeKey])}
        </span>
      );
    }
    switch (column.key) {
      case "tenant":
        return (
          <div className="flex flex-col pl-[43px]">
            <span className="font-semibold text-[#111928]">
              {invoice.invoiceNo}
            </span>
            <span className="text-[12px] leading-[16px] text-[#62748E]">
              {invoice.invoiceType} · {formatDate(invoice.invoiceDate)}
            </span>
          </div>
        );
      case "status":
        return <StatusBadge status={invoice.status} />;
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
              Due {formatDate(invoice.dueDate)}
              {isInvoiceOverdue(invoice) ? " · Overdue" : ""}
            </span>
            <span className="text-[12px] leading-[16px] text-[#62748E]">
              Paid ₹{formatAmount(invoice.paid)} of ₹{formatAmount(invoice.amount)}
            </span>
          </div>
        );
      case "totalPending":
        return (
          <span className="font-semibold text-[#111928]">
            ₹{formatAmount(invoice.totalPending)}
          </span>
        );
      default:
        return null;
    }
  };

  const renderSkeleton = () =>
    Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
      <tr key={`skeleton-${rowIndex}`} aria-hidden="true">
        {columns.map((column) => (
          <td key={column.key} className={`${bodyCell} ${alignClass[column.align]}`}>
            <span
              className={`inline-block h-3 rounded bg-[#E5E7EB] animate-pulse ${
                column.key === "tenant" ? "w-[120px]" : "w-[56px]"
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
    rows.map((row, index) => {
      const isNewFloor =
        index > 0 && row.floorOrder !== rows[index - 1].floorOrder;
      const floorBorder = isNewFloor ? "border-t-2 border-t-[#CAD5E2]" : "";
      const canViewDetails = row.pendingInvoiceCount > 0;
      const isExpanded = canViewDetails && expandedBedIds.includes(row.bedId);
      const rowBg = isExpanded ? "bg-[#F8F9FF]" : "bg-white";

      return (
        <Fragment key={row.bedId}>
          <tr data-testid={`consolidated-row-${row.bedId}`}>
            {columns.map((column) => (
              <td
                key={column.key}
                className={`${bodyCell} ${floorBorder} ${rowBg} ${alignClass[column.align]} ${
                  column.key === "room" ? "border-l border-l-[#F1F5F9]" : ""
                }`}
              >
                {renderRowCell(column, row, isExpanded)}
              </td>
            ))}
            <td
              className={`${bodyCell} ${floorBorder} ${stickyCell} z-[1] ${rowBg} text-center`}
            >
              <button
                type="button"
                aria-label={
                  row.isVacant
                    ? "No invoices for vacant bed"
                    : `${isExpanded ? "Hide" : "View"} pending invoices for ${row.tenant.name}`
                }
                aria-expanded={isExpanded}
                disabled={!canViewDetails}
                onClick={() => toggleExpanded(row.bedId)}
                className={`inline-flex items-center justify-center w-[34px] h-[34px] rounded-[12px] border-[1px] ${
                  isExpanded
                    ? "border-[#1E45E1] bg-[#EFF6FF]"
                    : "border-[#E2E8F0] bg-white"
                } ${
                  canViewDetails
                    ? "cursor-pointer hover:bg-[#F1F5FF]"
                    : "cursor-not-allowed opacity-40"
                }`}
              >
                <Eye
                  size="16"
                  color={isExpanded ? "#1E45E1" : "#4A5565"}
                  variant={isExpanded ? "Bold" : "Linear"}
                />
              </button>
            </td>
          </tr>

          {isExpanded &&
            row.pendingInvoices.map((invoice) => (
              <tr
                key={`${row.bedId}-${invoice.invoiceId}`}
                data-testid={`invoice-row-${invoice.invoiceId}`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`${childCell} bg-[#F8FAFC] ${alignClass[column.align]} ${
                      column.key === "room" ? "border-l border-l-[#F1F5F9]" : ""
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

  const showEmpty = !isLoading && rows.length === 0;

  return (
    <div className="font-gilroy mx-1 mt-[12px]">
      <div className="flex flex-wrap items-end justify-between gap-[12px] min-h-[53px]">
        <div className="flex items-start gap-[10px]">
          {viewSwitcher}
          <ConsolidatedColumnCustomizer
            visibleKeys={visibleColumnKeys}
            onApply={setVisibleColumnKeys}
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

        <div className="flex items-center gap-[10px] h-[42px]">
          <label
            htmlFor="consolidated-include-all"
            className="text-[14px] leading-[20px] text-[#222] mb-0 cursor-pointer"
          >
            Include Fully Paid Tenants &amp; Empty Beds
          </label>
          <button
            id="consolidated-include-all"
            type="button"
            role="switch"
            aria-checked={includeAllTenants}
            onClick={() => setIncludeAllTenants((prev) => !prev)}
            className={`relative inline-flex h-[18px] w-[33px] flex-shrink-0 items-center rounded-full transition-colors ${
              includeAllTenants ? "bg-[#1E45E1]" : "bg-[#CAD5E2]"
            }`}
          >
            <span
              className={`inline-block h-[12px] w-[12px] rounded-full bg-white shadow-[0px_0.75px_2.25px_0px_rgba(0,0,0,0.1),0px_0.75px_1.5px_0px_rgba(0,0,0,0.1)] transition-transform ${
                includeAllTenants ? "translate-x-[18px]" : "translate-x-[3px]"
              }`}
            />
          </button>
        </div>
      </div>

      {showEmpty ? (
        <div className="my-[12px]">
          <NoDataMessage
            label="Pending Collections"
            isSearching={hasActiveFilters}
          />
        </div>
      ) : (
        <div className="mt-[12px] bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto show-scrolls" aria-busy={isLoading}>
            <table className="w-max min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`${headerCell} ${alignClass[column.align]}`}
                    >
                      {column.label}
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

          <div className="flex items-center justify-between px-[20px] py-[12px] border-t border-[#E2E8F0] bg-white text-[14px] leading-[20px] text-[#62748E]">
            <span>{isLoading ? "Loading collection sheet…" : footerText}</span>
            <span>Grouped by Floor → Room → Bed</span>
          </div>
        </div>
      )}
    </div>
  );
}

ConsolidatedInvoiceTable.propTypes = {
  viewSwitcher: PropTypes.node,
  beds: PropTypes.arrayOf(PropTypes.object),
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
  visibleColumnKeys: PropTypes.arrayOf(PropTypes.string),
  onVisibleColumnKeysChange: PropTypes.func,
};

export default ConsolidatedInvoiceTable;
