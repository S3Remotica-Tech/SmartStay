import { takeEvery, call, put } from "redux-saga/effects";
import { EditExpencesSubCategory,VendorCategoryList,  PlanList, ChangeRoomHostelElectricity, getModules, RecurringRole, AddExpencesCategory, EditExpencesCategory, ExpencesCategorylist, DeleteExpencesCategoryList, Addcomplainttype, Complainttypelist, DeletecomplaintType, AddEBBillingUnit, GetEBBillingUnit, GetAllRoles, AddSettingRole, AddSettingPermission, editRolePermission, deleteRolePermission, addStaffUser, GetAllStaff, GetAllReport, AddGeneral, GetAllGeneral, passwordChangesinstaff, generalDelete, passwordCheck, Editcomplainttype, DeleteElectricity, upgradePlan, CurrentSubscriptionPlan, SubscriptionPdfDownload, SettingsAddRecurring, GetBillsFrequncyTypes, GetBillsNotificationTypes, SettingsGetRecurring, AddInvoiceSettings, SettingsGetInvoice, AddBillTemplate, getTemplateList, AddGlobalSettingTemplate, SettingsGetGlobal, EditGeneral, EditStaffUser } from "../Action/SettingsAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalHostelId } from "../../Utils/GlobalResponse";


function* handleApiError(error) {
   const status = error?.response?.status || error?.status;

   if (status === 401) {
      yield put({
         type: "UN-AUTHORIZED",
         payload: "Access Denied",
      });
   }
   else if (status === 500) {
      yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });

   }
   else if (error.code === "ERR_NETWORK") {
      yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });

   }
   else if (status === 403) {
      yield put({ type: "ACCESS_RESTRICTION_ERROR", payload: "Access Restricted" });
   }
}








function* handleChangeRoomHostelElectricity(action) {
   try {
      const response = yield call(ChangeRoomHostelElectricity, action.payload);

      if (response?.status === 200) {
         yield put({ type: 'ROOM_HOSTEL_EB_CHANGE', payload: { response: response.data, statusCode: response?.status } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };


         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })



      }


      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}




function* handleGetModules() {

   try {
      const response = yield call(getModules)

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }
      if (response?.status === 200) {
         yield put({ type: 'GET_MODULES', payload: { response: response.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}




function* handleRecurringRole(action) {
   try {
      const response = yield call(RecurringRole, action.payload);

      if (response?.status === 200) {
         yield put({ type: 'RECURRING_ROLE', payload: { response: response.data, statusCode: response?.status } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };


         toast.success(`${response.data.message}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })



      }

      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}


function* handleCategorylist(action) {
   try {
      const response = yield call(VendorCategorylist, action.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200) {
         yield put({ type: 'EXPENCES_CATEGORY_LIST', payload: { response: response.data, statusCode: response?.status, message: response?.data?.message } })
      }
      else if (response?.status === 401) {
         Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: response.data.message,
         });
      }
      else {
         yield put({ type: 'ERROR_CATEGORY', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}




function* handleVendorCategorylist(action) {
   try {
      const response = yield call(VendorCategoryList, action.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
              }


      if (response?.status === 200) {
         yield put({ type: 'VENDOR_CATEGORY_LIST_REDUCER', payload: { response: response.data, statusCode: response?.status, message: response?.data?.message } })
      }
         
   }
   catch (error) {
      yield* handleApiError(error);

   }
}

function* handleCategoryAdd(params) {
   try {
      const response = yield call(AddExpencesCategory, params.payload);

      if (response?.status === 201) {
         yield put({ type: 'EXPENCES_ADD', payload: { response: response.data, statusCode: response?.status, message: response.data.message, Type: response.data.type } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'ALREADY_EXPENCE_CATEGORY_ERROR', payload: error.response.data })
         }
      }
   }
}


function* handleEditCategory(params) {
   try {
      const response = yield call(EditExpencesCategory, params.payload);

      if (response?.status === 200) {
         yield put({ type: 'EDIT-EXPENCES-CATEGORY', payload: { response: response.data, statusCode: response?.status, message: response?.data } })

         var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy", fontWeight: 600, fontSize: 14, textAlign: "start", display: "flex", alignItems: "center", padding: "10px", };
         toast.success("Updated Successfully", {
            position: "bottom-center", autoClose: 2000, hideProgressBar: true, closeButton: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, style: toastStyle
         })
      }




   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'ALREADY_EXPENCE_CATEGORY_ERROR', payload: error.response.data })
         }
      }
   }
}

function* handleEditSubCategory(params) {
   try {
      const response = yield call(EditExpencesSubCategory, params.payload);

      if (response?.status === 200) {
         yield put({ type: 'EDIT-EXPENCES-SUB-CATEGORY', payload: { response: response.data, statusCode: response?.status, message: response?.data } })

         var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy", fontWeight: 600, fontSize: 14, textAlign: "start", display: "flex", alignItems: "center", padding: "10px", };
         toast.success("Updated Successfully", {
            position: "bottom-center", autoClose: 2000, hideProgressBar: true, closeButton: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, style: toastStyle
         })

      }

   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'ALREADY_EXPENCE_CATEGORY_ERROR', payload: error.response.data })
         }
      }
   }
}


function* handleDeleteExpencescategory(action) {
   try {
      const response = yield call(DeleteExpencesCategoryList, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'DELETE_EXPENCES', payload: { response: response.data, statusCode: response?.status } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         });
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }

}




// function* handleComplainttypelist(action) {
//    const response = yield call(Complainttypelist, action.payload);

//    if (response?.status === 200 || response.data.statusCode === 200) {
//       yield put({ type: 'COMPLAINT_TYPE_LIST', payload: { response: response.data || [], statusCode: response?.status || response.data.statusCode, message:  response?.data?.message } })
//    } else if (response?.status === 401 ) {
//       Swal.fire({
//          icon: 'warning',
//          title: 'Error',
//          text: response.data.message,
//       });
//    }
//    else {
//       yield put({ type: 'ERROR_COMPLIANTS', payload: { statusCode: response?.status || response.data.statusCode } })
//    }
//    if (response) {
//       refreshToken(response)
//    }
// }

function* handleComplainttypelist(action) {
   try {
      const { hostel_id } = action.payload;
      const response = yield call(Complainttypelist, hostel_id);


      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }




      if (response?.status === 200) {
         yield put({
            type: "COMPLAINT_TYPE_LIST",
            payload: {
               response: response.data || [],
               statusCode: response?.status,
               message: response.data,
            },
         });
      } else if (response?.status === 401) {
         Swal.fire({
            icon: "warning",
            title: "Error",
            text: response.data,
         });
      } else {
         yield put({
            type: "ERROR_COMPLIANTS",
            payload: {
               statusCode: response?.status,
            },
         });
      }

      if (response) {
         refreshToken(response);
      }
   } catch (error) {
      yield* handleApiError(error);

   }
}


function* handleComplaintTypeAdd(params) {
   try {
      const response = yield call(Addcomplainttype, params.payload);



      if (response?.status === 201) {
         yield put({ type: 'COMPLAINT_TYPE_ADD', payload: { response: response.data, statusCode: response?.status, message: response?.data?.message } })


         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }
      // else if (response?.status === 400 ) {
      //    yield put({ type: 'ALREADY_COMPLAINTTYPE_ERROR', payload:  response?.data?.message })

      //    toast.error(response.data.message, {
      //       position: "bottom-center",
      //       autoClose: 2000,
      //       hideProgressBar: true,
      //       closeButton: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //    })
      // }

      else if (response?.status === 403) {
         yield put({ type: 'PLAN-EXPIRED', payload: response?.data?.message })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         const ComplaintError = error?.status;
         const ComplaintErrormessage = error?.response?.data


         if (ComplaintError) {
            yield put({ type: 'ALREADY_COMPLAINTTYPE_ERROR', payload: ComplaintErrormessage });
         }

      }
   }

}

function* handleComplaintTypeEdit(action) {
   try {
      const response = yield call(Editcomplainttype, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'COMPLAINT_TYPE_EDIT', payload: { response: response.data, statusCode: response?.status, message: response?.data?.message } })


         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }
      else if (response?.status === 201) {
         yield put({ type: 'ALREADY_COMPLAINTTYPE_ERROR', payload: response?.data?.message })

         toast.error(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         const ComplaintError = error?.status;
         const ComplaintErrormessage = error?.response?.data


         if (ComplaintError) {
            yield put({ type: 'ALREADY_COMPLAINTTYPE_ERROR', payload: ComplaintErrormessage });
         }

      }
   }
}

function* handleDeleteComplainttype(action) {
   try {
      const { id } = action.payload;
      const response = yield call(DeletecomplaintType, id);

      if (response?.status === 200) {
         yield put({
            type: 'DELETE_COMPLAINT_TYPE',
            payload: {
               response: response.data,
               statusCode: response?.status,
            }
         });

         toast.success(response.data, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
               backgroundColor: "#E6F6E6",
               color: "black",
               borderRadius: "60px",
               fontFamily: "Gilroy",
               fontWeight: 600,
               fontSize: 14,
               padding: "10px",
            }
         });
      } else {
         toast.error(response?.data?.message || "Something went wrong", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
         });
      }

      if (response) refreshToken(response);
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         const ComplaintError = error?.status;
         const ComplaintErrormessage = error?.response?.data


         if (ComplaintError) {
            yield put({ type: 'ALREADY_ASSIGNCOMPLAINTTYPE_ERROR', payload: ComplaintErrormessage });
         }

      }
   }
}



function* handleEBBillingUnitAdd(params) {
   try {
      const response = yield call(AddEBBillingUnit, params.payload);

      if (response?.status === 200) {
         yield put({ type: 'EB_BILLING_UNIT_ADD', payload: { response: response.data, statusCode: response?.status, } })


         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }


   }
   catch (error) {
      yield* handleApiError(error);
      if (error.status === 403 || error.status === 400) {
         yield put({ type: 'UPDATE_EB_RULE_ERROR', payload: error.response?.data });
      }
   }
}

function* handleEBBillingUnitGet(action) {
   try {
      const response = yield call(GetEBBillingUnit, action.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })

      }
      if (response?.status === 200) {
         yield put({ type: 'EB_BILLING_UNIT_LIST', payload: { response: response.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR_EB_BILLING_UNIT_LIST', payload: { statusCode: response?.status } })
      }

   }
   catch (error) {
      yield* handleApiError(error);
   }
}


function* handleDeleteElectricity(action) {
   try {
      const response = yield call(DeleteElectricity, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'DELETE_ELECTRICITY', payload: { response: response.data, statusCode: response?.status } })


         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         });
      }
      else if (response?.status === 201) {
         toast.error(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }

}

function* handleGetAllRoles(role) {
   try {
      const response = yield call(GetAllRoles, role.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }
      if (response?.status === 200) {
         yield put({ type: 'ROLE_LIST', payload: { response: response.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR_ROLE', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.response?.status === 400) {
            yield put({ type: 'ROLE_ERROR', payload: error.response.data });
         }
      }
   }

}

function* handleAddSettingRole(action) {
   try {
      const response = yield call(AddSettingRole, action.payload);


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 201) {
         yield put({ type: 'ADD_SETTING_ROLE', payload: { response: response.data, statusCode: response?.status } })
         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }


      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.response?.status === 400) {
            yield put({ type: 'ROLE_ERROR', payload: error.response.data });
         }
      }
   }
}



function* handlepermissionEdit(userDetails) {
   try {
      const response = yield call(AddSettingPermission, userDetails.payload)
      if (response?.status === 200) {
         yield put({ type: 'EDIT_PERMISSION', payload: response.data, statusCode: response?.status })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }

}


function* handleEditRolePermission(detail) {
   try {
      const response = yield call(editRolePermission, detail.payload);

      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 200) {
         yield put({ type: 'EDIT_SETTING_ROLE', payload: { response: response.data, statusCode: response?.status } })
         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }


      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.response?.status === 400) {
            yield put({ type: 'ROLE_ERROR', payload: error.response.data });
         }
      }
   }
}



function* handleDeleteRolePermission(detail) {
   try {
      const response = yield call(deleteRolePermission, detail.payload);



      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 204 || response?.status === 200) {
         yield put({ type: 'DELETE_SETTING_ROLE', payload: { response: response.data, statusCode: response?.status } })
         toast.success(`Deleted Successfully`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }

      else if (response?.status === 400) {
         yield put({ type: 'ASSIGNED_ERROR', payload: { statusCode: response?.status } });

      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

      if (error.response?.status === 400) {
         yield put({ type: 'ASSIGNED_ERROR', payload: { statusCode: error.response?.status } });
         toast.error("This role is assigned to user", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }

   }
}



//settingUser
function* handleAddStaffUserPage(detail) {
   try {
      const { hostelId, data } = detail.payload;
      const response = yield call(addStaffUser, hostelId, data);

      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 201) {
         yield put({ type: 'ADD_STAFF_USER', payload: { response: response.data, statusCode: response?.status } })
         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.response.data.emailStatus !== "") {
            yield put({ type: 'EMAIL_ID_ERROR', payload: error.response.data.emailStatus });
         } else if (error.response.data.mobileStatus !== "") {
            yield put({ type: 'PHONE_NUM_ERROR', payload: error.response.data.mobileStatus });
         }
      }
   }
}

function* handleEditStaffUserPage(detail) {
   try {
      const { hostelId, userId, data } = detail.payload;
      const response = yield call(EditStaffUser, hostelId, userId, data);

      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 200) {
         yield put({ type: 'EDIT_STAFF_USER', payload: { response: response.data, statusCode: response?.status } })
         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.response.data.emailStatus !== "") {
            yield put({ type: 'EMAIL_ID_ERROR', payload: error.response.data.emailStatus });
         } else if (error.response.data.mobileStatus !== "") {
            yield put({ type: 'PHONE_NUM_ERROR', payload: error.response.data.mobileStatus });
         }
      }
   }
}

function* handleGetAllStaffs(action) {

   try {
      const response = yield call(GetAllStaff, action.payload.hostelId);
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200) {
         yield put({ type: 'USER_STAFF_LIST', payload: { response: response.data || [], statusCode: response?.status } })
      }
      else if (response?.status === 204) {
         yield put({ type: 'NO_USER_STAFF_LIST_ERROR', payload: { statusCode: response?.status } });

      }
      // else {
      //    yield put({ type: 'ERROR_USER', payload: { statusCode: response?.status || response.data.statusCode } })
      // }
      if (response) {
         refreshToken(response)
      }
   }

   catch (error) {
      yield* handleApiError(error);

   }
}

function* handleGetAllReports() {
   try {
      const response = yield call(GetAllReport)

      if (response?.status === 200) {
         yield put({ type: 'REPORT_LIST', payload: { response: response.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function* handleAddGeneralPage(action) {
   try {
      const response = yield call(AddGeneral, action.payload);


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 201) {
         yield put({ type: 'SETTING_GENERAL_ADD', payload: { response: response, statusCode: response?.status } })
         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
           if (error.code === 'ERR_BAD_REQUEST') {
         if (error.response.data.emailStatus !== "") {
            yield put({ type: 'GENERAL_EMAIL_ERROR', payload: error.response.data.emailStatus });
         } else if (error.response.data.mobileStatus !== "") {
            yield put({ type: 'MOBILE_ERROR', payload: error.response.data.mobileStatus });
         }
      }
   }
}

function* handleEditGeneralPage(action) {
   try {
      const response = yield call(EditGeneral, action.payload);


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 200) {
         yield put({ type: 'SETTING_EDIT_GENERAL', payload: { response: response, statusCode: response?.status } })
         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
            if (error.status === 400) {
         if (error.response.data.emailStatus !== "") {
            yield put({ type: 'GENERAL_EMAIL_ERROR', payload: error.response.data.emailStatus });
         } else if (error.response.data.mobileStatus !== "") {
            yield put({ type: 'MOBILE_ERROR', payload: error.response.data.mobileStatus });
         }
      }
   }
}

function* handleGetAllGeneral() {

   try {
      const response = yield call(GetAllGeneral)


      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200 || response?.status === 204) {
         yield put({ type: 'GET_ALL_GENERAL', payload: { response: response.data || [], statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}





function* handleChangePasswordinStaff(action) {
   try {
      const response = yield call(passwordChangesinstaff, action.payload);

      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 200) {
         yield put({ type: 'GENERAL_PASSWORD_CHANGES', payload: { response: response.data, statusCode: response?.status } })
         toast.success(`${response.data.message}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }
      // else if (response.data.statusCode === 201) {

      //    yield put({ type: 'CONFORM_PASSWORD_MATCHES', payload:  response?.data?.message });
      // }
      // else {
      //    yield put({ type: 'ERROR', payload:  response?.data?.message })
      // }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}

function* handleCheckPassword(action) {
   try {
      const response = yield call(passwordCheck, action.payload);



      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "auto",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 200) {
         yield put({ type: 'GENERAL_PASSWORD_CHECK', payload: { response: response.data, statusCode: response?.status } })
         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      }
      // else if (response?.status === 400) {

      //    yield put({ type: 'PASSWORD_ERROR', payload: response?.data || response.data?.message });
      // }


      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}



function* handleDeleteGenerlPage(action) {

   try {
      const response = yield call(generalDelete, action.payload);

      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
         width: "100%",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      if (response?.status === 200) {
         yield put({
            type: "DELETE_GENERAL",
            payload: {
               response: response.data,
               statusCode: response?.status,
            },
         });
         toast.success(response.data, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
         });
      } else if (response?.status === 201) {
         yield put({ type: "DELETE_GENERAL_ERROR", payload: response?.data?.message });

      }
      if (response) {
         refreshToken(response);
      }
   }

   catch (error) {
      yield* handleApiError(error);

   }

}


function* handleUpgradePlan(action) {
   try {
      const response = yield call(upgradePlan, action.payload);
      // console.log("response",response )
      if (response?.status === 200) {
         yield put({
            type: "UPGRADE_PLAN_REDUCER",
            payload: {
               response: response.data,
               statusCode: response?.status,
            },
         });
      }

   }
   catch (error) {
      yield* handleApiError(error);
      if (error.status === 403 || error.status === 400) {
         yield put({ type: 'UPGRADE_PLAN_ERROR', payload: error.response?.data });
      }

   }
}


function* handleCurrentSubscriptionPlan(action) {
   try {
      const response = yield call(CurrentSubscriptionPlan, action.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
      }
      if (response?.status === 200) {
         yield put({ type: 'CURRENT_PLAN_REDUCER', payload: { response: response.data, statusCode: response?.status } })
      }

   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function* handlePlanList(action) {
   try {
      const response = yield call(PlanList, action.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
      }


      if (response?.status === 200) {
         yield put({ type: 'NEW_PLAN_LIST', payload: { response: response.data, statusCode: response?.status } })
      }

   }
   catch (error) {
      yield* handleApiError(error);


   }
}









function* handleSubscriptionPdf(action) {
   try {
      const response = yield call(SubscriptionPdfDownload, action.payload)

      if (response?.status === 200) {
         yield put({
            type: 'SUBSCRIPTION_PDF', payload: {
               response: response.data.pdf_url, statusCode: response?.status
            }
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}


function* handleSettingsRecurring(action) {
   try {
      const response = yield call(SettingsAddRecurring, action.payload);


      if (response?.status === 200) {
         yield put({ type: 'SETTINGSADDRECURRING', payload: { response: response.data, statusCode: response?.status } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "100%",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };


         toast.success(`Updated Successfully`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }


      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

      if (error.status === 403 || error.status === 400) {
         yield put({ type: 'BILLING_RULE_ERROR', payload: error.response.data || 'Something went wrong' });
      }
   }
}


function* handleGetBillsFrequencyTypes() {
   try {
      const response = yield call(GetBillsFrequncyTypes);

      if (response?.status === 200) {
         yield put({ type: 'FREQUENCYTYPESLIST', payload: { response: response.data.data, statusCode: response?.status, message: response?.data?.message } })
      }
      else {
         yield put({ type: 'ERROR', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function* handleGetBillsNotificationTypes(action) {
   try {
      const response = yield call(GetBillsNotificationTypes, action.payload);

      if (response?.status === 200) {
         yield put({ type: 'NOTIFICATIONTYPESLIST', payload: { response: response.data.data, statusCode: response?.status, message: response?.data?.message } })
      }
      else {
         yield put({ type: 'ERROR', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}


function* handleGetSettingsRecurrringBill(action) {
   try {
      const response = yield call(SettingsGetRecurring, action.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }




      if (response?.status === 200) {
         yield put({ type: 'SETTINGSGETRECURRING', payload: { response: response.data, statusCode: response?.status, message: response?.data?.message } })
      }
      else if (response?.status === 201) {
         yield put({ type: 'RECURRINGOFF', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}


function* handleAddInvoiceSettings(params) {
   try {
      const response = yield call(AddInvoiceSettings, params.payload);

      if (response?.status === 200) {
         yield put({ type: 'ADDINVOICE_SETTINGS', payload: { response: response.data, statusCode: response?.status, message: response.message } })

         var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy", fontWeight: 600, fontSize: 14, textAlign: "start", display: "flex", alignItems: "center", padding: "10px", };
         toast.success(response.message, { position: "bottom-center", autoClose: 2000, hideProgressBar: true, closeButton: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, style: toastStyle })
      }

      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}


function* handleGetSettingsInvoice(action) {
   try {
      const response = yield call(SettingsGetInvoice, action.payload);



      if (response?.status === 200) {
         yield put({ type: 'SETTINGSGETINVOICE', payload: { response: response.data.data, statusCode: response?.status, message: response?.data?.message } })
      }
      else if (response?.status === 201) {
         yield put({ type: "ERROR_SETTINGS_GETINVOICE", payload: { message: response.data.message, statusCode: response?.status } });
      }
      else {
         yield put({ type: 'ERROR', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}



function* handleAddBillTemplateSettings(params) {
   try {
      const response = yield call(AddBillTemplate, params.payload);

      if (response?.status === 200) {
         yield put({ type: 'ADD-BILLS-TEMPLATE', payload: { response: response.data, statusCode: response?.status, message: response.message } })

         var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy", fontWeight: 600, fontSize: 14, textAlign: "start", display: "flex", alignItems: "center", padding: "10px", };
         toast.success(response.message, { position: "bottom-center", autoClose: 2000, hideProgressBar: true, closeButton: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, style: toastStyle })
      }

      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}


function* handleGetTemplatelist(action) {
   try {
      const response = yield call(getTemplateList, action.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }

      if (response?.status === 200) {
         yield put({ type: 'GET_TEMPLATELIST', payload: { response: response.data, statusCode: response?.status, message: response?.data?.message } })
      }
      if (response?.status === 500) {
         yield put({ type: 'ERROR_TEMPLATELIST', payload: { statusCode: response?.status, message: response?.data?.message } })
      }

      else if (response?.status === 401) {
         Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: response.data.message,
         });
      }
      else {
         yield put({ type: 'ERROR_TEMPLATE', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}


// function* handleGetGlobalSetting() {
//    const response = yield call(SettingsGetGlobal)

//    if (response?.status === 200 ) {
//       yield put({ type: 'GET_GLOBAL_SETTING', payload:{response: response.data.general_users, statusCode:response?.status }})
//    }
//    else {
//       yield put({ type: 'ERROR', payload:  response?.data?.message })
//    }
//    if(response){
//       refreshToken(response)
//    }
// }



function* handleAddIGlobalSettings(params) {
   try {
      const response = yield call(AddGlobalSettingTemplate, params.payload);


      if (response?.status === 200) {

         yield put({ type: 'ADD_GLOBAL_SETTINGS', payload: { response: response.data, statusCode: response?.status } })

         var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy", fontWeight: 600, fontSize: 14, textAlign: "start", display: "flex", alignItems: "center", padding: "10px", };
         toast.success(response.data, { position: "bottom-center", autoClose: 2000, hideProgressBar: true, closeButton: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, style: toastStyle })
      }


      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}


function* handleGetGlobalSetting(user) {
   try {
      const response = yield call(SettingsGetGlobal, user.payload);

      if (response?.status === 200) {
         yield put({ type: 'GET_GLOBAL_SETTING', payload: { response: response.data, statusCode: response?.status } })
      }

      // else if (response?.status === 201 || response.data.statusCode === 201) {
      //    yield put({ type: 'NO_USER_LIST', payload: { response: response.data.hostelData, statusCode: response?.status || response.data.statusCode } })
      // }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function refreshToken(response) {

   if (response.data && response.data.refresh_token) {
      const refreshTokenGet = response.data.refresh_token
      const cookies = new Cookies()
      cookies.set('token', refreshTokenGet, { path: '/' });
   } else if (response?.status === 206) {
      const message = response?.status
      const cookies = new Cookies()
      cookies.set('access-denied', message, { path: '/' });

   }

}





function* SettingsSaga() {
yield takeEvery('VENDOR_CATEGORY_LIST_SAGA', handleVendorCategorylist)
   yield takeEvery('EDITSUBCATEGORYSAGA', handleEditSubCategory)
   yield takeEvery('ROOMHOSTELEBCHANGE', handleChangeRoomHostelElectricity)
   yield takeEvery('GETMODULES', handleGetModules)
   yield takeEvery('EXPENCES-CATEGORY-LIST', handleCategorylist)
   yield takeEvery('EXPENCES-CATEGORY-ADD', handleCategoryAdd)
   yield takeEvery('EDIT_EXPENCES_CATEGORY', handleEditCategory)
   yield takeEvery('DELETE-EXPENCES-CATEGORY', handleDeleteExpencescategory)
   yield takeEvery('COMPLAINT-TYPE-LIST', handleComplainttypelist)
   yield takeEvery('COMPLAINT-TYPE-ADD', handleComplaintTypeAdd)
   yield takeEvery('COMPLAINT-TYPE-EDIT', handleComplaintTypeEdit)
   yield takeEvery('DELETE-COMPLAINT-TYPE', handleDeleteComplainttype)
   yield takeEvery('EB-BILLING-UNIT-ADD', handleEBBillingUnitAdd)
   yield takeEvery('EB-BILLING-UNIT-LIST', handleEBBillingUnitGet)
   yield takeEvery('DELETE-ELECTRICITY', handleDeleteElectricity)
   yield takeEvery('SETTING_ROLE_LIST', handleGetAllRoles)
   yield takeEvery('SETTING_ADD_ROLE_LIST', handleAddSettingRole)
   yield takeEvery('EDITPERMISSIONROLE', handlepermissionEdit)
   yield takeEvery('EDITSETTINGROLEPERMISSION', handleEditRolePermission)
   yield takeEvery('DELETESETTINGROLEPERMISSION', handleDeleteRolePermission)
   yield takeEvery('ADDSTAFFUSER', handleAddStaffUserPage)
   yield takeEvery('EDITSTAFFUSER', handleEditStaffUserPage)
   yield takeEvery('GETUSERSTAFF', handleGetAllStaffs)
   yield takeEvery('GETUSERREPORT', handleGetAllReports)
   yield takeEvery('ADDGENERALSETTING', handleAddGeneralPage)
   yield takeEvery('EDITGENERALSETTING', handleEditGeneralPage)
   yield takeEvery('GETALLGENERAL', handleGetAllGeneral)
   yield takeEvery('GENERALPASSWORDCHANGES', handleChangePasswordinStaff)
   yield takeEvery('GENERALDELETEGENERAL', handleDeleteGenerlPage)
   yield takeEvery('RECURRINGROLE', handleRecurringRole)
   yield takeEvery('CHECKPASSWORD', handleCheckPassword)
   yield takeEvery('UPGRADE_PLAN_SAGA', handleUpgradePlan)
   yield takeEvery('CURRENT_PLAN_SAGA', handleCurrentSubscriptionPlan)
   yield takeEvery('NEWPLANLIST', handlePlanList)
   yield takeEvery('SUBSCRIPTIONPDF', handleSubscriptionPdf)
   yield takeEvery('SETTINGSADD_RECURRING', handleSettingsRecurring)
   yield takeEvery('FREQUENCY_TYPES_LIST', handleGetBillsFrequencyTypes)
   yield takeEvery('NOTIFICATION_TYPES_LIST', handleGetBillsNotificationTypes)
   yield takeEvery('SETTINGS_GET_RECURRING', handleGetSettingsRecurrringBill)
   yield takeEvery('ADD_INVOICE_SETTINGS', handleAddInvoiceSettings)
   yield takeEvery('SETTINGS_GET_INVOICE', handleGetSettingsInvoice)
   yield takeEvery('ADD_BILLS_TEMPLATE', handleAddBillTemplateSettings)
   yield takeEvery('GET_TEMPLATE_LIST', handleGetTemplatelist)
   yield takeEvery('ADDGLOBALSETTING', handleAddIGlobalSettings)
   yield takeEvery('FETCHSETTINGTEMP', handleGetGlobalSetting)

}
export default SettingsSaga;