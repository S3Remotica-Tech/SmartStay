import AxiosConfig from "../../WebService/AxiosConfig"


export async function userlist() {
    return await AxiosConfig.get('/users/user-list',{
    })
  }
export async function addUser (datum) {
  return await AxiosConfig.post('/add/adduser-list',datum,{
    data:datum
  })
}
export async function hostelList() {
  return await AxiosConfig.get('/list/hostel-list',{
  })
}
export async function roomsCount(floorAndHostelID){
  return await AxiosConfig.post('/list/numberOf-Rooms',floorAndHostelID,{
    data:floorAndHostelID
  })
}
export async function bedCount(bedid){
  return await AxiosConfig.post('/list/numberOf-Bed',bedid,{
    data:bedid
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
  console.log("roomCheck",roomCheck)
  return await AxiosConfig.post('/check/room-full',roomCheck,{
    data:roomCheck
  })
}
export async function bedCountinglist(id) {
  console.log("id.....bedid",id)
  return await AxiosConfig.post('/list/bed-list', id,{
    data:id
  })
}