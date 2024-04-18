import AxiosConfig from "../../WebService/AxiosConfig"




export async function createPgList(datum){
    return await AxiosConfig.post('/add/new-hostel',datum,{
      data:datum
    })
  }
  export async function Checkeblist(datum){
    console.log("ebdata",datum);
    return await AxiosConfig.post('/EB/Hostel_Room_based',datum,{
      data:datum
    })
  }

  export async function CreateEbbill(datum){
    console.log("ebbill",datum);
    return await AxiosConfig.post('/ebamount/setting',datum,{
      data:datum
    })
  }

  export async function createRoom(datum){
    console.log("datum",datum);
    return await AxiosConfig.post('/room/create-room',datum,{
      data:datum
    })
  }

  export async function CheckRoomId() {
    return await AxiosConfig.get('/room-id/check-room-id',{
    })
  }


  export async function CheckBedDetails(datum){
    console.log("datum",datum);
    return await AxiosConfig.post('/bed/bed-details',datum,{
      data:datum
    })
  }
