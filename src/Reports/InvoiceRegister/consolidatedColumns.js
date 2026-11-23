// Column definitions for the Invoice Register Consolidated View table.
// `locked` columns identify the bed/tenant and cannot be hidden in Customize.
// The sticky Details column is not listed here; it is always shown.

export const CONSOLIDATED_COLUMNS = [
  { key: "floor", label: "Floor", align: "left", locked: true },
  { key: "room", label: "Room", align: "left", locked: true },
  { key: "bed", label: "Bed", align: "left", locked: true },
  { key: "tenant", label: "Tenant", align: "left", locked: true },
  { key: "status", label: "Status", align: "left" },
  { key: "contact", label: "Contact Number", align: "left" },
  { key: "actualRent", label: "Actual Rent", align: "right" },
  { key: "pendingRent", label: "Pending Rent", align: "right", chargeKey: "rent" },
  { key: "pendingEb", label: "Pending EB", align: "right", chargeKey: "eb" },
  {
    key: "pendingAdvance",
    label: "Pending Advance",
    align: "right",
    chargeKey: "advance",
  },
  {
    key: "pendingNonRefundable",
    label: "Pending Non-refundable Amount",
    align: "right",
    chargeKey: "nonRefundable",
  },
  { key: "totalPending", label: "Total Pending", align: "right" },
  { key: "pendingInvoiceCount", label: "Pending Invoice Count", align: "center" },
];

export const DEFAULT_VISIBLE_COLUMN_KEYS = CONSOLIDATED_COLUMNS.map(
  (column) => column.key,
);

// Always keeps locked columns, and keeps the original column order.
export const normaliseVisibleColumnKeys = (keys = []) =>
  CONSOLIDATED_COLUMNS.filter(
    (column) => column.locked || keys.includes(column.key),
  ).map((column) => column.key);

// Export (PDF) columns. Uses the same column list as the table, but its own
// locked set from the approved export design: Floor, Room, Bed, Total Pending.
const EXPORT_LOCKED_COLUMN_KEYS = ["floor", "room", "bed", "totalPending"];

export const isExportColumnLocked = (key) =>
  EXPORT_LOCKED_COLUMN_KEYS.includes(key);

export const normaliseExportColumnKeys = (keys = []) =>
  CONSOLIDATED_COLUMNS.filter(
    (column) => isExportColumnLocked(column.key) || keys.includes(column.key),
  ).map((column) => column.key);

// Initial export columns = the columns currently visible in the table.
export const getDefaultExportColumnKeys = (visibleTableKeys = []) =>
  normaliseExportColumnKeys(visibleTableKeys);
