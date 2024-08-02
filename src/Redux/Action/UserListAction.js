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
  console.log("param", params)

  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  if (params.lastname) formData.append("lastname", params.lastname)
  if (params.firstname) formData.append("firstname", params.firstname)
  if (params.Address) formData.append("Address", params.Address)
  if (params.hostel_Id) formData.append("hostel_Id", params.hostel_Id)
  if (params.Email) formData.append("Email", params.Email)
    if (params.Phone) formData.append("Phone", params.Phone)
      if (params.HostelName) formData.append("HostelName", params.HostelName)
    
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
    console.log("response for Api", response);
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

export async function hosteliddetail(id) {
  return await AxiosConfig.post('/floor_list', id,{
    data:id
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
//   console.log("Useraction",UserDetails)
//   return await AxiosConfig.post('/customer_details',datum,{
//     data:datum
//   })
// }

export async function CustomerDetails (datum) {
  console.log("datum,,,,,,",datum)
  return await AxiosConfig.post('/customer_details',datum,{
    data:datum
  })
}

export async function amenitieshistory (datum) {
  console.log("datum,,,,,,his",datum)
  return await AxiosConfig.post('/user_amenities_history',datum,{
    data:datum
  })
}

export async function amnitiesnameList() {
  return await AxiosConfig.get('/list/AmnitiesName',{
  })
}
export async function amenitieAddUser (datum) {
  console.log("datum,,,,,,",datum)
  return await AxiosConfig.post('/add/amenity-history',datum,{
    data:datum
  })
}


export async function beddetailsNumber (bednum) {
  console.log("bednum,,,,,,",bednum)
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
