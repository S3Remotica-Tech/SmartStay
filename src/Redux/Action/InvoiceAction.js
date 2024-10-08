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

export async function UpdateInvoice(datum) {
  return await AxiosConfig.post('/transaction/list',datum,{
    data:datum
  })
}



  export async function ManualInvoice() {
    return await AxiosConfig.get('/manual/manual-invoice',{
    })
  }
  export async function ManualInvoiceNumber(invoicenumber) {
    return await AxiosConfig.post('/get_invoice_id',invoicenumber,{ //manual invoice number
    data: invoicenumber
    })
  }
  
  export async function ManualInvoiceUserData(amountdata) {
    return await AxiosConfig.post('/get_user_amounts',amountdata ,{ // table amount data
     data : amountdata
    })
  }

  export async function AddManualInvoiceBill(manualinvoice) {
    return await AxiosConfig.post('/add_manual_invoice', manualinvoice, { // create new bill
      data: manualinvoice
    })
  }

  export async function GetManualInvoices() {
    return await AxiosConfig.get('/get_bill_details',{
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

  //  const formData = new FormData();
  // formData.append("profile", params.profile);
  // formData.append("hostel_Id", params.hostel_Id);
  // formData.append("prefix", params.prefix);
  // formData.append("suffix", params.suffix);

  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  formData.append("hostel_Id", params.hostel_Id);
  if (params.prefix) formData.append("prefix", params.prefix);
  if (params.suffix) formData.append("suffix", params.suffix);
  
    
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



