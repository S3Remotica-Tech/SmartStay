import AxiosConfigV2 from "../../WebService/AxiosConfigV2";
import qs from "qs";



export async function getReportsDetails(hostelId) {
  return await AxiosConfigV2.get(`/v2/reports/${hostelId}`)
}





export async function getInvoiceRegister(hostelId, filters = {}) {
  console.log("hostelId", hostelId)
  return AxiosConfigV2.get(`/v2/reports/invoice/${hostelId}`, {
    params: {
      search: filters.search,
      paymentStatus: filters.paymentStatus,
      invoiceModes: filters.invoiceModes,
      invoiceTypes: filters.invoiceTypes,
      createdBy: filters.createdBy,
      period: filters?.period,
      page: filters.page ?? 0,
      size: filters.size ?? 10,
    },
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}







export async function getExpenseRegister(hostelId, filters = {}) {
    return AxiosConfigV2.get(`/v2/reports/expense/${hostelId}`, {
    params: {
       startDate: filters.startDate,
      endDate: filters.endDate,
      period: filters?.period,
      page: filters.page ?? 0,
      size: filters.size ?? 10,
    },
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}




export async function getBankTransactionRegister(hostelId, filters = {}) {

  return AxiosConfigV2.get(`/v2/reports/transaction/${hostelId}`, {
    params: {
      search: filters.search,
      paymentStatus: filters.paymentStatus,
      invoiceModes: filters.invoiceModes,
      invoiceTypes: filters.invoiceTypes,
      createdBy: filters.createdBy,
      period: filters?.period,
      page: filters.page ?? 0,
      size: filters.size ?? 10,
    },
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}