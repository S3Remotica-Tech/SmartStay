export const initialState = {
    getReportsList: '',
    getSuccessReports: 0,
    getInvoiceRegister: [],
    getInvoiceRegisterSuccess: 0,
     invoiceRegisterFilters: {
        startDate: undefined,
        endDate: undefined,
        invoiceTypes: [],
        createdBy: [],
               invoiceModes: [],
        paymentStatus: [],
        search: "",

    },

}


const ReportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_ALL':
            return initialState;
        case 'GET_REPORTS_REDUCER':
            return { ...state, getReportsList: action.payload.response, getSuccessReports: action.payload.statusCode }
        case 'CLEAR_GET_REPORTS_REDUCER':
            return { ...state, getSuccessReports: 0 }
        case 'GET_REPORTS_INVOICE_REGISTER_REDUCER':
            return { ...state, getInvoiceRegister: action.payload.response, getInvoiceRegisterSuccess: action.payload.statusCode }

 case 'REMOVE_GET_REPORTS_INVOICE_REGISTER_REDUCER':
            return { ...state,  getInvoiceRegisterSuccess: 0 }
 case "SET_INVOICE_REGISTER_FILTERS":
            return {
                ...state,
                invoiceRegisterFilters: {
                    ...state.invoiceRegisterFilters,
                    ...action.payload,
                },
            };


        default:
            return state;
    }
}
export default ReportsReducer;