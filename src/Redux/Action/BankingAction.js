import AxiosConfig from "../../WebService/AxiosConfig";

export async function AddBankingDetails(datum) {
  console.log("AddBankingDetails", datum);
  return await AxiosConfig.post("/add_bank", datum, {
    data: datum,
  });
}
export async function GetAddBanking(datum) {
  return await AxiosConfig.post("/all_bankings",datum, {
    data:datum,
  });
}

export async function AddDefaultAccount(datum) {
  console.log("AddDefaultAccount", datum);
  return await AxiosConfig.post("/add_default_account", datum, {
    data: datum,
  });
}

export async function AddBankAmount(datum) {
  console.log("AddBankAmount", datum);
  return await AxiosConfig.post("/add_bank_amount", datum, {
    data: datum,
  });
}

export async function editBankTrans(datum) {
  console.log("editBankTrans", datum);
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
