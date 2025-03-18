// import { ManualInvoice } from "../Action/InvoiceAction";

export const initialState = {
    Invoice: [],
    message: '',
    invoiceSettings: [],
    invoicePDF: '',
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
    BillsErrorstatusCode:0,
    manualInvoiceStatusCode: 0,
    UpdateInvoiceStatusCode: 0,
    ManualInvoiceNUmber: [],
    ManualInvoices: [],
    ManualInvoicesgetstatuscode: 0,
    Manulainvoicenumberstatuscode: 0,
    manualInvoiceAddStatusCode: 0,
    manualInvoiceEditStatusCode: 0,
    manualInvoiceDeleteStatusCode: 0,
    recurrbillamountgetStatuscode: 0,
    Recurringbillamounts: [],
    RecurringBillAddStatusCode: 0,
    RecurringBills: [],
    RecurringbillsgetStatuscode: 0,
    NodataRecurringStatusCode:0,
    deleterecurringbillsStatuscode: 0,
    settingsaddRecurringStatusCode: 0,
    deleteUserSuccessStatusCode: 0,
    deleteAmenitiesSuccessStatusCode: 0,
    assignAmenitiesSuccessStatusCode: 0,
    getAssignAmenitiesSuccessStatusCode: 0,
    GetAssignAmenitiesList: [],
    GetUnAssignAmenitiesList: [],
    UnAssignAmenitiesSuccessStatusCode: 0,
    deletemanualError: '',
    ReceiptList: [],
    ReceiptlistgetStatuscode: 0,
    NodataReceiptStatusCode:0,
    ReceiptAddsuccessStatuscode: 0,
    ReceiptEditsuccessStatuscode: 0,
    ReceiptDeletesuccessStatuscode: 0,
    Reference_Id: '',
    ReferenceIdgetsuccessStatuscode: 0,
    errorAmenities: 0,
    alreadyAssignAmenitiesStatusCode: 0,
    statusCodeForReceiptPDf: 0,
    ReceiptPDF: '',
    getstatusCodeForfilterrecurrcustomers: 0,
    FilterRecurrCustomers: [],
    errorRecuireFile:'',
    RecurenotEnable: '',
    RecurenotenableStatusCode : 0,
    Errmessage: '',
    amnitiessAddError:''
}

const InvoiceReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ERROR_AMENITIES':
            return { ...state, errorAmenities: action.payload.statusCode }

        case 'REMOVE_ERROR_AMENITIES':
            return { ...state, errorAmenities: 0 }

        case 'ALREADY_ASSIGN_ERROR':
            return { ...state, alreadyAssignAmenitiesStatusCode: action.payload.statusCode }

        case 'REMOVE_ALREADY_ASSIGN_ERROR':
            return { ...state, alreadyAssignAmenitiesStatusCode: 0 }
            case 'ERROR_RECURE':
                return { ...state, errorRecuireFile: action.payload.response }
    
            case 'REMOVE_ERROR_RECURE':
                return { ...state, errorRecuireFile: ''}

                case 'ERROR_AMENITIES_SETTINGS':
                    return { ...state, amnitiessAddError: action.payload.response }
        
                case 'REMOVE_ERROR_AMENITIES_SETTINGS':
                    return { ...state, amnitiessAddError: ''}

        case 'DELETE_USER':
            return { ...state, deleteUserSuccessStatusCode: action.payload.statusCode }

        case 'REMOVE_DELETE_USER_STATUS_CODE':
            return { ...state, deleteUserSuccessStatusCode: 0 }

        case 'DELETE_AMENITIES':
            return { ...state, deleteAmenitiesSuccessStatusCode: action.payload.statusCode }

        case 'REMOVE_DELETE_AMENITIES_STATUS_CODE':
            return { ...state, deleteAmenitiesSuccessStatusCode: 0 }


        case 'ASSIGN_AMENITIES':
            return { ...state, assignAmenitiesSuccessStatusCode: action.payload.statusCode }

        case 'REMOVE_ASSIGN_AMENITIES_STATUS_CODE':
            return { ...state, assignAmenitiesSuccessStatusCode: 0 }



        case 'UN_ASSIGN_AMENITIES':
            return { ...state, UnAssignAmenitiesSuccessStatusCode: action.payload.statusCode }

        case 'REMOVE_UN_ASSIGN_AMENITIES_STATUS_CODE':
            return { ...state, UnAssignAmenitiesSuccessStatusCode: 0 }





        case 'GET_ASSIGN_AMENITIES':
            return { ...state, GetAssignAmenitiesList: action.payload.Assigned, GetUnAssignAmenitiesList: action.payload.unAssigned, getAssignAmenitiesSuccessStatusCode: action.payload.statusCode }

        case 'REMOVE_GET_ASSIGN_AMENITIES_STATUS_CODE':
            return { ...state, getAssignAmenitiesSuccessStatusCode: 0 }

        case 'INVOICE_LIST':
            return { ...state, Invoice: action.payload.response, InvoiceListStatusCode: action.payload.statusCode }
        case 'CLEAR_INVOICE_LIST':
            return { ...state, InvoiceListStatusCode: 0, toTriggerPDF: true }
        case 'UPDATEINVOICE_DETAILS':
            return { ...state,  UpdateInvoiceStatusCode: 
                action.payload.response.statusCode ||
                 action.payload.statusCode }
        case 'CLEAR_INVOICE_UPDATE_LIST':
            return { ...state, UpdateInvoiceStatusCode: 0, message: null }
        case 'INVOICE_SETTINGS':
            return { ...state, prefix: action.payload.prefix, suffix: action.payload.suffix, profile: action.payload.profile, invoiceSettingsStatusCode: action.payload.statusCode }
        case 'CLEAR_INVOICE_SETTINS_STATUSCODE':
            return { ...state, invoiceSettingsStatusCode: 0 }
        case 'CLEAR_AMENITIES_SETTINS_STATUSCODE':
            return { ...state, statusCode: 0 }
        case 'INVOICE_PDF':
                        return { ...state, invoicePDF: action.payload.response, statusCodeForPDf: action.payload.statusCode, toTriggerPDF: false }
        case 'CLEAR_INVOICE_PDF_STATUS_CODE':
            return { ...state, statusCodeForPDf: 0 }
        case 'AMENITIES_SETTINGS':
            return { ...state, AmenitiesSettings: action.payload.response, statusCode: action.payload.statusCode }
        case 'AMENITIES_LIST':
            return { ...state, AmenitiesList: action.payload.response, StatusCodeAmenitiesGet: action.payload.statusCode }
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

        case 'MANUAL_INVOICE_AMOUNT_GET': //Bill amount data
            return { ...state, ManualInvoice: action.payload.response, manualInvoiceStatusCode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_MANUAL_INVOICE_AMOUNT_GET':
            return { ...state, manualInvoiceStatusCode: 0 }

        case 'RECURRING_BILL_GET_AMOUNT': //Recurring bill data 
            return { ...state, Recurringbillamounts: action.payload.response, recurrbillamountgetStatuscode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_RECURRING_INVOICE_AMOUNT':
            return { ...state, recurrbillamountgetStatuscode: 0 }

        case 'FAIL_ADD_RECURRING_BILL': 
            return { ...state, RecurenotEnable: action.payload.response, RecurenotenableStatusCode: action.payload.statusCode , 
                // Errmessage : action.payload.message 
            }
        case 'REMOVE_STATUS_CODE_FAIL_ADD_RECURRING_BILL':
            return { ...state, RecurenotenableStatusCode: 0 }
            

        case 'MANUAL_INVOICE_ADD':
            return { ...state, manualInvoiceAddStatusCode: action.payload.statusCode } //bills Add 
        case 'REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD':
            return { ...state, manualInvoiceAddStatusCode: 0 }


        case 'MANUAL_INVOICE_EDIT':
            return { ...state, manualInvoiceEditStatusCode: action.payload.statusCode } //bills edit 
        case 'REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT':
            return { ...state, manualInvoiceEditStatusCode: 0 }

        case 'MANUAL_INVOICE_DELETE':
            return { ...state, manualInvoiceDeleteStatusCode: action.payload.statusCode } //bills delete 
        case 'REMOVE_STATUS_CODE_MANUAL_INVOICE_DELETE':
            return { ...state, manualInvoiceDeleteStatusCode: 0 }

        case 'RECURRING_BILLS_ADD':
            return { ...state, RecurringBillAddStatusCode: action.payload.statusCode } //Recurrinng bills Add
        case 'REMOVE_STATUS_CODE_RECURRING_BILLS_ADD':
            return { ...state, RecurringBillAddStatusCode: 0 }

        case 'MANUAL_INVOICES_LIST':
            return { ...state, ManualInvoices: action.payload.response ? action.payload.response : [], ManualInvoicesgetstatuscode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST':
            return { ...state, ManualInvoicesgetstatuscode: 0 }
        case 'NODATA_BILL_LIST':
                return { ...state, BillsErrorstatusCode: action.payload.statusCode }
        case 'REMOVE_NODATA_BILL_LIST':
                return { ...state, BillsErrorstatusCode: 0}

        case 'DELETE_MANUAL_ERROR':
            return { ...state, deletemanualError: action.payload }
        // case 'DELETE_MANUAL_ERROR':
        //     return { ...state, deletemanualError: '' }
        case 'RECURRING_BILLS_LIST':
            return { ...state, RecurringBills: action.payload.response ? action.payload.response : [], RecurringbillsgetStatuscode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_RECURRING_BILLS_LIST':
            return { ...state, RecurringbillsgetStatuscode: 0 }

        case 'NODATA_RECURRINGBILLS_LIST':
             return { ...state, NodataRecurringStatusCode: action.payload.statusCode }
        case 'CLEAR_NODATA_RECURRINGBILLS_LIST':
             return { ...state, NodataRecurringStatusCode: 0}    

        case 'FILTER_RECURR_CUSTOMERS':
                return { ...state, FilterRecurrCustomers: action.payload.response,  getstatusCodeForfilterrecurrcustomers: action.payload.statusCode,  }
        case 'CLEAR_FILTER_ADD_RECURR_CUSTOMERSF_STATUS_CODE':
                return { ...state, getstatusCodeForfilterrecurrcustomers: 0 }

        case 'DELETE_RECURRING_BILLS':
            return { ...state, deleterecurringbillsStatuscode: action.payload.statusCode }
        case 'CLEAR_DELETE_RECURRINGBILLS_STATUS_CODE':
            return { ...state, deleterecurringbillsStatuscode: 0 }

        case 'SETTINGS_ADD_RECURRING':
            return { ...state, settingsaddRecurringStatusCode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING':
            return { ...state, settingsaddRecurringStatusCode: 0 }


        case 'RECEIPTS_LIST':
            return { ...state, ReceiptList: action.payload.response ? action.payload.response : [], ReceiptlistgetStatuscode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_RECEIPTS_LIST':
            return { ...state, ReceiptlistgetStatuscode: 0 }

        case 'NODATA_RECEIPTS_LIST':
                return { ...state, NodataReceiptStatusCode: action.payload.statusCode }
        case 'CLEAR_NODATA_RECEIPTS_LIST':
                return { ...state, NodataReceiptStatusCode: 0} 

        case 'RECEIPTS_ADD':
            return { ...state, ReceiptAddsuccessStatuscode: action.payload.statusCode } //Receipt Add
        case 'REMOVE_STATUS_CODE_RECEIPTS_ADD':
            return { ...state, ReceiptAddsuccessStatuscode: 0 }

        case 'RECEIPTS_EDIT':
            return { ...state, ReceiptEditsuccessStatuscode: action.payload.statusCode } //Receipt edit
        case 'REMOVE_STATUS_CODE_RECEIPTS_EDIT':
            return { ...state, ReceiptEditsuccessStatuscode: 0 }

        case 'DELETERECEIPT':
            return { ...state, ReceiptDeletesuccessStatuscode: action.payload.statusCode }
        case 'CLEAR_DELETE_RECEIPT_STATUS_CODE':
            return { ...state, ReceiptDeletesuccessStatuscode: 0 }

        case 'REFERENCEID_GET':
            return { ...state, Reference_Id: action.payload.response, ReferenceIdgetsuccessStatuscode: action.payload.statusCode } //Receipt Add
        case 'REMOVE_STATUS_CODE_REFERENCEID_GET':
            return { ...state, ReferenceIdgetsuccessStatuscode: 0 }

        case 'RECEIPT_PDF':
                return { ...state, ReceiptPDF: action.payload.response, statusCodeForReceiptPDf: action.payload.statusCode, toTriggerPDF: false }
        case 'CLEAR_RECEIPT_PDF_STATUS_CODE':
                return { ...state, statusCodeForReceiptPDf: 0 }

                default:
        return state;
            
    }

   
}
export default InvoiceReducer;