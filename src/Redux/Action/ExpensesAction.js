import AxiosConfig from "../../WebService/AxiosConfig"


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
    return await AxiosConfig.post('/get/get-hostel-expenses',datum , {
      data:datum
        })
  }

export async function AddExpense(datum) {
    return await AxiosConfig.post('/add/add-expense',datum,{
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