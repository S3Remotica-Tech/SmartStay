import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

export async function AddBankingDetails(hostelId, datum) {
  return await AxiosConfigV2.post(`/v2/bank/${hostelId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function AddBanking(datum) {
  return await AxiosConfigV2.post(`/v3/bank/${datum.hostelId}`, datum);
}

//////////////////////////////////////////////////////////////
// Add payment method

export async function AddPaymentMethod(datum) {
  const formData = new FormData();

  if (datum.qrImage) {
    formData.append("qrImage", datum.qrImage);
  }

  return await AxiosConfigV2.post(
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
    },
  );
}

// Banking Overview

export async function ParticularBankingOverview(hostel) {
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

/////////////////////////////////////////////////////////////////

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

export async function v3GetBanking(hostelId) {
  return await AxiosConfigV2.get(`/v3/bank/${hostelId}`);
}

export async function GetResponsibleList(hostelId) {
  return await AxiosConfigV2.get(`/v3/bank/responsiblePerson/${hostelId}`);
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
    balance: bank.balance,
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
