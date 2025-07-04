export const initialState = {
  Expences: [],
  message: "",
  getExpensesStatuscode: 0,
  addexpencesStatuscode: 0,
  editexpencesStatuscode: 0,
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
  generalEmailError: "",
  generalMobileError: "",
  addRecurringRole: 0,
  checkPassword: [],
  statusCodeForCheckPassword: 0,
  notmatchpass: "",
  conformPassNotmatch: "",
  editComplaintSuccessStatusCode: 0,
  deleteElectricityStatuscode: 0,
  assignedUserRoleStatusCode: 0,
  categoryError: 0,
  errorEbUnitStatusCode: 0,
  errorCompliants: 0,
  errorUser: 0,
  errorRole: 0,
  AddCategoryType: 0,
  roleError: "",
  roleEditError: "",
  generalDeleteError: "",
  subscriptionNew: [],
  statusCodeNewSubscription: 0,
  subcripitionAllDetails: [],
  statusCodeForSubcripitionAllDetails: 0,
  toTriggerPDF: false,
  SubscriptionPDF: [],
  SubscriptionPdfSuccess: 0,
  SettingsRecurringAddSuccess:0,
  FrequencyTypeList : [],
  NotificationTypeList: [],
  FrequncyTypegetSuccessCode: 0 ,
  NotificationypegetSuccessCode: 0,
  SettingsBillsGetRecurring:[],
  settingsBillsggetRecurrSucesscode: 0,
  settingsAddInvoiceSucesscode: 0,
  planExpired:'',
  SettingsInvoice : [],
  settingsInvoicegetSucesscode : 0,
  settingsInvoicegetErrorStatuscode : 0,
};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL':
          return initialState;
    case "ERROR_USER":
      return { ...state, errorUser: action.payload.statusCode };
    case "REMOVE_ERROR_USER":
      return { ...state, errorUser: 0 };

    case "ERROR_ROLE":
      return { ...state, errorRole: action.payload.statusCode };
    case "REMOVE_ERROR_ROLE":
      return { ...state, errorRole: 0 };

    case "ASSIGNED_ERROR":
      return {
        ...state,
        assignedUserRoleStatusCode: action.payload.statusCode,
      };

    case "REMOVE_ASSIGNED_ERROR":
      return { ...state, assignedUserRoleStatusCode: 0 };

    case "ERROR_CATEGORY":
      return { ...state, categoryError: action.payload.statusCode };
    case "REMOVE_ERROR_CATEGORY":
      return { ...state, categoryError: 0 };

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
        AddCategoryType: action.payload.Type,
      };

    case "CLEAR_TYPE":
      return { ...state, AddCategoryType: 0 };

    case "CLEAR_ADD_EXPENCES_STATUS_CODE":
      return { ...state, addexpencesStatuscode: 0 };

    case "EDIT-EXPENCES-CATEGORY":
      return {
        ...state,
        message: action.payload.message,
        editexpencesStatuscode: action.payload.statusCode,
      };
    case "CLEAR_EDITEXPENCES_CATEGORY_STATUS_CODE":
      return { ...state, editexpencesStatuscode: 0 };
    case "DELETE_EXPENCES":
      return { ...state, deleteexpencesStatusCode: action.payload.statusCode };
    case "CLEAR_DELETE_EXPENCES_STATUS_CODE":
      return { ...state, deleteexpencesStatusCode: 0 };

    case "ALREADY_EXPENCE_CATEGORY_ERROR":
      return { ...state, alreadycategoryerror: action.payload };

    case "CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR":
      return { ...state, alreadycategoryerror: "" };

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

    case "COMPLAINT_TYPE_EDIT":
      return {
        ...state,
        message: action.payload.response,
        editComplaintSuccessStatusCode: action.payload.statusCode,
      };
    case "CLEAR_EDIT_COMPLAINT_STATUS_CODE":
      return { ...state, editComplaintSuccessStatusCode: 0 };

    case "DELETE_COMPLAINT_TYPE":
      return { ...state, deletecomplaintStatuscode: action.payload.statusCode };
    case "CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE":
      return { ...state, deletecomplaintStatuscode: 0 };

    case "ALREADY_COMPLAINTTYPE_ERROR":
      return { ...state, alreadytypeerror: action.payload };

    case "CLEAR_ALREADY_COMPLAINTTYPE_ERROR":
      return { ...state, alreadytypeerror: "" };


case "PLAN-EXPIRED":
      return { ...state, planExpired: action.payload };

    case "CLEAR_PLAN-EXPIRED":
      return { ...state, planExpired: "" };



    case "EB_BILLING_UNIT_ADD":
      return {
        ...state,
        message: action.payload.message,
        addEbbillingUnitStatuscode: action.payload.statusCode,
      };
    case "CLEAR_ADD_EB_BILLING_STATUS_CODE":
      return { ...state, addEbbillingUnitStatuscode: 0 };

    case "ERROR_EB_BILLING_UNIT_LIST":
      return { ...state, errorEbUnitStatusCode: action.payload.statusCode };

    case "REMOVE_ERROR_EB_BILLING_UNIT_LIST":
      return { ...state, errorEbUnitStatusCode: 0 };

    case "ERROR_COMPLIANTS":
      return { ...state, errorCompliants: action.payload.statusCode };
    case "REMOVE_ERROR_COMPLIANTS":
      return { ...state, errorCompliants: 0 };

    case "EB_BILLING_UNIT_LIST":
      return {
        ...state,
        EBBillingUnitlist: action.payload.response,
        getebStatuscode: action.payload.statusCode,
      };
    case "CLEAR_GET_EBBILLINGS_STATUS_CODE":
      return { ...state, getebStatuscode: 0 };

    case "DELETE_ELECTRICITY":
      return {
        ...state,
        deleteElectricityStatuscode: action.payload.statusCode,
      };
    case "CLEAR_DELETE_ELECTRICITY_STATUS_CODE":
      return { ...state, deleteElectricityStatuscode: 0 };

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

    case "ADD_STAFF_USER":
      return {
        ...state,
        addSettingUser: action.payload,
        StatusForaddSettingUser: action.payload.statusCode,
      };
    case "CLEAR_ADD_STAFF_USER":
      return { ...state, StatusForaddSettingUser: 0 };

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
        addSettingStaffList: action.payload.response,
        StatusForaddSettingStaffList: action.payload.statusCode,
      };

    case "CLEAR_USER_STAFF_LIST":
      return { ...state, StatusForaddSettingStaffList: 0 };

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

    case "SETTING_GENERAL_ADD":
      return {
        ...state,
        settingGeneralPage: action.payload.response,
        StatusCodeForSettingGeneral: action.payload.statusCode,
      };
    case "CLEAR_SETTING_GENERAL_ADD":
      return { ...state, StatusCodeForSettingGeneral: 0 };

    case "GENERAL_EMAIL_ERROR":
      return { ...state, generalEmailError: action.payload };

    case "CLEAR_GENERAL_EMAIL_ERROR":
      return { ...state, generalEmailError: "" };

    case "MOBILE_ERROR":
      return { ...state, generalMobileError: action.payload };

    case "CLEAR_MOBILE_ERROR":
      return { ...state, generalMobileError: "" };

    case "GET_ALL_GENERAL":
      return {
        ...state,
        settingGetGeneralData: action.payload.response,
        StatusCodeforGetGeneral: action.payload.statusCode,
      };
    case "CLEAR_GET_ALL_GENERAL":
      return { ...state, StatusCodeforGetGeneral: 0 };

    case "GENERAL_PASSWORD_CHANGES":
      return {
        ...state,
        settingGeneraLPasswordChanges: action.payload.response,
        StatusCodeforGeneralPassword: action.payload.statusCode,
      };
    case "CLEAR_GENERAL_PASSWORD_CHANGES":
      return { ...state, StatusCodeforGeneralPassword: 0 };

    case "GENERAL_PASSWORD_CHECK":
      return {
        ...state,
        checkPassword: action.payload.response,
        statusCodeForCheckPassword: action.payload.statusCode,
      };
    case "CLEAR_GENERAL_PASSWORD_CHECK":
      return { ...state, statusCodeForCheckPassword: 0 };

    case "DELETE_GENERAL_ERROR":
      return { ...state, generalDeleteError: action.payload };

    case "CLEAR_DELETE_GENERAL_ERROR":
      return { ...state, generalDeleteError: "" };

    case "PASSWORD_ERROR":
      return { ...state, notmatchpass: action.payload };

    case "CLEAR_PASSWORD_ERROR":
      return { ...state, notmatchpass: "" };

    case "CONFORM_PASSWORD_MATCHES":
      return { ...state, conformPassNotmatch: action.payload };

    case "CLEAR_CONFORM_PASSWORD_MATCHES":
      return { ...state, conformPassNotmatch: "" };

    case "DELETE_GENERAL":
      return {
        ...state,
        generalDelete: action.payload,
        statusCodeForGeneralDelete: action.payload.statusCode,
      };
    case "CLEAR_DELETE_GENERAL":
      return { ...state, statusCodeForGeneralDelete: 0 };
    case "RECURRING_ROLE":
      return { ...state, addRecurringRole: action.payload.statusCode };

    case "REMOVE_RECURRING_ROLE":
      return { ...state, addRecurringRole: 0 };

    case "ROLE_ERROR":
      return { ...state, roleError: action.payload };

    case "CLEAR_ROLE_ERROR":
      return { ...state, roleError: "" };

    case "ROLE_EDIT_ERROR":
      return { ...state, roleEditError: action.payload };

    case "CLEAR_ROLE_EDIT_ERROR":
      return { ...state, roleEditError: "" };

    case "NEW_SUBSCRIPTION":
      return {
        ...state,
        subscriptionNew: action.payload.response,
        statusCodeNewSubscription: action.payload.statusCode,
      };
    case "CLEAR_NEW_SUBSCRIPTION":
      return { ...state, statusCodeNewSubscription: 0 };

    case "NEW_SUBSCRIPTION_LIST":
      return {
        ...state,
        subcripitionAllDetails: action.payload.response,
        statusCodeForSubcripitionAllDetails: action.payload.statusCode,
      };
    case "CLEAR_NEW_SUBSCRIPTION_LIST":
      return { ...state, statusCodeForSubcripitionAllDetails: 0 };

    case "SUBSCRIPTION_PDF":
      return {...state, SubscriptionPDF: action.payload.response, SubscriptionPdfSuccess: action.payload.statusCode,toTriggerPDF: false,};
    case "CLEAR_SUBSCRIPTION_PDF_STATUS_CODE":
      return { ...state, SubscriptionPdfSuccess: 0 };

    case "SETTINGSADDRECURRING":
      return {...state,  SettingsRecurringAddSuccess: action.payload.statusCode,};
    case "CLEAR_SETTINGSADDRECURRING_STATUS_CODE":
      return { ...state, SettingsRecurringAddSuccess: 0 };

    case "FREQUENCYTYPESLIST":
      return {...state,  FrequencyTypeList : action.payload.response, FrequncyTypegetSuccessCode: action.payload.statusCode,};
    case "CLEAR_FREQUENCYTYPESLIST_STATUS_CODE":
      return { ...state, FrequncyTypegetSuccessCode: 0 };  

    case "NOTIFICATIONTYPESLIST":
      return {...state, NotificationTypeList : action.payload.response, NotificationypegetSuccessCode: action.payload.statusCode,};
    case "CLEAR_NOTIFICATIONTYPESLIST_STATUS_CODE":
      return { ...state, NotificationypegetSuccessCode: 0 };  

    case "SETTINGSGETRECURRING":
      return {...state, SettingsBillsGetRecurring : action.payload.response, settingsBillsggetRecurrSucesscode: action.payload.statusCode,};
    case "CLEAR_SETTINGSGETRECURRING_STATUS_CODE":
      return { ...state, settingsBillsggetRecurrSucesscode: 0 };    
 
    case "ADDINVOICE_SETTINGS":
      return {...state,  settingsAddInvoiceSucesscode: action.payload.statusCode,};
    case "CLEAR_ADDINVOICE_SETTINGS_STATUS_CODE":
      return { ...state, settingsAddInvoiceSucesscode: 0 }; 

    case "SETTINGSGETINVOICE":
      return {...state, SettingsInvoice : action.payload.response, settingsInvoicegetSucesscode: action.payload.statusCode,};
    case "CLEAR_SETTINGSGETINVOICE_STATUS_CODE":
      return { ...state, settingsInvoicegetSucesscode: 0 };   
      
    case "ERROR_SETTINGS_GETINVOICE":
      return {...state, settingsInvoicegetErrorStatuscode: action.payload.statusCode,};
    case "CLEAR_ERROR_SETTINGS_GETINVOICE_STATUS_CODE":
      return { ...state, settingsInvoicegetErrorStatuscode: 0 };    

    default:
      return state; 
  }
};
export default SettingsReducer;
