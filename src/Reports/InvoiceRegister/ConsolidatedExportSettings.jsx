// Invoice Register - "Export Pending Collection Sheet".
// Everything for the export lives in this one file: the settings drawer,
// A4 pagination, the printable report page and the PDF preview/download.
// Rows/totals come from consolidatedHelpers.js (same numbers as the table);
// PDF generation is in src/Utils/ExportPdf.js.
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Modal, Offcanvas } from "react-bootstrap";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  ArrowDown2,
  ArrowLeft,
  ArrowLeft2,
  ArrowRight2,
  DocumentDownload,
  DocumentText,
  InfoCircle,
  Lock1,
  Maximize4,
  Refresh2,
  SearchZoomIn,
  SearchZoomOut,
  TickCircle,
  Warning2,
} from "iconsax-react";
import { IoCloseOutline } from "react-icons/io5";
import ErrorMessage from "../../Components/ErrorMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import { createPdfFromPages, downloadPdf } from "../../Utils/ExportPdf";
import {
  COLLECTION_STATUS_OPTIONS,
  DEFAULT_CONSOLIDATED_FILTERS,
  applyConsolidatedFilters,
  countActiveFilters,
  filterRowsByAllTenants,
  formatAmount,
  getVisibleColumns,
  periodToRange,
} from "./ConsolidatedInvoiceTable";

// ---------------------------------------------------------------------------
// Export (Pending Collection Sheet). Builds the data the PDF will render.
// No rendering here; the same rows/totals logic as the table is reused.
// ---------------------------------------------------------------------------

export const EXPORT_GROUP_BY = {
  FLOOR_ROOM_BED: "floor-room-bed",
  ROOM_BED: "room-bed",
};

export const EXPORT_GROUP_BY_OPTIONS = [
  { value: EXPORT_GROUP_BY.FLOOR_ROOM_BED, label: "Floor → Room → Bed" },
  { value: EXPORT_GROUP_BY.ROOM_BED, label: "Room → Bed" },
];

export const DEFAULT_EXPORT_PDF_SETTINGS = {
  groupBy: EXPORT_GROUP_BY.FLOOR_ROOM_BED,
  includeFloorSubtotals: true,
  includeGrandTotal: true,
  includePropertyAndPeriod: true,
};

// Amount columns that are added up in subtotals and the grand total.
// Actual Rent is totalled separately for reference only; it is never part
// of Total Pending.
export const TOTAL_KEYS = [
  "actualRent",
  "pendingRent",
  "pendingEb",
  "pendingAdvance",
  "pendingNonRefundable",
  "totalPending",
  "pendingInvoiceCount",
];

// Totals for a set of rows. Vacant beds are excluded.
const sumExportRows = (rows = []) => {
  const occupied = rows.filter((row) => !row.isVacant);
  const totals = { tenantCount: occupied.length };
  TOTAL_KEYS.forEach((key) => {
    totals[key] = occupied.reduce((sum, row) => sum + (row[key] || 0), 0);
  });
  return totals;
};

const compareRoomBed = (a, b) => {
  const room = String(a.room).localeCompare(String(b.room), "en", {
    numeric: true,
  });
  if (room !== 0) return room;
  return String(a.bed).localeCompare(String(b.bed), "en", { numeric: true });
};

// scope: { filters, period, includeAllTenants }
// settings: { columns, columnKeys, groupBy, includeFloorSubtotals, includeGrandTotal,
//             includePropertyAndPeriod }
export const buildExportData = (
  beds = [],
  scope = {},
  settings = DEFAULT_EXPORT_PDF_SETTINGS,
  today = dayjs(),
) => {
  const rows = filterRowsByAllTenants(
    applyConsolidatedFilters(beds, scope.filters, scope.period, today),
    Boolean(scope.includeAllTenants),
  );

  const groupByFloor = settings.groupBy !== EXPORT_GROUP_BY.ROOM_BED;
  const orderedRows = groupByFloor ? rows : [...rows].sort(compareRoomBed);

  let groups;
  if (groupByFloor) {
    const byFloor = new Map();
    orderedRows.forEach((row) => {
      if (!byFloor.has(row.floor)) byFloor.set(row.floor, []);
      byFloor.get(row.floor).push(row);
    });
    groups = [...byFloor.entries()].map(([floor, floorRows]) => ({
      label: floor,
      rows: floorRows,
      subtotal: settings.includeFloorSubtotals ? sumExportRows(floorRows) : null,
    }));
  } else {
    groups = [{ label: null, rows: orderedRows, subtotal: null }];
  }

  const occupiedCount = rows.filter((row) => !row.isVacant).length;

  const columnKeys = settings.columnKeys || [];

  return {
    columnKeys,
    // Column definitions (API order) for the PDF table.
    columns: (settings.columns || []).filter((column) =>
      columnKeys.includes(column.key),
    ),
    groups,
    grandTotal: settings.includeGrandTotal ? sumExportRows(rows) : null,
    rowCount: rows.length,
    occupiedCount,
    vacantCount: rows.length - occupiedCount,
    settings,
  };
};

// Columns offered in the export settings (everything the PDF can render).
export const getExportableColumns = (columns = []) =>
  columns.filter((column) => column.known);

// Export column keys: always keeps locked columns, in API order.
export const normaliseExportColumnKeys = (columns = [], keys = []) =>
  getExportableColumns(columns)
    .filter((column) => column.locked || keys.includes(column.key))
    .map((column) => column.key);

// Initial export columns = the columns currently visible in the table.
export const getDefaultExportColumnKeys = (columns = []) =>
  getVisibleColumns(columns).map((column) => column.key);

// ---- from consolidatedExportLayout.js ----
// Page layout and pagination for the Pending Collection Sheet PDF.
// Pure functions (no React, no PDF library) so pagination can be tested and
// reused if PDFs are later generated by the backend.

// A4 landscape at 96 dpi. Every height below is used both for pagination and
// as a fixed CSS height in ConsolidatedReportPage, so they always match.
const PDF_LAYOUT = {
  pageWidth: 1123,
  pageHeight: 794,
  paddingX: 32,
  paddingY: 28,
  firstHeaderHeight: 96,
  firstHeaderCompactHeight: 44,
  runningHeaderHeight: 32,
  tableHeaderHeight: 40,
  footerHeight: 28,
  rowHeight: 28,
  subtotalHeight: 28,
  grandTotalHeight: 32,
  safety: 8,
};

// Relative column widths for the PDF table (normalised to 100%).
const COLUMN_WEIGHTS = {
  floor: 9,
  room: 8,
  bed: 5,
  tenant: 15,
  status: 10,
  contact: 12,
  actualRent: 9,
  pendingRent: 9,
  pendingEb: 8,
  pendingAdvance: 9,
  pendingNonRefundable: 11,
  totalPending: 10,
  pendingInvoiceCount: 7,
};

// columns: definitions from buildConsolidatedColumns (exportData.columns).
const getExportColumns = (columns = []) => {
  const totalWeight = columns.reduce(
    (sum, column) => sum + (COLUMN_WEIGHTS[column.key] || 8),
    0,
  );
  return columns.map((column) => ({
    ...column,
    widthPercent: ((COLUMN_WEIGHTS[column.key] || 8) / totalWeight) * 100,
    isTotal: TOTAL_KEYS.includes(column.key),
  }));
};

// Plain-text value of one cell, shared by the PDF page and tests.
const formatExportCell = (column, row) => {
  switch (column.key) {
    case "floor":
    case "room":
    case "bed":
      return String(row[column.key] ?? "");
    case "tenant":
      return row.isVacant ? "—" : row.tenant?.name || "—";
    case "status":
      return row.status;
    case "contact":
      return row.isVacant ? "—" : row.tenant?.phone || "—";
    case "actualRent":
      return row.isVacant ? "—" : `₹${formatAmount(row.actualRent)}`;
    case "pendingInvoiceCount":
      return row.isVacant ? "—" : String(row.pendingInvoiceCount);
    default:
      return `₹${formatAmount(row[column.key])}`;
  }
};

const formatExportTotal = (key, totals) =>
  key === "pendingInvoiceCount"
    ? String(totals[key] ?? 0)
    : `₹${formatAmount(totals[key] ?? 0)}`;

const itemHeight = (item, layout) => {
  switch (item.type) {
    case "subtotal":
      return layout.subtotalHeight;
    case "grand":
      return layout.grandTotalHeight;
    default:
      return layout.rowHeight;
  }
};

const getPageBodyCapacity = (
  isFirstPage,
  showPropertyAndPeriod,
  layout = PDF_LAYOUT,
) => {
  let header = layout.runningHeaderHeight;
  if (isFirstPage) {
    header = showPropertyAndPeriod
      ? layout.firstHeaderHeight
      : layout.firstHeaderCompactHeight;
  }
  return (
    layout.pageHeight -
    layout.paddingY * 2 -
    header -
    layout.tableHeaderHeight -
    layout.footerHeight -
    layout.safety
  );
};

// Flattens export data into a list of printable items.
// Floor names are not separate heading rows: the page prints the floor on the
// first row of each floor group (see paginateExportData).
const buildItems = (exportData) => {
  const items = [];
  exportData.groups.forEach((group, groupIndex) => {
    group.rows.forEach((row, rowIndex) => {
      items.push({
        type: "row",
        row,
        groupIndex,
        groupLabel: group.label,
        firstInGroup: rowIndex === 0,
      });
    });
    if (group.subtotal) {
      items.push({
        type: "subtotal",
        label: `${group.label} subtotal`,
        totals: group.subtotal,
        groupIndex,
      });
    }
  });
  if (exportData.grandTotal) {
    items.push({ type: "grand", label: "Grand Total", totals: exportData.grandTotal });
  }
  return items;
};

// An item followed by a subtotal or the grand total stays on the same page as
// it, so totals never start a page alone.
const keepsWithNext = (item, next) =>
  Boolean(next) && (next.type === "subtotal" || next.type === "grand");

// Splits the report into pages without ever splitting a row.
// Returns [{ pageNumber, totalPages, isFirst, items: [...] }]. Row items carry
// `showFloor` (print the floor name in this row) and `separatorAbove`
// (draw the floor divider above this row).
const paginateExportData = (
  exportData,
  { showPropertyAndPeriod = true, layout = PDF_LAYOUT } = {},
) => {
  const items = buildItems(exportData);
  const pages = [];
  let current = [];
  let remaining = getPageBodyCapacity(true, showPropertyAndPeriod, layout);

  const startNewPage = () => {
    pages.push(current);
    current = [];
    remaining = getPageBodyCapacity(false, showPropertyAndPeriod, layout);
  };

  let index = 0;
  while (index < items.length) {
    // Measure this item plus any items it must stay with.
    let end = index;
    let blockHeight = itemHeight(items[index], layout);
    while (end + 1 < items.length && keepsWithNext(items[end], items[end + 1])) {
      end += 1;
      blockHeight += itemHeight(items[end], layout);
    }

    if (blockHeight > remaining && current.length > 0) startNewPage();

    // A block taller than a full page is not expected; place it item by item.
    for (let i = index; i <= end; i += 1) {
      const height = itemHeight(items[i], layout);
      if (height > remaining && current.length > 0) startNewPage();
      current.push(items[i]);
      remaining -= height;
    }
    index = end + 1;
  }

  if (current.length > 0 || pages.length === 0) pages.push(current);

  return pages.map((pageItems, pageIndex) => ({
    pageNumber: pageIndex + 1,
    totalPages: pages.length,
    isFirst: pageIndex === 0,
    items: pageItems.map((item, position) =>
      item.type === "row"
        ? {
            ...item,
            showFloor:
              item.groupLabel === null || position === 0 || item.firstInGroup,
            // A subtotal row already divides floors, so no extra rule then.
            separatorAbove:
              item.groupLabel !== null &&
              item.firstInGroup &&
              position > 0 &&
              pageItems[position - 1].type !== "subtotal",
          }
        : item,
    ),
  }));
};

// html2canvas draws Gilroy text lower than the browser lays it out (measured
// with html2canvas 1.4.1 in Chrome: about 7px at 10px, 10px at 20px). The
// report page nudges its text up by this amount so the captured image is
// centred. Re-check this if html2canvas or the font is changed or replaced.
const PDF_TEXT_SHIFT = (fontSize) => Math.round(0.33 * fontSize + 3.3);

// The PDF has fixed-size cells, so long text is shortened with an ellipsis
// here (html2canvas does not draw CSS text-overflow).
const truncateText = (text, widthPx, fontSize = 10) => {
  const value = String(text ?? "");
  const maxChars = Math.max(Math.floor((widthPx - 16) / (fontSize * 0.56)), 3);
  return value.length > maxChars ? `${value.slice(0, maxChars - 1)}…` : value;
};

const formatPeriodLabel = (period) => {
  if (!period?.from || !period?.to) return "All dates";
  return `${dayjs(period.from).format("DD MMM YYYY")} – ${dayjs(period.to).format("DD MMM YYYY")}`;
};

const buildExportFileName = (propertyName, period) => {
  const safe = (value) =>
    String(value || "")
      .trim()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "");
  const parts = ["Pending-Collection-Sheet"];
  if (safe(propertyName)) parts.push(safe(propertyName));
  if (period?.from && period?.to) {
    parts.push(
      `${dayjs(period.from).format("YYYY-MM-DD")}_to_${dayjs(period.to).format("YYYY-MM-DD")}`,
    );
  }
  return `${parts.join("_")}.pdf`;
};

// ---- from ConsolidatedReportPage.jsx ----
const statusText = {
  Pending: "#B91C1C",
  "Partially Paid": "#B45309",
  Paid: "#15803D",
  Vacant: "#1D4ED8",
};

const CONTENT_WIDTH = PDF_LAYOUT.pageWidth - PDF_LAYOUT.paddingX * 2;
const FONT_SIZE = 10;

const buildFiltersSummary = (filters = {}) => {
  const parts = [];
  if (filters.statuses?.length) parts.push(`Status: ${filters.statuses.join(", ")}`);
  if (filters.overdueOnly) parts.push("Overdue only");
  if (filters.floors?.length) parts.push(`Floors: ${filters.floors.join(", ")}`);
  if (filters.search?.trim()) parts.push(`Tenant: ${filters.search.trim()}`);
  return parts.length > 0 ? parts.join(" · ") : "None";
};

const justify = { left: "flex-start", center: "center", right: "flex-end" };

// Text wrapper that compensates for html2canvas' text offset (see
// PDF_TEXT_SHIFT). Every piece of text on the page goes through it.
function PdfText({ size, children, style }) {
  return (
    <span style={{ position: "relative", top: -PDF_TEXT_SHIFT(size), ...style }}>
      {children}
    </span>
  );
}

PdfText.propTypes = {
  size: PropTypes.number.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};

// A fixed-size cell. The line-height equals the row height, so the text is
// centred and the clip box is the whole row. (html2canvas can draw text a few
// pixels off the browser's layout; a tight clip box would cut it.)
const cellStyle = (height, widthPercent, align, extra = {}) => ({
  boxSizing: "border-box",
  flexShrink: 0,
  width: `${widthPercent}%`,
  height,
  lineHeight: `${height}px`,
  padding: "0 8px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textAlign: align,
  ...extra,
});

const cellWidthPx = (column) => (column.widthPercent / 100) * CONTENT_WIDTH;

// One A4 landscape page of the Pending Collection Sheet. Heights come from
// PDF_LAYOUT so the pagination in consolidatedExportLayout.js matches.
const ConsolidatedReportPage = forwardRef(function ConsolidatedReportPage(
  { page, columns, meta, showPropertyAndPeriod },
  ref,
) {
  const layout = PDF_LAYOUT;
  const periodLabel = formatPeriodLabel(meta.period);
  const scopeLabel = meta.includeAllTenants
    ? "All tenants and empty beds"
    : "Pending tenants only";
  const filtersText = truncateText(buildFiltersSummary(meta.filters), 420, 10);

  const firstTotalIndex = columns.findIndex((column) => column.isTotal);
  const leadingColumns =
    firstTotalIndex === -1 ? columns : columns.slice(0, firstTotalIndex);
  const trailingColumns =
    firstTotalIndex === -1 ? [] : columns.slice(firstTotalIndex);
  const leadingWidth = leadingColumns.reduce(
    (sum, column) => sum + column.widthPercent,
    0,
  );

  // Cells are sized to the row's content box (row height minus its borders),
  // so the text is centred exactly.
  const renderTotalsRow = (item, height, borderTop, borderBottom, styles) => {
    const cellHeight = height - borderTop - borderBottom;
    return (
    <div
      key={`${item.type}-${item.label}`}
      data-pdf-item={item.type}
      style={{
        display: "flex",
        height,
        boxSizing: "border-box",
        ...styles,
      }}
    >
      <div style={cellStyle(cellHeight, leadingWidth, "left")}>
        <PdfText size={styles.fontSize}>{item.label}</PdfText>
      </div>
      {trailingColumns.map((column) => (
        <div
          key={column.key}
          style={cellStyle(
            cellHeight,
            column.widthPercent,
            column.align === "center" ? "center" : "right",
          )}
        >
          <PdfText size={styles.fontSize}>
            {column.isTotal ? formatExportTotal(column.key, item.totals) : ""}
          </PdfText>
        </div>
      ))}
    </div>
    );
  };

  const renderCell = (column, item, cellHeight) => {
    const { row } = item;
    const isIdentity = ["floor", "room", "bed", "tenant"].includes(column.key);
    let text = formatExportCell(column, row);
    if (column.key === "floor" && !item.showFloor) text = "";
    if (column.key === "tenant") {
      text = truncateText(text, cellWidthPx(column), FONT_SIZE);
    }
    return (
      <div
        key={column.key}
        style={cellStyle(cellHeight, column.widthPercent, column.align, {
          fontWeight: isIdentity || column.key === "totalPending" ? 600 : 400,
          color: column.key === "status" ? statusText[row.status] || "#111928" : undefined,
        })}
      >
        <PdfText size={FONT_SIZE}>{text}</PdfText>
      </div>
    );
  };

  const renderItem = (item) => {
    if (item.type === "subtotal") {
      return renderTotalsRow(item, layout.subtotalHeight, 0, 1, {
        background: "#F8FAFC",
        borderBottom: "1px solid #CAD5E2",
        fontWeight: 600,
        fontSize: FONT_SIZE,
        color: "#1D293D",
      });
    }
    if (item.type === "grand") {
      return renderTotalsRow(item, layout.grandTotalHeight, 2, 0, {
        background: "#EEF2FF",
        borderTop: "2px solid #1E45E1",
        fontWeight: 700,
        fontSize: 11,
        color: "#020618",
      });
    }
    const borderTop = item.separatorAbove ? 2 : 0;
    const cellHeight = layout.rowHeight - borderTop - 1;
    return (
      <div
        key={item.row.bedId}
        data-pdf-item="row"
        style={{
          display: "flex",
          height: layout.rowHeight,
          boxSizing: "border-box",
          borderBottom: "1px solid #E5E7EB",
          borderTop: borderTop ? "2px solid #CAD5E2" : undefined,
          fontSize: FONT_SIZE,
          color: "#111928",
        }}
      >
        {columns.map((column) => renderCell(column, item, cellHeight))}
      </div>
    );
  };

  const renderFirstHeader = () =>
    showPropertyAndPeriod ? (
      <div style={{ height: layout.firstHeaderHeight, boxSizing: "border-box" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#020618", lineHeight: "26px" }}>
          <PdfText size={20}>Pending Collection Sheet</PdfText>
        </div>
        <div style={{ fontSize: 12, color: "#62748E", lineHeight: "18px" }}>
          <PdfText size={12}>
            Invoice Register{meta.propertyName ? ` · ${meta.propertyName}` : ""}
          </PdfText>
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 10,
            fontSize: 10,
            lineHeight: "18px",
            color: "#314158",
          }}
        >
          <PdfText size={10}>
            <b>Report period:</b> {periodLabel}
          </PdfText>
          <PdfText size={10}>
            <b>Scope:</b> {scopeLabel}
          </PdfText>
          <PdfText size={10}>
            <b>Filters:</b> {filtersText}
          </PdfText>
          <PdfText size={10} style={{ marginLeft: "auto" }}>
            <b>Generated:</b> {dayjs(meta.generatedAt).format("DD MMM YYYY, HH:mm")}
          </PdfText>
        </div>
      </div>
    ) : (
      <div
        style={{
          height: layout.firstHeaderCompactHeight,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: "#020618", lineHeight: "26px" }}>
          <PdfText size={20}>Pending Collection Sheet</PdfText>
        </div>
        <div style={{ fontSize: 10, lineHeight: "18px", color: "#62748E" }}>
          <PdfText size={10}>
            Generated {dayjs(meta.generatedAt).format("DD MMM YYYY, HH:mm")}
          </PdfText>
        </div>
      </div>
    );

  const renderRunningHeader = () => (
    <div
      style={{
        height: layout.runningHeaderHeight,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        fontSize: 11,
        lineHeight: "18px",
        color: "#314158",
      }}
    >
      <PdfText size={11} style={{ fontWeight: 700, color: "#020618" }}>
        Pending Collection Sheet
        {showPropertyAndPeriod && meta.propertyName ? ` · ${meta.propertyName}` : ""}
      </PdfText>
      {showPropertyAndPeriod && <PdfText size={11}>{periodLabel}</PdfText>}
    </div>
  );

  return (
    <div
      ref={ref}
      data-pdf-page={page.pageNumber}
      style={{
        width: layout.pageWidth,
        height: layout.pageHeight,
        padding: `${layout.paddingY}px ${layout.paddingX}px`,
        boxSizing: "border-box",
        background: "#FFFFFF",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Gilroy, 'DM Sans', Arial, sans-serif",
      }}
    >
      {page.isFirst ? renderFirstHeader() : renderRunningHeader()}

      <div
        data-pdf-item="table-header"
        style={{
          display: "flex",
          alignItems: "stretch",
          height: layout.tableHeaderHeight,
          boxSizing: "border-box",
          background: "#F8F9FF",
          borderTop: "1px solid #E5E7EB",
          borderBottom: "1px solid #E5E7EB",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          color: "#6B7280",
        }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            style={{
              boxSizing: "border-box",
              flexShrink: 0,
              width: `${column.widthPercent}%`,
              padding: "0 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: justify[column.align],
            }}
          >
            <PdfText size={9} style={{ lineHeight: "12px", textAlign: column.align }}>
              {column.label}
            </PdfText>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>{page.items.map(renderItem)}</div>

      <div
        style={{
          height: layout.footerHeight,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderTop: "1px solid #E2E8F0",
          fontSize: 9,
          lineHeight: "14px",
          color: "#62748E",
        }}
      >
        <PdfText size={9}>
          Actual Rent is shown for reference and is not added to Total Pending.
        </PdfText>
        <PdfText size={9}>
          Page {page.pageNumber} of {page.totalPages}
        </PdfText>
      </div>
    </div>
  );
});

ConsolidatedReportPage.propTypes = {
  page: PropTypes.shape({
    pageNumber: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    isFirst: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  meta: PropTypes.shape({
    propertyName: PropTypes.string,
    period: PropTypes.object,
    includeAllTenants: PropTypes.bool,
    filters: PropTypes.object,
    generatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.object]),
  }).isRequired,
  showPropertyAndPeriod: PropTypes.bool,
};

// ---- from ConsolidatedExportPreview.jsx ----
const STATUS = {
  PREPARING: "preparing",
  READY: "ready",
  EMPTY: "empty",
  ERROR: "error",
};

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;
const FIT_PADDING = 48;

const iconButton =
  "inline-flex items-center justify-center w-[36px] h-[36px] rounded-[10px] border-[1px] border-[#E2E8F0] bg-white disabled:opacity-40 disabled:cursor-not-allowed";

// Full-screen PDF preview for the Pending Collection Sheet.
// Pages are paginated, rendered off-screen, captured to images and assembled
// into a PDF; the same images are shown here, so preview = download.
function ConsolidatedExportPreview({ show, exportData, onBack, onClose }) {
  const [status, setStatus] = useState(STATUS.PREPARING);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(null); // null = fit to view
  const [fitScale, setFitScale] = useState(1);
  const [attempt, setAttempt] = useState(0);

  const pageRefs = useRef([]);
  const viewerRef = useRef(null);

  const meta = exportData?.meta || {};
  const showPropertyAndPeriod = Boolean(
    exportData?.settings?.includePropertyAndPeriod,
  );

  const columns = useMemo(
    () => getExportColumns(exportData?.columns || []),
    [exportData],
  );

  const pages = useMemo(
    () =>
      exportData && exportData.rowCount > 0
        ? paginateExportData(exportData, { showPropertyAndPeriod })
        : [],
    [exportData, showPropertyAndPeriod],
  );

  const fileName = buildExportFileName(meta.propertyName, meta.period);

  // Start (or restart) generation whenever new export data arrives.
  // When hidden, clear the previous result so a stale preview never flashes.
  useEffect(() => {
    setImages([]);
    setPdf(null);
    setPageIndex(0);
    setZoom(null);
    if (!show || !exportData) {
      setStatus(STATUS.PREPARING);
      return;
    }
    if (exportData.rowCount === 0) {
      setStatus(STATUS.EMPTY);
      return;
    }
    setProgress({ done: 0, total: pages.length });
    setStatus(STATUS.PREPARING);
  }, [show, exportData, pages.length, attempt]);

  // Once the off-screen pages are mounted, capture them into a PDF.
  useEffect(() => {
    if (!show || status !== STATUS.PREPARING || pages.length === 0) return undefined;
    let cancelled = false;

    const generate = async () => {
      try {
        if (document.fonts?.ready) await document.fonts.ready;
        await new Promise((resolve) => requestAnimationFrame(() => resolve()));
        const elements = pageRefs.current.slice(0, pages.length).filter(Boolean);
        if (elements.length !== pages.length) {
          throw new Error("Report pages were not rendered");
        }
        const result = await createPdfFromPages(elements, {
          orientation: "landscape",
          format: "a4",
          onProgress: (done, total) => {
            if (!cancelled) setProgress({ done, total });
          },
        });
        if (cancelled) return;
        setImages(result.images);
        setPdf(result.pdf);
        setStatus(STATUS.READY);
      } catch {
        if (!cancelled) setStatus(STATUS.ERROR);
      }
    };

    generate();
    return () => {
      cancelled = true;
    };
  }, [show, status, pages]);

  // Fit-to-view scale follows the viewer size.
  const updateFitScale = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const scale = Math.min(
      (viewer.clientWidth - FIT_PADDING) / PDF_LAYOUT.pageWidth,
      (viewer.clientHeight - FIT_PADDING) / PDF_LAYOUT.pageHeight,
    );
    setFitScale(scale > 0 ? Math.min(scale, MAX_ZOOM) : 1);
  }, []);

  useEffect(() => {
    if (status !== STATUS.READY) return undefined;
    updateFitScale();
    window.addEventListener("resize", updateFitScale);
    return () => window.removeEventListener("resize", updateFitScale);
  }, [status, updateFitScale]);

  const scale = zoom ?? fitScale;
  const totalPages = images.length;

  const goTo = useCallback(
    (index) => setPageIndex(Math.max(0, Math.min(index, totalPages - 1))),
    [totalPages],
  );

  const changeZoom = (delta) => {
    const next = Math.round((scale + delta) / ZOOM_STEP) * ZOOM_STEP;
    setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next)));
  };

  // Arrow keys move between pages.
  useEffect(() => {
    if (!show || status !== STATUS.READY) return undefined;
    const handleKey = (event) => {
      if (event.key === "ArrowRight") goTo(pageIndex + 1);
      if (event.key === "ArrowLeft") goTo(pageIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [show, status, pageIndex, goTo]);

  const handleDownload = () => {
    if (pdf) downloadPdf(pdf, fileName);
  };

  const isReady = status === STATUS.READY;

  return (
    <Modal
      show={show}
      onHide={onClose}
      fullscreen
      animation={false}
      backdrop="static"
      aria-labelledby="export-preview-title"
      style={{ zIndex: 1060 }}
    >
      <div className="flex flex-col h-full bg-[#F1F5F9] font-gilroy">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-[12px] px-6 py-[12px] bg-white border-b border-[#E2E8F0]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 h-[36px] px-[12px] rounded-[10px] border-[1px] border-[#E2E8F0] bg-white text-[14px] font-semibold text-[#314158]"
          >
            <ArrowLeft size="16" color="#314158" />
            Back to settings
          </button>

          <div className="flex-1 min-w-[200px]">
            <h2
              id="export-preview-title"
              className="m-0 font-semibold text-[16px] leading-[22px] text-[#020618]"
            >
              Preview · Pending Collection Sheet
            </h2>
            <p className="mb-0 text-[12px] text-[#62748E] truncate">{fileName}</p>
          </div>

          {isReady && (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => goTo(pageIndex - 1)}
                  disabled={pageIndex === 0}
                  aria-label="Previous page"
                >
                  <ArrowLeft2 size="16" color="#314158" />
                </button>
                <span
                  className="min-w-[96px] text-center text-[14px] font-medium text-[#1D293D]"
                  aria-live="polite"
                >
                  Page {pageIndex + 1} of {totalPages}
                </span>
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => goTo(pageIndex + 1)}
                  disabled={pageIndex >= totalPages - 1}
                  aria-label="Next page"
                >
                  <ArrowRight2 size="16" color="#314158" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => changeZoom(-ZOOM_STEP)}
                  disabled={scale <= MIN_ZOOM}
                  aria-label="Zoom out"
                >
                  <SearchZoomOut size="16" color="#314158" />
                </button>
                <span
                  className="min-w-[48px] text-center text-[14px] font-medium text-[#1D293D]"
                  data-testid="preview-zoom"
                >
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => changeZoom(ZOOM_STEP)}
                  disabled={scale >= MAX_ZOOM}
                  aria-label="Zoom in"
                >
                  <SearchZoomIn size="16" color="#314158" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(null)}
                  aria-pressed={zoom === null}
                  className={`flex items-center gap-1 h-[36px] px-[12px] rounded-[10px] border-[1px] text-[14px] font-medium ${
                    zoom === null
                      ? "border-[#1E45E1] bg-[#EFF6FF] text-[#1E45E1]"
                      : "border-[#E2E8F0] bg-white text-[#314158]"
                  }`}
                >
                  <Maximize4 size="14" color={zoom === null ? "#1E45E1" : "#314158"} />
                  Fit
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={handleDownload}
            disabled={!isReady}
            className="flex items-center gap-2 h-[36px] px-[16px] rounded-[10px] bg-[#1E45E1] text-white text-[14px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <DocumentDownload size="16" color="#FFFFFF" />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="bg-transparent border-0 p-1"
          >
            <IoCloseOutline size={22} color="#62748E" />
          </button>
        </div>

        {/* Viewer */}
        <div
          ref={viewerRef}
          className="flex-1 overflow-auto show-scrolls"
          data-testid="preview-viewer"
        >
          {status === STATUS.PREPARING && (
            <div
              className="h-full flex flex-col items-center justify-center gap-[12px]"
              role="status"
              aria-live="polite"
            >
              <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin" />
              <p className="mb-0 font-semibold text-[14px] text-[#1D293D]">
                Generating PDF preview…
              </p>
              {progress.total > 0 && (
                <p className="mb-0 text-[12px] text-[#62748E]">
                  Page {progress.done} of {progress.total}
                </p>
              )}
            </div>
          )}

          {status === STATUS.EMPTY && (
            <div className="p-6">
              <NoDataMessage label="Pending Collections" isSearching={false} />
            </div>
          )}

          {status === STATUS.ERROR && (
            <div
              className="h-full flex flex-col items-center justify-center gap-[12px] text-center"
              role="alert"
            >
              <Warning2 size="32" color="#C10007" />
              <p className="mb-0 font-semibold text-[14px] text-[#1D293D]">
                We couldn&apos;t generate the PDF preview.
              </p>
              <p className="mb-0 text-[12px] text-[#62748E]">
                Try again, or go back and reduce the columns or rows.
              </p>
              <button
                type="button"
                onClick={() => setAttempt((prev) => prev + 1)}
                className="px-[16px] py-2 rounded-[12px] bg-[#1E45E1] text-white text-[14px] font-semibold"
              >
                Try again
              </button>
            </div>
          )}

          {isReady && images[pageIndex] && (
            <div className="min-h-full w-max min-w-full flex items-start justify-center p-6">
              <img
                src={images[pageIndex]}
                alt={`Pending Collection Sheet page ${pageIndex + 1} of ${totalPages}`}
                style={{
                  width: PDF_LAYOUT.pageWidth * scale,
                  height: PDF_LAYOUT.pageHeight * scale,
                  maxWidth: "none",
                }}
                className="bg-white shadow-[0px_4px_16px_rgba(15,23,42,0.12)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Pages used only for PDF capture. They sit at the top-left, behind the
          full-screen preview (z-index -1), because html2canvas can produce
          blank captures for elements placed far off-screen. */}
      {status === STATUS.PREPARING && pages.length > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          {pages.map((page, index) => (
            <ConsolidatedReportPage
              key={page.pageNumber}
              ref={(element) => {
                pageRefs.current[index] = element;
              }}
              page={page}
              columns={columns}
              meta={meta}
              showPropertyAndPeriod={showPropertyAndPeriod}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}

ConsolidatedExportPreview.propTypes = {
  show: PropTypes.bool.isRequired,
  exportData: PropTypes.shape({
    rowCount: PropTypes.number,
    columnKeys: PropTypes.arrayOf(PropTypes.string),
    columns: PropTypes.arrayOf(PropTypes.object),
    groups: PropTypes.array,
    grandTotal: PropTypes.object,
    settings: PropTypes.object,
    meta: PropTypes.object,
  }),
  onBack: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

// ---- from ConsolidatedExportSettings.jsx ----
const { RangePicker } = DatePicker;

const OVERDUE_OPTION = "Overdue";

const STEP = {
  CONFIGURE: "configure",
  PREPARING: "preparing",
  ERROR: "error",
};

const fieldLabel =
  "block mb-[6px] font-semibold text-[11px] leading-[16.5px] tracking-[0.88px] uppercase text-[#62748E]";

const fieldBox =
  "w-full h-[40px] flex items-center justify-between gap-2 px-[12px] bg-white border-[1px] border-[#E2E8F0] rounded-[12px] font-medium text-[14px] text-[#1D293D]";

const sectionCard =
  "bg-white border-[1px] border-[#E2E8F0] rounded-[16px] p-[14px] sm:p-[20px]";

function SectionTitle({ number, title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-[12px]">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-[24px] h-[24px] rounded-[10px] bg-[#0F172B] text-white text-[12px] font-semibold flex items-center justify-center">
            {number}
          </span>
          <h3 className="m-0 font-semibold text-[16px] leading-[24px] text-[#020618]">
            {title}
          </h3>
        </div>
        <p className="mb-0 pl-8 pt-1 text-[12px] leading-[16px] text-[#62748E]">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

SectionTitle.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
};

function SettingToggle({ id, checked, onChange, disabled = false, label }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[24px] w-[44px] flex-shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-[#1E45E1]" : "bg-[#CAD5E2]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-[16px] w-[16px] rounded-full bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] transition-transform ${
          checked ? "translate-x-[24px]" : "translate-x-[4px]"
        }`}
      />
    </button>
  );
}

SettingToggle.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

// Small multi-select with checkboxes for the Report Scope fields.
function ScopeMultiSelect({ id, options, selected, onChange, emptyLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleOption = (value) => {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  const summary = selected.length > 0 ? selected.join(", ") : emptyLabel;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={fieldBox}
      >
        <span className="truncate">{summary}</span>
        <ArrowDown2 size="14" color="#1D293D" />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 right-0 z-50 mt-1 bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-lg py-2"
        >
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-[12px] py-1.5 mb-0 cursor-pointer text-[14px] text-[#314158] hover:bg-[#F1F5FF]"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="w-4 h-4 accent-[#1E45E1]"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

ScopeMultiSelect.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  emptyLabel: PropTypes.string.isRequired,
};

// Export Pending Collection Sheet – settings panel (Figma node 7072-173297).
// Scope (filters, period, All Tenants) is copied from the current view each
// time the panel opens. Columns and PDF settings start from the visible table
// columns, are then independent, and are remembered after a successful export.
function ExportSettingsPanel({
  show,
  onClose,
  beds,
  scope,
  columns,
  savedPrefs,
  onSavePrefs,
  floorOptions,
  propertyName,
  onPrepared,
  isBehindPreview = false,
}) {
  const [range, setRange] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [floors, setFloors] = useState([]);
  const [search, setSearch] = useState("");
  const [includeAllTenants, setIncludeAllTenants] = useState(false);
  const [columnKeys, setColumnKeys] = useState([]);
  const [pdfSettings, setPdfSettings] = useState(DEFAULT_EXPORT_PDF_SETTINGS);
  const [step, setStep] = useState(STEP.CONFIGURE);
  const [errors, setErrors] = useState([]);
  const exportableColumns = useMemo(
    () => getExportableColumns(columns),
    [columns],
  );

  useEffect(() => {
    if (!show) return;
    const filters = { ...DEFAULT_CONSOLIDATED_FILTERS, ...scope.filters };
    setRange(periodToRange(scope.period));
    setStatuses(
      filters.overdueOnly
        ? [...filters.statuses, OVERDUE_OPTION]
        : [...filters.statuses],
    );
    setFloors([...filters.floors]);
    setSearch(filters.search || "");
    setIncludeAllTenants(Boolean(scope.includeAllTenants));
    setColumnKeys(
      savedPrefs?.columnKeys
        ? normaliseExportColumnKeys(columns, savedPrefs.columnKeys)
        : getDefaultExportColumnKeys(columns),
    );
    setPdfSettings(savedPrefs?.pdfSettings || DEFAULT_EXPORT_PDF_SETTINGS);
    setStep(STEP.CONFIGURE);
    setErrors([]);
    // Seed only when the panel opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const exportFilters = useMemo(
    () => ({
      search,
      statuses: statuses.filter((status) => status !== OVERDUE_OPTION),
      overdueOnly: statuses.includes(OVERDUE_OPTION),
      floors,
    }),
    [search, statuses, floors],
  );

  const exportPeriod = useMemo(
    () =>
      range?.[0] && range?.[1]
        ? { from: range[0].toDate(), to: range[1].toDate() }
        : null,
    [range],
  );

  const exportScope = useMemo(
    () => ({ filters: exportFilters, period: exportPeriod, includeAllTenants }),
    [exportFilters, exportPeriod, includeAllTenants],
  );

  const exportSettings = useMemo(
    () => ({
      ...pdfSettings,
      columns: exportableColumns,
      columnKeys: normaliseExportColumnKeys(columns, columnKeys),
    }),
    [pdfSettings, columns, exportableColumns, columnKeys],
  );

  // Live count so the user sees what will be exported before preparing.
  const liveData = useMemo(
    () => (show ? buildExportData(beds, exportScope, exportSettings) : null),
    [show, beds, exportScope, exportSettings],
  );

  const hasFilters = countActiveFilters(exportFilters) > 0;
  const groupsByFloor = pdfSettings.groupBy !== EXPORT_GROUP_BY.ROOM_BED;

  const toggleColumn = (key) => {
    if (exportableColumns.some((column) => column.key === key && column.locked)) {
      return;
    }
    setColumnKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const updatePdf = (field, value) =>
    setPdfSettings((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const messages = [];
    if (!exportPeriod) {
      messages.push("Select a date range for the export.");
    }
    if (exportPeriod && liveData?.rowCount === 0) {
      messages.push(
        "No tenant stays match this scope. Change the filters or include fully paid tenants and empty beds.",
      );
    }
    return messages;
  };

  const handlePrepare = () => {
    const messages = validate();
    setErrors(messages);
    if (messages.length > 0) return;

    setStep(STEP.PREPARING);
    // Let the Preparing state render before building the export data.
    setTimeout(() => {
      try {
        const data = buildExportData(beds, exportScope, exportSettings);
        onSavePrefs({
          columnKeys: exportSettings.columnKeys,
          pdfSettings,
        });
        setStep(STEP.CONFIGURE);
        // Hand over to the PDF preview, with the report details it prints.
        onPrepared({
          ...data,
          meta: {
            propertyName,
            period: exportPeriod,
            includeAllTenants,
            filters: exportFilters,
            generatedAt: new Date(),
          },
        });
      } catch {
        setStep(STEP.ERROR);
      }
    }, 0);
  };

  const footerSummary = [
    `${liveData?.occupiedCount ?? 0} tenant stays`,
    liveData?.vacantCount > 0 ? `${liveData.vacantCount} empty beds` : null,
    `${exportSettings.columnKeys.length} columns`,
    "A4 landscape",
  ]
    .filter(Boolean)
    .join(" · ");

  const scopeSummary = includeAllTenants
    ? `${liveData?.occupiedCount ?? 0} tenant stays and ${liveData?.vacantCount ?? 0} empty beds will be exported.`
    : `${liveData?.occupiedCount ?? 0} tenant stays with pending balances will be exported.`;

  const renderConfigure = () => (
    <div className="flex flex-col gap-[12px] sm:gap-[16px]">
      {/* 1. Report Scope */}
      <section className={sectionCard} aria-label="Report Scope">
        <SectionTitle
          number={1}
          title="Report Scope"
          description="Your current Invoice Register filters are carried into this export."
        >
          {hasFilters && (
            <span className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-full bg-[#EFF6FF] text-[12px] font-semibold text-[#1E45E1] whitespace-nowrap">
              <TickCircle size="14" color="#1E45E1" />
              Filters applied
            </span>
          )}
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[16px] pt-[12px]">
          <div>
            <span className={fieldLabel}>Date Range · Invoice Date</span>
            <RangePicker
              allowClear={false}
              format="MMM DD, YYYY"
              value={range}
              onChange={(dates) => setRange(dates)}
              disabledDate={(current) => current && current > dayjs().endOf("day")}
              style={{
                width: "100%",
                height: 40,
                borderRadius: 12,
                borderColor: "#E2E8F0",
                fontFamily: "Gilroy",
              }}
            />
          </div>
          <div>
            <label htmlFor="export-status" className={fieldLabel}>
              Collection Status
            </label>
            <ScopeMultiSelect
              id="export-status"
              options={[...COLLECTION_STATUS_OPTIONS, OVERDUE_OPTION]}
              selected={statuses}
              onChange={setStatuses}
              emptyLabel="All statuses"
            />
          </div>
          <div>
            <label htmlFor="export-floor" className={fieldLabel}>
              Floor
            </label>
            <ScopeMultiSelect
              id="export-floor"
              options={floorOptions}
              selected={floors}
              onChange={setFloors}
              emptyLabel="All Floors"
            />
          </div>
          {search && (
            <div>
              <span className={fieldLabel}>Tenant Search</span>
              <div className={`${fieldBox} bg-[#F8FAFC]`}>
                <span className="truncate">{search}</span>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Remove tenant search from export"
                  className="bg-transparent border-0 p-0"
                >
                  <IoCloseOutline size={16} color="#62748E" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-[12px] flex gap-2 px-[12px] py-[10px] rounded-[12px] border-[1px] border-[#DBEAFE] bg-[rgba(239,246,255,0.6)]">
          <InfoCircle size="16" color="#1E45E1" className="mt-[2px] flex-shrink-0" />
          <div>
            <p className="mb-0 font-semibold text-[14px] leading-[20px] text-[#1D293D]">
              {includeAllTenants
                ? "All tenants and empty beds"
                : "Pending tenants only"}
            </p>
            <p className="mb-0 pt-[2px] text-[12px] leading-[20px] text-[#62748E]">
              {includeAllTenants
                ? `Fully paid tenants and empty beds for ${propertyName || "this property"} are included with ₹0 outstanding. Empty beds are not counted in totals.`
                : `This sheet includes unpaid, partially paid and overdue balances for ${propertyName || "this property"}. Fully paid tenants are not included.`}
            </p>
            <p
              className="mb-0 pt-1 text-[12px] leading-[16px] font-semibold text-[#1D293D]"
              data-testid="export-scope-count"
            >
              {scopeSummary}
            </p>
          </div>
        </div>

        <div className="mt-[12px] flex items-center justify-between gap-[12px] min-h-[56px] px-[12px] py-[10px] bg-white border-[1px] border-[#E2E8F0] rounded-[12px]">
          <div>
            <label
              htmlFor="export-include-all"
              className="block mb-0 font-semibold text-[14px] leading-[20px] text-[#1D293D] cursor-pointer"
            >
              Include Fully Paid Tenants &amp; Empty beds
            </label>
            <p className="mb-0 pt-[2px] text-[12px] leading-[16px] text-[#62748E]">
              Add matching tenant stays with no outstanding balance.
            </p>
          </div>
          <SettingToggle
            id="export-include-all"
            label="Include Fully Paid Tenants & Empty beds"
            checked={includeAllTenants}
            onChange={setIncludeAllTenants}
          />
        </div>
      </section>

      {/* 2. Choose What to Include */}
      <section className={sectionCard} aria-label="Choose What to Include">
        <SectionTitle
          number={2}
          title="Choose What to Include"
          description="Select the details you want to show in your collection sheet."
        >
          <div className="flex items-center gap-[12px] whitespace-nowrap">
            <button
              type="button"
              onClick={() =>
                setColumnKeys(exportableColumns.map((column) => column.key))
              }
              className="bg-transparent border-0 p-0 text-[12px] font-semibold text-[#1E45E1]"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={() =>
                setColumnKeys(getDefaultExportColumnKeys(columns))
              }
              className="flex items-center gap-1 bg-transparent border-0 p-0 text-[12px] font-semibold text-[#62748E]"
            >
              <Refresh2 size="12" color="#62748E" />
              Reset to Default
            </button>
          </div>
        </SectionTitle>

        <div className="grid grid-cols-2 gap-2 pt-[12px]">
          {exportableColumns.map((column) => {
            const locked = column.locked;
            const checked = locked || columnKeys.includes(column.key);
            return (
              <label
                key={column.key}
                className={`flex items-center justify-between min-h-[36px] px-[12px] py-[6px] mb-0 rounded-[10px] border-[1px] border-[#DBEAFE] bg-[rgba(239,246,255,0.6)] ${
                  locked ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span className="flex items-center gap-[10px]">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={locked}
                    onChange={() => toggleColumn(column.key)}
                    className="w-4 h-4 accent-[#1E45E1]"
                  />
                  <span className="font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#314158]">
                    {column.label}
                  </span>
                </span>
                {locked && (
                  <span title="Always included" className="inline-flex">
                    <Lock1 size="14" color="#90A1B9" aria-hidden="true" />
                  </span>
                )}
              </label>
            );
          })}
        </div>
        <p className="sm:hidden mb-0 pt-[10px] text-[11px] leading-[16px] text-[#62748E]">
          Actual Rent is shown as reference and is not added to Total Pending.
        </p>
      </section>

      {/* 3. PDF Settings */}
      <section className={sectionCard} aria-label="PDF Settings">
        <SectionTitle
          number={3}
          title="PDF Settings"
          description="Choose how the collection sheet is grouped and totalled."
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-[16px] pt-[12px]">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[16px]">
              <div>
                <label htmlFor="export-group-by" className={fieldLabel}>
                  Group By
                </label>
                <select
                  id="export-group-by"
                  value={pdfSettings.groupBy}
                  onChange={(e) => updatePdf("groupBy", e.target.value)}
                  className={`${fieldBox} cursor-pointer`}
                >
                  {EXPORT_GROUP_BY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mb-0 pt-[6px] text-[11px] leading-[16px] text-[#62748E]">
                  The PDF automatically follows this order, so a separate Sort By
                  setting is not needed.
                </p>
              </div>
              <div>
                <span className={fieldLabel}>Page Orientation</span>
                <div className={`${fieldBox} bg-[#F8FAFC] font-semibold`}>
                  Landscape
                  <span className="px-2 py-[2px] rounded-[4px] bg-[#E2E8F0] text-[10px] font-semibold tracking-[0.25px] uppercase text-[#45556C]">
                    Fixed
                  </span>
                </div>
                <p className="mb-0 pt-[6px] text-[11px] leading-[16px] text-[#62748E]">
                  Fixed to A4 landscape so financial columns remain readable when
                  printed.
                </p>
              </div>
            </div>

            <div className="pt-[12px] flex flex-col gap-[10px]">
              {[
                {
                  field: "includeFloorSubtotals",
                  label: "Include Floor-wise Subtotals",
                  disabled: !groupsByFloor,
                },
                { field: "includeGrandTotal", label: "Include Grand Total" },
                {
                  field: "includePropertyAndPeriod",
                  label: "Include Property Name and Report Period",
                },
              ].map((item) => (
                <div
                  key={item.field}
                  className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]"
                >
                  <span className="font-medium text-[14px] leading-[20px] text-[#314158]">
                    {item.label}
                    {item.disabled && (
                      <span className="block text-[11px] text-[#62748E]">
                        Available when grouped by floor.
                      </span>
                    )}
                  </span>
                  <SettingToggle
                    label={item.label}
                    checked={Boolean(pdfSettings[item.field]) && !item.disabled}
                    disabled={item.disabled}
                    onChange={(value) => updatePdf(item.field, value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block p-[12px] rounded-[12px] border-[1px] border-[#E2E8F0] bg-[#F1F5F9]">
            <p className="mb-2 font-semibold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#62748E]">
              Layout preview
            </p>
            <div
              className="bg-white rounded-[8px] p-[12px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]"
              aria-hidden="true"
            >
              {pdfSettings.includePropertyAndPeriod && (
                <>
                  <div className="h-[6px] w-[64px] rounded bg-[#1D293D]" />
                  <div className="mt-2 h-[4px] w-[96px] rounded bg-[#CAD5E2]" />
                </>
              )}
              <div className="mt-[12px] h-[10px] w-full rounded-[8px] bg-[#DBEAFE]" />
              {[0, 1, 2].map((line) => (
                <div
                  key={line}
                  className="flex items-center gap-2 py-[6px] border-b border-[#F1F5F9]"
                >
                  <div className="h-[4px] flex-1 rounded bg-[#CAD5E2]" />
                  <div className="h-[4px] w-[20px] rounded bg-[#90A1B9]" />
                </div>
              ))}
              {pdfSettings.includeFloorSubtotals && groupsByFloor && (
                <div className="flex justify-end py-[6px]">
                  <div className="h-[4px] w-[48px] rounded bg-[#90A1B9]" />
                </div>
              )}
              {pdfSettings.includeGrandTotal && (
                <div className="flex justify-end pt-2">
                  <div className="h-[6px] w-[64px] rounded bg-[#314158]" />
                </div>
              )}
            </div>
            <p className="mb-0 pt-2 text-[10px] leading-[16px] text-[#62748E]">
              A4 landscape · headings repeat on each page
            </p>
          </div>
        </div>
      </section>

      {errors.length > 0 && (
        <div role="alert">
          <ErrorMessage message={errors} type="error" />
        </div>
      )}
    </div>
  );

  const renderPreparing = () => (
    <div
      className="flex flex-col items-center justify-center gap-[12px] py-16"
      role="status"
      aria-live="polite"
    >
      <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin" />
      <p className="mb-0 font-semibold text-[14px] text-[#1D293D]">
        Preparing your collection sheet…
      </p>
    </div>
  );

  const renderError = () => (
    <div
      className={`${sectionCard} flex flex-col items-center gap-[12px] text-center`}
      role="alert"
    >
      <Warning2 size="28" color="#C10007" />
      <p className="mb-0 font-semibold text-[14px] text-[#1D293D]">
        We couldn&apos;t prepare the collection sheet.
      </p>
      <button
        type="button"
        onClick={handlePrepare}
        className="px-[16px] py-2 rounded-[12px] bg-[#1E45E1] text-white text-[14px] font-semibold"
      >
        Try again
      </button>
    </div>
  );

  const isPreparing = step === STEP.PREPARING;

  return (
    <Offcanvas
      show={show}
      onHide={isPreparing || isBehindPreview ? undefined : onClose}
      enforceFocus={!isBehindPreview}
      keyboard={!isBehindPreview}
      placement="end"
      style={{ width: 720, maxWidth: "100vw" }}
      aria-labelledby="export-settings-title"
    >
      <div className="flex flex-col h-full bg-[#F7F8FC] font-gilroy">
        <div className="flex items-start justify-between gap-[12px] px-[16px] sm:px-[28px] py-[14px] sm:py-[18px] bg-white border-b border-[#E2E8F0]">
          <div className="flex items-start gap-[14px]">
            <span className="mt-[2px] w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[14px] sm:rounded-[16px] bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
              <DocumentText size="20" color="#1E45E1" />
            </span>
            <div>
              <h2
                id="export-settings-title"
                className="m-0 font-semibold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[28px] tracking-[-0.4px] text-[#020618]"
              >
                Export Pending Collection Sheet
              </h2>
              <p className="hidden sm:block mb-0 pt-1 text-[14px] leading-[20px] text-[#62748E] max-w-[558px]">
                Get a floor-wise list of tenants with pending payments from the
                Invoice Register. Download and print it to help your staff
                collect payments.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPreparing}
            aria-label="Close export"
            className="p-2 rounded-[12px] bg-transparent border-0"
          >
            <IoCloseOutline size={20} color="#62748E" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[16px] sm:px-[28px] py-[14px] sm:py-[20px] show-scrolls">
          {step === STEP.CONFIGURE && renderConfigure()}
          {isPreparing && renderPreparing()}
          {step === STEP.ERROR && renderError()}
        </div>

        {/* The summary stays visible while scrolling, so the scope and column
            count are never out of sight when pressing Preview. */}
        <div className="flex flex-col gap-[10px] sm:flex-row sm:items-center sm:gap-[16px] px-[16px] sm:px-[28px] py-[12px] bg-white border-t border-[#E2E8F0]">
          <div className="flex-1 min-w-0">
            <p
              className="mb-0 font-semibold text-[13px] leading-[18px] text-[#1D293D]"
              data-testid="export-footer-summary"
            >
              {footerSummary}
            </p>
            <p className="hidden sm:flex mb-0 items-start gap-[6px] text-[11px] leading-[16px] text-[#62748E]">
              <InfoCircle size="14" color="#62748E" className="flex-shrink-0" />
              <span>
                Actual Rent is shown as reference and is not added to Total
                Pending.
              </span>
            </p>
          </div>
          <div className="flex gap-[10px]">
            <button
              type="button"
              onClick={onClose}
              disabled={isPreparing}
              className="h-[44px] px-[20px] rounded-[12px] border-[1px] border-[#CAD5E2] bg-white font-semibold text-[14px] text-[#314158] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePrepare}
              disabled={isPreparing}
              className="h-[44px] flex-1 sm:flex-none sm:w-[240px] flex items-center justify-center gap-2 px-[16px] rounded-[12px] bg-[#1E45E1] font-semibold text-[14px] text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <DocumentDownload size="18" color="#FFFFFF" />
              {isPreparing ? "Preparing…" : "Preview & Export PDF"}
            </button>
          </div>
        </div>
      </div>
    </Offcanvas>
  );
}

ExportSettingsPanel.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  beds: PropTypes.arrayOf(PropTypes.object).isRequired,
  scope: PropTypes.shape({
    filters: PropTypes.object,
    period: PropTypes.object,
    includeAllTenants: PropTypes.bool,
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  savedPrefs: PropTypes.shape({
    columnKeys: PropTypes.arrayOf(PropTypes.string),
    pdfSettings: PropTypes.object,
  }),
  onSavePrefs: PropTypes.func.isRequired,
  floorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  propertyName: PropTypes.string,
  onPrepared: PropTypes.func.isRequired,
  isBehindPreview: PropTypes.bool,
};

// ---- Export Pending Collection Sheet (the only component the page uses) ----
// Settings drawer -> Prepare -> PDF preview (Back returns to the settings).
// Chosen columns and PDF settings are remembered while the page is open.
function ConsolidatedExportSettings({
  show,
  onClose,
  beds,
  scope,
  columns,
  floorOptions,
  propertyName,
}) {
  const [exportPrefs, setExportPrefs] = useState(null);
  const [exportPreviewData, setExportPreviewData] = useState(null);

  return (
    <>
      <ExportSettingsPanel
        show={show}
        onClose={onClose}
        beds={beds}
        scope={scope}
        columns={columns}
        savedPrefs={exportPrefs}
        onSavePrefs={setExportPrefs}
        floorOptions={floorOptions}
        propertyName={propertyName}
        onPrepared={setExportPreviewData}
        isBehindPreview={Boolean(exportPreviewData)}
      />
      <ConsolidatedExportPreview
        show={Boolean(exportPreviewData)}
        exportData={exportPreviewData}
        onBack={() => setExportPreviewData(null)}
        onClose={() => {
          setExportPreviewData(null);
          onClose();
        }}
      />
    </>
  );
}

ConsolidatedExportSettings.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  beds: PropTypes.arrayOf(PropTypes.object).isRequired,
  scope: PropTypes.shape({
    filters: PropTypes.object,
    period: PropTypes.object,
    includeAllTenants: PropTypes.bool,
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  floorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  propertyName: PropTypes.string,
};

export default ConsolidatedExportSettings;
