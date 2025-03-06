import ComplianceReducer, { initialState } from "../../Redux/Reducer/ComplianceReducer";

describe('It should check compliance reducer', () => {

    it('it should check for COMPLIANCE_LIST', () => {
        const action = {
            type: 'COMPLIANCE_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(ComplianceReducer(initialState, action)).toStrictEqual({
            ...initialState,
            Compliance: [],
            statusCodeCompliance: 200,



        })
    })


    it('it should check for CLEAR_COMPLIANCE_LIST', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_LIST',

        }
        expect(ComplianceReducer({ ...initialState, statusCodeCompliance: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeCompliance: 0,


        })
    })


    it('it should check for COMPLIANCE_ADD', () => {
        const action = {
            type: 'COMPLIANCE_ADD',
            payload: {
                statusCode: 200
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddCompliance: 200,
            messageShow: true,



        })
    })

    it('it should check for CLEAR_COMPLIANCE_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_STATUS_CODE',

        }
        expect(ComplianceReducer({ ...initialState, statusCodeForAddCompliance: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddCompliance: 0,
            messageShow: false,

        })
    })

    it('it should check for ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: 'error message exist'

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            errorMessage: 'error message exist',

        })
    })



    it('it should check for CLEAR_ERROR', () => {
        const action = {
            type: 'CLEAR_ERROR',
            payload: ''

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            errorMessage: '',
        })
    })

    it('it should check for VENDOR_LIST', () => {
        const action = {
            type: 'VENDOR_LIST',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            VendorList: [],
            getVendorStatusCode: 200,


        })
    })


    it('it should check for CLEAR_GET_VENDOR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_GET_VENDOR_STATUS_CODE',


        }
        expect(ComplianceReducer({ ...initialState, getVendorStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            getVendorStatusCode: 0,

        })
    })


    it('it should check for ERROR_VENDOR_LIST', () => {
        const action = {
            type: 'ERROR_VENDOR_LIST',
            payload: {
                statusCode: 201
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            noVendorStatusCode: 201,


        })
    })



    it('it should check for CLEAR_ERROR_VENDOR_LIST', () => {
        const action = {
            type: 'CLEAR_ERROR_VENDOR_LIST',

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            noVendorStatusCode: 0,


        })
    })


    it('it should check for ADD_VENDOR', () => {
        const action = {
            type: 'ADD_VENDOR',
            payload: {
                statusCode: 200
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addVendorSuccessStatusCode: 200,


        })
    })


    it('it should check for CLEAR_ADD_VENDOR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_VENDOR_STATUS_CODE',

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addVendorSuccessStatusCode: 0,

        })
    })

    it('it should check for DELETE_VENDOR', () => {
        const action = {
            type: 'DELETE_VENDOR',
            payload: {
                statusCode: 200
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteVendorStatusCode: 200,

        })
    })


    it('it should check for CLEAR_DELETE_VENDOR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_VENDOR_STATUS_CODE',

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteVendorStatusCode: 0,


        })
    })


    it('it should check for ALREADY_VENDOR_ERROR', () => {
        const action = {
            type: 'ALREADY_VENDOR_ERROR',
            payload: 'already vendor exist'

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadyVendorHere: 'already vendor exist',
        })
    })


    it('it should check for CLEAR_ALREADY_VENDOR_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_VENDOR_ERROR',
            payload: ''

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadyVendorHere: '',

        })
    })




    it('it should check for  ALREADY_VENDOR_EMAIL_ERROR', () => {
        const action = {
            type: 'ALREADY_VENDOR_EMAIL_ERROR',
            payload: 'already vendor email exist'

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadyVendorEmailError: 'already vendor email exist',
        })
    })


    it('it should check for  CLEAR_ALREADY_VENDOR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_VENDOR_EMAIL_ERROR',
            payload: ''

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadyVendorEmailError: '',
        })
    })



    it('it should check for  COMPLIANCE_CHANGE_STATUS', () => {
        const action = {
            type: 'COMPLIANCE_CHANGE_STATUS',
            payload: {
                response: "",
                statusCode: 200
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            complianceChangeRes: "",
            complianceChangeStatus: 200,
        })
    })


    it('it should check for  CLEAR_COMPLIANCE_CHANGE_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_CHANGE_STATUS_CODE',


        }
        expect(ComplianceReducer({ ...initialState, complianceChangeStatus: 200 }, action)).toStrictEqual({
            ...initialState,
            complianceChangeRes: "",
            complianceChangeStatus: 0,
        })
    })


    it('it should check for  COMPLIANCE_CHANGE_STATUS_ERROR', () => {
        const action = {
            type: 'COMPLIANCE_CHANGE_STATUS_ERROR',
            payload: 'change status error'


        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            complianceChangeError: 'change status error',
        })
    })

    it('it should check for  COMPLIANCE_CHANGE_ASSIGN', () => {
        const action = {
            type: 'COMPLIANCE_CHANGE_ASSIGN',
            payload: {
                response: "",
                statusCode: 200
            }


        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            complianceAssignChangeRes: "",
            complianceAssignChangeStatus: 200,

        })
    })

    it('it should check for  CLEAR_COMPLIANCE_CHANGE_ASSIGN', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_CHANGE_ASSIGN',



        }
        expect(ComplianceReducer({ ...initialState, complianceAssignChangeStatus: 200 }, action)).toStrictEqual({
            ...initialState,
            complianceAssignChangeRes: "",
            complianceAssignChangeStatus: 0,

        })
    })

    it('it should check for  COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR', () => {
        const action = {
            type: 'COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR',
            payload: "change status error"

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            complianceAssignChangeError: "change status error",
        })
    })

    it('it should check for  DELETE_COMPLIANCE', () => {
        const action = {
            type: 'DELETE_COMPLIANCE',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteCompliance: [],
            statusCodeForDeleteCompliance: 200,

        })
    })

    it('it should check for  CLEAR_DELETE_COMPLIANCE', () => {
        const action = {
            type: 'CLEAR_DELETE_COMPLIANCE',


        }
        expect(ComplianceReducer({ ...initialState, statusCodeForDeleteCompliance: 200 }, action)).toStrictEqual({
            ...initialState,
            deleteCompliance: [],
            statusCodeForDeleteCompliance: 0,


        })
    })


    it('it should check for  COMPLIANCE_COMENET_LIST', () => {
        const action = {
            type: 'COMPLIANCE_COMENET_LIST',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            getComplianceComments: [],
            statusCodeForGetComplianceComment: 200,


        })
    })


    it('it should check for  CLEAR_COMPLIANCE_COMENET_LIST', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_COMENET_LIST',

        }
        expect(ComplianceReducer({ ...initialState, statusCodeForGetComplianceComment: 200 }, action)).toStrictEqual({
            ...initialState,
            getComplianceComments: [],
            statusCodeForGetComplianceComment: 0,
        })
    })


    it('it should check for  COMPLIANCE_ADD_COMMENT', () => {
        const action = {
            type: 'COMPLIANCE_ADD_COMMENT',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            AddComplianceComment: [],
            statusCodeForAddComplianceComment: 200


        })
    })

    it('it should check for  CLEAR_COMPLIANCE_ADD_COMMENT', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_ADD_COMMENT',

        }
        expect(ComplianceReducer({ ...initialState, statusCodeForAddComplianceComment: 200 }, action)).toStrictEqual({
            ...initialState,
            AddComplianceComment: [],
            statusCodeForAddComplianceComment: 0


        })
    })

    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',
           

        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
                   })

    })
})