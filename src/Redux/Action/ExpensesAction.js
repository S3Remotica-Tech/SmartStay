import AxiosConfig from "../../WebService/AxiosConfig";
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";


export async function GetExpenseCatogory() {
  return await AxiosConfig.post('/get/expense-category',{
      })
}

export async function AddExpenseTag(datum) {
  return await AxiosConfig.post('/add_expense_tag',datum , {
    data:datum
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

  export async function DeleteExpense(datum) {
    return await AxiosConfig.post('/delete/delete-expenses',datum,{
        data:datum
        })
  }


  export async function transactionHistory(datum) {
    return await AxiosConfig.post('/hostel/transaction-history',datum,{
        data:datum
        })
  }