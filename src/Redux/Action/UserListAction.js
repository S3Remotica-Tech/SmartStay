import AxiosConfig from "../../WebService/AxiosConfig"


export async function userlist(users) {
    return await AxiosConfig.post('/users/user-list',users,{
      data:users
    })
  }
export async function addUser (datum) {
  return await AxiosConfig.post('/add/adduser-list',datum,{
    data:datum
  })
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