import AxiosConfig from "../../WebService/AxiosConfig"


// export async function AddBooking(datum){
//   console.log("Bookingdatum",datum)
//     return await AxiosConfig.post('/add_booking',datum,{
//       data:datum
//     })
//   }

export async function AddBooking(datum) {
  console.log("Booking data:", datum);

  const formData = new FormData();

  // Append each field from datum to the FormData
  if (datum.id) formData.append('id', datum.id);
  if (datum.profile) formData.append('profile', datum.profile);
  if (datum.f_name) formData.append('f_name', datum.f_name);
  if (datum.l_name) formData.append('l_name', datum.l_name);
  if (datum.joining_date) formData.append('joining_date', datum.joining_date);
  if (datum.amount) formData.append('amount', datum.amount);
  if (datum.hostel_id) formData.append('hostel_id', datum.hostel_id);
  if (datum.mob_no) formData.append('mob_no', datum.mob_no);
  if (datum.email_id) formData.append('email_id', datum.email_id);
  if (datum.address) formData.append('address', datum.address);

  try {
    // Send a POST request with formData
    const response = await AxiosConfig.post('/add_booking', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      timeout: 100000000,
      onUploadProgress: (event) => {
        console.log('Upload progress:', event);
      },
    });

    console.log("Response from API:", response);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error; // Optionally rethrow to handle it in the calling code
  }
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
   
      const response =  await AxiosConfig.post('/assign_booking',datum,{
        data:datum
      })
      console.log('assignbookinggg',response);
      
      return response
    }


    export async function assignBookingBed(datum){
      console.log("Bookingassignbooking",datum)
        return await AxiosConfig.post('/available_beds',datum,{
          data:datum
        })
      }