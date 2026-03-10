// import AxiosConfig from "../../WebService/AxiosConfig";
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";


export  function GetExpenseCatogory() {
 new Promise((resolve) => {
  resolve({status: 200});
})
}

export  function AddExpenseTag() {
  new Promise((resolve) => {
  resolve({status: 200});
})
}


export async function GetExpense(datum) {
    return await AxiosConfigV2.get(`/v2/expense/${datum.hostelId}`)
  }

export async function GetInitializeExpense(hostelId) {
    return await AxiosConfigV2.get(`/v2/expense/initialize/${hostelId}`)
  }


export async function AddExpense(datum) {
     return await AxiosConfigV2.post(`/v2/expense/${datum.hostelId}`,datum , {
        data:datum
        })
  }



export async function UpdateExpense(datum) {
  return AxiosConfigV2.put(
    `/v2/expense/${datum.hostelId}/${datum.expenseId}`,
    datum
  );
}






  export async function DeleteExpense(expense) {
    return await AxiosConfigV2.delete(`/v2/expense/${expense.hostelId}/${expense.expenseId}`)
  }
  


  export function transactionHistory() {
    new Promise((resolve) => {
  resolve({status: 200});
})
  }