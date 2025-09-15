import AxiosConfig from "../../WebService/AxiosConfig"


export async function userlist(users) {
  return await AxiosConfig.post('/users/user-list', users, {
    data: users
  })
}

export async function addUser(params) {

  console.log("params",params)

  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  if (params.lastname) formData.append("lastname", params.lastname)
  if (params.firstname) formData.append("firstname", params.firstname)
  if (params.Address) formData.append("Address", params.Address)
  if (params.area) formData.append("area", params.area)
  if (params.landmark) formData.append("landmark", params.landmark)
  if (params.city) formData.append("city", params.city)
  if (params.pincode) formData.append("pincode", params.pincode)
  if (params.state) formData.append("state", params.state)
  if (params.hostel_Id) formData.append("hostel_Id", params.hostel_Id)
  if (params.Email) formData.append("Email", params.Email)
  if (params.Phone) formData.append("Phone", params.Phone)
  if (params.HostelName) formData.append("HostelName", params.HostelName)
  if (params.joining_date) formData.append("joining_date", params.joining_date)
  if (params.Floor) formData.append("Floor", params.Floor)
  if (params.Rooms) formData.append("Rooms", params.Rooms)
  if (params.Bed) formData.append("Bed", params.Bed)
  if (params.AdvanceAmount) formData.append("AdvanceAmount", params.AdvanceAmount)
  if (params.RoomRent) formData.append("RoomRent", params.RoomRent)
  if (params.isadvance) formData.append("isadvance", params.isadvance)
  if (params.due_date) formData.append("due_date", params.due_date)
  if (params.invoice_date) formData.append("invoice_date", params.invoice_date)
  if (params.ID) formData.append("ID", params.ID)
     if (params.stay_type) formData.append("stay_type", params.stay_type)
    
 if (params.reasons) formData.append("reasons", JSON.stringify(params.reasons));
 if (params.booking_id) formData.append("booking_id",params.booking_id)
   if (params.booking_date) formData.append("booking_date",params.booking_date)

     if (params.booking_amount) formData.append("booking_amount",params.booking_amount)


  try {
    const response = await AxiosConfig.post('/add/adduser-list', formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
      onUploadProgress: (event) => {
        console.log("event", event)
      }
    });
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}



export async function hostelList(hosteldetails) {
  return await AxiosConfig.post('/list/hostel-list', hosteldetails, {
    data: hosteldetails
  })
}

export async function roomsCount(floorAndHostelID) {
  return await AxiosConfig.post('/list/numberOf-Rooms', floorAndHostelID, {
    data: floorAndHostelID
  })
}

export async function hosteliddetail(datum) {
  return await AxiosConfig.post('/floor_list', datum, {
    data: datum
  })
}
export async function userBillPaymentHistory() {
  return await AxiosConfig.get('/user-list/bill-payment', {
  })
}
export async function createFloor(id) {
  return await AxiosConfig.post('/floor/create-floor', id, {
    data: id
  })
}

export async function roomFullCheck(roomCheck) {
  return await AxiosConfig.post('/check/room-full', roomCheck, {
    data: roomCheck
  })
}


export async function checkOutUser(check) {
  return await AxiosConfig.post('/checkout/checkout-user', check, {
    data: check
  })
}

export async function deleteFloor(hosteID) {
  return await AxiosConfig.post('/delete/delete-floor', hosteID, {
    data: hosteID
  })
}

export async function deleteRoom(roomDetails) {
  return await AxiosConfig.post('/delete/delete-room', roomDetails, {
    data: roomDetails
  })
}

export async function deleteBed(bedDetails) {
  return await AxiosConfig.post('/delete/delete-bed', bedDetails, {
    data: bedDetails
  })
}




export async function CustomerDetails(datum) {
  return await AxiosConfig.post('/customer_details', datum, {
    data: datum
  })
}

export async function amenitieshistory(datum) {
  return await AxiosConfig.post('/user_amenities_history', datum, {
    data: datum
  })
}

export async function amnitiesnameList() {
  return await AxiosConfig.get('/list/AmnitiesName', {
  })
}
export async function amenitieAddUser(datum) {
  return await AxiosConfig.post('/add/amenity-history', datum, {
    data: datum
  })
}


export async function beddetailsNumber(bednum) {
  return await AxiosConfig.post('/bed_details', bednum, {
    data: bednum
  })
}

export async function KYCValidate(adhar) {
  return await AxiosConfig.post('/aadhar_verify_otp', adhar, {
    data: adhar
  })
}

export async function KYCValidateOtpVerify(adhar) {
  return await AxiosConfig.post('aadhaar_otp_verification', adhar, {
    data: adhar
  })
}

export async function countrylist() {
  return await AxiosConfig.get('/conutry_list', {
  })
}



export async function getWalkInCustomer(walk) {
  return await AxiosConfig.post('/get_walkin-customer', walk, {
    data: walk
  })
}






export async function AddWalkInCustomer(params) {

  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  if (params.last_name) formData.append("last_name", params.last_name)
  if (params.first_name) formData.append("first_name", params.first_name)
  if (params.Address) formData.append("Address", params.Address)
  if (params.area) formData.append("area", params.area)
  if (params.landmark) formData.append("landmark", params.landmark)
  if (params.city) formData.append("city", params.city)
  if (params.pin_code) formData.append("pin_code", params.pin_code)
  if (params.state) formData.append("state", params.state)
  if (params.hostel_id) formData.append("hostel_id", params.hostel_id)
  if (params.email_Id) formData.append("email_Id", params.email_Id)
  if (params.mobile_Number) formData.append("mobile_Number", params.mobile_Number)
  if (params.walk_In_Date) formData.append("walk_In_Date", params.walk_In_Date)
  if (params.comments) formData.append("comments", params.comments)
  if (params.id) formData.append("id", params.id)


  try {
    const response = await AxiosConfig.post('/add_walkin-customer', formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
      onUploadProgress: (event) => {
        console.log("event", event)
      }
    });
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}

export async function DeleteWalkInCustomer(walk) {
  return await AxiosConfig.post('/delete_walkin-customer', walk, {
    data: walk
  })
}





export async function getCheckOutCustomer(datum) {
  return await AxiosConfig.post('/checkout_list', datum, {
    data: datum
  })
}







export async function AddCheckOutCustomer(checkout) {
  return await AxiosConfig.post('/user_check_out', checkout, {
    data: checkout
  })
}



export async function GetConfirmCheckOut(checkout) {
  return await AxiosConfig.post('/get/confirm_checkout', checkout, {
    data: checkout
  })
}

export async function AddConfirmCheckOut(checkout) {
  return await AxiosConfig.post('/add/confirm_checkout', checkout, {
    data: checkout
  })
}


export async function EditConfirmCheckOut(checkout) {
  return await AxiosConfig.post('/edit/confirm_checkout', checkout, {
    data: checkout
  })
}


export async function DeleteCheckOutCustomer(checkout) {
  return await AxiosConfig.post('/delete_check_out', checkout, {
    data: checkout
  })
}



export async function AvailableCheckOutCustomer(checkout) {
  return await AxiosConfig.post('/available_checkout_users', checkout, {
    data: checkout
  })
}

export async function exportDetails(datum) {
  return await AxiosConfig.post('/export_details', datum, {
    data: datum
  })
}


export async function customerReAssignBed(datum) {
  return await AxiosConfig.post('/users/reassign_bed', datum, {
    data: datum
  })
}

export async function customerAddContact(datum) {
  return await AxiosConfig.post('/contacts/add_contact', datum, {
    data: datum
  })
}

export async function customerAllContact(datum) {
  console.log("datum" , datum);
  
  return await AxiosConfig.post('/users/all_contacts', datum, {
    data: datum
  })
}


export async function deleteContact(contact) {
  return await AxiosConfig.post('/contacts/delete_contact', contact, {
    data: contact
  })
}


export async function generateAdvance(datum) {
  return await AxiosConfig.post('/generate/advance_invoice', datum, {
    data: datum
  })
}



export async function uploadDocument(params) {

  const formData = new FormData();
  if (params.file1) formData.append("file1", params.file1);
  if (params.user_id) formData.append("user_id", params.user_id);
  if (params.type) formData.append("type", params.type);

  try {
    const response = await AxiosConfig.post('/users/upload_doc', formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
      onUploadProgress: (event) => {
        console.log("event", event)
      }
    });
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}




export async function deleteCustomer(contact) {
  return await AxiosConfig.post('/users/delete', contact, {
    data: contact
  })
}
export async function hostelDetailsId() {
  return await AxiosConfig.get('/list/hosteldetails', {
  })
}


export async function handleKycVerify(datum) {
  return await AxiosConfig.post('/verify-kyc', datum);
}


export async function handlegetCustomerDetailsKyc(kyc) {
  return await AxiosConfig.post('/getCustomerDetails', kyc);
}


export async function ConfirmCheckout_Due_Customer(params) {
console.log("paramsssssss",params)
  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  if (params.id) formData.append("id", params.id)
  if (params.hostel_id) formData.append("hostel_id", params.hostel_id)
  if (params.checkout_date) formData.append("checkout_date", params.checkout_date)
  if (params.reinburse) formData.append("reinburse", params.reinburse)
  if (params.reasons) formData.append("reasons", JSON.stringify(params.reasons));
  if (params.formal_checkout) formData.append("formal_checkout", params.formal_checkout)
  if (params.reason_note) formData.append("reason_note", params.reason_note)
  

  try {
    const response = await AxiosConfig.post('/update/confirm_checkout_due_customer', formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
      onUploadProgress: (event) => {
        console.log("event", event)
      }
    });
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}

export async function CustomerUnAssign(datum) {
  return await AxiosConfig.post('/unassigned-user-list', datum, {
    data: datum
  })
}

export async function backtoCheckin(datum) {
  console.log("backtoCheckin",datum)
  return await AxiosConfig.post('/reassign_checkIn', datum, {
    data: datum
  })
}


export async function checkoutDetailView(datum) {
  console.log("backtoCheckin",datum)
  return await AxiosConfig.post('checkout_detail_view', datum, {
    data: datum
  })
}


// export async function kycDocuments(datum) {
//   console.log("kycDocuments",datum)
//   return await AxiosConfig.post('/users/updateKycDocs', datum, {
//     data: datum
//   })
// }
export async function kycDocuments(datum) {
  console.log("kycDocuments", datum);
  return await AxiosConfig.post('/users/updateKycDocs', datum);
}


// export async function kycDocuments(params) {
// console.log("kycDocuments",params)
//   const formData = new FormData();
//   if (params.userId) formData.append("userId", params.userId);

//   if (params.newDocs) formData.append("newDocs", JSON.stringify(params.newDocs));
  

//   try {
//     const response = await AxiosConfig.post('/users/updateKycDocs', formData, {
//       headers: {
//         "Content-type": "multipart/form-data",
//       },
//       timeout: 100000000,
//       onUploadProgress: (event) => {
//         console.log("event", event)
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Axios Error", error);
//   }
// }
// export async function kycDocuments(params) {
//   const formData = new FormData();
//   if (params.userId) formData.append("userId", params.userId);

//   if (params.newDocs) {
//     for (let i = 0; i < params.newDocs.length; i++) {
//       const doc = params.newDocs[i];

//       formData.append(`docs[${i}][type]`, doc.type);
//       formData.append(`docs[${i}][name]`, doc.name);

//       if (doc.file) {
//         // send file so backend can upload and return URL
//         formData.append(`docs[${i}][file]`, doc.file);
//       } else if (doc.URL) {
//         // already have URL
//         formData.append(`docs[${i}][URL]`, doc.URL);
//       }
//     }
//   }

//   try {
//     const response = await AxiosConfig.post("/users/updateKycDocs", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Axios Error", error);
//   }
// }

// export async function kycDocuments(params) {
//   // Directly use the params object as the payload
//   const payload = {
//     userId: params.userId,
//     newDocs: params.newDocs.map(doc => {
//       // Create a new object for each document with only the properties you need
//       return {
//         type: doc.type,
//         name: doc.name,
//         URL: doc.URL || doc.file, // assuming your file upload function handles the URL
//       };
//     }),
//   };

//   try {
//     const response = await AxiosConfig.post("/users/updateKycDocs", payload); // Axios automatically sets Content-Type to application/json
//     return response.data;
//   } catch (error) {
//     console.error("Axios Error", error);
//     // Handle error
//   }
// }
// This is your action file
// export async function kycDocuments(params) {
//   const formData = new FormData();
//   if (params.userId) formData.append("userId", params.userId);

//   if (params.newDocs) {
//     for (let i = 0; i < params.newDocs.length; i++) {
//       const doc = params.newDocs[i];

//       // Append type and name for each document
//       formData.append(`docs[${i}][type]`, doc.type);
//       formData.append(`docs[${i}][name]`, doc.name);

//       // Check if a file object is present, and append it to FormData
//       if (doc.file) {
//         formData.append(`docs[${i}][file]`, doc.file);
//       } else if (doc.URL) {
//         // If a URL is already available, append that instead
//         formData.append(`docs[${i}][URL]`, doc.URL);
//       }
//     }
//   }

//   try {
//     const response = await AxiosConfig.post("/users/updateKycDocs", formData, {
//       headers: { "Content-Type": "multipart/form-data" }, // This header is crucial for file uploads
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Axios Error", error);
//     // Handle the error here
//   }
// }



export async function checkoutDateChange(datum) {
  console.log("checkoutDateChange",datum)
  return await AxiosConfig.post('/update_CheckoutDate', datum, {
    data: datum
  })
}