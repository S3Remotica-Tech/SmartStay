import AxiosConfig from "../../WebService/AxiosConfig"


export async function invoicelist() {
    return await AxiosConfig.get('/invoice/invoice-list',{
    })
  }
 
export async function invoiceList(invoice) {
  return await AxiosConfig.post('/list/invoice-list',invoice,{
    data:invoice
  })
}

export async function addInvoice(datum) {
  return await AxiosConfig.post('/add/invoice-add',datum,{
    data:datum
  })
}



  export async function ManualInvoice() {
    return await AxiosConfig.get('/manual/manual-invoice',{
    })
  }

  export async function InvoicePDf(datum) {
    return await AxiosConfig.post('/invoice/invoice-list-pdf',datum, {
      data:datum
    })
  }



  export async function GetAmenities() {
    return await AxiosConfig.get('/list/amenities-list',{
    })
  }

  export async function UpdateAmenities(datum) {
    return await AxiosConfig.post('/amenities/amnityUpdate',datum,{
      data:datum
    })
  }


export async function AmenitiesSettings(datum) {
  return await AxiosConfig.post('/amenities/setting',datum,{
    data:datum
  })
}


export async function InvoiceSettings(params) {

   const formData = new FormData();
  formData.append("profile", params.profile);
  formData.append("hostel_Id", params.hostel_Id);
  formData.append("prefix", params.prefix);
  formData.append("suffix", params.suffix);
  
    
  try {
    const response = await AxiosConfig.post('/invoice/settings',formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
      // params: {
      //   hostel_Id: params.hostel_Id,
      //   prefix: params.prefix,
      //   suffix: params.suffix,
       
      // },
      onUploadProgress: (event) => {
        console.log("event", event)
              }
    });
    console.log("response for Api", response);
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
         }
}



