const initialState = {
    Invoice: [],
    message:'',
    invoiceSettings:[],
    invoicePDF: [],
    prefix:'',
    suffix: '',
    profile:'',
    AmenitiesSettings:[],
    AmenitiesList:[],
    AmenitiesName:[],
    statusCode:0,
    }
    
    const InvoiceReducer = (state = initialState, action) => {
        console.log("action",action);
        switch(action.type) {
            case 'INVOICE_LIST':
                return {...state, Invoice: action.payload}
            case 'ADDINVOICE_DETAILS':
                return {...state, message:action.payload.message}
                case 'INVOICE_SETTINGS':
                    return{ ...state, prefix:action.payload.prefix, suffix:action.payload.suffix, profile:action.payload.profile}
                    case 'CLEAR_AMENITIES_SETTINS_STATUSCODE':
                        return{ ...state,statusCode:0 }
                    case 'INVOICE_PDF':
                        return { ...state,invoicePDF:action.payload}
                        case 'AMENITIES_SETTINGS':
                            return { ...state, AmenitiesSettings:action.payload.response, statusCode:action.payload.statusCode}
                            case 'AMENITIES_LIST':
                                return {...state, AmenitiesList:action.payload}
                                case 'AMENITIES_NAME':
                                return {...state, AmenitiesName:action.payload}
        }
        return state;
    } 
 export default InvoiceReducer;