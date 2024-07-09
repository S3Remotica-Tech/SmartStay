import AxiosConfig from "../../WebService/AxiosConfig"


export async function GetExpenseCatogory() {
  return await AxiosConfig.post('/get/expense-category',{
      })
}




export async function GetExpense() {
    return await AxiosConfig.post('/get/get-hostel-expenses',{
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
