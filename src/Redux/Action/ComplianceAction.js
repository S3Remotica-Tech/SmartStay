import AxiosConfig from "../../WebService/AxiosConfig"


export async function compliance() {
    return await AxiosConfig.get('/compliance/compliance-list',{
    })
  }

  export async function Compliancedetails (formDetails) {
    return await AxiosConfig.post('/compliance/add-details',formDetails,{
      params:formDetails
    })
  }