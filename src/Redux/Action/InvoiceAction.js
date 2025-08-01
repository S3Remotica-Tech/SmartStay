import AxiosConfig from "../../WebService/AxiosConfig"


export async function invoicelist() {
  return await AxiosConfig.get('/invoice/invoice-list', {
  })
}

export async function invoiceList(invoice) {
  return await AxiosConfig.post('/list/invoice-list', invoice, {
    data: invoice
  })
}

export async function UpdateInvoice(datum) {
  return await AxiosConfig.post('/transaction/list', datum, {
    data: datum
  })
}



export async function ManualInvoice() {
  return await AxiosConfig.get('/manual/manual-invoice', {
  })
}
export async function ManualInvoiceNumber(invoicenumber) {
  return await AxiosConfig.post('/get_invoice_id', invoicenumber, { 
    data: invoicenumber
  })
}

export async function ManualInvoiceUserData(amountdata) {
  return await AxiosConfig.post('/get_user_amounts', amountdata, { 
    data: amountdata
  })
}

export async function RecurrInvoiceamountData(amountdata) {
  return await AxiosConfig.post('/get_recuring_amounts', amountdata, { 
    data: amountdata
  })
}

export async function AddManualInvoiceBill(manualinvoice) {
  return await AxiosConfig.post('/add_manual_invoice', manualinvoice, { 
    data: manualinvoice
  })
}
export async function EditManualInvoiceBill(manualinvoice) {
  return await AxiosConfig.post('/edit_manual_invoice', manualinvoice, { 
    data: manualinvoice
  })
}
export async function DeleteManualInvoiceBill(manualinvoice) {
  return await AxiosConfig.post('/delete_manual_invoice', manualinvoice, { 
    data: manualinvoice
  })
}

export async function AddRecurringBill(manualinvoice) {
  return await AxiosConfig.post('/add_recuring_bill', manualinvoice, { 
    data: manualinvoice
  })
}

export async function GetManualInvoices(datum) {
  return await AxiosConfig.post('/get_bill_details', datum, {
    data: datum
  })
}

export async function AddRecurrBillsUsers(recurr) {
  return await AxiosConfig.post('/users/recuring_bill_users', recurr, {  
    data: recurr
  })
}

export async function GetRecurrBills(bills) {
  return await AxiosConfig.post('/all_recuring_bills_stay_type', bills, {  
    data: bills
  })
}

export async function DeleteRecurrBills(bills) {
  return await AxiosConfig.post('/delete_recuring_bill', bills, { 
    data: bills
  })
}

export async function GetReceiptData(receipt) {
  return await AxiosConfig.post('/receipts/all_receipts', receipt, { 
    data: receipt
  })
}

export async function AddReceipt(receipt) {
  return await AxiosConfig.post('/receipts/add', receipt, { 
    data: receipt
  })
}


export async function EditReceipt(receipt) {
  return await AxiosConfig.post('/receipts/edit', receipt, {
    data: receipt
  })
}

export async function DeleteReceipt(receipt) {
  return await AxiosConfig.post('/receipts/delete', receipt, { 
    data: receipt
  })
}

export async function ReferenceIdGet() {
  return await AxiosConfig.get('/receipts/gen_reference', { 
  })
}

export async function ReceiptPDf(datum) {
  return await AxiosConfig.post('/receipts/pdf_generate', datum, {
    data: datum
  })
}

export async function InvoicePDf(datum) {
  return await AxiosConfig.post('/invoice/invoice-list-pdf', datum, {
    data: datum
  })
}



export async function GetAmenities(datum) {
  return await AxiosConfig.post('/list/amenities-list', datum, {
    data: datum
  })
}

export async function UpdateAmenities(datum) {
  return await AxiosConfig.post('/amenities/amnityUpdate', datum, {
    data: datum
  })
}


export async function AmenitiesSettings(datum) {
  return await AxiosConfig.post('/amenities/setting', datum, {
    data: datum
  })
}


export async function InvoiceSettings(params) {

  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  formData.append("hostel_Id", params.hostel_Id);
  if (params.prefix) formData.append("prefix", params.prefix);
  if (params.suffix) formData.append("suffix", params.suffix);
  if (params.inv_date) formData.append("inv_date", params.inv_date);
  if (params.due_date) formData.append("due_date", params.due_date);

  try {
    const response = await AxiosConfig.post('/invoice/settings', formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
     
    });
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}


export async function InvoiceRecurringsettings(datum) {
  return await AxiosConfig.post('/settings/add_recuring', datum, {
    data: datum
  })
}


export async function DeleteUser(datum) {
  return await AxiosConfig.post('/staffs/delete_staff', datum, {
    data: datum
  })
}

export async function DeleteAmenities(datum) {
  return await AxiosConfig.post('/amenities/delete', datum, {
    data: datum
  })
}


export async function AssignAmenities(datum) {
  return await AxiosConfig.post('/settings/assign_amenity', datum, {
    data: datum
  })
}

export async function UnAssignAmenities(datum) {
  return await AxiosConfig.post('/settings/remove_assigned_amenitie', datum, {
    data: datum
  })
}

export async function GetAssignAmenities(datum) {
  return await AxiosConfig.post('/settings/all_customer_list', datum, {
    data: datum
  })
}


export async function GetBillsPdfDetails(datum) {
  return await AxiosConfig.get(`/get_bill_details/${datum.bill_id}`);
}

export async function ReceiptPDFNewChanges(params) {
  return await AxiosConfig.get('/get_receipt_details/' + params.id);
}



