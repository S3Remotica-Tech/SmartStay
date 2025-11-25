import AxiosConfig from "../../WebService/AxiosConfig"
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

export  function invoicelist() {
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export function invoiceList(invoice) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}


// v1 
// export async function UpdateInvoice(datum) {
//   return await AxiosConfig.post('/transaction/list', datum, {
//     data: datum
//   })
// }

// v2 
export async function RecordPayment(hostelId, invoiceId, data) {
  return await AxiosConfigV2.post(`/v2/transaction/${hostelId}/${invoiceId}`, data)
}



export  function ManualInvoice() {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}
export  function ManualInvoiceNumber(invoicenumber) {
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export function ManualInvoiceUserData(amountdata) {
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export  function RecurrInvoiceamountData(amountdata) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export async function AddManualInvoiceBill(manualinvoice) {
  return await AxiosConfigV2.post(`/v2/bills/manual/${manualinvoice.customerId}`, manualinvoice, {
    data: manualinvoice
  })
}
export function EditManualInvoiceBill(manualinvoice) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}
export function DeleteManualInvoiceBill(manualinvoice) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export function AddRecurringBill(manualinvoice) {
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

// v1
// export async function GetManualInvoices(datum) {
//   return await AxiosConfig.post('/get_bill_details', datum, {
//     data: datum
//   })
// }

// v2
export async function GetManualInvoices(hostelId) {
  return await AxiosConfigV2.get(`/v2/bills/${hostelId}`, {
  })
}


export async function getFinalSettlementList(customerId) {
  return await AxiosConfigV2.get(`/v2/customers/settlement/${customerId}`, {
  })
}


export async function getParticularBillsDetails(bill) {
  return await AxiosConfigV2.get(`/v2/bills/${bill.hostelId}/${bill.invoiceId}`)
}

export async function getParticularReceiptDetails(bill) {
  return await AxiosConfigV2.get(`/v2/transaction/${bill.hostelId}/${bill.transactionId}`)
}


export async function getInitializeRefund(bill) {
 
  return await AxiosConfigV2.get(`/v2/bills/refund/${bill.hostelId}/${bill.invoiceId}`)
}


export async function createRefund(bill) {
  return await AxiosConfigV2.post(`/v2/transaction/refund/${bill.hostelId}/${bill.invoiceId}`, bill, {
    data: bill
  })
}



export  function AddRecurrBillsUsers(recurr) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export  function GetRecurrBills(bills) {
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export function DeleteRecurrBills(bills) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

// v1 
// export async function GetReceiptData(receipt) {
//   return await AxiosConfig.post('/receipts/all_receipts', receipt, { 
//     data: receipt
//   })
// }

// v2 
export async function GetReceiptData(hostelId) {
  return await AxiosConfigV2.get(`/v2/bills/receipts/${hostelId}`, {
  })
}

export  function AddReceipt(receipt) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}


export  function EditReceipt(receipt) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export  function DeleteReceipt(receipt) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export  function ReferenceIdGet() {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export  function ReceiptPDf(datum) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export  function InvoicePDf(datum) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}


// v1 
// export async function GetAmenities(datum) {
//   return await AxiosConfig.post('/list/amenities-list', datum, {
//     data: datum
//   })
// }

export async function GetAmenities(hostelId) {
  return await AxiosConfigV2.get(`/v2/amenity/${hostelId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// v1 
// export async function UpdateAmenities(datum) {
//   return await AxiosConfig.post('/amenities/amnityUpdate', datum, {
//     data: datum
//   })
// }

// v2 
export async function UpdateAmenities(hostelId, amenityId, datum) {
  return await AxiosConfigV2.put(`/v2/amenity/${hostelId}/${amenityId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}




export async function AddAmenity(hostelId, datum) {
  return await AxiosConfigV2.post(`/v2/amenity/${hostelId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}




export  function InvoiceSettings(params) {
  new Promise((resolve, reject) => {
  resolve({status: 200});
})

  // const formData = new FormData();
  // if (params.profile) formData.append("profile", params.profile);
  // formData.append("hostel_Id", params.hostel_Id);
  // if (params.prefix) formData.append("prefix", params.prefix);
  // if (params.suffix) formData.append("suffix", params.suffix);
  // if (params.inv_date) formData.append("inv_date", params.inv_date);
  // if (params.due_date) formData.append("due_date", params.due_date);

  // try {
  //   const response = await AxiosConfig.post('/invoice/settings', formData, {
  //     headers: {
  //       "Content-type": "multipart/form-data",
  //     },
  //     timeout: 100000000,

  //   });
  //   return response.data;
  // } catch (error) {
  //   console.error("Axios Error", error);
  // }
}


export  function InvoiceRecurringsettings(datum) {
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post('/settings/add_recuring', datum, {
  //   data: datum
  // })
}

// v1
// export async function DeleteUser(datum) {
//   return await AxiosConfig.post('/staffs/delete_staff', datum, {
//     data: datum
//   })
// }

// v2
export async function DeleteUser(userId) {
  return await AxiosConfigV2.delete(`/v2/profile/delete-user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}


// v1 
// export async function DeleteAmenities(datum) {
//   return await AxiosConfig.post('/amenities/delete', datum, {
//     data: datum
//   })
// }

// v2 
export async function DeleteAmenities(amenityId, hostelId) {
  return await AxiosConfigV2.delete(`/v2/amenity/${amenityId}/${hostelId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}


// v1 
// export async function AssignAmenities(datum) {
//   return await AxiosConfig.post('/settings/assign_amenity', datum, {
//     data: datum
//   })
// }


// v2 
export async function AssignAmenities(hostelId, amenityId, customers) {
  return await AxiosConfigV2.put(
    `/v2/amenity/assign/${hostelId}/${amenityId}`,
    { customers },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// v1 
// export async function UnAssignAmenities(datum) {
//   return await AxiosConfig.post('/settings/remove_assigned_amenitie', datum, {
//     data: datum
//   })
// }

export async function UnAssignAmenities(hostelId, amenityId, customers) {
  return await AxiosConfigV2.put(
    `/v2/amenity/unAssign/${hostelId}/${amenityId}`,
    { customers },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}


// v1 
// export async function GetAssignAmenities(datum) {
//   return await AxiosConfig.post('/settings/all_customer_list', datum, {
//     data: datum
//   })
// }

// v2 
export async function ParticularAmentityList(hostelId, amenityId) {
  return await AxiosConfigV2.get(`/v2/amenity/${hostelId}/${amenityId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}



export async function AssignAmenitiesForTenant(datum) {
  return await AxiosConfigV2.put(
    `/v2/amenity/assign/customer/${datum.hostelId}`,datum ,{
      data: datum
    });
}

export async function UnAssignAmenitiesForTenant(datum) {
  return await AxiosConfigV2.put(
    `/v2/amenity/assign/customer/${datum.hostelId}`,datum ,{
      data: datum
    });
}











export function GetBillsPdfDetails(datum) {
  // return await AxiosConfig.get(`/get_bill_details/${datum.bill_id}`);
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

export function ReceiptPDFNewChanges(params) {
  // return await AxiosConfig.get('/get_receipt_details/' + params.id);
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
}



export function CustomerRecurringEnableDisable(recur) {
  // return await AxiosConfig.post('/add_recuring_bill_enabled', recur, {
  //   data: recur
  // })
  new Promise((resolve, reject) => {
  resolve({status: 200});
})
}
