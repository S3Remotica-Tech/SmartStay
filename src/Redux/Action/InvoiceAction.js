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
  export async function EditManualInvoiceBill(manualinvoice) {
    return await AxiosConfig.post('/edit_manual_invoice', manualinvoice, { // edit new bill
      data: manualinvoice
    })
  }
  export async function DeleteManualInvoiceBill(manualinvoice) {
    return await AxiosConfig.post('/delete_manual_invoice', manualinvoice, { // delete new bill
      data: manualinvoice
    })
  }

  export async function AddRecurringBill(manualinvoice) {
    return await AxiosConfig.post('/add_recuring_bill', manualinvoice, { // create new Recurr bill
      data: manualinvoice
    })
  }

  export async function GetManualInvoices(datum) {
    return await AxiosConfig.post('/get_bill_details',datum,{ 
      data:datum 
    })
  }

  export async function AddRecurrBillsUsers(recurr) {
    return await AxiosConfig.post('/users/recuring_bill_users',recurr,{  //Recurr add customer filter 
      data:recurr
    })
  }

  export async function GetRecurrBills(bills) {
    return await AxiosConfig.post('/all_recuring_bills',bills,{  //Recurr bills data
      data:bills
    })
  }

  export async function DeleteRecurrBills(bills) {
    return await AxiosConfig.post('/delete_recuring_bill',bills, { // Delete Recurr bills
      data:bills
    })
  }

  export async function GetReceiptData(receipt) {
    return await AxiosConfig.post('/receipts/all_receipts',receipt,{  //Receipts data
      data:receipt
    })
  }

  export async function AddReceipt(receipt) {
    return await AxiosConfig.post('/receipts/add', receipt, { // create new Receipt
      data: receipt
    })
  }

  
  export async function EditReceipt(receipt) {
    return await AxiosConfig.post('/receipts/edit', receipt, { // Edit Receipt
      data: receipt
    })
  }

  export async function DeleteReceipt(receipt) {
    return await AxiosConfig.post('/receipts/delete',receipt, { // Delete receipt 
      data:receipt
    })
  }

  export async function ReferenceIdGet() {
    return await AxiosConfig.get('/receipts/gen_reference',{ //refrence id
    })
  }

  export async function ReceiptPDf(datum) {
    return await AxiosConfig.post('/receipts/pdf_generate',datum, {
      data:datum
    })
  }

  export async function InvoicePDf(datum) {
    return await AxiosConfig.post('/invoice/invoice-list-pdf',datum, {
      data:datum
    })
  }



  export async function GetAmenities(datum) {
    return await AxiosConfig.post('/list/amenities-list',datum, {
      data:datum
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
  if (params.inv_date) formData.append("inv_date", params.inv_date);
  if (params.due_date) formData.append("due_date", params.due_date);

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


export async function DeleteUser(datum) {
  return await AxiosConfig.post('/staffs/delete_staff',datum,{
    data:datum
  })
}

export async function DeleteAmenities(datum) {
  return await AxiosConfig.post('/amenities/delete',datum,{
    data:datum
  })
}

// assign amenities
export async function AssignAmenities(datum) {
  return await AxiosConfig.post('/settings/assign_amenity',datum,{
    data:datum
  })
}

export async function UnAssignAmenities(datum) {
  return await AxiosConfig.post('/settings/remove_assigned_amenitie',datum,{
    data:datum
  })
}

export async function GetAssignAmenities(datum) {
  return await AxiosConfig.post('/settings/all_customer_list',datum,{
    data:datum
  })
}


export async function GetBillsPdfDetails(datum) {
  return await AxiosConfig.get(`/get_bill_details/${datum.bill_id}`);
}

// export async function ReceiptPDFNewChanges(params) {
//   return await AxiosConfig.get('/get_receipt_details/'+params.id, {
//     params:params
//   })
// }
export async function ReceiptPDFNewChanges(params) {
  return await AxiosConfig.get('/get_receipt_details/' + params.id);
}



