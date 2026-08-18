import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

export function GetExpenseCatogory() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function AddExpenseTag() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function GetExpense(exp) {
  const params = {};

  if (exp.name) params.name = exp.name;
  if (exp.categoryId) params.categoryId = exp.categoryId;
  if (exp.page) params.page = exp.page;
  if (exp.size) params.size = exp.size;

  return await AxiosConfigV2.get(`/v2/expense/${exp.hostelId}`, {
    params,
  });
}

export async function GetUnits() {
  return await AxiosConfigV2.get(`/v2/expense/units`);
}

export async function GetInitializeExpense(hostelId) {
  return await AxiosConfigV2.get(`/v2/expense/initialize/${hostelId}`);
}

export async function AddExpense(datum) {
  const formData = new FormData();

  if (datum.images?.length) {
    datum.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  formData.append(
    "expense",
    new Blob([JSON.stringify(datum.expense)], {
      type: "application/json",
    }),
  );

  return await AxiosConfigV2.post(`/v2/expense/${datum.hostelId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function UpdateExpense(datum) {
  return AxiosConfigV2.put(
    `/v2/expense/${datum.hostelId}/${datum.expenseId}`,
    datum,
  );
}

export async function particularExpenseverview(expense) {
  return await AxiosConfigV2.get(
    `/v2/expense/${expense.hostelId}/${expense.expenseId}`,
  );
}

export async function expenseCustomizeData(expense) {
  return await AxiosConfigV2.put(
    `/v2/table-config/expense/${expense.hostelId}`,
    expense.customize,
  );
}

export async function DeleteExpense(expense) {
  return await AxiosConfigV2.delete(
    `/v2/expense/${expense.hostelId}/${expense.expenseId}`,
  );
}

export function transactionHistory() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
