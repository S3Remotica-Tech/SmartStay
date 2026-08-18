import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

export async function AddExpencesCategory(Expences) {
  return await AxiosConfigV2.post(
    `/v2/expense/category/${Expences.hostelId}`,
    Expences,
    {
      data: Expences,
    },
  );
}

export async function EditExpencesCategory(Expences) {
  return await AxiosConfigV2.put(
    `/v2/expense/category/${Expences.hostelId}/${Expences.categoryId}`,
    Expences,
    {
      data: Expences,
    },
  );
}

export async function EditExpencesSubCategory(Expences) {
  return await AxiosConfigV2.put(
    `/v2/expense/subCategory/${Expences.hostelId}/${Expences.subCategoryId}`,
    Expences,
    {
      data: Expences,
    },
  );
}

export async function ExpencesCategorylist(hostelId) {
  return await AxiosConfigV2.get(`/v2/expense/category/${hostelId}`);
}

export async function VendorCategoryList(hostelId) {
  return await AxiosConfigV2.get("/v2/vendors/categories", {
    params: {
      hostelId,
    },
  });
}

export async function AddVendorCategory(vendor) {
  return await AxiosConfigV2.post(`/v2/vendors/categories`, vendor, {
    data: vendor,
  });
}

export async function UpdateVendorCategory(vendor) {
  return await AxiosConfigV2.put(
    `/v2/vendors/categories/${vendor.categoryId}`,
    vendor,
    {
      params: {
        hostelId: vendor.hostelId,
      },
    },
  );
}

export async function DeleteVendorCategoryList(category) {
  return await AxiosConfigV2.post(
    `/v2/vendors/categories/${category.categoryId}/delete`,
    null,
    {
      params: {
        hostelId: category.hostelId,
      },
    },
  );
}

export function DeleteExpencesCategoryList() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function Addcomplainttype(type) {
  return await AxiosConfigV2.post("/v2/ComplaintType", type, {
    data: type,
  });
}

export async function Editcomplainttype({
  id,
  complaintTypeName,
  isActive,
  hostelId,
}) {
  return await AxiosConfigV2.put(
    `/v2/ComplaintType/${id}`,
    {
      complaintTypeName,
      isActive,
      hostelId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function Complainttypelist(hostelId) {
  return await AxiosConfigV2.get(
    `/v2/ComplaintType/all-complaintTypes/${hostelId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function DeletecomplaintType(complaintId) {
  return await AxiosConfigV2.delete(`/v2/ComplaintType/${complaintId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function AddEBBillingUnit({ hostelId, ebConfigs }) {
  return await AxiosConfigV2.put(
    `/v2/hostel/electricity/config/${hostelId}`,
    null,
    {
      params: {
        typeofReading: ebConfigs.typeofReading,
        charge: ebConfigs.charge,
        shouldIncludeInRent: ebConfigs.shouldIncludeInRent,
      },
    },
  );
}

export async function GetEBBillingUnit(hostelId) {
  return await AxiosConfigV2.get(`/v2/hostel/electricity/${hostelId}`);
}

export async function ChangeRoomHostelElectricity(change) {
  return await AxiosConfigV2.put(
    `/v2/hostel/electricity/config/${change.hostelId}`,
    {},
    {
      params: {
        isRoomBased: change.isRoomBased,
        isHostelBased: change.isHostelBased,
        isProRate: change.isProRate,
        calculationStartingDate: change.calculationStartingDate,
        frequent: change.frequent,
      },
    },
  );
}

export async function GetAllRoles(hostelId) {
  return await AxiosConfigV2.get(`/v2/role/hostel/${hostelId}`);
}

export async function AddSettingRole(datum) {
  return await AxiosConfigV2.post("/v2/role", datum, {
    data: datum,
  });
}

export function AddSettingPermission() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function editRolePermission(role) {
  return await AxiosConfigV2.put(`/v2/role/${role.id}`, role, {
    data: role,
  });
}

export async function deleteRolePermission(datum) {
  return await AxiosConfigV2.delete(`/v2/role/${datum.id}`);
}

export async function addStaffUser(hostelId, datum) {
  return await AxiosConfigV2.post(`/v2/profile/add-user/${hostelId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function EditStaffUser(hostelId, userId, datum) {
  return await AxiosConfigV2.put(
    `/v2/profile/users/${hostelId}/${userId}`,
    datum,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function GetAllStaff(hostelId) {
  return await AxiosConfigV2.get(`/v2/profile/users-list/${hostelId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function GetAllReport() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function AddGeneral(params) {
  const formData = new FormData();

  if (params.accountInfo) {
    const accountInfoBlob = new Blob([JSON.stringify(params.accountInfo)], {
      type: "application/json",
    });
    formData.append("accountInfo", accountInfoBlob);
  }

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }
  const response = await AxiosConfigV2.post("/v2/profile/add-admin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response;
}

export async function EditGeneral(params) {
  const formData = new FormData();
  formData.append(
    "payload",
    new Blob([JSON.stringify(params.payload)], { type: "application/json" }),
  );

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }

  const response = await AxiosConfigV2.put(
    `/v2/profile/admin/${params.adminId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response;
}

export async function getModules() {
  return await AxiosConfigV2.get(`/v2/role/modules`);
}

export async function GetAllGeneral() {
  return await AxiosConfigV2.get("/v2/profile/admin-list", {});
}

export function passwordChangesinstaff() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function passwordCheck(datum) {
  return await AxiosConfigV2.post("/v2/profile/change-password", datum, {
    data: datum,
  });
}

export async function generalDelete(userId) {
  return await AxiosConfigV2.delete(`/v2/profile/delete-admin/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function RecurringRole() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function DeleteElectricity() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function upgradePlan(plan) {
  return await AxiosConfigV2.post(
    `/v2/subscription/subscribe/${plan.hostelId}`,
    plan,
  );
}

export async function CurrentSubscriptionPlan(hostelId) {
  return await AxiosConfigV2.get(`/v2/plans/${hostelId}`);
}

export async function PlanList() {
  return await AxiosConfigV2.get(`/v2/plans`);
}

export function SubscriptionPdfDownload() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function SettingsAddRecurring(reccurring) {
  return await AxiosConfigV2.put(
    `/v2/hostel/config/billing/${reccurring.hostelId}`,
    reccurring,
    {
      data: reccurring,
    },
  );
}

export function GetBillsFrequncyTypes() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function GetBillsNotificationTypes() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function SettingsGetRecurring(reccurring) {
  return await AxiosConfigV2.get(
    `/v2/hostel/config/billing/${reccurring.hostelId}`,
  );
}

export function AddInvoiceSettings() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function SettingsGetInvoice() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function AddBillTemplate() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function getTemplateList(hostelId) {
  return await AxiosConfigV2.get(`/v2/hostel/config/${hostelId}`);
}

export async function AddGlobalSettingTemplate(params) {
  try {
    const formData = new FormData();

    if (params.hostelLogo) formData.append("hostelLogo", params.hostelLogo);
    if (params.billSignature)
      formData.append("billSignature", params.billSignature);
    if (params.invLogo) formData.append("invLogo", params.invLogo);
    if (params.invSign) formData.append("invSign", params.invSign);
    if (params.qrCode) formData.append("qrCode", params.qrCode);
    if (params.receiptLogo) formData.append("receiptLogo", params.receiptLogo);
    if (params.receiptSign) formData.append("receiptSign", params.receiptSign);

    const requestPayload = {
      templateTypeId: params.templateTypeId,
      prefix: params.prefix,
      suffix: params.suffix,
      gstPercentile: params.gstPercentile,
      bankId: params.bankId,
      invoiceNotes: params.invoiceNotes,
      receiptNotes: params.receiptNotes,
      invoiceTermsAndCondition: params.invoiceTermsAndCondition,
      receiptTermsAndCondition: params.receiptTermsAndCondition,
      invoiceTemplateColor: params.invoiceTemplateColor,
      receiptTemplateColor: params.receiptTemplateColor,
      invoicePhoneNumber: params.invoicePhoneNumber,
      receiptPhoneNumber: params.receiptPhoneNumber,
      invoiceMailId: params.invoiceMailId,
      receiptMailId: params.receiptMailId,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(requestPayload)], { type: "application/json" }),
    );

    const queryParams = new URLSearchParams({
      mobile: params.mobile,
      email: params.email,
      isMobileCustomized: params.isMobileCustomized,
      isSignatureCustomized: params.isSignatureCustomized,
      isEmailCustomized: params.isEmailCustomized,
      isLogoCustomized: params.isLogoCustomized,
    }).toString();

    const response = await AxiosConfigV2.post(
      `/v2/hostel/config/${params.hostelId}?${queryParams}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000,
      },
    );

    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export function SettingsGetGlobal() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
