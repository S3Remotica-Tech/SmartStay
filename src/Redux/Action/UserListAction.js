import AxiosConfig from "../../WebService/AxiosConfig"


export async function userlist(users) {
    return await AxiosConfig.post('/users/user-list',users,{
      data:users
    })
  }
// export async function addUser (datum) {
//   return await AxiosConfig.post('/add/adduser-list',datum,{
//     data:datum
//   })
// }
export async function addUser(params) {

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
  if(params.Floor) formData.append("Floor" ,params.Floor)
  if(params.Rooms) formData.append("Rooms" ,params.Rooms)
  if(params.Bed) formData.append("Bed" ,params.Bed)
  if(params.AdvanceAmount) formData.append("AdvanceAmount" ,params.AdvanceAmount)
  if(params.RoomRent) formData.append("RoomRent" ,params.RoomRent)
  if(params.ID) formData.append("ID", params.ID)


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
  return await AxiosConfig.post('/list/hostel-list',hosteldetails,{
    data:hosteldetails
  })
}

export async function roomsCount(floorAndHostelID){
  return await AxiosConfig.post('/list/numberOf-Rooms',floorAndHostelID,{
    data:floorAndHostelID
  })
}

export async function hosteliddetail(datum) {
  return await AxiosConfig.post('/floor_list', datum,{
    data:datum
  })
}
export async function userBillPaymentHistory() {
  return await AxiosConfig.get('/user-list/bill-payment',{
  })
}
export async function createFloor(id) {
  return await AxiosConfig.post('/floor/create-floor', id,{
    data:id
  })
}

export async function roomFullCheck(roomCheck){
  return await AxiosConfig.post('/check/room-full',roomCheck,{
    data:roomCheck
  })
}


export async function checkOutUser(check) {
  return await AxiosConfig.post('/checkout/checkout-user', check,{
    data:check
  })
}

export async function deleteFloor(hosteID){
return await AxiosConfig.post('/delete/delete-floor',hosteID,{
  data:hosteID
})
}

export async function deleteRoom(roomDetails){
  return await AxiosConfig.post('/delete/delete-room',roomDetails,{
    data:roomDetails
  })
}

export async function deleteBed(bedDetails){
  return await AxiosConfig.post('/delete/delete-bed',bedDetails,{
    data:bedDetails
  })
}


// export async function CustomerDetails(datum){
//   return await AxiosConfig.post('/customer_details',datum,{
//     data:datum
//   })
// }

export async function CustomerDetails (datum) {
  return await AxiosConfig.post('/customer_details',datum,{
    data:datum
  })
}

export async function amenitieshistory (datum) {
  return await AxiosConfig.post('/user_amenities_history',datum,{
    data:datum
  })
}

export async function amnitiesnameList() {
  return await AxiosConfig.get('/list/AmnitiesName',{
  })
}
export async function amenitieAddUser (datum) {
  return await AxiosConfig.post('/add/amenity-history',datum,{
    data:datum
  })
}


export async function beddetailsNumber (bednum) {
  return await AxiosConfig.post('/bed_details',bednum,{
    data:bednum
  })
}

export async function KYCValidate(adhar) {
  return await AxiosConfig.post('/aadhar_verify_otp',adhar,{
    data:adhar
  })
}

export async function KYCValidateOtpVerify(adhar) {
  return await AxiosConfig.post('aadhaar_otp_verification',adhar,{
    data:adhar
  })
}

export async function countrylist() {
  return await AxiosConfig.get('/conutry_list',{
  })
}



export async function getWalkInCustomer(walk) {
  return await AxiosConfig.post('/get_walkin-customer',walk,{
    data:walk
  })
}






export async function AddWalkInCustomer(walk) {
  return await AxiosConfig.post('/add_walkin-customer',walk,{
    data:walk
  })
}


export async function DeleteWalkInCustomer(walk) {
  return await AxiosConfig.post('/delete_walkin-customer',walk,{
    data:walk
  })
}





export async function getCheckOutCustomer(datum) {
  return await AxiosConfig.post('/checkout_list',datum,{
    data:datum
  })
}

 





export async function AddCheckOutCustomer(checkout) {
  return await AxiosConfig.post('/user_check_out',checkout,{
    data:checkout
  })
}



export async function GetConfirmCheckOut(checkout) {
  return await AxiosConfig.post('/get/confirm_checkout',checkout,{
    data:checkout
  })
}

export async function AddConfirmCheckOut(checkout) {
  return await AxiosConfig.post('/add/confirm_checkout',checkout,{
    data:checkout
  })
}


export async function DeleteCheckOutCustomer(checkout) {
  return await AxiosConfig.post('/delete_check_out',checkout,{
    data:checkout
  })
}



export async function AvailableCheckOutCustomer(checkout) {
  return await AxiosConfig.post('/available_checkout_users',checkout,{
    data:checkout
  })
}

export async function exportDetails(datum) {
  return await AxiosConfig.post('/export_details',datum,{
    data:datum
  })
}


export async function customerReAssignBed(datum) {
  return await AxiosConfig.post('/users/reassign_bed',datum,{
    data:datum
  })
}

export async function customerAddContact(datum) {
  return await AxiosConfig.post('/contacts/add_contact',datum,{
    data:datum
  })
}

export async function customerAllContact(datum) {
  return await AxiosConfig.post('/users/all_contacts',datum,{
    data:datum
  })
}


export async function deleteContact(contact){
  return await AxiosConfig.post('/contacts/delete_contact',contact,{
    data:contact
  })
}


export async function generateAdvance(datum){
  return await AxiosConfig.post('/generate/advance_invoice',datum,{
    data:datum
  })
}


// export async function uploadDocument(datum){
//   return await AxiosConfig.post('/users/upload_doc',datum,{
//     data:datum
//   })
// }

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




export async function deleteCustomer(contact){
  return await AxiosConfig.post('/users/delete',contact,{
    data:contact
  })
}
export async function hostelDetailsId() {
  return await AxiosConfig.get('/list/hosteldetails',{
  })
}