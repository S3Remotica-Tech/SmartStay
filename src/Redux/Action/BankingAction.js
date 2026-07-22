// import AxiosConfig from "../../WebService/AxiosConfig";
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

// v1
// export async function AddBankingDetails(datum) {
//   return await AxiosConfig.post("/add_bank", datum, {
//     data: datum,
//   });
// }
// v2

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

export async function EditBankingDetails(hostelId, bankId, datum) {
  return await AxiosConfigV2.put(`/v2/bank/${hostelId}/${bankId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// v1
// export async function GetAddBanking(datum) {
//   return await AxiosConfig.post("/all_bankings",datum, {
//     data:datum,
//   });
// }

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
