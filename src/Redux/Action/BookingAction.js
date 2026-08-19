import AxiosConfigV2 from "../../WebService/AxiosConfigV2";
import qs from "qs";

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
  if (book.name) params.name = book.name;
  if (book.floor) params.floor = book.floor;
  if (book.room) params.room = book.room;
  if (book.minAmount) params.minAmount = book.minAmount;
  if (book.maxAmount) params.maxAmount = book.maxAmount;
  if (book.page) params.page = book.page;
  if (book.size) params.size = book.size;
  if (book.period) params.period = book.period;

  return await AxiosConfigV2.get(`/v2/bills/advances/${book.hostelId}`, {
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

export async function getRetainerInvoice(hostel) {
  return await AxiosConfigV2.get(
    `/v2/retainer/get/${hostel.hostelId}/${hostel.invoiceId}`,
  );
}

export async function ApplyRetainerInvoice(retainer) {
  return await AxiosConfigV2.post(
    `/v2/retainer/redeem/${retainer.hostelId}/${retainer.invoiceId}`,
    {
      appliedAmount: retainer.appliedAmount,
      redeemedOn: retainer.redeemedOn,
      comments: retainer.comments,
      retainersBreakup: retainer.retainersBreakup,
    },
  );
}

export async function ApplyAdvanceInvoice(advance) {
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

export const NavigateToBack = (book) => {
  return {
    type: "SAVE_NAVIGATE_RETAINER",
    payload: book,
  };
};

export async function getAllRetainerInvoice(hostelId, filters = {}) {
  return AxiosConfigV2.get(`/v2/bills/advances/basic-list/${hostelId}`, {
    params: {
      // startDate: filters.startDate,
      // endDate: filters.endDate,
      // type: filters.type,
      // createdBy: filters.createdBy,
      // modes: filters.modes,
      // paymentStatus: filters.paymentStatus,
      searchKey: filters.searchKey,
      size: filters.size,
      page: filters.page,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}
