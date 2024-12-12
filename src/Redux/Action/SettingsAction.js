import AxiosConfig from "../../WebService/AxiosConfig";

export async function AddExpencesCategory(Expences) {

    console.log("Expences",Expences);
    return await AxiosConfig.post('/add/expense-category',Expences,{
      data:Expences
    })
  }

  export async function EditExpencesCategory(Expences) {
    console.log("Expences",Expences);
    return await AxiosConfig.post('/edit/expense_category',Expences,{
      data:Expences
    })
  }


  export async function ExpencesCategorylist(Expences) {
    return await AxiosConfig.post('/get/expense-category', Expences,{
      data: Expences
    })
  }  

  // export async function DeleteExpencesCategoryList(expences) {
  //   return await AxiosConfig.post('/delete/delete-category', expences, {
  //     data: expences
  //   })
  // }

  // export async function Addcomplainttype(type) {
  //   console.log("Expences",type);
  //   return await AxiosConfig.post('/complaint_types',type,{
  //     data:type
  //   })
  // }


  // export async function Complainttypelist() {
  //   return await AxiosConfig.get('/all_complaint_types',{
  //   })
  // }  

  // export async function DeletecomplaintType(types) {
  //   return await AxiosConfig.post('/remove_complaint_type', types, {
  //     data: types
  //   })
  // }

 

// export async function ExpencesCategorylist() {
//   return await AxiosConfig.post("/get/expense-category", {});
// }

export async function DeleteExpencesCategoryList(expences) {
  return await AxiosConfig.post("/delete/delete-category", expences, {
    data: expences,
  });
}

export async function Addcomplainttype(type) {
  console.log("Expences", type);
  return await AxiosConfig.post("/complaint_types", type, {
    data: type,
  });
}

export async function Complainttypelist(hostelID) {
    console.log("actionfortypelist",hostelID);
    
    return await AxiosConfig.post('/all_complaint_types',hostelID,{
      data:hostelID
    })
  } 

export async function DeletecomplaintType(types) {
  return await AxiosConfig.post("/remove_complaint_type", types, {
    data: types,
  });
}

export async function AddEBBillingUnit(type) {
  console.log("Expences", type);
  return await AxiosConfig.post("/add_ebbilling_settings", type, {
    data: type,
  });
}

  export async function GetEBBillingUnit(hostel_Id) {
    return await AxiosConfig.post('/get_ebbilling_settings',hostel_Id,{
      data:hostel_Id
    })
  }


export async function GetAllRoles(payload) {
  console.log("getRole",payload)
  return await AxiosConfig.post("/all_roles",payload, {
data:payload
  });
}
export async function AddSettingRole(datum) {
  console.log("AddSettingRole", datum);
  return await AxiosConfig.post("/add_role", datum, {
    data: datum,
  });
}

export async function AddSettingPermission(datum) {
  console.log("AddSettingPermission", datum);
  return await AxiosConfig.post("/role_permissions", datum, {
    data: datum,
  });
}
export async function editRolePermission(datum) {
  console.log("editRolePermission", datum);
  return await AxiosConfig.post("/edit_role", datum, {
    data: datum,
  });
}

export async function deleteRolePermission(datum) {
  console.log("deleteRolePermission", datum);
  return await AxiosConfig.post("/delete_role", datum, {
    data: datum,
  });
}
export async function addStaffUser(datum) {
  console.log("addStaffUser", datum);
  return await AxiosConfig.post("/add_staff_user", datum, {
    data: datum,
  });
}
export async function GetAllStaff() {
  return await AxiosConfig.get("/get_all_staffs", {});
}

export async function GetAllReport() {
  return await AxiosConfig.get("/all_reports", {});
}

export async function AddGeneral(params) {
  console.log("paramAddGeneral", params);

  const formData = new FormData();
  if (params.f_name) formData.append("f_name", params.f_name);
  if (params.l_name) formData.append("l_name", params.l_name);
  if (params.mob_no) formData.append("mob_no", params.mob_no);
  if (params.email_id) formData.append("email_id", params.email_id);
  if (params.address) formData.append("address", params.address);
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
    console.log("response for Api", response);
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}

export async function GetAllGeneral() {
  return await AxiosConfig.get("/settings/all_general_users", {});
}


export async function passwordChangesinstaff(datum) {
  console.log("passwordChangesinstaff", datum);
  return await AxiosConfig.post("/settings/change_staff_password", datum, {
    data: datum,
  });
}


export async function generalDelete(datum) {
  console.log("generalDelete", datum);
  return await AxiosConfig.post("/settings/delete_general_user", datum, {
    data: datum,
  });
}



export async function RecurringRole(reccurring) {
  return await AxiosConfig.post('/settings/add_recuring',reccurring,{
    data: reccurring
  })
}
