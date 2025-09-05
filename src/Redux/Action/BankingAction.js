import AxiosConfig from "../../WebService/AxiosConfig";
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

export async function AddBankingDetails(datum) {
  return await AxiosConfig.post("/add_bank", datum, {
    data: datum,
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




export async function AddDefaultAccount(datum) {
  return await AxiosConfig.post("/add_default_account", datum, {
    data: datum,
  });
}

export async function AddBankAmount(datum) {
  return await AxiosConfig.post("/add_bank_amount", datum, {
    data: datum,
  });
}

export async function editBankTrans(datum) {
  return await AxiosConfig.post("/edit_bank_trans", datum, {
    data: datum,
  });
}
export async function DeleteBanking(datum) {
  return await AxiosConfig.post("/delete_bank", datum, {
    data: datum,
  });
}


export async function DeleteTransactionId(datum) {
  return await AxiosConfig.post("/delete_bank_trans", datum, {
    data: datum,
  });
}
