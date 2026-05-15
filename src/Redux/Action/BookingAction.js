// import AxiosConfig from "../../WebService/AxiosConfig"
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

// export async function AddBooking(datum) {

//   const formData = new FormData();

//   if (datum.id) formData.append('id', datum.id);
//   if (datum.profile) formData.append('profile', datum.profile);
//   if (datum.f_name) formData.append('f_name', datum.f_name);
//   if (datum.l_name) formData.append('l_name', datum.l_name);
//   if (datum.joining_date) formData.append('joining_date', datum.joining_date);
//    if (datum.booking_date) formData.append('booking_date', datum.booking_date);
//   if (datum.amount) formData.append('amount', datum.amount);
//   if (datum.hostel_id) formData.append('hostel_id', datum.hostel_id);
//   if (datum.mob_no) formData.append('mob_no', datum.mob_no);
//   if (datum.email_id) formData.append('email_id', datum.email_id);
//   if (datum.address) formData.append('address', datum.address);
//   if (datum.area) formData.append("area", datum.area)
//   if (datum.landmark) formData.append("landmark", datum.landmark)
//   if (datum.city) formData.append("city", datum.city)
//   if (datum.pin_code) formData.append("pin_code", datum.pin_code)
//   if (datum.state) formData.append("state", datum.state)

//   try {

//     const response = await AxiosConfig.post('/add_booking', formData, {
//       headers: {
//         'Content-type': 'multipart/form-data',
//       },
//       timeout: 100000000,

//     });

//     return response.data;
//   } catch (error) {
//     console.error("Axios Error:", error);
//     throw error;
//   }
// }

// v1

// export async function AddBooking(datum) {

//   const formData = new FormData();

//   if (datum.id) formData.append('id', datum.id);
//   if (datum.profile) formData.append('profile', datum.profile);
//   if (datum.f_name) formData.append('f_name', datum.f_name);
//   if (datum.l_name) formData.append('l_name', datum.l_name);
//   if (datum.joining_date) formData.append('joining_date', datum.joining_date);
//    if (datum.booking_date) formData.append('booking_date', datum.booking_date);
//   if (datum.amount) formData.append('amount', datum.amount);
//   if (datum.hostel_id) formData.append('hostel_id', datum.hostel_id);
//   if (datum.mob_no) formData.append('mob_no', datum.mob_no);
//   if (datum.email) formData.append('email', datum.email);
//   if (datum.address) formData.append('address', datum.address);
//   if (datum.area) formData.append("area", datum.area)
//   if (datum.landmark) formData.append("landmark", datum.landmark)
//   if (datum.city) formData.append("city", datum.city)
//   if (datum.pin_code) formData.append("pin_code", datum.pin_code)
//   if (datum.floor_id) formData.append("floor_id", datum.floor_id)
//   if (datum.room_id) formData.append("room_id", datum.room_id)
//   if (datum.bed_id) formData.append("bed_id", datum.bed_id)
//   if (datum.customer_Id) formData.append("customer_Id", datum.customer_Id)
//   if (datum.state) formData.append("state", datum.state)

//   try {

//     const response = await AxiosConfig.post('/add_booking', formData, {
//       headers: {
//         'Content-type': 'multipart/form-data',
//       },
//       timeout: 100000000,

//     });

//     return response.data;
//   } catch (error) {
//     console.error("Axios Error:", error);
//     throw error;
//   }
// }

// v2

export async function AddBooking(booking) {
  return await AxiosConfigV2.post(
    `/v2/customers/booking/${booking.hostelId}`,
    booking,
    {
      data: booking,
    },
  );
}

export async function GetBooking(book) {
  const params = {};
  // if (users.name) params.name = users.name;
  // if (users.type) params.type = users.type;
  if (book.page) params.page = book.page;
  if (book.size) params.size = book.size;
  // if (users.period) params.period = users.period;
  // if (users.sharingType) params.sharingType = users.sharingType;
  return await AxiosConfigV2.get(`/v2/bills/advances/new/${book.hostelId}`, {
    params,
  });
}

export async function ApplyInvoice(booking) {
  return await AxiosConfigV2.post(
    `/v2/bills/redeem/${booking?.hostelId}/${booking?.invoiceId}`,
    {
      listItems: booking?.listItems,
    },
  );
}

export async function advanceRedeemInitialize(hostel) {
  return await AxiosConfigV2.get(
    `/v2/bills/redeem/initialize/${hostel.hostelId}/${hostel.advanceInvoiceId}`,
  );
}

export async function ApplyAdvanceInvoice(advance) {
  // console.log("advance", advance);

  return await AxiosConfigV2.get(
    `/v2/bills/advances/${advance.hostelId}/${advance.invoiceId}`,
    {
      params: {
        type: advance.type,
      },
    },
  );
}

export function DeleteBooking() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function assignBooking() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function assignBookingBed() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function bookingInActive(book) {
  return await AxiosConfigV2.put(
    `/v2/bookings/cancel/${book.customerId}`,
    book,
    {
      data: book,
    },
  );
}

export async function bookingCustomizeData(book) {
  return await AxiosConfigV2.put(
    `/v2/table-config/bookings/${book.hostelId}`,
    book.customize,
  );
}
