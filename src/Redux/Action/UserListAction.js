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
