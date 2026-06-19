export const initialState = {
  Compliance: [],
  filterOptions: [],
  message: [],
  statusCodeForAddCompliance: 0,
  messageShow: false,
  errorMessage: "",
  VendorList: [],
  addVendorSuccessStatusCode: 0,
  getVendorStatusCode: 0,
  deleteVendorStatusCode: 0,
  alreadyVendorHere: "",
  alreadyVendorEmailError: "",
  complianceChangeRes: "",
  complianceChangeStatus: 0,
  complianceChangeError: "",
  noVendorStatusCode: 0,
  deleteCompliance: [],
  statusCodeForDeleteCompliance: 0,
  statusCodeCompliance: 0,
  complianceAssignChangeRes: "",
  complianceAssignChangeError: "",
  complianceAssignChangeStatus: 0,
  getComplianceComments: [],
  statusCodeForGetComplianceComment: 0,
  AddComplianceComment: [],
  statusCodeForAddComplianceComment: 0,
  updateVendorSuccessStatusCode: 0,
  statusCodeForEditCompliant: 0,
  ParticularComplaint: [],
  statusCodeforgetparticularCompliant: 0,
  complaintsView: [],
  getcomplaintsViewStatus: 0,
  apiResponseHostelId: "",
  ComplianceUpdates: [],
  statusCodeComplianceUpdates: 0,
  updateCustomizationSuccess: 0,
  vendorOverview: "",
  vendorOverviewExpenseList: "",
  vendorOverviewExpenseListStatus: 0,
  vendorOverviewExpensePaymentList: "",
  vendorOverviewExpensePaymentListStatus: 0,
  vendorSettlementInitialize: "",
  addCommentsVendorstatusCode: 0,

  getVendorCommentsList: "",
  getVendorCommentsListSuccess: 0,

  vendorFilters: {
    paymentStatus: "",
    paymentStatusLabel: "",
    search: "",
    categoryName: "",
    categoryId: "",
  },
};

const ComplianceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_ALL":
      return initialState;

    case "SET_HOSTEL_ID":
      return { ...state, apiResponseHostelId: action.payload };

    case "SET_VENDOR_FILTERS":
      return {
        ...state,
        vendorFilters: {
          ...state.vendorFilters,
          ...action.payload,
        },
      };

    case "COMPLIANCE_LIST":
      return {
        ...state,
        Compliance: action.payload.response,
        filterOptions: action.payload.filterOptions,
        statusCodeCompliance: action.payload.statusCode,
      };
    case "CLEAR_COMPLIANCE_LIST":
      return { ...state, statusCodeCompliance: 0 };

    case "COMPLAINTS_VIEW_UPDATES":
      return {
        ...state,
        ComplianceUpdates: action.payload.response,
        statusCodeComplianceUpdates: action.payload.statusCode,
      };
    case "REMOVE_COMPLAINTS_VIEW_UPDATES":
      return { ...state, statusCodeComplianceUpdates: 0 };

    case "COMPLIANCE_ADD":
      return {
        ...state,
        messageShow: true,
        statusCodeForAddCompliance: action.payload.statusCode,
      };
    case "CLEAR_COMPLIANCE_STATUS_CODE":
      return { ...state, statusCodeForAddCompliance: 0 };
    case "EDIT_COMPLAINT_SUCCESS":
      return {
        ...state,
        statusCodeForEditCompliant: action.payload.statusCode,
      };
    case "CLEAR_EDIT_COMPLIANT_STATUS_CODE":
      return { ...state, statusCodeForEditCompliant: 0 };

    case "ERROR":
      return { ...state, errorMessage: action.payload };
    case "CLEAR_ERROR":
      return { ...state, errorMessage: "" };
    case "VENDOR_LIST":
      return {
        ...state,
        VendorList: action.payload.response,
        getVendorStatusCode: action.payload.statusCode,
      };
    case "CLEAR_GET_VENDOR_STATUS_CODE":
      return { ...state, getVendorStatusCode: 0 };
    case "ERROR_VENDOR_LIST":
      return { ...state, noVendorStatusCode: action.payload.statusCode };
    case "CLEAR_ERROR_VENDOR_LIST":
      return { ...state, noVendorStatusCode: 0 };
    case "ADD_VENDOR":
      return {
        ...state,
        addVendorSuccessStatusCode: action.payload.statusCode,
      };
    case "CLEAR_ADD_VENDOR_STATUS_CODE":
      return { ...state, addVendorSuccessStatusCode: 0 };
    case "UPDATE_VENDOR":
      return {
        ...state,
        updateVendorSuccessStatusCode: action.payload.statusCode,
      };
    case "CLEAR_UPDATE_VENDOR_STATUS_CODE":
      return { ...state, updateVendorSuccessStatusCode: 0 };

    case "DELETE_VENDOR":
      return { ...state, deleteVendorStatusCode: action.payload.statusCode };
    case "CLEAR_DELETE_VENDOR_STATUS_CODE":
      return { ...state, deleteVendorStatusCode: 0 };

    case "ALREADY_VENDOR_ERROR":
      return { ...state, alreadyVendorHere: action.payload };
    case "CLEAR_ALREADY_VENDOR_ERROR":
      return { ...state, alreadyVendorHere: "" };

    case "CUSTOMIZE_VENDOR_REDUCER":
      return {
        ...state,
        updateCustomizationSuccess: action.payload.statusCode,
      };
    case "REMOVE_CUSTOMIZE_VENDOR_REDUCER":
      return { ...state, updateCustomizationSuccess: 0 };

    case "PARTICULAR_VENDOR_OVERVIEW":
      return {
        ...state,
        vendorOverview: action.payload.response,
      };

    case "VENDOR_OVERVIEW_EXPENSE_LIST":
      return {
        ...state,
        vendorOverviewExpenseList: action.payload.response,
        vendorOverviewExpenseListStatus: action.payload.statusCode,
      };
    case "REMOVE_VENDOR_OVERVIEW_EXPENSE_LIST":
      return {
        ...state,
        vendorOverviewExpenseListStatus: 0,
      };

    case "VENDOR_SETTLE_INITIALIZE_REDUCER":
      return {
        ...state,
        vendorSettlementInitialize: action.payload.response,
      };

    case "ADD_VENDOR_COMMENTS_REDUCER":
      return {
        ...state,
        addCommentsVendorstatusCode: action.payload.statusCode,
      };

    case "REMOVE_ADD_VENDOR_COMMENTS_REDUCER":
      return {
        ...state,
        addCommentsVendorstatusCode: 0,
      };

    case "VENDOR_COMMENTS_REDUCER":
      return {
        ...state,
        getVendorCommentsList: action.payload.response,
        getVendorCommentsListSuccess: action.payload.statusCode,
      };

    case "REMOVE_VENDOR_COMMENTS_REDUCER":
      return {
        ...state,
        getVendorCommentsListSuccess: 0,
      };

    case "VENDOR_OVERVIEW_EXPENSE_PAYMENTLIST_REDUCER":
      return {
        ...state,
        vendorOverviewExpensePaymentList: action.payload.response,
        vendorOverviewExpensePaymentListStatus: action.payload.statusCode,
      };
    case "REMOVE_VENDOR_OVERVIEW_EXPENSE_PAYMENTLIST_REDUCER":
      return {
        ...state,
        vendorOverviewExpensePaymentListStatus: 0,
      };

    case "ALREADY_VENDOR_EMAIL_ERROR":
      return { ...state, alreadyVendorEmailError: action.payload };
    case "CLEAR_ALREADY_VENDOR_EMAIL_ERROR":
      return { ...state, alreadyVendorEmailError: "" };
    case "COMPLIANCE_CHANGE_STATUS":
      return {
        ...state,
        complianceChangeRes: action.payload.response,
        complianceChangeStatus: action.payload.statusCode,
      };
    case "COMPLIANCE_CHANGE_STATUS_ERROR":
      return { ...state, complianceChangeError: action.payload };
    case "REMOVE_COMPLIANCE_CHANGE_STATUS_ERROR":
      return { ...state, complianceChangeError: "" };
    case "CLEAR_COMPLIANCE_CHANGE_STATUS_CODE":
      return { ...state, complianceChangeStatus: 0 };

    case "COMPLIANCE_CHANGE_ASSIGN":
      return {
        ...state,
        complianceAssignChangeRes: action.payload.response,
        complianceAssignChangeStatus: action.payload.statusCode,
      };
    case "COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR":
      return { ...state, complianceAssignChangeError: action.payload };
    case "REMOVE_COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR":
      return { ...state, complianceAssignChangeError: "" };
    case "CLEAR_COMPLIANCE_CHANGE_ASSIGN":
      return { ...state, complianceAssignChangeStatus: 0 };

    case "DELETE_COMPLIANCE":
      return {
        ...state,
        deleteCompliance: action.payload.response,
        statusCodeForDeleteCompliance: action.payload.statusCode,
      };
    case "CLEAR_DELETE_COMPLIANCE":
      return { ...state, statusCodeForDeleteCompliance: 0 };
    case "COMPLAINTS_VIEW":
      return {
        ...state,
        complaintsView: action.payload.response,
        getcomplaintsViewStatus: action.payload.statusCode,
      };
    case "REMOVE_COMPLAINTS_VIEW":
      return { ...state, getcomplaintsViewStatus: 0 };

    // commentApi
    case "COMPLIANCE_COMENET_LIST":
      return {
        ...state,
        getComplianceComments: action.payload.response,
        statusCodeForGetComplianceComment: action.payload.statusCode,
      };
    case "CLEAR_COMPLIANCE_COMENET_LIST":
      return { ...state, statusCodeForGetComplianceComment: 0 };

    case "COMPLIANCE_ADD_COMMENT":
      return {
        ...state,
        AddComplianceComment: action.payload.response,
        statusCodeForAddComplianceComment: action.payload.statusCode,
      };
    case "CLEAR_COMPLIANCE_ADD_COMMENT":
      return { ...state, statusCodeForAddComplianceComment: 0 };

    case "PARTICULAR-COMPLIANT":
      return {
        ...state,
        ParticularComplaint: action.payload.response,
        statusCodeforgetparticularCompliant: action.payload.statusCode,
      };
    case "CLEAR_PARTICULAR_COMPLIANT_STATUS":
      return { ...state, statusCodeforgetparticularCompliant: 0 };

    default:
      return state;
  }
};
export default ComplianceReducer;
