// import AxiosConfig from "../../WebService/AxiosConfig";
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";


export  function GetExpenseCatogory() {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export  function AddExpenseTag(datum) {
  new Promise((resolve, reject) => {
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

  export function DeleteExpense(datum) {
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
  }


  export function transactionHistory(datum) {
    new Promise((resolve, reject) => {
  resolve({status: 200});
})
  }