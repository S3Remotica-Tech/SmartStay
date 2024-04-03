const initialState = {
    Invoice: [],
    message:'',
    invoiceSettings:[],
    invoicePDF: [],
    prefix:'',
    suffix: '',
    profile:'',
    }
    
    const InvoiceReducer = (state = initialState, action) => {
        switch(action.type) {
            case 'INVOICE_LIST':
                return {...state, Invoice: action.payload}
            case 'ADDINVOICE_DETAILS':
                return {...state, message:action.payload.message}
                case 'INVOICE_SETTINGS':
                    return{ ...state, prefix:action.payload.prefix, suffix:action.payload.suffix, profile:action.payload.profile}
                    case 'INVOICE_PDF':
                        return { ...state,invoicePDF:action.payload}
        }
        return state;
    } 
 export default InvoiceReducer;