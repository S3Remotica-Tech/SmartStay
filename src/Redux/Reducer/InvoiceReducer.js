import { ManualInvoice } from "../Action/InvoiceAction";

const initialState = {
    Invoice: [],
    message: '',
    invoiceSettings: [],
    invoicePDF: [],
    prefix: '',
    statusCodeForPDf: 0,
    suffix: '',
    profile: '',
    AmenitiesSettings: [],
    AmenitiesList: [],
    AmenitiesUpdate: [],
    statusCode: 0,
    InvoiceListStatusCode: 0,
    toTriggerPDF: false,
    invoiceSettingsStatusCode: 0,
    StatusCodeAmenitiesGet: 0,
    AmenitiesUpdateStatusCode: 0,
    ManualInvoice: [],
    manualInvoiceStatusCode: 0,
    UpdateInvoiceStatusCode:0,
    ManualInvoiceNUmber : [],
    ManualInvoices:[],
    ManualInvoicesgetstatuscode : 0,
    Manulainvoicenumberstatuscode:0,
    manualInvoiceAddStatusCode: 0,

}

const InvoiceReducer = (state = initialState, action) => {
    console.log("action",action.payload);
    switch (action.type) {
        case 'INVOICE_LIST':
            return { ...state, Invoice: action.payload.response, InvoiceListStatusCode: action.payload.statusCode }
        case 'CLEAR_INVOICE_LIST':
            return { ...state, InvoiceListStatusCode: 0, toTriggerPDF: true }
        case 'UPDATEINVOICE_DETAILS':
            return { ...state, message: action.payload.data.message, UpdateInvoiceStatusCode:action.payload.status }
            case 'CLEAR_INVOICE_UPDATE_LIST':
                return { ...state, UpdateInvoiceStatusCode: 0,message:null }
        case 'INVOICE_SETTINGS':
            return { ...state, prefix: action.payload.prefix, suffix: action.payload.suffix, profile:action.payload.profile, invoiceSettingsStatusCode:action.payload.statusCode }
        case 'CLEAR_INVOICE_SETTINS_STATUSCODE':
            return { ...state, invoiceSettingsStatusCode: 0 }
        case 'CLEAR_AMENITIES_SETTINS_STATUSCODE':
            return { ...state, statusCode: 0 }
        case 'INVOICE_PDF':
            return { ...state, invoicePDF: action.payload, statusCodeForPDf: action.payload.statusCode, toTriggerPDF: false }
        case 'CLEAR_INVOICE_PDF_STATUS_CODE':
            return { ...state, statusCodeForPDf: 0 }
        case 'AMENITIES_SETTINGS':
            return { ...state, AmenitiesSettings: action.payload.response, statusCode: action.payload.statusCode }
        case 'AMENITIES_LIST':
            return { ...state, AmenitiesList: action.payload.response, StatusCodeAmenitiesGet:action.payload.statusCode }
        case 'CLEAR_AMENITIES_STATUS_CODE':
            return { ...state, StatusCodeAmenitiesGet: 0 }
        case 'AMENITIES_UPDATE':
            return { ...state, AmenitiesUpdate: action.payload, AmenitiesUpdateStatusCode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_AMENITIES_UPDATE':
            return { ...state, AmenitiesUpdateStatusCode: 0 }
        case 'MANUAL_INVOICE': //manual invoice
            return { ...state, ManualInvoice: action.payload, manualInvoiceStatusCode: action.payload.statusCode }
            case 'MANUAL_INVOICE_NUMBER_GET':
             return { ...state, ManualInvoiceNUmber: action.payload.response, Manulainvoicenumberstatuscode: action.payload.statusCode }
        case 'REMOVE_MANUAL_INVOICE_NUMBER_GET': 
        return { ...state, Manulainvoicenumberstatuscode: 0 } 

        case 'MANUAL_INVOICE_AMOUNT_GET':
              return { ...state, ManualInvoice: action.payload.response, manualInvoiceStatusCode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_MANUAL_INVOICE_AMOUNT_GET':
              return { ...state, manualInvoiceStatusCode: 0 } 

        case 'MANUAL_INVOICE_ADD':
              return { ...state, ManualInvoice: action.payload, manualInvoiceAddStatusCode:action.payload.statusCode}
        case 'REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD':
              return { ...state, manualInvoiceAddStatusCode: 0 }
        // case 'MANUAL_INVOICES_LIST' :
        //     return { ...state, ManualInvoices: action.payload, ManualInvoicesgetstatuscode:action.payload.statusCode}
        //     case 'REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST':
        //         return { ...state, ManualInvoicesgetstatuscode: 0 }
        }
    
    return state;
}
export default InvoiceReducer;