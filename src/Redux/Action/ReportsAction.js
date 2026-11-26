import AxiosConfigV2 from "../../WebService/AxiosConfigV2";
import qs from "qs";

export async function getReportsDetails(hostelId, filters = {}) {
  return AxiosConfigV2.get(`/v2/reports/${hostelId}`, {
    params: {
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}

export async function getInvoiceRegister(hostelId, filters = {}) {
  return AxiosConfigV2.get(`/v2/reports/invoice/${hostelId}`, {
    params: {
      startDate: filters.startDate,
      endDate: filters.endDate,
      search: filters.search,
      paymentStatus: filters.paymentStatus,
      invoiceModes: filters.invoiceModes,
      invoiceTypes: filters.invoiceTypes,
      createdBy: filters.createdBy,
      period: filters?.period,
      minPaidAmount: filters?.minPaidAmount,
      maxPaidAmount: filters?.maxPaidAmount,
      minOutstandingAmount: filters?.minOutstandingAmount,
      maxOutstandingAmount: filters?.maxOutstandingAmount,
      page: filters?.page,
      size: filters?.size,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}

// Invoice Register - Consolidated view (filters go in the POST body).
// isPaginated defaults to true (table, page/size); the export preview sends
// isPaginated: false in its body to get the whole sheet.
export async function getConsolidatedInvoiceRegister(hostelId, filters = {}) {
  return await AxiosConfigV2.post(
    `/v2/reports/invoice/consolidated/${hostelId}`,
    { isPaginated: true, ...filters },
  );
}

// Invoice Register - Consolidated view table customization (columns config)
export async function consolidatedInvoiceCustomizeData(invoice) {
  return await AxiosConfigV2.put(
    `/v2/table-config/invoice/consolidated/${invoice.hostelId}`,
    invoice.customize,
  );
}

// Invoice Register - Consolidated view download (filters go in the POST body)
export async function ReportsConsolidatedInvoicePDF(invoice) {
  return await AxiosConfigV2.post(
    `/v2/reports/download/invoice/consolidated/${invoice.hostelId}`,
    invoice.filters || {},
  );
}

export async function getExpenseRegister(hostelId, filters = {}) {

  return AxiosConfigV2.get(`/v2/reports/expense/${hostelId}`, {
    params: {
      startDate: filters.startDate,
      endDate: filters.endDate,
      period: filters?.period,
      categoryId: filters?.category,
      subCategoryId: filters?.subCategory,
      paymentMode: filters?.paymentMode,
      createdBy: filters?.createdBy,
      // paidTo: filters?.paidTo,
      page: filters?.page,
      size: filters?.size,
      paidTo: filters?.vendorId,
      paymentStatus: filters?.paymentStatus,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}

export async function getReceiptRegister(hostelId, filters = {}) {
  return AxiosConfigV2.get(`/v2/reports/transaction/${hostelId}`, {
    params: {
      startDate: filters.startDate,
      endDate: filters.endDate,
      invoiceType: filters.invoiceType,
      collectedBy: filters.collectedBy,
      period: filters.period,
      paymentMode: filters.paymentMode,
      // period: filters?.period,
      page: filters.page,
      size: filters.size,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}

export async function getTenantRegister(hostelId, filters = {}) {
  return AxiosConfigV2.get(`/v2/reports/tenants/${hostelId}`, {
    params: {
      startDate: filters.startDate,
      endDate: filters.endDate,
      period: filters?.period,
      page: filters.page,
      size: filters.size,
      status: filters.status,
      floor: filters?.floor,
      room: filters?.room,
      search: filters?.search,
      sharingType: filters?.sharingType,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}

export async function ReportsTenantRegisterPDF(tenant) {
  return await AxiosConfigV2.get(`/v2/reports/download/${tenant.hostelId}`, {
    params: {
      startDate: tenant.startDate,
      endDate: tenant.endDate,
      period: tenant.period,
      status: tenant.status,
      floor: tenant?.floor,
      room: tenant?.room,
      search: tenant?.search,
      sharingType: tenant?.sharingType,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, {
        arrayFormat: "repeat",
      }),
  });
}

export async function ReportsReceiptsPDF(receipt) {
  return await AxiosConfigV2.get(
    `/v2/reports/download/receipts/${receipt.hostelId}`,
    {
      params: {
        startDate: receipt.startDate,
        endDate: receipt.endDate,
        period: receipt.period,
        invoiceType: receipt.invoiceType,
        collectedBy: receipt.collectedBy,
        paymentMode: receipt.paymentMode,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
        }),
    },
  );
}

export async function ReportsInvoicePDF(invoice) {
  return await AxiosConfigV2.get(
    `/v2/reports/download/invoice/${invoice.hostelId}`,
    {
      params: {
        startDate: invoice.startDate,
        endDate: invoice.endDate,
        search: invoice.search,
        paymentStatus: invoice.paymentStatus,
        invoiceModes: invoice.invoiceModes,
        invoiceTypes: invoice.invoiceTypes,
        createdBy: invoice.createdBy,
        period: invoice?.period,
        minPaidAmount: invoice?.minPaidAmount,
        maxPaidAmount: invoice?.maxPaidAmount,
        minOutstandingAmount: invoice?.minOutstandingAmount,
        maxOutstandingAmount: invoice?.maxOutstandingAmount,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
        }),
    },
  );
}



export async function ReportsExpensePDF(invoice) {
  return await AxiosConfigV2.get(
    `/v2/reports/download/expense/${invoice.hostelId}`,
    {
      params: {
        startDate: invoice.startDate,
        endDate: invoice.endDate,
        period: invoice.period,
        categoryId: invoice?.category,
        subCategoryId: invoice?.subCategory,
        paymentMode: invoice?.paymentMode,
        createdBy: invoice?.createdBy,
        // paidTo: invoice?.paidTo,
        paidTo: invoice?.vendorId,
        paymentStatus: invoice?.paymentStatus,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
        }),
    },
  );
}
