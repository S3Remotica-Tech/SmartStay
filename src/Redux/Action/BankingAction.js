import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

//////////////////////////////////////////////////////////////

export async function AddBanking(datum) {
  return await AxiosConfigV2.post(`/v3/bank/${datum.hostelId}`, datum);
}
// Add payment method

export async function AddPaymentMethod(datum) {
  const formData = new FormData();

  console.log("datum", datum);

  formData.append("qrImage", datum.qrImage || "");

  return AxiosConfigV2.post(
    `/v3/bank/bankMethod/${datum.hostelId}/${datum.bankId}`,
    formData,
    {
      params: {
        paymentMethod: datum.paymentMethod,
        upiId: datum.upiId,
        upiApp: datum.upiApp,
        displayName: datum.displayName,
        description: datum.description,
        cardNumber: datum.cardNumber,
        cardNetwork: datum.cardNetwork,
        cardHolderName: datum.cardHolderName,
        creditLimit: datum.creditLimit,
        billingCycle: datum.billingCycle,
        linkedUpiId: datum.linkedUpiId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

// Banking Overview

export async function LinkedPaymentMethod(hostel) {
  return await AxiosConfigV2.get(
    `/v3/bank/bankMethod/${hostel.hostelId}/${hostel.bankId}`,
  );
}

// get /v3/bank/qrCardType

export async function getUPIAndCardTypes(payload) {
  return await AxiosConfigV2.get(`/v3/bank/qrCardType`, {
    params: payload,
  });
}

// allpayments methods

export async function getAllPaymentMethod(hostelId) {
  return await AxiosConfigV2.get(`v3/bank/allPaymentMethods/${hostelId}`);
}

export const StoreBankDetails = (bank) => ({
  type: "STOREBANK_DETAILS",
  payload: bank,
});

export async function AddMoney(money) {
  return await AxiosConfigV2.put(
    `/v3/bank/addMoney/${money.hostelId}`,
    money,
    {},
  );
}

export async function v3GetBanking(bank) {
  const params = {};

  if (bank.page) params.page = bank.page;
  if (bank.size) params.size = bank.size;

  return await AxiosConfigV2.get(`/v3/bank/${bank.hostelId}`, {
    params,
  });
}

export async function GetResponsibleList(hostelId) {
  return await AxiosConfigV2.get(`/v3/bank/responsiblePerson/${hostelId}`);
}

export async function selfTranferV3(bank) {
  return await AxiosConfigV2.put(`/v3/bank/moneyTransfer/${bank.hostelId}`, {
    fromBankId: bank.fromBankId,
    toBankId: bank.toBankId,
    amount: bank.amount,
  });
}

export async function selfTranferInitializeV3(bank) {
  return await AxiosConfigV2.get(
    `/v3/bank/transfer/initialize/${bank.hostelId}/${bank.bankId}`,
    {},
  );
}

export async function AllTransaction(transaction) {
  const params = {};
  if (transaction.dateFilter) params.dateFilter = transaction.dateFilter;
  if (transaction.source) params.source = transaction.source;
  if (transaction.fromDate) params.fromDate = transaction.fromDate;
  if (transaction.toDate) params.toDate = transaction.toDate;
  if (transaction.page) params.page = transaction.page;
  if (transaction.size) params.size = transaction.size;

  return await AxiosConfigV2.get(
    `/v3/bank/allTransactions/${transaction.hostelId}`,
    {
      params,
    },
  );
}

/////////////////////////////////////////////////////////////////

export async function AddBankingDetails(hostelId, datum) {
  return await AxiosConfigV2.post(`/v2/bank/${hostelId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function EditBankingDetails(hostelId, bankId, datum) {
  return await AxiosConfigV2.put(`/v2/bank/${hostelId}/${bankId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GetAddBanking(hostelId) {
  return await AxiosConfigV2.get(`/v2/bank/${hostelId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function selfTranferInitialize(bank) {
  return await AxiosConfigV2.get(
    `/v2/bank/transfer/initialize/${bank.hostelId}/${bank.bankId}`,
    {},
  );
}

export async function selfTranfer(bank) {
  return await AxiosConfigV2.put(`/v2/bank/transfer/${bank.hostelId}`, {
    fromBankId: bank.fromBankId,
    toBankId: bank.toBankId,
    balance: bank.amount,
  });
}

export function AddDefaultAccount() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function AddBankAmount(hostelId, data) {
  return await AxiosConfigV2.put(`/v2/bank/money/${hostelId}`, data, {});
}

export function editBankTrans() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
export function DeleteBanking() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function DeleteTransactionId() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
