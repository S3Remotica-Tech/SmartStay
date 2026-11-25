// Calculation helpers for the Invoice Register Consolidated View.
// Plain functions with no React, Redux or API dependencies, so the table,
// stat cards and (later) the PDF export all use the same numbers.
import dayjs from "dayjs";

const CHARGE_TYPES = ["rent", "eb", "advance", "nonRefundable"];

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

// Outstanding balance of one charge. Never negative; no proration or estimation.
const getChargePending = (charge) => {
  if (!charge) return 0;
  return Math.max(toNumber(charge.amount) - toNumber(charge.paid), 0);
};

// Per-charge pending amounts and totals for one invoice.
const getInvoiceSummary = (invoice) => {
  const charges = invoice?.charges || {};
  const pending = {};
  let amount = 0;
  let paid = 0;

  CHARGE_TYPES.forEach((type) => {
    const charge = charges[type];
    pending[type] = getChargePending(charge);
    amount += toNumber(charge?.amount);
    paid += toNumber(charge?.paid);
  });

  const totalPending = CHARGE_TYPES.reduce(
    (sum, type) => sum + pending[type],
    0,
  );

  let status = ROW_STATUS.PENDING;
  if (totalPending === 0) {
    status = ROW_STATUS.PAID;
  } else if (paid > 0) {
    status = ROW_STATUS.PARTIALLY_PAID;
  }

  return {
    ...invoice,
    amount,
    paid,
    pending,
    totalPending,
    status,
  };
};

// One consolidated row per bed. Vacant beds always have zero amounts.
const buildConsolidatedRow = (bed) => {
  const base = {
    bedId: bed.bedId,
    floor: bed.floor,
    floorOrder: bed.floorOrder,
    room: bed.room,
    bed: bed.bed,
  };

  if (!bed.tenant) {
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
      status: ROW_STATUS.VACANT,
    };
  }

  const invoices = (bed.invoices || []).map(getInvoiceSummary);
  const pendingInvoices = invoices.filter((inv) => inv.totalPending > 0);

  const sumPending = (type) =>
    invoices.reduce((sum, inv) => sum + inv.pending[type], 0);

  const pendingRent = sumPending("rent");
  const pendingEb = sumPending("eb");
  const pendingAdvance = sumPending("advance");
  const pendingNonRefundable = sumPending("nonRefundable");

  // Actual Rent is informational only and is never part of Total Pending.
  const totalPending =
    pendingRent + pendingEb + pendingAdvance + pendingNonRefundable;

  let status = ROW_STATUS.PAID;
  if (totalPending > 0) {
    const hasPaymentOnOutstanding = pendingInvoices.some((inv) => inv.paid > 0);
    status = hasPaymentOnOutstanding
      ? ROW_STATUS.PARTIALLY_PAID
      : ROW_STATUS.PENDING;
  }

  return {
    ...base,
    isVacant: false,
    tenant: bed.tenant,
    actualRent: toNumber(bed.actualRent),
    pendingRent,
    pendingEb,
    pendingAdvance,
    pendingNonRefundable,
    totalPending,
    pendingInvoiceCount: pendingInvoices.length,
    pendingInvoices,
    status,
  };
};

// Rows sorted Floor -> Room -> Bed.
const buildConsolidatedRows = (beds = []) =>
  beds.map(buildConsolidatedRow).sort((a, b) => {
    if (a.floorOrder !== b.floorOrder) return a.floorOrder - b.floorOrder;
    const roomCompare = String(a.room).localeCompare(String(b.room), "en", {
      numeric: true,
    });
    if (roomCompare !== 0) return roomCompare;
    return String(a.bed).localeCompare(String(b.bed), "en", { numeric: true });
  });

// All Tenants toggle. OFF: only rows with an outstanding balance.
// ON: every occupied bed (paid tenants included) plus vacant beds.
export const filterRowsByAllTenants = (rows = [], includeAllTenants = false) =>
  includeAllTenants ? rows : rows.filter((row) => row.totalPending > 0);

// Collection totals for the stat cards. Vacant beds are always excluded.
// Counts only invoices that still have an outstanding balance.
export const getCollectionSummary = (rows = []) => {
  const occupiedRows = rows.filter((row) => !row.isVacant);
  const outstandingInvoices = occupiedRows.flatMap(
    (row) => row.pendingInvoices,
  );

  return {
    totalInvoices: outstandingInvoices.length,
    totalAmount: outstandingInvoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidAmount: outstandingInvoices.reduce((sum, inv) => sum + inv.paid, 0),
    outstandingAmount: occupiedRows.reduce(
      (sum, row) => sum + row.totalPending,
      0,
    ),
    occupiedCount: occupiedRows.length,
    vacantCount: rows.length - occupiedRows.length,
  };
};

// ---------------------------------------------------------------------------
// Filters (Consolidated View only, applied to mock data)
// ---------------------------------------------------------------------------

export const DEFAULT_CONSOLIDATED_FILTERS = {
  search: "",
  statuses: [],
  overdueOnly: false,
  floors: [],
};

export const COLLECTION_STATUS_OPTIONS = [
  ROW_STATUS.PAID,
  ROW_STATUS.PENDING,
  ROW_STATUS.PARTIALLY_PAID,
];

// Overdue is an invoice-level condition, not a row status:
// the invoice still has an outstanding balance and its due date has passed.
export const isInvoiceOverdue = (invoice, today = dayjs()) => {
  if (!invoice?.dueDate) return false;
  if (getInvoiceSummary(invoice).totalPending <= 0) return false;
  return dayjs(invoice.dueDate).isBefore(dayjs(today), "day");
};

// { from, to } period -> [dayjs, dayjs] for the antd RangePicker (or null).
export const periodToRange = (period) =>
  period?.from && period?.to ? [dayjs(period.from), dayjs(period.to)] : null;

// period: { from, to } (Date, dayjs or ISO string). Missing ends are open.
const isWithinPeriod = (date, period) => {
  if (!period || (!period.from && !period.to)) return true;
  const value = dayjs(date);
  if (period.from && value.isBefore(dayjs(period.from), "day")) return false;
  if (period.to && value.isAfter(dayjs(period.to), "day")) return false;
  return true;
};

// Filters work in two steps so totals are always recalculated from invoices:
// 1. Invoice level: keep invoices dated inside the period (and overdue ones
//    when Overdue is selected), then rebuild each row from those invoices.
// 2. Row level: tenant search, floors and collection status.
export const applyConsolidatedFilters = (
  beds = [],
  filters = DEFAULT_CONSOLIDATED_FILTERS,
  period = null,
  today = dayjs(),
) => {
  const active = { ...DEFAULT_CONSOLIDATED_FILTERS, ...filters };

  const scopedBeds = beds.map((bed) => {
    let invoices = (bed.invoices || []).filter((inv) =>
      isWithinPeriod(inv.invoiceDate, period),
    );
    if (active.overdueOnly) {
      invoices = invoices.filter((inv) => isInvoiceOverdue(inv, today));
    }
    return { ...bed, invoices };
  });

  let rows = buildConsolidatedRows(scopedBeds);

  if (active.overdueOnly) {
    rows = rows.filter((row) => row.pendingInvoiceCount > 0);
  }

  const search = active.search.trim().toLowerCase();
  if (search) {
    rows = rows.filter((row) =>
      row.tenant?.name?.toLowerCase().includes(search),
    );
  }

  if (active.floors.length > 0) {
    rows = rows.filter((row) => active.floors.includes(row.floor));
  }

  if (active.statuses.length > 0) {
    rows = rows.filter((row) => active.statuses.includes(row.status));
  }

  return rows;
};

export const countActiveFilters = (filters = DEFAULT_CONSOLIDATED_FILTERS) =>
  (filters.search?.trim() ? 1 : 0) +
  (filters.statuses?.length > 0 ? 1 : 0) +
  (filters.overdueOnly ? 1 : 0) +
  (filters.floors?.length > 0 ? 1 : 0);

// Chips use the same { key, label, value } shape as the List View chips.
export const getConsolidatedFilterChips = (
  filters = DEFAULT_CONSOLIDATED_FILTERS,
) => {
  const chips = [];
  if (filters.search?.trim()) {
    chips.push({ key: "search", label: "Tenant", value: filters.search.trim() });
  }
  if (filters.statuses?.length > 0) {
    chips.push({
      key: "statuses",
      label: "Status is",
      value: filters.statuses.join(", "),
    });
  }
  if (filters.overdueOnly) {
    chips.push({ key: "overdue", label: "Overdue", value: "Yes" });
  }
  if (filters.floors?.length > 0) {
    chips.push({ key: "floors", label: "Floor is", value: filters.floors.join(", ") });
  }
  return chips;
};

// Unique floors in Floor -> Room -> Bed order, for the filter drawer.
export const getFloorOptions = (beds = []) => {
  const floors = new Map();
  beds.forEach((bed) => {
    if (!floors.has(bed.floor)) floors.set(bed.floor, bed.floorOrder);
  });
  return [...floors.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([floor]) => floor);
};

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
// settings: { columnKeys, groupBy, includeFloorSubtotals, includeGrandTotal,
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

  return {
    columnKeys: settings.columnKeys || [],
    groups,
    grandTotal: settings.includeGrandTotal ? sumExportRows(rows) : null,
    rowCount: rows.length,
    occupiedCount,
    vacantCount: rows.length - occupiedCount,
    settings,
  };
};

export const formatAmount = (value) =>
  toNumber(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });

export const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
