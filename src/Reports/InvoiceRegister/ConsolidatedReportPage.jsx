import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  PDF_LAYOUT,
  PDF_TEXT_SHIFT,
  formatExportCell,
  formatExportTotal,
  formatPeriodLabel,
  truncateText,
} from "./consolidatedExportLayout";

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

export default ConsolidatedReportPage;
