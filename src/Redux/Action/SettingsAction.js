import AxiosConfig from "../../WebService/AxiosConfig"



export async function AddExpencesCategory(Expences) {
    console.log("Expences",Expences);
    return await AxiosConfig.post('/add/expense-category',Expences,{
      data:Expences
    })
  }


  export async function ExpencesCategorylist() {
    return await AxiosConfig.post('/get/expense-category',{
    })
  }  

  export async function DeleteExpencesCategoryList(expences) {
    return await AxiosConfig.post('/delete/delete-category', expences, {
      data: expences
    })
  }

  export async function Addcomplainttype(type) {
    console.log("Expences",type);
    return await AxiosConfig.post('/complaint_types',type,{
      data:type
    })
  }


  export async function Complainttypelist() {
    return await AxiosConfig.get('/all_complaint_types',{
    })
  }  

  export async function DeletecomplaintType(types) {
    return await AxiosConfig.post('/remove_complaint_type', types, {
      data: types
    })
  }

  export async function AddEBBillingUnit(type) {
    console.log("Expences",type);
    return await AxiosConfig.post('/add_ebbilling_settings',type,{
      data:type
    })
  }

  export async function GetEBBillingUnit() {
    return await AxiosConfig.get('/get_ebbilling_settings',{
    })
  }


  export async function GetAllRoles() {
    return await AxiosConfig.get('/all_roles',{
    })
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