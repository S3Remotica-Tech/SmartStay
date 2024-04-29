import AxiosConfig from "../../WebService/AxiosConfig"


export async function compliance(compliance) {
    return await AxiosConfig.post('/compliance/compliance-list',compliance,{
      data:compliance
    })
  }

  export async function Compliancedetails (formDetails) {
    return await AxiosConfig.post('/compliance/add-details',formDetails,{
      data:formDetails
    })
  }