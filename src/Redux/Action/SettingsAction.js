// import AxiosConfig from "../../WebService/AxiosConfig";
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

export async function AddExpencesCategory(Expences) {
  return await AxiosConfigV2.post(`/v2/expense/category/${Expences.hostelId}`, Expences, {
    data: Expences,
  });
}

export async function EditExpencesCategory(Expences) {
 return await AxiosConfigV2.put(`/v2/expense/category/${Expences.hostelId}/${Expences.categoryId}`, Expences, {
    data: Expences,
  });
}

export async function EditExpencesSubCategory(Expences) {
 return await AxiosConfigV2.put(`/v2/expense/subCategory/${Expences.hostelId}/${Expences.subCategoryId}`, Expences, {
    data: Expences,
  });
}


export async function ExpencesCategorylist(hostelId) {
  return await AxiosConfigV2.get(`/v2/expense/category/${hostelId}`);
}



export  function DeleteExpencesCategoryList() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  
}

// export async function Addcomplainttype(type) {
//   return await AxiosConfig.post("/complaint_types", type, {
//     data: type,
//   });
// }

// v2
export async function Addcomplainttype(type) {
  return await AxiosConfigV2.post("/v2/ComplaintType", type, {
    data: type,
  });
}
// v1
// export async function Editcomplainttype(type) {
//   return await AxiosConfig.post("/edit_complaint_type", type, {
//     data: type,
//   });
// }
// v2
export async function Editcomplainttype({ id, complaintTypeName, isActive, hostelId }) {
  return await AxiosConfigV2.put(`/v2/ComplaintType/${id}`, {
    complaintTypeName,
    isActive,
    hostelId
  }, {
    headers: {
      "Content-Type": "application/json",
    }
  });
}


// v1
// export async function Complainttypelist(hostelID) {
//   return await AxiosConfig.post("/all_complaint_types", hostelID, {
//     data: hostelID,
//   });
// }

// v2
export async function Complainttypelist(hostelId) {
  return await AxiosConfigV2.get(`/v2/ComplaintType/all-complaintTypes/${hostelId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// v1
// export async function DeletecomplaintType(types) {
//   return await AxiosConfig.post("/remove_complaint_type", types, {
//     data: types,
//   });
// }

// v2
export async function DeletecomplaintType(complaintId) {
  return await AxiosConfigV2.delete(`/v2/ComplaintType/${complaintId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}



// export async function AddEBBillingUnit(type) {
//   return await AxiosConfig.post("/add_ebbilling_settings", type, {
//     data: type,
//   });
// }


export async function AddEBBillingUnit(type) {
  return await AxiosConfigV2.put(`/v2/hostel/electricity/${type.hostelId}`, type, {
    data: type,
  });
}

// export async function GetEBBillingUnit(hostel_Id) {
//   return await AxiosConfig.post("/get_ebbilling_settings", hostel_Id, {
//     data: hostel_Id,
//   });
// }

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
        frequent: change.frequent
      },
    }
  );
}




// v1

// export async function GetAllRoles(payload) {
//   return await AxiosConfig.post("/all_roles", payload, {
//     data: payload,
//   });
// }

// v2 
export async function GetAllRoles(hostelId) {
   return await AxiosConfigV2.get(`/v2/role/hostel/${hostelId}`);
}



// v1
// export async function AddSettingRole(datum) {
//   return await AxiosConfig.post("/add_role", datum, {
//     data: datum,
//   });
// }

// v2

export async function AddSettingRole(datum) {
  return await AxiosConfigV2.post("/v2/role", datum, {
    data: datum,
  });
}



export function AddSettingPermission() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/role_permissions", datum, {
  //   data: datum,
  // });
}

// v1

// export async function editRolePermission(datum) {
//   return await AxiosConfig.post("/edit_role", datum, {
//     data: datum,
//   });
// }

// v2

export async function editRolePermission(role) {
 
  return await AxiosConfigV2.put(`/v2/role/${role.id}`, role, {
    data: role,
  });
}


// v1

// export async function deleteRolePermission(datum) {
//   return await AxiosConfig.post("/delete_role", datum, {
//     data: datum,
//   });
// }


// v2

export async function deleteRolePermission(datum) {
  return await AxiosConfigV2.delete(`/v2/role/${datum.id}`);
}



// v1
// export async function addStaffUser(datum) {
//   return await AxiosConfig.post("/add_staff_user", datum, {
//     data: datum,
//   });
// }


// v2
// export async function addStaffUser(datum) {
//   return await AxiosConfigV2.post("/v2/profile/add-user", datum, {
//     data: datum,
//   });
// }

export async function addStaffUser(hostelId, datum) {


  return await AxiosConfigV2.post(`/v2/profile/add-user/${hostelId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function EditStaffUser(hostelId, userId, datum) {

  return await AxiosConfigV2.put(`/v2/profile/users/${hostelId}/${userId}`, datum, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}


// v1
// export async function GetAllStaff(staff) {
//   return await AxiosConfig.post("/get_all_staffs", staff, {
//     data: staff,
//   });
// }

// v2
// export async function GetAllStaff() {
//  return await AxiosConfigV2.get("/v2/profile/users-list", {
//     headers: {

//       "Content-Type": "application/json",
//      },
//   });
// }



export async function GetAllStaff(hostelId) {

  return await AxiosConfigV2.get(`/v2/profile/users-list/${hostelId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}






export function GetAllReport() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.get("/all_reports", {});
}


//  v1
// export async function AddGeneral(params) {
//   const formData = new FormData();
//   if (params.f_name) formData.append("f_name", params.f_name);
//   if (params.l_name) formData.append("l_name", params.l_name);
//   if (params.mob_no) formData.append("mob_no", params.mob_no);
//   if (params.email_id) formData.append("email_id", params.email_id);
//   if (params.address) formData.append("address", params.address);
//   if (params.area) formData.append("area", params.area)
//   if (params.landmark) formData.append("landmark", params.landmark)
//   if (params.city) formData.append("city", params.city)
//   if (params.pin_code) formData.append("pin_code", params.pin_code)
//   if (params.state) formData.append("state", params.state)
//   if (params.password) formData.append("password", params.password);
//   if (params.profile) formData.append("profile", params.profile);
//   if (params.id) formData.append("id", params.id);

//   try {
//     const response = await AxiosConfig.post(
//       "/settings/add_general_user",
//       formData,
//       {
//         headers: {
//           "Content-type": "multipart/form-data",
//         },
//         timeout: 100000000,
//         onUploadProgress: (event) => {

//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Axios Error", error);
//   }
// }



// v2

export async function AddGeneral(params) {
  const formData = new FormData();

  if (params.accountInfo) {
    const accountInfoBlob = new Blob(
      [JSON.stringify(params.accountInfo)],
      { type: "application/json" }
    );
    formData.append("accountInfo", accountInfoBlob);
  }

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }
  const response = await AxiosConfigV2.post(
    "/v2/profile/add-admin",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response;

}

// export async function AddGeneral(params) {
//   const formData = new FormData();

//   if (params.accountInfo) {
//     const accountInfoBlob = new Blob(
//       [JSON.stringify(params.accountInfo)],
//       { type: "application/json" }
//     );
//     formData.append("payload", accountInfoBlob);
//   }

//   if (params.profilePic) {
//     formData.append("profilePic", params.profilePic);
//   }

//   const response = await AxiosConfigV2.post(
//     "/v2/profile/admin",  
//     formData,
//     { headers: { "Content-Type": "multipart/form-data" } }
//   );

//   return response;
// }



// export async function EditGeneral(params) {
//      const formData = new FormData();

//     const accountInfoBlob = new Blob(
//   [JSON.stringify(params.payload)],
//   { type: "application/json" }
// );
// formData.append("payload", accountInfoBlob);

//     if (params.profilePic) {
//       formData.append("profilePic", params.profilePic);
//     } 
// const response = await AxiosConfigV2.put(
//   `/v2/profile/admin/${params.adminId}`,)

//     return response;

// }

// export async function EditGeneral(params) {
//   const formData = new FormData();


//   const accountInfoBlob = new Blob(
//     [JSON.stringify(params.payload)],
//     { type: "application/json" }
//   );
//   formData.append("payload", accountInfoBlob);


//   if (params.profilePic) {
//     formData.append("profilePic", params.profilePic);
//   }

//   const response = await AxiosConfigV2.put(
//     `/v2/profile/admin/${params.adminId}`,  
//     formData,                               
//     { headers: { "Content-Type": "multipart/form-data" } } 
//   );

//   return response;
// }

// Editgeneral v2

export async function EditGeneral(params) {
 

  const formData = new FormData();
  formData.append(
    "payload",
    new Blob([JSON.stringify(params.payload)], { type: "application/json" })
  );

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic); 
  }

  const response = await AxiosConfigV2.put(
    `/v2/profile/admin/${params.adminId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response;
}




// v2

export async function getModules() {
  return await AxiosConfigV2.get(`/v2/role/modules`);
}


// v1
// export async function GetAllGeneral() {
//   return await AxiosConfig.get("/settings/all_general_users", {});
// }

export async function GetAllGeneral() {
  return await AxiosConfigV2.get("/v2/profile/admin-list", {});
}

export function passwordChangesinstaff() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/settings/change_staff_password", datum, {
  //   data: datum,
  // });
}

// v1

// export async function passwordCheck(datum) {
//   return await AxiosConfig.post("/settings/check_password", datum, {
//     data: datum,
//   });
// }

// V2

export async function passwordCheck(datum) {
  return await AxiosConfigV2.post("/v2/profile/change-password", datum, {
    data: datum,
  });
}

// v1
// export async function generalDelete(datum) {
//   return await AxiosConfig.post("/settings/delete_general_user", datum, {
//     data: datum,
//   });
// }

// v2

export async function generalDelete(userId) {
  return await AxiosConfigV2.delete(`/v2/profile/delete-admin/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}



export  function RecurringRole() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/settings/add_recuring", reccurring, {
  //   data: reccurring,
  // });
}

export  function DeleteElectricity() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/settings/delete_eb_settings", types, {
  //   data: types,
  // });
}


export  function newSubscription() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/new_subscription", types, {
  //   data: types,
  // });
}
export async function SubscriptionList(hostelId) {
  return await AxiosConfigV2.get(`/v2/subscription/${hostelId}`);
}

export async function PlanList() {
  return await AxiosConfigV2.get(`/v2/plans`);
}

export  function SubscriptionPdfDownload() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.get(`/invoice_redirect/${id}`);
}

export async function SettingsAddRecurring(reccurring) {
  return await AxiosConfigV2.put(`/v2/hostel/config/billing/${reccurring.hostelId}`, reccurring, {
    data: reccurring,
  });
}



export function GetBillsFrequncyTypes() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.get("/frequency-types",);
}

export function GetBillsNotificationTypes() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.get("/master-types", {
  //   params: { content_type: "notification_type" }
  // });
}

export async function SettingsGetRecurring(reccurring) {
  
  return await AxiosConfigV2.get(`/v2/hostel/config/billing/${reccurring.hostelId}`);
}





export  function AddInvoiceSettings() {
new Promise((resolve) => {
  resolve({status: 200});
})
  // const formData = new FormData();

  // if (params.hostelId) formData.append("hostelId", params.hostelId);
  // if (params.bankName) formData.append("bank_name", params.bankName);
  // if (params.accountNo) formData.append("account_no", params.accountNo);
  // if (params.ifscCode) formData.append("ifsc_code", params.ifscCode);
  // if (params.paymentMethods) formData.append("payment_methods", JSON.stringify(params.paymentMethods));
  // if (params.prefix) formData.append("prefix", params.prefix);
  // if (params.suffix) formData.append("suffix", params.suffix);
  // if (params.tax) formData.append("tax", params.tax);
  // if (params.notes) formData.append("notes", params.notes);
  // if (params.privacyPolicy) formData.append("privacyPolicy", params.privacyPolicy);
  // if (params.signature) formData.append("signature", params.signature);
  // if (params.bank_id) formData.append("bank_id", params.bank_id);

  // try {
  //   const response = await AxiosConfig.post(
  //     "/invoice-settings",
  //     formData,
  //     {
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //       },
  //       timeout: 100000,
  //     }
  //   );
  //   return response.data;
  // } catch (error) {
  //   console.error("Axios Error", error);
  //   throw error;
  // }
}


export function SettingsGetInvoice() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.get(`/getInvoice-settings/${Invoice.hostel_id}`);
}



export  function AddBillTemplate() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // const formData = new FormData();

  // // File uploads
  // if (params.logo_url) formData.append("logo_url", params.logo_url);
  // if (params.digital_signature_url) formData.append("digital_signature_url", params.digital_signature_url);
  // if (params.qr_url) formData.append("qr_url", params.qr_url);

  // // Text fields
  // if (params.is_logo_specific_template) formData.append("is_logo_specific_template", params.is_logo_specific_template);
  // if (params.contact_number) formData.append("contact_number", params.contact_number);
  // if (params.is_contact_specific_template) formData.append("is_contact_specific_template", params.is_contact_specific_template);
  // if (params.email) formData.append("email", params.email);
  // if (params.is_email_specific_template) formData.append("is_email_specific_template", params.is_email_specific_template);
  // if (params.is_signature_specific_template) formData.append("is_signature_specific_template", params.is_signature_specific_template);
  // if (params.hostel_Id) formData.append("hostel_Id", params.hostel_Id);
  // if (params.id) formData.append("id", params.id);
  // if (params.prefix) formData.append("prefix", params.prefix);
  // if (params.suffix) formData.append("suffix", params.suffix);
  // if (params.banking_id) formData.append("banking_id", params.banking_id);
  // if (params.tax) formData.append("tax", params.tax);
  // if (params.notes) formData.append("notes", params.notes);
  // if (params.terms_and_condition) formData.append("terms_and_condition", params.terms_and_condition);
  // if (params.template_theme) formData.append("template_theme", params.template_theme);

  // try {
  //   const response = await AxiosConfig.post("/BillTemplateSetting", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     timeout: 100000000,
     
  //   });

  //   return response.data;
  // } catch (error) {
  //   console.error("Error uploading bill template:", error);
  // }
}

// v1

// export async function getTemplateList(template) {
//   return await AxiosConfig.post("/FetchTemplateListDetails", template);
// }


// v2

export async function getTemplateList(hostelId) {
  return await AxiosConfigV2.get(`/v2/hostel/config/${hostelId}`);
}



// v1

// export async function AddGlobalSettingTemplate(params) {
//   const formData = new FormData();

//   if (params.is_logo_specific_template !== undefined)
//     formData.append("is_logo_specific_template", JSON.stringify(params.is_logo_specific_template));

//   if (params.contact_number)
//     formData.append("contact_number", params.contact_number);

//   if (params.is_contact_specific_template !== undefined)
//     formData.append("is_contact_specific_template", JSON.stringify(params.is_contact_specific_template));

//   if (params.email)
//     formData.append("email", params.email);

//   if (params.is_email_specific_template !== undefined)
//     formData.append("is_email_specific_template", JSON.stringify(params.is_email_specific_template));

//   if (params.is_signature_specific_template !== undefined)
//     formData.append("is_signature_specific_template", JSON.stringify(params.is_signature_specific_template));

//   if (params.hostel_Id)
//     formData.append("hostel_Id", params.hostel_Id);

//   if (params.logo_url) formData.append("logo_url", params.logo_url);


//   if (params.digital_signature_url) formData.append("digital_signature_url", params.digital_signature_url);

//   try {
//     const response = await AxiosConfig.post(
//       "/BillTemplateGlobalSetting",
//       formData,
//       {
//         headers: {
//           "Content-type": "multipart/form-data",
//         },
//         timeout: 100000,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Axios Error", error);
//     throw error;
//   }
// }



// v2


export async function AddGlobalSettingTemplate(params) {
  try {
    const formData = new FormData();


    if (params.hostelLogo) formData.append("hostelLogo", params.hostelLogo);
    if (params.billSignature) formData.append("billSignature", params.billSignature);
    if (params.invLogo) formData.append("invLogo", params.invLogo);
    if (params.invSign) formData.append("invSign", params.invSign);
    if (params.qrCode) formData.append("qrCode", params.qrCode)
    if (params.receiptLogo) formData.append("receiptLogo", params.receiptLogo)
    if (params.receiptSign) formData.append("receiptSign", params.receiptSign)

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

    // const filteredPayload = Object.fromEntries(
    //   Object.entries(requestPayload).filter(([_, v]) => v !== undefined && v !== null && v !== "")
    // );


    // const hasAnyDetail = Object.keys(filteredPayload).some(
    //   (key) => key !== "templateTypeId"
    // );

    // if (hasAnyDetail) {
    //   filteredPayload.templateTypeId = params.templateTypeId;

    //   formData.append(
    //     "request",
    //     new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
    //   );
    // }

formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
      );

    const queryParams = new URLSearchParams({
      mobile: params.mobile,
      email: params.email,
      isMobileCustomized: params.isMobileCustomized,
      isSignatureCustomized: params.isSignatureCustomized,
      isEmailCustomized: params.isEmailCustomized,
      isLogoCustomized: params.isLogoCustomized

    }).toString();

    const response = await AxiosConfigV2.post(
      `/v2/hostel/config/${params.hostelId}?${queryParams}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000,
      }
    );

    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}




export  function SettingsGetGlobal() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/FetchTemplateList", datum, {
  //   data: datum,
  // });
}

