const initialState = {
  Expences: [],
  message: "",
  getExpensesStatuscode: 0,
  addexpencesStatuscode: 0,
  alreadycategoryerror: "",
  deleteexpencesStatusCode: 0,
  Complainttypelist: [],
  getcomplainttypeStatuscode: 0,
  addComplaintSuccessStatusCode: 0,
  alreadytypeerror: "",
  deletecomplaintStatuscode: 0,
  addEbbillingUnitStatuscode: 0,
  EBBillingUnitlist: [],
  getebStatuscode: 0,
  getsettingRoleList: [],
  statusCodeForRoleList: 0,
  addRoleSetting: [],
  statusCodeForAddRole: 0,
  editRolePermission: [],
  editStatusCosePermission: 0,
  editSettingRole: [],
  StatusForEditPermission: 0,
  deleteSettingRole: [],
  StatusForDeletePermission: 0,
  StatusForaddSettingUser: 0,
  addSettingUser: [],
  addSettingStaffList: [],
  StatusForaddSettingStaffList: 0,
  emailIdError: "",
  phoneNumError: "",
  ebUnitError: "",
  reportList: [],
  StatusForReport: 0,
  settingGeneralPage: [],
  StatusCodeForSettingGeneral: 0,
  settingGetGeneralData: [],
  StatusCodeforGetGeneral: 0,
  settingGeneraLPasswordChanges: [],
  StatusCodeforGeneralPassword: 0,
  generalDelete: [],
  statusCodeForGeneralDelete: 0,
  generalEmailError:'',
  generalMobileError:'',
  addRecurringRole:0
};

const SettingsReducer = (state = initialState, action) => {
  console.log("action for settings", action);
  switch (action.type) {
    //Expenses category for settings ==>
    case "EXPENCES_CATEGORY_LIST":
      return {
        ...state,
        Expences: action.payload.response,
        getExpensesStatuscode: action.payload.statusCode,
      };
    case "CLEAR_GET_EXPENSES_STATUS_CODE":
      return { ...state, getExpensesStatuscode: 0 };
    case "EXPENCES_ADD":
      return {
        ...state,
        message: action.payload.message,
        addexpencesStatuscode: action.payload.statusCode,
      };
    case "CLEAR_ADD_EXPENCES_STATUS_CODE":
      return { ...state, addexpencesStatuscode: 0 };
    case "DELETE_EXPENCES":
      return { ...state, deleteexpencesStatusCode: action.payload.statusCode };
    case "CLEAR_DELETE_EXPENCES_STATUS_CODE":
      return { ...state, deleteexpencesStatusCode: 0 };

    case "ALREADY_EXPENCE_CATEGORY_ERROR":
      return { ...state, alreadycategoryerror: action.payload };

    case "CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR":
      return { ...state, alreadycategoryerror: "" };

    //Complaint Type for settings ==>
    case "COMPLAINT_TYPE_LIST":
      return {
        ...state,
        Complainttypelist: action.payload.response,
        getcomplainttypeStatuscode: action.payload.statusCode,
      };
    case "CLEAR_GET_COMPLAINTTYPE_STATUS_CODE":
      return { ...state, getcomplainttypeStatuscode: 0 };
    case "COMPLAINT_TYPE_ADD":
      return {
        ...state,
        message: action.payload.message,
        addComplaintSuccessStatusCode: action.payload.statusCode,
      };
    case "CLEAR_ADD_COMPLAINT_STATUS_CODE":
      return { ...state, addComplaintSuccessStatusCode: 0 };
    case "DELETE_COMPLAINT_TYPE":
      return { ...state, deletecomplaintStatuscode: action.payload.statusCode };
    case "CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE":
      return { ...state, deletecomplaintStatuscode: 0 };

    case "ALREADY_COMPLAINTTYPE_ERROR":
      return { ...state, alreadytypeerror: action.payload };

    case "CLEAR_ALREADY_COMPLAINTTYPE_ERROR":
      return { ...state, alreadytypeerror: "" };
    //EbBillings for settings ==>
    case "EB_BILLING_UNIT_ADD":
      return {
        ...state,
        message: action.payload.message,
        addEbbillingUnitStatuscode: action.payload.statusCode,
      };
    case "CLEAR_ADD_EB_BILLING_STATUS_CODE":
      return { ...state, addEbbillingUnitStatuscode: 0 };

    case "EB_BILLING_UNIT_LIST":
      return {
        ...state,
        EBBillingUnitlist: action.payload.response,
        getebStatuscode: action.payload.statusCode,
      };
    case "CLEAR_GET_EBBILLINGS_STATUS_CODE":
      return { ...state, getebStatuscode: 0 };
    //settingRole

    case "ROLE_LIST":
      return {
        ...state,
        getsettingRoleList: action.payload.response,
        statusCodeForRoleList: action.payload.statusCode,
      };
    case "CLEAR_ROLE_LIST":
      return { ...state, statusCodeForRoleList: 0 };

    case "ADD_SETTING_ROLE":
      return {
        ...state,
        addRoleSetting: action.payload,
        statusCodeForAddRole: action.payload.statusCode,
      };
    case "CLEAR_ADD_SETTING_ROLE":
      return { ...state, statusCodeForAddRole: 0 };

    case "EDIT_PERMISSION":
      return {
        ...state,
        editRolePermission: action.payload,
        editStatusCosePermission: action.payload.statusCode,
      };
    case "CLEAR_EDIT_PERMISSION":
      return { ...state, editStatusCosePermission: 0 };

    case "EDIT_SETTING_ROLE":
      return {
        ...state,
        editSettingRole: action.payload,
        StatusForEditPermission: action.payload.statusCode,
      };
    case "CLEAR_EDIT_SETTING_ROLE":
      return { ...state, StatusForEditPermission: 0 };

    case "DELETE_SETTING_ROLE":
      return {
        ...state,
        deleteSettingRole: action.payload,
        StatusForDeletePermission: action.payload.statusCode,
      };
    case "CLEAR_DELETE_SETTING_ROLE":
      return { ...state, StatusForDeletePermission: 0 };

    //settingUser
    case "ADD_STAFF_USER":
      return {
        ...state,
        addSettingUser: action.payload,
        StatusForaddSettingUser: action.payload.statusCode,
      };
    case "CLEAR_ADD_STAFF_USER":
      return { ...state, StatusForaddSettingUser: 0 };

    //Validate
    case "PHONE_NUM_ERROR":
      return { ...state, phoneNumError: action.payload };

    case "CLEAR_PHONE_NUM_ERROR":
      return { ...state, phoneNumError: "" };

    case "EMAIL_ID_ERROR":
      return { ...state, emailIdError: action.payload };

    case "CLEAR_EMAIL_ID_ERROR":
      return { ...state, emailIdError: "" };

    case "USER_STAFF_LIST":
      return {
        ...state,
        addSettingStaffList: action.payload,
        StatusForaddSettingStaffList: action.payload.statusCode,
      };
    case "CLEAR_USER_STAFF_LIST":
      return { ...state, StatusForaddSettingStaffList: 0 };

    // ebUniterror
    case "EB_UNIT_ERROR":
      return { ...state, ebUnitError: action.payload };

    case "CLEAR_EB_UNIT_ERROR":
      return { ...state, ebUnitError: "" };

    case "REPORT_LIST":
      return {
        ...state,
        reportList: action.payload,
        StatusForReport: action.payload.statusCode,
      };
    case "CLEAR_REPORT_LIST":
      return { ...state, StatusForReport: 0 };

    // general

    case "SETTING_GENERAL_ADD":
      console.log("action.payload.statusCode",action.payload.statusCode)
      return {
        ...state,
        settingGeneralPage: action.payload.response,
        StatusCodeForSettingGeneral: action.payload.statusCode,
      };
    case "CLEAR_SETTING_GENERAL_ADD":
      return { ...state, StatusCodeForSettingGeneral:0};


      case 'GENERAL_EMAIL_ERROR':
        console.log("GENERAL_EMAIL_ERROR",action.payload)
        return { ...state, generalEmailError: action.payload }

    case 'CLEAR_GENERAL_EMAIL_ERROR':
        return { ...state, generalEmailError: '' }

        case 'MOBILE_ERROR':
        return { ...state, generalMobileError: action.payload}

    case 'CLEAR_MOBILE_ERROR':
        return { ...state, generalMobileError: '' }

    case "GET_ALL_GENERAL":
      return {
        ...state,
        settingGetGeneralData: action.payload,
        StatusCodeforGetGeneral: action.payload.statusCode,
      };
    case "CLEAR_GET_ALL_GENERAL":
      return { ...state, StatusCodeforGetGeneral: 0 };

    case "GENERAL_PASSWORD_CHANGES":
      return {
        ...state,
        settingGeneraLPasswordChanges: action.payload,
        StatusCodeforGeneralPassword: action.payload.statusCode,
      };
    case "CLEAR_GENERAL_PASSWORD_CHANGES":
      return { ...state, StatusCodeforGeneralPassword: 0 };



      case "DELETE_GENERAL":
        return {
          ...state,
          generalDelete: action.payload,
          statusCodeForGeneralDelete: action.payload.statusCode,
        };
      case "CLEAR_DELETE_GENERAL":
        return { ...state, statusCodeForGeneralDelete: 0 };
case 'RECURRING_ROLE':
  return {...state, addRecurringRole:action.payload.statusCode}

  case 'REMOVE_RECURRING_ROLE':
    return {...state, addRecurringRole:0}
  

  }
  return state;
};
export default SettingsReducer;
