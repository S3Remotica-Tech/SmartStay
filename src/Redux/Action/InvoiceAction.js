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
    return await AxiosConfig.post('/get_invoice_id',invoicenumber,{ //bill invoice number
    data: invoicenumber
    })
  }
  
  export async function ManualInvoiceUserData(amountdata) {
    return await AxiosConfig.post('/get_user_amounts',amountdata ,{ //bill table amount data
     data : amountdata
    })
  }

  export async function RecurrInvoiceamountData(amountdata) {
    return await AxiosConfig.post('/get_recuring_amounts',amountdata ,{ // Recurr table amount data
     data : amountdata
    })
  }

  export async function AddManualInvoiceBill(manualinvoice) {
    return await AxiosConfig.post('/add_manual_invoice', manualinvoice, { // create new bill
      data: manualinvoice
    })
  }

  export async function AddRecurringBill(manualinvoice) {
    return await AxiosConfig.post('/add_recuring_bill', manualinvoice, { // create new Recurr bill
      data: manualinvoice
    })
  }

  export async function GetManualInvoices() {
    return await AxiosConfig.get('/get_bill_details',{  // bills data
    })
  }

  export async function GetRecurrBills() {
    return await AxiosConfig.get('/all_recuring_bills',{  //Recurr bills data
    })
  }

  export async function DeleteRecurrBills(bills) {
    return await AxiosConfig.post('/delete_recuring_bill',bills, { // Delete Recurr bills
      data:bills
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
  if (params.invoicedate) formData.append("invoicedate", params.invoicedate);
  if (params.Invoice_duedate) formData.append("Invoice_duedate", params.Invoice_duedate);

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
    console.log("responseforApi", response);
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
         }
}


export async function InvoiceRecurringsettings(datum) {
  return await AxiosConfig.post('/settings/add_recuring',datum,{
    data:datum
  })
}





