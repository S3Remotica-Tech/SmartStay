import AxiosConfig from "../../WebService/AxiosConfig"


export async function AddBooking(datum){
  console.log("Bookingdatum",datum)
    return await AxiosConfig.post('/add_booking',datum,{
      data:datum
    })
  }

  export async function GetAddBooking() {
    return await AxiosConfig.get('/all_bookings',{
    })
  }
  export async function DeleteBooking(datum) {
    return await AxiosConfig.post("/delete_booking", datum, {
      data: datum,
    });
  }
  export async function assignBooking(datum){
   
      return await AxiosConfig.post('/assign_booking',datum,{
        data:datum
      })
    }


    export async function assignBookingBed(datum){
      console.log("Bookingassignbooking",datum)
        return await AxiosConfig.post('/available_beds',datum,{
          data:datum
        })
      }