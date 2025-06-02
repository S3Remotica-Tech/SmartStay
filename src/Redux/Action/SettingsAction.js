import AxiosConfig from "../../WebService/AxiosConfig";

export async function AddExpencesCategory(Expences) {
  return await AxiosConfig.post("/add/expense-category", Expences, {
    data: Expences,
  });
}

export async function EditExpencesCategory(Expences) {
  return await AxiosConfig.post("/edit/expense_category", Expences, {
    data: Expences,
  });
}

export async function ExpencesCategorylist(Expences) {
  return await AxiosConfig.post("/get/expense-category", Expences, {
    data: Expences,
  });
}



export async function DeleteExpencesCategoryList(expences) {
  return await AxiosConfig.post("/delete/delete-category", expences, {
    data: expences,
  });
}

export async function Addcomplainttype(type) {
  return await AxiosConfig.post("/complaint_types", type, {
    data: type,
  });
}

export async function Editcomplainttype(type) {
  return await AxiosConfig.post("/edit_complaint_type", type, {
    data: type,
  });
}

export async function Complainttypelist(hostelID) {
  return await AxiosConfig.post("/all_complaint_types", hostelID, {
    data: hostelID,
  });
}

export async function DeletecomplaintType(types) {
  return await AxiosConfig.post("/remove_complaint_type", types, {
    data: types,
  });
}

export async function AddEBBillingUnit(type) {
  return await AxiosConfig.post("/add_ebbilling_settings", type, {
    data: type,
  });
}

export async function GetEBBillingUnit(hostel_Id) {
  return await AxiosConfig.post("/get_ebbilling_settings", hostel_Id, {
    data: hostel_Id,
  });
}

export async function GetAllRoles(payload) {
  return await AxiosConfig.post("/all_roles", payload, {
    data: payload,
  });
}

export async function AddSettingRole(datum) {
  return await AxiosConfig.post("/add_role", datum, {
    data: datum,
  });
}

export async function AddSettingPermission(datum) {
  return await AxiosConfig.post("/role_permissions", datum, {
    data: datum,
  });
}
export async function editRolePermission(datum) {
  return await AxiosConfig.post("/edit_role", datum, {
    data: datum,
  });
}

export async function deleteRolePermission(datum) {
  return await AxiosConfig.post("/delete_role", datum, {
    data: datum,
  });
}

export async function addStaffUser(datum) {
  return await AxiosConfig.post("/add_staff_user", datum, {
    data: datum,
  });
}

export async function GetAllStaff(staff) {
  return await AxiosConfig.post("/get_all_staffs", staff, {
    data: staff,
  });
}

export async function GetAllReport() {
  return await AxiosConfig.get("/all_reports", {});
}

export async function AddGeneral(params) {
  const formData = new FormData();
  if (params.f_name) formData.append("f_name", params.f_name);
  if (params.l_name) formData.append("l_name", params.l_name);
  if (params.mob_no) formData.append("mob_no", params.mob_no);
  if (params.email_id) formData.append("email_id", params.email_id);
  if (params.address) formData.append("address", params.address);
  if (params.area) formData.append("area", params.area)
  if (params.landmark) formData.append("landmark", params.landmark)
  if (params.city) formData.append("city", params.city)
  if (params.pin_code) formData.append("pin_code", params.pin_code)
  if (params.state) formData.append("state", params.state)
  if (params.password) formData.append("password", params.password);
  if (params.profile) formData.append("profile", params.profile);
  if (params.id) formData.append("id", params.id);

  try {
    const response = await AxiosConfig.post(
      "/settings/add_general_user",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        timeout: 100000000,
        onUploadProgress: (event) => {
          console.log("event", event);
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}

export async function GetAllGeneral() {
  return await AxiosConfig.get("/settings/all_general_users", {});
}
export async function passwordChangesinstaff(datum) {
  return await AxiosConfig.post("/settings/change_staff_password", datum, {
    data: datum,
  });
}


export async function passwordCheck(datum) {
  return await AxiosConfig.post("/settings/check_password", datum, {
    data: datum,
  });
}

export async function generalDelete(datum) {
  return await AxiosConfig.post("/settings/delete_general_user", datum, {
    data: datum,
  });
}

export async function RecurringRole(reccurring) {
  return await AxiosConfig.post("/settings/add_recuring", reccurring, {
    data: reccurring,
  });
}

export async function DeleteElectricity(types) {
  return await AxiosConfig.post("/settings/delete_eb_settings", types, {
    data: types,
  });
}


export async function newSubscription(types) {
  return await AxiosConfig.post("/new_subscription", types, {
    data: types,
  });
}
export async function SubscriptionList(customerId) {
  return await AxiosConfig.get(`/invoice_details/${customerId}`);
}

export async function SubscriptionPdfDownload(id) {
  return await AxiosConfig.get(`/invoice_redirect/${id}`);
}

export async function SettingsAddRecurring(reccurring) {
  return await AxiosConfig.post("/add-recuringBill", reccurring, {
    data: reccurring,
  });
}

export async function GetBillsFrequncyTypes() {
  return await AxiosConfig.get("/frequency-types",);
}

export async function GetBillsNotificationTypes() {
  return await AxiosConfig.get("/master-types", {
    params: { content_type: "notification_type" }
  });
}

export async function SettingsGetRecurring(reccurring) {
  return await AxiosConfig.get(`/getRecurringBills/${reccurring.hostel_id}`);
}





export async function AddInvoiceSettings(params) {
  const formData = new FormData();

  if (params.hostelId) formData.append("hostel_id", params.hostelId);
  if (params.bankName) formData.append("bank_name", params.bankName);
  if (params.accountNo) formData.append("account_no", params.accountNo);
  if (params.ifscCode) formData.append("ifsc_code", params.ifscCode);
  if (params.paymentMethods) formData.append("payment_methods", JSON.stringify(params.paymentMethods));
  if (params.prefix) formData.append("prefix", params.prefix);
  if (params.suffix) formData.append("suffix", params.suffix);
  if (params.tax) formData.append("tax", params.tax);
  if (params.notes) formData.append("notes", params.notes);
  if (params.privacyPolicy) formData.append("privacy_policy", params.privacyPolicy);
  if (params.signature) formData.append("signature", params.signature);
  if (params.bankingId) formData.append("banking_id", params.bankingId);

  try {
    const response = await AxiosConfig.post(
      "/invoice-settings",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        timeout: 100000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}
