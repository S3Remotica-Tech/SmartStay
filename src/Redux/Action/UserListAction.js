import AxiosConfig from "../../WebService/AxiosConfig"
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";


// v1

// export async function userlist(users) {
//   return await AxiosConfig.post('/users/user-list', users, {
//     data: users
//   })
// }


// v2

export async function userlist(users) {
  return await AxiosConfigV2.get(`/v2/customers/${users.hostel_id}`,{
    params: {
      name: users.name || "",  
      type: users.type || ""   
    }
  })
}


// v2


export async function cancelBookingGet(customerId) {
  return await AxiosConfigV2.get(`/v2/bookings/initialize/cancel/${customerId}`)
}



// v1

// export async function addUser(params) {

//   console.log("params",params)

//   const formData = new FormData();
//   if (params.profile) formData.append("profile", params.profile);
//   if (params.lastname) formData.append("lastname", params.lastname)
//   if (params.firstname) formData.append("firstname", params.firstname)
//   if (params.Address) formData.append("Address", params.Address)
//   if (params.area) formData.append("area", params.area)
//   if (params.landmark) formData.append("landmark", params.landmark)
//   if (params.city) formData.append("city", params.city)
//   if (params.pincode) formData.append("pincode", params.pincode)
//   if (params.state) formData.append("state", params.state)
//   if (params.hostel_Id) formData.append("hostel_Id", params.hostel_Id)
//   if (params.Email) formData.append("Email", params.Email)
//   if (params.Phone) formData.append("Phone", params.Phone)
//   if (params.HostelName) formData.append("HostelName", params.HostelName)
//   if (params.joining_date) formData.append("joining_date", params.joining_date)
//   if (params.Floor) formData.append("Floor", params.Floor)
//   if (params.Rooms) formData.append("Rooms", params.Rooms)
//   if (params.Bed) formData.append("Bed", params.Bed)
//   if (params.AdvanceAmount) formData.append("AdvanceAmount", params.AdvanceAmount)
//   if (params.RoomRent) formData.append("RoomRent", params.RoomRent)
//   if (params.isadvance) formData.append("isadvance", params.isadvance)
//   if (params.due_date) formData.append("due_date", params.due_date)
//   if (params.invoice_date) formData.append("invoice_date", params.invoice_date)
//   if (params.ID) formData.append("ID", params.ID)
//      if (params.stay_type) formData.append("stay_type", params.stay_type)

//  if (params.reasons) formData.append("reasons", JSON.stringify(params.reasons));
//  if (params.booking_id) formData.append("booking_id",params.booking_id)
//    if (params.booking_date) formData.append("booking_date",params.booking_date)

//      if (params.booking_amount) formData.append("booking_amount",params.booking_amount)


//   try {
//     const response = await AxiosConfig.post('/add/adduser-list', formData, {
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


// v2



export async function addUser(params) {

  const formData = new FormData();

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }


  if (params.customerInfo) {
    const customerInfoBlob = new Blob(
      [JSON.stringify(params.customerInfo)],
      { type: "application/json" }
    );
    formData.append("customerInfo", customerInfoBlob);
  }

  try {
    const response = await AxiosConfigV2.post(
      `/v2/customers/${params.hostelId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,

      }
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}


// v1


// export async function hostelList(hosteldetails) {
//   return await AxiosConfig.post('/list/hostel-list', hosteldetails, {
//     data: hosteldetails
//   })
// }


// v2 all pg details 

export async function hostelList() {
  return await AxiosConfigV2.get('/v2/hostel')
}

// v2 single pg details


export async function getParticularHostelList(hostel) {
  return await AxiosConfigV2.get(`/v2/hostel/${hostel.hostel_id}`, hostel, {
    data: hostel
  })
}


// v2  check in api 

export async function CheckIn(CheckIn) {
  return await AxiosConfigV2.post(`/v2/customers/check-in/${CheckIn.customerId}`, CheckIn, {
    data: CheckIn
  })
}




// export async function CheckIn(params) {

//   const formData = new FormData();

//   if (params.profilePic) {
//     formData.append("profilePic", params.profilePic);
//   }


//   if (params.payLoads) {
//     const payLoadsBlob = new Blob(
//       [JSON.stringify(params.customerInfo)],
//       { type: "application/json" }
//     );
//     formData.append("payLoads", payLoadsBlob);
//   }

//   try {
//     const response = await AxiosConfigV2.post(
//       `/v2/customers/check-in/${params.customerId}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         timeout: 100000000,

//       }
//     );
//     return response;
//   } catch (error) {
//     console.error("Axios Error", error);
//     throw error;
//   }
// }



// v2  save-info



export async function customerSaveInfo(params) {


  const formData = new FormData();

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }


  if (params.payloads) {
    const payloadBlob = new Blob(
      [JSON.stringify(params.payloads)],
      { type: "application/json" }
    );
    formData.append("payloads", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.post(
      `/v2/customers/save/${params.hostelId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,

      }
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
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


// v1
// export async function createFloor(id) {
//   return await AxiosConfig.post('/floor/create-floor', id, {
//     data: id
//   })
// }

// v2

export async function createFloor(id) {
  return await AxiosConfigV2.post('/v2/floor', id, {
    data: id
  })
}

// v2 Get all floor details

export async function GetAllFloor(id) {
  return await AxiosConfigV2.get(`/v2/floor/all-floors/${id.hostel_id}`)
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

// v1

// export async function deleteFloor(hosteID) {
//   return await AxiosConfig.post('/delete/delete-floor', hosteID, {
//     data: hosteID
//   })
// }



// v2
export async function deleteFloor(floorId) {
  return await AxiosConfigV2.delete(`/v2/floor/${floorId.floor_Id}`)
}


// v1

// export async function deleteRoom(roomDetails) {
//   return await AxiosConfig.post('/delete/delete-room', roomDetails, {
//     data: roomDetails
//   })
// }

// v2
export async function deleteRoom(roomDetails) {
  return await AxiosConfigV2.delete(`/v2/room/${roomDetails.roomId}`)
}

export async function deleteBed(bedDetails) {
  return await AxiosConfig.post('/delete/delete-bed', bedDetails, {
    data: bedDetails
  })
}


// v1

// export async function CustomerDetails(datum) {
//   return await AxiosConfig.post('/customer_details', datum, {
//     data: datum
//   })
// }


// v2

export async function CustomerDetails(datum) {
   return await AxiosConfigV2.get(`/v2/customers/details/${datum.customerId}`)
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




export async function availableBedDetails(bednum) {
  return await AxiosConfigV2.get(`/v2/hostel/free-beds/${bednum.hostelId}`)
}



export async function bookedDetails(booked) {
  return await AxiosConfigV2.get(`/v2/bookings/initialize-check-in/${booked.hostelId}/${booked.customerId}`)
}


export async function availableBedDetailsForDate(bednum) {
  return await AxiosConfigV2.get(
    `/v2/bed/initialize/${bednum.hostelId}`,
    {
      params: {
        joiningDate: bednum.joiningDate
      }
    }
  );
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
  return await AxiosConfigV2.post(`/v2/customers/notice/${checkout.hostelId}`, checkout,{
      data: checkout
    });
}

// export async function AddCheckOutCustomer(payload) {
//   return await AxiosConfigV2.post(
//     `/v2/customers/notice/${payload.hostelId}/${payload.customerId}`,
//     {}, 
//     {
//       params: {
//         requestDate: payload.requestDate,
//         checkoutDate: payload.checkoutDate,
//         reason: payload.reason
//       }
//     }
//   );
// }




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

// v1 
// export async function customerReAssignBed(datum) {
//   return await AxiosConfig.post('/users/reassign_bed', datum, {
//     data: datum
//   })
// }

export async function customerReAssignBed(hostelId , customerId , datum) {
  return await AxiosConfigV2.post(`/v2/customers/change-bed/${hostelId}/${customerId}` , datum, {
      headers: {
      "Content-Type": "application/json",
    },
  })
}


export async function customerAddContact(datum) {
  return await AxiosConfig.post('/contacts/add_contact', datum, {
    data: datum
  })
}

export async function customerAllContact(datum) {


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
      
    });
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}

export async function CustomerUnAssign(customer) {
  return await AxiosConfigV2.get(`/v2/customers/${customer.hostel_id}`, {
    params: {
      type: customer.type
    }
  });
}


export async function backtoCheckin(datum) {

  return await AxiosConfig.post('reassign_checkIn', datum, {
    data: datum
  })
}


export async function checkoutDetailView(datum) {

  return await AxiosConfig.post('checkout_detail_view', datum, {
    data: datum
  })
}



export async function addRoomReading(reading) {

  return await AxiosConfigV2.post(`/v2/electricity/${reading.hostelId}`, reading, {
    data: reading
  })
}


export async function getRoomReading(hostelId) {
  return await AxiosConfigV2.get(`/v2/electricity/${hostelId}`)
}


export async function getParticularRoomReading(reading) {
  return await AxiosConfigV2.get(`/v2/electricity/${reading.hostelId}/${reading.roomId}`)
}



export async function getCustomerReading(hostelId) {
  return await AxiosConfigV2.get(`/v2/electricity/customers/${hostelId}`)
}

export async function getParticularCustomerReading(custom) {
  return await AxiosConfigV2.get(`/v2/electricity/customers/${custom.hostelId}/${custom.customerId}`)
}



export async function bookingToCheckIn(customer) {

  return await AxiosConfigV2.post(`/v2/customers/booked/check-in/${customer.customerId}`, customer, {
    data: customer
  })
}