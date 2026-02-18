export const initialState = {
    getReportsList: '',
    getSuccessReports: 0,
    getInvoiceRegister: [],
    getInvoiceRegisterSuccess: 0,
    getExpenseRegister: [],
    getExpenseRegisterSuccess: 0,
    getReceiptRegister: [],
    getReceiptRegisterSuccess: 0,
    getTenantRegister: [],
    getTenantRegisterSuccess: 0,

    invoiceRegisterFilters: {
        startDate: undefined,
        endDate: undefined,
        invoiceTypes: [],
        createdBy: [],
        createdByLabels:[],
        invoiceModes: [],
        paymentStatus: [],
        search: "",
        minPaidAmount: "",
        maxPaidAmount: "",
        minOutstandingAmount: "",
        maxOutstandingAmount: "",
        period: [],

    },
    expenseRegisterFilters: {
        startDate: undefined,
        endDate: undefined,
        category: [],
        period: [],
        paymentMode: [],
        paidTo: [],
        createdBy: [],
        createdByLabels: [],
        categoryLabel: []

    },

    receiptRegisterFilters: {
        startDate: undefined,
        endDate: undefined,
        invoiceType: [],
        collectedBy: [],
        createdByLabels: [],
        period: [],
        paymentMode: [],


    },
    tenantRegisterFilters: {
        startDate: undefined,
        endDate: undefined,
         period: [],
         search: "",
         tenantStatus: [],
         floor: [],
         room: [],
         size:'',
         page: '',
         floorId: [],
         roomId: [],
         sharingType : "",
          sharingTypeLabel: ''
         

    }




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
            return { ...state, getInvoiceRegisterSuccess: 0 }
        case 'GET_REPORTS_EXPENSE_REGISTER_REDUCER':
            return { ...state, getExpenseRegister: action.payload.response, getExpenseRegisterSuccess: action.payload.statusCode }

        case 'REMOVE_GET_REPORTS_EXPENSE_REGISTER_REDUCER':
            return { ...state, getExpenseRegisterSuccess: 0 }

        case 'GET_REPORTS_RECEIPT_REGISTER_REDUCER':
            return { ...state, getReceiptRegister: action.payload.response, getReceiptRegisterSuccess: action.payload.statusCode }

        case 'REMOVE_GET_REPORTS_RECEIPT_REGISTER_REDUCER':
            return { ...state, getReceiptRegisterSuccess: 0 }

        case 'GET_REPORTS_TENANT_REGISTER_REDUCER':
            return { ...state, getTenantRegister: action.payload.response, getTenantRegisterSuccess: action.payload.statusCode }

        case 'REMOVE_GET_REPORTS_TENANT_REGISTER_REDUCER':
            return { ...state, getTenantRegisterSuccess: 0 }


        case "SET_TENANT_REGISTER_FILTERS":
            return {
                ...state,
                tenantRegisterFilters: {
                    ...state.tenantRegisterFilters,
                    ...action.payload,
                },
            };



        case "SET_EXPENSE_REGISTER_FILTERS":
            return {
                ...state,
                expenseRegisterFilters: {
                    ...state.expenseRegisterFilters,
                    ...action.payload,
                },
            };


        case "SET_RECEIPT_REGISTER_FILTERS":
            return {
                ...state,
                receiptRegisterFilters: {
                    ...state.receiptRegisterFilters,
                    ...action.payload,
                },
            };



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