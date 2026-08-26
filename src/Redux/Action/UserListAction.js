import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

export async function userlist(users) {
  const params = {};

  if (users.name) params.name = users.name;
  if (users.type) params.type = users.type;
  if (users.page) params.page = users.page;
  if (users.size) params.size = users.size;
  if (users.period) params.period = users.period;
  if (users.sharingType) params.sharingType = users.sharingType;

  return await AxiosConfigV2.get(`/v2/customers/${users.hostel_id}`, {
    params,
  });
}

export async function tenantSearch(tenant) {
  const params = {};

  if (tenant.search) params.search = tenant.search;
  return await AxiosConfigV2.get(`/v3/customers/search/${tenant.hostelId}`, {
    params,
  });
}

export async function draftTenantSearch(customerId) {
  return await AxiosConfigV2.get(`/v3/customers/draftDetails/${customerId}`);
}

export async function SaveDraftTenant(tenant) {
  const formData = new FormData();

  if (tenant.profilePic) {
    formData.append("profilePic", tenant.profilePic);
  }

  if (tenant.aadharPic) {
    formData.append("aadharPic", tenant.aadharPic);
  }

  if (tenant.panPic) {
    formData.append("panPic", tenant.panPic);
  }

  if (tenant.request) {
    const requestBlob = new Blob([JSON.stringify(tenant.request)], {
      type: "application/json",
    });

    formData.append("request", requestBlob);
  }

  try {
    const response = await AxiosConfigV2.post(
      `/v3/customers/saveDraft/${tenant.hostelId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      },
    );

    return response;
  } catch (error) {
    console.error("Save Draft Error:", error);
    throw error;
  }
}

export async function UpdateSaveDraftTenant(tenant) {
  const formData = new FormData();

  if (tenant.profilePic) {
    formData.append("profilePic", tenant.profilePic);
  }

  if (tenant.aadharPic) {
    formData.append("aadharPic", tenant.aadharPic);
  }

  if (tenant.panPic) {
    formData.append("panPic", tenant.panPic);
  }

  if (tenant.request) {
    const requestBlob = new Blob([JSON.stringify(tenant.request)], {
      type: "application/json",
    });

    formData.append("request", requestBlob);
  }

  try {
    const response = await AxiosConfigV2.put(
      `/v3/customers/saveDraft/${tenant.hostelId}/${tenant.customerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      },
    );

    return response;
  } catch (error) {
    console.error("Save Draft Error:", error);
    throw error;
  }
}

export async function TenantListGet({ hostelId, purpose }) {
  return await AxiosConfigV2.get(`/v2/customers/get/${hostelId}`, {
    params: {
      purpose: purpose,
    },
  });
}

export async function cancelBookingGet(customerId) {
  return await AxiosConfigV2.get(
    `/v2/bookings/initialize/cancel/${customerId}`,
  );
}

export async function KYCReminder(customerId) {
  return await AxiosConfigV2.post(`/v2/kyc/request/${customerId}`);
}

export async function cancelCheckoutInitialize(customer) {
  return await AxiosConfigV2.get(
    `/v2/customers/cancel-checkout/initialize/${customer.hostelId}/${customer.customerId}`,
  );
}

export async function addUser(params) {
  const formData = new FormData();

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }

  if (params.customerInfo) {
    const customerInfoBlob = new Blob([JSON.stringify(params.customerInfo)], {
      type: "application/json",
    });
    formData.append("customerInfo", customerInfoBlob);
  }

  try {
    const response = await AxiosConfigV2.post(
      `/v2/customers/${params.hostelId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      },
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export async function CheckInTenantAdditional(params) {
  const formData = new FormData();

  if (params.additionalData) {
    formData.append(
      "additionalData",
      new Blob([JSON.stringify(params.additionalData)], {
        type: "application/json",
      }),
    );
  }

  if (params.aadhaarPic) {
    formData.append("aadhaarPic", params.aadhaarPic);
  }

  if (params.panPic) {
    formData.append("panPic", params.panPic);
  }

  try {
    const response = await AxiosConfigV2.put(
      `/v3/customers/additional-details/${params.hostelId}/${params.customerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Axios Error:", error.response?.data || error);
    throw error;
  }
}

export async function hostelList() {
  return await AxiosConfigV2.get("/v2/hostel");
}

export async function getParticularHostelList(hostel) {
  return await AxiosConfigV2.get(`/v2/hostel/${hostel.hostel_id}`, hostel, {
    data: hostel,
  });
}

export async function RemoveRentRevision(rent) {
  return await AxiosConfigV2?.put(
    `/v2/bookings/rent/${rent.hostelId}/${rent.customerId}/cancel-upcoming-rent`,
  );
}

export async function CheckIn(CheckIn) {
  return await AxiosConfigV2.post(
    `/v2/customers/check-in/${CheckIn.customerId}`,
    CheckIn,
    {
      data: CheckIn,
    },
  );
}

export async function UpdateJobDetails(job) {
  return await AxiosConfigV2.put(
    `/v3/customers/job/${job.hostelId}/${job.customerId}`,
    job,
    {
      data: job,
    },
  );
}

export async function DirectCheckIn(CheckIn) {
  return await AxiosConfigV2.post(
    `/v3/customers/check-in/${CheckIn.hostelId}/${CheckIn.customerId}`,
    CheckIn,
    {
      data: CheckIn,
    },
  );
}

export async function BookingToCheckInV3(CheckIn) {
  return await AxiosConfigV2.post(
    `/v3/customers/booked/check-in/${CheckIn.hostelId}/${CheckIn.customerId}`,
    CheckIn,
    {
      data: CheckIn,
    },
  );
}

export async function customerSaveInfo(params) {
  const formData = new FormData();

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }

  if (params.aadharPic instanceof File) {
    formData.append("aadharPic", params.aadharPic);
  }

  if (params.panPic instanceof File) {
    formData.append("panPic", params.panPic);
  }

  if (params.payloads) {
    const payloadBlob = new Blob([JSON.stringify(params.payloads)], {
      type: "application/json",
    });
    formData.append("payloads", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.post(
      `/v2/customers/save/${params.hostelId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      },
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export function roomsCount() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function hosteliddetail() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
export function userBillPaymentHistory() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function createFloor(id) {
  return await AxiosConfigV2.post("/v2/floor", id, {
    data: id,
  });
}

export async function GetAllFloor(id) {
  return await AxiosConfigV2.get(`/v2/floor/all-floors/${id.hostel_id}`);
}

export async function roomFullCheck() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function checkOutUser() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function deleteFloor(floorId) {
  return await AxiosConfigV2.delete(`/v2/floor/${floorId.floor_Id}`);
}

export async function deleteRoom(roomDetails) {
  return await AxiosConfigV2.delete(`/v2/room/${roomDetails.roomId}`);
}

export function deleteBed() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function CustomerDetails(datum) {
  return await AxiosConfigV2.get(`/v2/customers/details/${datum.customerId}`);
}

export function amenitieshistory() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function amnitiesnameList() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
export function amenitieAddUser() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function availableBedDetails(bednum) {
  return await AxiosConfigV2.get(`/v2/hostel/free-beds/${bednum.hostelId}`);
}

export async function bookedDetails(booked) {
  return await AxiosConfigV2.get(
    `/v2/bookings/initialize-check-in/${booked.hostelId}/${booked.customerId}`,
  );
}

export async function availableBedDetailsForDate(bednum) {
  return await AxiosConfigV2.get(`/v2/bed/initialize/${bednum.hostelId}`, {
    params: {
      joiningDate: bednum.joiningDate,
    },
  });
}

export function KYCValidate() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function KYCValidateOtpVerify() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function getWalkInCustomer() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function AddWalkInCustomer() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function DeleteWalkInCustomer() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function getCheckOutCustomer(hostel) {
  return await AxiosConfigV2.get(`/v2/customers/checkout/${hostel.hostelId}`);
}

export async function editBasicDetails(params) {
  const formData = new FormData();

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }

  if (params.payloads) {
    const payloadBlob = new Blob([JSON.stringify(params.payloads)], {
      type: "application/json",
    });
    formData.append("payloads", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.put(
      `/v2/customers/update/${params.customerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      },
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export async function AddCheckOutCustomer(checkout) {
  return await AxiosConfigV2.post(
    `/v2/customers/notice/${checkout.hostelId}`,
    checkout,
    {
      data: checkout,
    },
  );
}

export async function CancelCheckOutCustomer(checkout) {
  return await AxiosConfigV2.post(
    `/v2/customers/cancel-checkout/${checkout.hostelId}/${checkout.customerId}`,
    checkout,
    {
      data: checkout,
    },
  );
}

export function GetConfirmCheckOut() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function AddConfirmCheckOut() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function EditConfirmCheckOut() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function DeleteCheckOutCustomer() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function AvailableCheckOutCustomer() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function exportDetails() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function customerReAssignBed(hostelId, customerId, datum) {
  return await AxiosConfigV2.post(
    `/v2/customers/change-bed/${hostelId}/${customerId}`,
    datum,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function customerAddContact(contact) {
  return await AxiosConfigV2.put(
    `/v2/customers/additional-contacts/${contact.hostelId}/${contact.customerId}`,
    contact,
  );
}

export function customerAllContact() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function deleteContact() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function generateAdvance() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function uploadDocument() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function deleteCustomer(tenant) {
  return await AxiosConfigV2.delete(
    `/v2/customers/${tenant.hostelId}/${tenant.customerId}`,
  );
}

export function hostelDetailsId() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function handleKycVerify() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function handlegetCustomerDetailsKyc() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function ConfirmCheckout_Due_Customer() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function CustomerUnAssign(customer) {
  return await AxiosConfigV2.get(`/v2/customers/${customer.hostel_id}`, {
    params: {
      type: customer.type,
    },
  });
}

export async function tenantCustomizeData(customer) {
  return await AxiosConfigV2.put(
    `/v2/table-config/customers/${customer.hostelId}`,
    customer.customize,
  );
}

export async function settlePayment(params) {
  const formData = new FormData();

  if (params.images) {
    formData.append("images", params.images);
  }

  if (params.payLoads) {
    const payloadBlob = new Blob([JSON.stringify(params.payLoads)], {
      type: "application/json",
    });
    formData.append("payLoads", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.post(
      `/v2/vendors/settle/${params.vendorId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      },
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export async function settlePaymentExpense(params) {
  const formData = new FormData();

  if (params.images) {
    formData.append("images", params.images);
  }

  if (params.payLoads) {
    const payloadBlob = new Blob([JSON.stringify(params.payLoads)], {
      type: "application/json",
    });
    formData.append("payLoads", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.post(
      `/v2/expense/settle/${params.expenseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      },
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export function backtoCheckin() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function checkoutDetailView() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function addRoomReading(reading) {
  return await AxiosConfigV2.post(
    `/v2/electricity/${reading.hostelId}`,
    reading,
    {
      data: reading,
    },
  );
}

export async function ResetReading(reading) {
  return await AxiosConfigV2.post(
    `/v2/electricity/reset/${reading.hostelId}`,
    reading,
    {
      data: reading,
    },
  );
}

export async function finalAddRoomReading(reading) {
  return await AxiosConfigV2.post(`/v2/${reading.hostelId}`, reading, {
    data: reading,
  });
}
export async function editHostelReading(payload) {
  return await AxiosConfigV2.put(
    `/v2/electricity/${payload.hostelId}/${payload.readingId}`,
    null,
    {
      params: {
        reading: payload.reading,
        entryDate: payload?.entryDate,
      },
    },
  );
}

export async function getRoomReading(hostelId) {
  return await AxiosConfigV2.get(`/v2/electricity/${hostelId}`);
}

export async function deleteReading(hostel) {
  return await AxiosConfigV2.delete(
    `/v2/electricity/${hostel.hostelId}/${hostel.readingId}`,
  );
}

export async function getParticularRoomReading(reading) {
  return await AxiosConfigV2.get(
    `/v2/electricity/${reading.hostelId}/${reading.roomId}`,
  );
}

export async function getCustomerReading(hostelId) {
  return await AxiosConfigV2.get(`/v2/electricity/customers/${hostelId}`);
}

export async function getParticularCustomerReading(custom) {
  return await AxiosConfigV2.get(
    `/v2/electricity/customers/${custom.hostelId}/${custom.customerId}`,
  );
}

export async function bookingToCheckIn(customer) {
  return await AxiosConfigV2.post(
    `/v2/customers/booked/check-in/${customer.customerId}`,
    customer,
    {
      data: customer,
    },
  );
}

export async function GenerateDetails(customerId, data) {
  return await AxiosConfigV2.post(
    `/v2/customers/settlement/${customerId}`,
    data,
    {},
  );
}

export async function conformCheckout(customer) {
  return await AxiosConfigV2.post(
    `/v2/bookings/checkout/${customer.customerId}`,
    customer,
    {
      data: customer,
    },
  );
}

export async function EditTenantAmount(change) {
  return await AxiosConfigV2.put(
    `/v2/bookings/rent/${change.hostelId}/${change.bookingId}`,
    {},
    {
      params: {
        joiningDate: change.updateInfo.joiningDate,
        reason: change.updateInfo.reason,
        effectiveDate: change.updateInfo.effectiveDate,
        newRent: change.updateInfo.newRent,
      },
    },
  );
}

export async function editAdvanceAmount(advance) {
  return await AxiosConfigV2.put(
    `/v2/bookings/advance/${advance.hostelId}/${advance.bookingId}`,
    advance,
    {
      data: advance,
    },
  );
}

export async function getInitializeCheckout(hostel) {
  return await AxiosConfigV2.post(
    `/v2/bookings/initialize/checkout/${hostel.hostelId}/${hostel.customerId}`,
  );
}

export async function TenantUploadDocument(params) {
  const formData = new FormData();
  if (params.files?.length) {
    params.files.forEach((item) => {
      if (item.file instanceof File) {
        formData.append("files", item.file);
      }
    });
  }

  if (params.payload) {
    const payloadBlob = new Blob([JSON.stringify(params.payload)], {
      type: "application/json",
    });
    formData.append("payload", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.post(
      `/v2/documents/${params.hostelId}/${params.customerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      },
    );

    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export async function deleteTenantUploadDocument(document) {
  return await AxiosConfigV2.delete(
    `/v2/documents/${document.hostelId}/${document.customerId}/${document.documentId}`,
  );
}

export async function deleteTemplatesImages({
  hostelId,
  templateId,
  templateTypeId,
  type,
}) {
  return AxiosConfigV2.delete(
    `/v2/hostel/config/${hostelId}/${templateId}/${templateTypeId}`,
    { data: { type } },
  );
}

export async function deleteGloblTemplatesImages({
  hostelId,
  templateId,
  type,
}) {
  return AxiosConfigV2.delete(
    `/v2/hostel/config/template/${hostelId}/${templateId}`,
    { data: { type } },
  );
}

export async function CustomerListGet({ hostelId, purpose }) {
  return await AxiosConfigV2.get(`/v2/customers/get/${hostelId}`, {
    params: {
      purpose: purpose,
    },
  });
}

export async function CreateRetainerInvoice(retainer) {
  return await AxiosConfigV2.post(
    `/v2/retainer/${retainer.hostelId}/${retainer.customerId}`,
    retainer,
    {
      data: retainer,
    },
  );
}

export async function deleteDraftTenant(hostel) {
  return await AxiosConfigV2.delete(
    `/v3/customers/draft/${hostel.hostelId}/${hostel.customerId}`,
  );
}
