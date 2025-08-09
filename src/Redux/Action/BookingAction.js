import AxiosConfig from "../../WebService/AxiosConfig"




export async function AddBooking(datum) {

  const formData = new FormData();


  if (datum.id) formData.append('id', datum.id);
  if (datum.profile) formData.append('profile', datum.profile);
  if (datum.f_name) formData.append('f_name', datum.f_name);
  if (datum.l_name) formData.append('l_name', datum.l_name);
  if (datum.joining_date) formData.append('joining_date', datum.joining_date);
   if (datum.booking_date) formData.append('booking_date', datum.booking_date);
  if (datum.amount) formData.append('amount', datum.amount);
  if (datum.hostel_id) formData.append('hostel_id', datum.hostel_id);
  if (datum.mob_no) formData.append('mob_no', datum.mob_no);
  if (datum.email_id) formData.append('email_id', datum.email_id);
  if (datum.address) formData.append('address', datum.address);
  if (datum.area) formData.append("area", datum.area)
  if (datum.landmark) formData.append("landmark", datum.landmark)
  if (datum.city) formData.append("city", datum.city)
  if (datum.pin_code) formData.append("pin_code", datum.pin_code)
  if (datum.state) formData.append("state", datum.state)
 

  try {
   
    const response = await AxiosConfig.post('/add_booking', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      timeout: 100000000,
      
    });

    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error; 
  }
}


  export async function GetAddBooking(booking) {
    return await AxiosConfig.post('/all_bookings',booking, {
      data:booking
    })
  }
  export async function DeleteBooking(datum) {
    return await AxiosConfig.post("/delete_booking", datum, {
      data: datum,
    });
  }

  export async function assignBooking(datum){
      const response =  await AxiosConfig.post('/assign_booking',datum,{
        data:datum
      }) 
      return response
    }


    export async function assignBookingBed(datum){
        return await AxiosConfig.post('/available_beds',datum,{
          data:datum
        })
      }
       export async function bookingInActive(datum){
        return await AxiosConfig.post('/Booking_Inactive',datum,{
          data:datum
        })
      }