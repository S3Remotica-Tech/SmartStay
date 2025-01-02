const initialState = {
    Compliance: [],
    message: '',
    statusCodeForAddCompliance: 0,
    messageShow: false,
    errorMessage: '',
    VendorList: [],
    addVendorSuccessStatusCode: 0,
    getVendorStatusCode: 0,
    deleteVendorStatusCode: 0,
    alreadyVendorHere: '',
    complianceChangeRes: "",
    complianceChangeStatus: 0,
    complianceChangeError: '',
    noVendorStatusCode: 0,

}

const ComplianceReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'COMPLIANCE_LIST':
            return { ...state, Compliance: action.payload }
        case 'COMPLIANCE_ADD':
            return { ...state, message: action.payload, messageShow: true, statusCodeForAddCompliance: action.payload.statusCode }
        case 'CLEAR_COMPLIANCE_STATUS_CODE':
            return { ...state, statusCodeForAddCompliance: 0 }
        case 'ERROR':
            return { ...state, errorMessage: action.payload }
        case 'CLEAR_ERROR':
            return { ...state, errorMessage: '' }
        case 'VENDOR_LIST':
            return { ...state, VendorList: action.payload.response, getVendorStatusCode: action.payload.statusCode }
        case 'CLEAR_GET_VENDOR_STATUS_CODE':
            return { ...state, getVendorStatusCode: 0 }
        case 'ERROR_VENDOR_LIST':
            return { ...state, noVendorStatusCode: action.payload.statusCode }
        case 'CLEAR_ERROR_VENDOR_LIST':
            return { ...state, noVendorStatusCode: 0 }
        case 'ADD_VENDOR':
            return { ...state, addVendorSuccessStatusCode: action.payload.statusCode }
        case 'CLEAR_ADD_VENDOR_STATUS_CODE':
            return { ...state, addVendorSuccessStatusCode: 0 }
        case 'DELETE_VENDOR':
            return { ...state, deleteVendorStatusCode: action.payload.statusCode }
        case 'CLEAR_DELETE_VENDOR_STATUS_CODE':
            return { ...state, deleteVendorStatusCode: 0 }

        case 'ALREADY_VENDOR_ERROR':
            return { ...state, alreadyVendorHere: action.payload }
        case 'CLEAR_ALREADY_VENDOR_ERROR':
            return { ...state, alreadyVendorHere: '' }
        case 'COMPLIANCE_CHANGE_STATUS':
            return { ...state, complianceChangeRes: action.payload.response, complianceChangeStatus: action.payload.statusCode }
        case 'COMPLIANCE_CHANGE_STATUS_ERROR':
            return { ...state, complianceChangeError: action.payload }
        case 'CLEAR_COMPLIANCE_CHANGE_STATUS_CODE':
            return { ...state, complianceChangeStatus: 0 }
    }
    return state;
}
export default ComplianceReducer;