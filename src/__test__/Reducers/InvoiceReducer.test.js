import InvoiceReducer, { initialState } from "../../Redux/Reducer/InvoiceReducer";

describe('it should check invoice reducers', () => {


    it('it should check ERROR_AMENITIES', () => {
        const action = {
            type: 'ERROR_AMENITIES',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            errorAmenities: 200
        });
    });



    it('it should check REMOVE_ERROR_AMENITIES', () => {
        const action = {
            type: 'REMOVE_ERROR_AMENITIES',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            errorAmenities: 0
        });
    });



    it('it should check ALREADY_ASSIGN_ERROR', () => {
        const action = {
            type: 'ALREADY_ASSIGN_ERROR',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadyAssignAmenitiesStatusCode: 200
        });
    });



    it('it should check REMOVE_ALREADY_ASSIGN_ERROR', () => {
        const action = {
            type: 'REMOVE_ALREADY_ASSIGN_ERROR',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadyAssignAmenitiesStatusCode: 0
        });
    });


    it('it should check ERROR_RECURE', () => {
        const action = {
            type: 'ERROR_RECURE',
            payload: {
                response: 'Some error occurred'
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            errorRecuireFile: 'Some error occurred'
        });
    });

    it('it should check REMOVE_ERROR_RECURE', () => {
        const action = {
            type: 'REMOVE_ERROR_RECURE',
            payload: {
                response: ''
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            errorRecuireFile: ''
        });
    });



    it('it should check DELETE_USER', () => {
        const action = {
            type: 'DELETE_USER',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteUserSuccessStatusCode: 200
        });
    });

    it('it should check REMOVE_DELETE_USER_STATUS_CODE', () => {
        const action = {
            type: 'REMOVE_DELETE_USER_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteUserSuccessStatusCode: 0
        });
    });


    it('it should check DELETE_AMENITIES', () => {
        const action = {
            type: 'DELETE_AMENITIES',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteAmenitiesSuccessStatusCode: 200
        });
    });

    it('it should check REMOVE_DELETE_AMENITIES_STATUS_CODE', () => {
        const action = {
            type: 'REMOVE_DELETE_AMENITIES_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteAmenitiesSuccessStatusCode: 0
        });
    });


    it('it should check ASSIGN_AMENITIES', () => {
        const action = {
            type: 'ASSIGN_AMENITIES',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            assignAmenitiesSuccessStatusCode: 200
        });
    });

    it('it should check REMOVE_ASSIGN_AMENITIES_STATUS_CODE', () => {
        const action = {
            type: 'REMOVE_ASSIGN_AMENITIES_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            assignAmenitiesSuccessStatusCode: 0
        });
    });



    it('it should check UN_ASSIGN_AMENITIES', () => {
        const action = {
            type: 'UN_ASSIGN_AMENITIES',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            UnAssignAmenitiesSuccessStatusCode: 200
        });
    });

    it('it should check REMOVE_UN_ASSIGN_AMENITIES_STATUS_CODE', () => {
        const action = {
            type: 'REMOVE_UN_ASSIGN_AMENITIES_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            UnAssignAmenitiesSuccessStatusCode: 0
        });
    });



    it('it should check GET_ASSIGN_AMENITIES', () => {
        const action = {
            type: 'GET_ASSIGN_AMENITIES',
            payload: {
                Assigned: [],
                unAssigned: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            GetAssignAmenitiesList: [],
            GetUnAssignAmenitiesList: [],
            getAssignAmenitiesSuccessStatusCode: 200
        });
    });

    it('it should check REMOVE_GET_ASSIGN_AMENITIES_STATUS_CODE', () => {
        const action = {
            type: 'REMOVE_GET_ASSIGN_AMENITIES_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            getAssignAmenitiesSuccessStatusCode: 0
        });
    });



    it('it should check INVOICE_LIST', () => {
        const action = {
            type: 'INVOICE_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            Invoice: [],
            InvoiceListStatusCode: 200
        });
    });

    it('it should check CLEAR_INVOICE_LIST', () => {
        const action = {
            type: 'CLEAR_INVOICE_LIST',
            payload: {}
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            InvoiceListStatusCode: 0,
            toTriggerPDF: true
        });
    });


    it('it should check UPDATEINVOICE_DETAILS', () => {
        const action = {
            type: 'UPDATEINVOICE_DETAILS',
            payload: {
                response: {
                    statusCode: 200
                },
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            UpdateInvoiceStatusCode: 200
        });
    });


    it('it should check CLEAR_INVOICE_UPDATE_LIST', () => {
        const action = {
            type: 'CLEAR_INVOICE_UPDATE_LIST',

        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            UpdateInvoiceStatusCode: 0,
            message: null
        });
    });


    it('it should check INVOICE_SETTINGS', () => {
        const action = {
            type: 'INVOICE_SETTINGS',
            payload: {
                prefix: 'INV',
                suffix: '001',
                profile: 'abcd',
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            prefix: 'INV',
            suffix: '001',
            profile: 'abcd',
            invoiceSettingsStatusCode: 200
        });
    });

    it('it should check CLEAR_INVOICE_SETTINS_STATUSCODE', () => {
        const action = {
            type: 'CLEAR_INVOICE_SETTINS_STATUSCODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            invoiceSettingsStatusCode: 0
        });
    });




    it('it should check  CLEAR_AMENITIES_SETTINS_STATUSCODE', () => {
        const action = {
            type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCode: 0
        });
    });


    it('it should check INVOICE_PDF', () => {
        const action = {
            type: 'INVOICE_PDF',
            payload: {
                response: {
                    pdfUrl: 'invoice.pdf'
                },
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            invoicePDF: { pdfUrl: 'invoice.pdf' },
            statusCodeForPDf: 200,
            toTriggerPDF: false
        });
    });

    it('it should check CLEAR_INVOICE_PDF_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_INVOICE_PDF_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForPDf: 0
        });
    });



    it('it should check AMENITIES_SETTINGS', () => {
        const action = {
            type: 'AMENITIES_SETTINGS',
            payload: {
                response: {},
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            AmenitiesSettings: {},
            statusCode: 200
        });
    });

    it('it should check AMENITIES_LIST', () => {
        const action = {
            type: 'AMENITIES_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            AmenitiesList: [],
            StatusCodeAmenitiesGet: 200
        });
    });

    it('it should check CLEAR_AMENITIES_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_AMENITIES_STATUS_CODE',
            payload: { statusCode: 0 }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            StatusCodeAmenitiesGet: 0
        });
    });


    it('it should check AMENITIES_UPDATE', () => {
        const action = {
            type: 'AMENITIES_UPDATE',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            AmenitiesUpdate: {
                statusCode: 200
            },
            AmenitiesUpdateStatusCode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_AMENITIES_UPDATE', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_AMENITIES_UPDATE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            AmenitiesUpdateStatusCode: 0
        });
    });


    it('it should check MANUAL_INVOICE', () => {
        const action = {
            type: 'MANUAL_INVOICE',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ManualInvoice: {
                statusCode: 200
            },
            manualInvoiceStatusCode: 200
        });
    });



    it('it should check MANUAL_INVOICE_NUMBER_GET', () => {
        const action = {
            type: 'MANUAL_INVOICE_NUMBER_GET',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ManualInvoiceNUmber: [],
            Manulainvoicenumberstatuscode: 200
        });
    });

    it('it should check REMOVE_MANUAL_INVOICE_NUMBER_GET', () => {
        const action = {
            type: 'REMOVE_MANUAL_INVOICE_NUMBER_GET',
            payload: { statusCode: 0 }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            Manulainvoicenumberstatuscode: 0
        });
    });


    it('it should check MANUAL_INVOICE_AMOUNT_GET', () => {
        const action = {
            type: 'MANUAL_INVOICE_AMOUNT_GET',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ManualInvoice: [],
            manualInvoiceStatusCode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_MANUAL_INVOICE_AMOUNT_GET', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_AMOUNT_GET',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            manualInvoiceStatusCode: 0
        });
    });




    it('it should check RECURRING_BILL_GET_AMOUNT', () => {
        const action = {
            type: 'RECURRING_BILL_GET_AMOUNT',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            Recurringbillamounts: [],
            recurrbillamountgetStatuscode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_RECURRING_INVOICE_AMOUNT', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_RECURRING_INVOICE_AMOUNT',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            recurrbillamountgetStatuscode: 0
        });
    });



    it('it should check FAIL_ADD_RECURRING_BILL', () => {
        const action = {
            type: 'FAIL_ADD_RECURRING_BILL',
            payload: {
                response: false,
                statusCode: 200,
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            RecurenotEnable: false,
            RecurenotenableStatusCode: 200,
        });
    });

    it('it should check REMOVE_STATUS_CODE_FAIL_ADD_RECURRING_BILL', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_FAIL_ADD_RECURRING_BILL',
            payload: { statusCode: 0 }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            RecurenotenableStatusCode: 0
        });
    });

    it('it should check MANUAL_INVOICE_ADD', () => {
        const action = {
            type: 'MANUAL_INVOICE_ADD',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            manualInvoiceAddStatusCode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD',
            payload: { statusCode: 0 }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            manualInvoiceAddStatusCode: 0
        });
    });



    it('it should check MANUAL_INVOICE_EDIT', () => {
        const action = {
            type: 'MANUAL_INVOICE_EDIT',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            manualInvoiceEditStatusCode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT',
            payload: { statusCode: 0 }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            manualInvoiceEditStatusCode: 0
        });
    });





    it('it should check MANUAL_INVOICE_DELETE', () => {
        const action = {
            type: 'MANUAL_INVOICE_DELETE',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            manualInvoiceDeleteStatusCode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_MANUAL_INVOICE_DELETE', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_DELETE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            manualInvoiceDeleteStatusCode: 0
        });
    });



    it('it should check RECURRING_BILLS_ADD', () => {
        const action = {
            type: 'RECURRING_BILLS_ADD',
            payload: {
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            RecurringBillAddStatusCode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_RECURRING_BILLS_ADD', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_RECURRING_BILLS_ADD',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            RecurringBillAddStatusCode: 0
        });
    });


    it('it should check MANUAL_INVOICES_LIST', () => {
        const action = {
            type: 'MANUAL_INVOICES_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ManualInvoices: [],
            ManualInvoicesgetstatuscode: 200
        });
    });

    it('it should check MANUAL_INVOICES_LIST NULL CHECK', () => {
        const action = {
            type: 'MANUAL_INVOICES_LIST',
            payload: {
                response: null,
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ManualInvoices: [],
            ManualInvoicesgetstatuscode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST',
            payload: { statusCode: 0 }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ManualInvoicesgetstatuscode: 0
        });
    });


    it('it should check DELETE_MANUAL_ERROR', () => {
        const action = {
            type: 'DELETE_MANUAL_ERROR',
            payload: 'Error delete manual invoice'
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deletemanualError: 'Error delete manual invoice'
        });
    });



    it('it should check RECURRING_BILLS_LIST', () => {
        const action = {
            type: 'RECURRING_BILLS_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            RecurringBills: [],
            RecurringbillsgetStatuscode: 200
        });
    });

    it('it should check REMOVE_STATUS_CODE_RECURRING_BILLS_LIST', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_RECURRING_BILLS_LIST',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            RecurringbillsgetStatuscode: 0
        });
    });





    it('it should check FILTER_RECURR_CUSTOMERS', () => {
        const action = {
            type: 'FILTER_RECURR_CUSTOMERS',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            FilterRecurrCustomers: [],
            getstatusCodeForfilterrecurrcustomers: 200
        });
    });

    it('it should check  CLEAR_FILTER_ADD_RECURR_CUSTOMERSF_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_FILTER_ADD_RECURR_CUSTOMERSF_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            getstatusCodeForfilterrecurrcustomers: 0
        });
    });


    it('it should check DELETE_RECURRING_BILLS', () => {
        const action = {
            type: 'DELETE_RECURRING_BILLS',
            payload: {
                statusCode: 200
            }
        };
    
        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleterecurringbillsStatuscode: 200
        });
    });
    
    it('it should check CLEAR_DELETE_RECURRINGBILLS_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_RECURRINGBILLS_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };
    
        expect(InvoiceReducer({ ...initialState, deleterecurringbillsStatuscode: 200 }, action)).toStrictEqual({
            ...initialState,
            deleterecurringbillsStatuscode: 0
        });
    });
    


    it('it should check SETTINGS_ADD_RECURRING', () => {
        const action = {
            type: 'SETTINGS_ADD_RECURRING',
            payload: {
                statusCode: 200
            }
        };
    
        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            settingsaddRecurringStatusCode: 200
        });
    });
    
    it('it should check REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING',
            payload: {
                statusCode: 0
            }
        };
    
        expect(InvoiceReducer({ ...initialState, settingsaddRecurringStatusCode: 201 }, action)).toStrictEqual({
            ...initialState,
            settingsaddRecurringStatusCode: 0
        });
    });
    

    it('it should check RECEIPTS_LIST', () => {
        const action = {
            type: 'RECEIPTS_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };
    
        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ReceiptList: [],
            ReceiptlistgetStatuscode: 200
        });
    });
    
    it('it should  check RECEIPTS_LIST', () => {
        const action = {
            type: 'RECEIPTS_LIST',
            payload: {
                response: null, 
                statusCode: 200
            }
        };
    
        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ReceiptList: [],
            ReceiptlistgetStatuscode: 200
        });
    });
    
    it('it should check REMOVE_STATUS_CODE_RECEIPTS_LIST', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_RECEIPTS_LIST',
            payload: {
                statusCode: 0
            }
        };
    
        expect(InvoiceReducer({ ...initialState, ReceiptlistgetStatuscode: 200 }, action)).toStrictEqual({
            ...initialState,
            ReceiptlistgetStatuscode: 0
        });
    });
    




    it('it should check RECEIPTS_ADD', () => {
        const action = {
            type: 'RECEIPTS_ADD',
            payload: {
                statusCode: 200,
            },
        };

        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState,
            ReceiptAddsuccessStatuscode: 200,
        });
    });

    it('it should check REMOVE_STATUS_CODE_RECEIPTS_ADD', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_RECEIPTS_ADD',
            payload: {
                statusCode: 0,
            },
        };

        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState,
            ReceiptAddsuccessStatuscode: 0,
        });
    });


    it('it should check RECEIPTS_EDIT', () => {
        const action = {
            type: 'RECEIPTS_EDIT',
            payload: {
                statusCode: 200,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState, ReceiptEditsuccessStatuscode: 200,
        });
    });
    
    it('it should check REMOVE_STATUS_CODE_RECEIPTS_EDIT', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_RECEIPTS_EDIT',
            payload: {
                statusCode: 0,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState,ReceiptEditsuccessStatuscode: 0,
        });
    });
    
    it('it should check DELETERECEIPT', () => {
        const action = {
            type: 'DELETERECEIPT',
            payload: {
                statusCode: 200,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState, ReceiptDeletesuccessStatuscode: 200,
        });
    });
    
    it('it should check CLEAR_DELETE_RECEIPT_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_RECEIPT_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState, ReceiptDeletesuccessStatuscode: 0,
        });
    });
    

    it('it should check REFERENCEID_GET', () => {
        const action = {
            type: 'REFERENCEID_GET',
            payload: {
                response: '',
                statusCode: 200,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState, Reference_Id: '', ReferenceIdgetsuccessStatuscode: 200,
        });
    });
    
    it('it should check REMOVE_STATUS_CODE_REFERENCEID_GET', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_REFERENCEID_GET',
            payload: {
                statusCode: 0,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState, ReferenceIdgetsuccessStatuscode: 0,
        });
    });
    

    it('it should check RECEIPT_PDF', () => {
        const action = {
            type: 'RECEIPT_PDF',
            payload: {
                response: '',
                statusCode: 200,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState, ReceiptPDF: '', statusCodeForReceiptPDf: 200, toTriggerPDF: false,
        });
    });
    
    it('it should check CLEAR_RECEIPT_PDF_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_RECEIPT_PDF_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            ...initialState, statusCodeForReceiptPDf: 0,
        });
    });
    

    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',
           

        }
        expect(InvoiceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
                   })

    })



    it('it should check NODATA_BILL_LIST', () => {
        const action = {
            type: 'NODATA_BILL_LIST',
            payload: {
            statusCode: 200,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            
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
            BillsErrorstatusCode: 200,
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

        });
    });


    it('it should check REMOVE_NODATA_BILL_LIST', () => {
        const action = {
            type: 'REMOVE_NODATA_BILL_LIST',
            
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            
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
            BillsErrorstatusCode: 0,
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

        });
    });




 it('it should check NODATA_RECURRINGBILLS_LIST', () => {
        const action = {
            type: 'NODATA_RECURRINGBILLS_LIST',
            payload: {
            statusCode: 200,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            
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
            BillsErrorstatusCode: 0,
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
            NodataRecurringStatusCode:200,
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

        });
    });



    it('it should check CLEAR_NODATA_RECURRINGBILLS_LIST', () => {
        const action = {
            type: 'CLEAR_NODATA_RECURRINGBILLS_LIST',
            payload: {
            statusCode: 0,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            
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
            BillsErrorstatusCode: 0,
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

        });
    });



    it('it should check NODATA_RECEIPTS_LIST', () => {
        const action = {
            type: 'NODATA_RECEIPTS_LIST',
            payload: {
            statusCode: 200,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            
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
            BillsErrorstatusCode: 0,
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
            NodataReceiptStatusCode:200,
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

        });
    });




    it('it should check CLEAR_NODATA_RECEIPTS_LIST', () => {
        const action = {
            type: 'CLEAR_NODATA_RECEIPTS_LIST',
            payload: {
            statusCode: 0,
            },
        };
    
        expect(InvoiceReducer(initialState, action)).toStrictEqual({
            
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
            BillsErrorstatusCode: 0,
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

        });
    });





























})
