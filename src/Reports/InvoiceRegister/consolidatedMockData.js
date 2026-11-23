// Static mock data for the Invoice Register Consolidated View (Pending Collection Sheet).
// Not connected to the API or Redux. Replace with the API response during integration.
//
// One entry per bed. `tenant: null` means the bed is vacant.
// Each invoice keeps a separate amount and paid figure for every charge it contains.
// Only these charge keys are used: rent, eb, advance, nonRefundable.
// Pending amounts are never stored here; they are calculated as amount - paid
// in consolidatedHelpers.js so they can never disagree with the paid figures.
// Dates are fixed to October and November 2026; pick that range in the
// date picker to see every row when reviewing in a later month.

export const consolidatedMockBeds = [
  // Pending: nothing paid on the outstanding invoice (rent + EB in one invoice).
  {
    bedId: "bed-101-a",
    floor: "Ground Floor",
    floorOrder: 0,
    room: "Room 101",
    bed: "A",
    actualRent: 7500,
    tenant: { id: "t-01", name: "Priya Patel", phone: "+91 99402 18290" },
    invoices: [
      {
        invoiceId: "inv-1101",
        invoiceNo: "INV-1101",
        invoiceType: "Rent",
        invoiceDate: "2026-11-01",
        dueDate: "2026-11-05",
        charges: {
          rent: { amount: 7500, paid: 0 },
          eb: { amount: 600, paid: 0 },
        },
      },
    ],
  },

  // Partially Paid: part of the rent paid on a single invoice.
  {
    bedId: "bed-101-b",
    floor: "Ground Floor",
    floorOrder: 0,
    room: "Room 101",
    bed: "B",
    actualRent: 10000,
    tenant: { id: "t-02", name: "Amit Kumar", phone: "+91 99625 44098" },
    invoices: [
      {
        invoiceId: "inv-1102",
        invoiceNo: "INV-1102",
        invoiceType: "Rent",
        invoiceDate: "2026-11-01",
        dueDate: "2026-11-05",
        charges: {
          rent: { amount: 10000, paid: 4000 },
        },
      },
    ],
  },

  // Vacant bed.
  {
    bedId: "bed-102-a",
    floor: "Ground Floor",
    floorOrder: 0,
    room: "Room 102",
    bed: "A",
    actualRent: 0,
    tenant: null,
    invoices: [],
  },

  // Multiple pending invoices: October and November both unpaid.
  {
    bedId: "bed-201-a",
    floor: "First Floor",
    floorOrder: 1,
    room: "Room 201",
    bed: "A",
    actualRent: 8000,
    tenant: { id: "t-03", name: "Vikram Singh", phone: "+91 97898 61007" },
    invoices: [
      {
        invoiceId: "inv-1010",
        invoiceNo: "INV-1010",
        invoiceType: "Rent",
        invoiceDate: "2026-10-01",
        dueDate: "2026-10-05",
        charges: {
          rent: { amount: 8000, paid: 0 },
          eb: { amount: 450, paid: 0 },
        },
      },
      {
        invoiceId: "inv-1103",
        invoiceNo: "INV-1103",
        invoiceType: "Rent",
        invoiceDate: "2026-11-01",
        dueDate: "2026-11-05",
        charges: {
          rent: { amount: 8000, paid: 0 },
          eb: { amount: 520, paid: 0 },
        },
      },
    ],
  },

  // Different outstanding charge types: rent and EB fully paid,
  // advance partly paid, non-refundable amount unpaid.
  {
    bedId: "bed-201-b",
    floor: "First Floor",
    floorOrder: 1,
    room: "Room 201",
    bed: "B",
    actualRent: 9000,
    tenant: { id: "t-04", name: "Karthik Menon", phone: "+91 90031 66512" },
    invoices: [
      {
        invoiceId: "inv-1104",
        invoiceNo: "INV-1104",
        invoiceType: "Rent",
        invoiceDate: "2026-11-01",
        dueDate: "2026-11-05",
        charges: {
          rent: { amount: 9000, paid: 9000 },
          eb: { amount: 300, paid: 300 },
        },
      },
      {
        invoiceId: "inv-1105",
        invoiceNo: "INV-1105",
        invoiceType: "Advance",
        invoiceDate: "2026-11-02",
        dueDate: "2026-11-25",
        charges: {
          advance: { amount: 5000, paid: 2000 },
          nonRefundable: { amount: 1000, paid: 0 },
        },
      },
    ],
  },

  // Fully Paid tenant.
  {
    bedId: "bed-202-a",
    floor: "First Floor",
    floorOrder: 1,
    room: "Room 202",
    bed: "A",
    actualRent: 7000,
    tenant: { id: "t-05", name: "Sneha Reddy", phone: "+91 98400 12345" },
    invoices: [
      {
        invoiceId: "inv-1106",
        invoiceNo: "INV-1106",
        invoiceType: "Rent",
        invoiceDate: "2026-11-01",
        dueDate: "2026-11-05",
        charges: {
          rent: { amount: 7000, paid: 7000 },
          eb: { amount: 400, paid: 400 },
        },
      },
    ],
  },

  // Pending: new joiner with advance and non-refundable amount unpaid.
  {
    bedId: "bed-301-a",
    floor: "Second Floor",
    floorOrder: 2,
    room: "Room 301",
    bed: "A",
    actualRent: 12000,
    tenant: { id: "t-06", name: "Ravi Shankar", phone: "+91 98765 43213" },
    invoices: [
      {
        invoiceId: "inv-1107",
        invoiceNo: "INV-1107",
        invoiceType: "Advance",
        invoiceDate: "2026-11-08",
        dueDate: "2026-11-28",
        charges: {
          advance: { amount: 6000, paid: 0 },
          nonRefundable: { amount: 1500, paid: 0 },
        },
      },
    ],
  },

  // Vacant bed.
  {
    bedId: "bed-301-b",
    floor: "Second Floor",
    floorOrder: 2,
    room: "Room 301",
    bed: "B",
    actualRent: 0,
    tenant: null,
    invoices: [],
  },

  // Partially Paid with multiple invoices: October fully paid,
  // November rent partly paid and EB unpaid.
  {
    bedId: "bed-302-a",
    floor: "Second Floor",
    floorOrder: 2,
    room: "Room 302",
    bed: "A",
    actualRent: 9500,
    tenant: { id: "t-07", name: "Meena Iyer", phone: "+91 94440 55667" },
    invoices: [
      {
        invoiceId: "inv-1011",
        invoiceNo: "INV-1011",
        invoiceType: "Rent",
        invoiceDate: "2026-10-01",
        dueDate: "2026-10-05",
        charges: {
          rent: { amount: 9500, paid: 9500 },
        },
      },
      {
        invoiceId: "inv-1108",
        invoiceNo: "INV-1108",
        invoiceType: "Rent",
        invoiceDate: "2026-11-01",
        dueDate: "2026-11-05",
        charges: {
          rent: { amount: 9500, paid: 5000 },
          eb: { amount: 700, paid: 0 },
        },
      },
    ],
  },

  // Sample: Paid tenant with two invoices. Both are fully paid, so the row
  // shows zero outstanding and no invoices to expand.
  {
    bedId: "bed-202-b",
    floor: "First Floor",
    floorOrder: 1,
    room: "Room 202",
    bed: "B",
    actualRent: 7500,
    tenant: { id: "t-08", name: "Arjun Rao", phone: "+91 98410 77881" },
    invoices: [
      {
        invoiceId: "inv-1111",
        invoiceNo: "INV-1111",
        invoiceType: "Rent",
        invoiceDate: "2026-11-01",
        dueDate: "2026-11-05",
        charges: {
          rent: { amount: 7500, paid: 7500 },
        },
      },
      {
        invoiceId: "inv-1112",
        invoiceNo: "INV-1112",
        invoiceType: "Electricity",
        invoiceDate: "2026-11-08",
        dueDate: "2026-11-15",
        charges: {
          eb: { amount: 520, paid: 520 },
        },
      },
    ],
  },

  // Sample: Partially Paid tenant with two outstanding invoices.
  // Rent is part-paid on the first; the electricity invoice is unpaid.
  {
    bedId: "bed-303-a",
    floor: "Second Floor",
    floorOrder: 2,
    room: "Room 303",
    bed: "A",
    actualRent: 8000,
    tenant: { id: "t-09", name: "Divya Nair", phone: "+91 98945 33210" },
    invoices: [
      {
        invoiceId: "inv-1109",
        invoiceNo: "INV-1109",
        invoiceType: "Rent",
        invoiceDate: "2026-11-01",
        dueDate: "2026-11-05",
        charges: {
          rent: { amount: 8000, paid: 3000 },
        },
      },
      {
        invoiceId: "inv-1110",
        invoiceNo: "INV-1110",
        invoiceType: "Electricity",
        invoiceDate: "2026-11-10",
        dueDate: "2026-11-24",
        charges: {
          eb: { amount: 650, paid: 0 },
        },
      },
    ],
  },
];
