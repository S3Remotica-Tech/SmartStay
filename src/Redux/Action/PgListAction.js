import AxiosConfig from "../../WebService/AxiosConfig"




export async function createPgList(datum){
    return await AxiosConfig.post('/add/new-hostel',datum,{
      data:datum
    })
  }
  export async function Checkeblist(datum){
    return await AxiosConfig.post('/EB/Hostel_Room_based',datum,{
      data:datum
    })
  }

  export async function CreateEbbill(datum){
    return await AxiosConfig.post('/ebamount/setting',datum,{
      data:datum
    })
  }

  export async function EB_Customerlist() {
    return await AxiosConfig.get('/list/eb_list',{
    })
  }

  export async function EB_startmeterlist() {
    return await AxiosConfig.get('/list/Ebstartmeter',{
    })
  }

  export async function createRoom(datum){
    return await AxiosConfig.post('/room/create-room',datum,{
      data:datum
    })
  }

  export async function CheckRoomId() {
    return await AxiosConfig.get('/room-id/check-room-id',{
    })
  }


  export async function CheckBedDetails(datum){
    return await AxiosConfig.post('/bed/bed-details',datum,{
      data:datum
    })
  }

  export async function createAllPGDetails(datum){
    console.log("datum",datum)
    return await AxiosConfig.post('/list/dashboard',datum,{
      data:datum
    })
  }
