import AxiosConfig from "../../WebService/AxiosConfig"




export async function createPgList(datum){
    return await AxiosConfig.post('/add/new-hostel',datum,{
      data:datum
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