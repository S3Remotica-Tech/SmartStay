import AxiosConfig from "../../WebService/AxiosConfig"

export async function AddBankingDetails(datum){
    console.log("AddBankingDetails",datum)
      return await AxiosConfig.post('/add_bank',datum,{
        data:datum
      })
    }
    export async function GetAddBanking() {
        return await AxiosConfig.get('/all_bankings',{
        })
      }


      export async function AddDefaultAccount(datum){
        console.log("AddDefaultAccount",datum)
          return await AxiosConfig.post('/add_default_account',datum,{
            data:datum
          })}