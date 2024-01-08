import AxiosConfig from "../../WebService/AxiosConfig"


export async function userlist() {
    return await AxiosConfig.get('/users/user-list',{
    })
  }
export async function addUser (datum) {
  console.log("datum",datum);
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
export async function hosteliddetail(id) {
  console.log("id",id);
  return await AxiosConfig.post('/floor_list', id,{
    data:id
  })
}
export async function userBillPaymentHistory() {
  return await AxiosConfig.get('/user-list/bill-payment',{
  })
}