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
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
            noVendorStatusCode: 0,
            deleteCompliance: [],
            statusCodeForDeleteCompliance: 0,
            statusCodeCompliance: 200,
            complianceAssignChangeRes: "",
            complianceAssignChangeError: "",
            complianceAssignChangeStatus: 0,
            getComplianceComments: [],
            statusCodeForGetComplianceComment: 0,
            AddComplianceComment: [],
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for CLEAR_COMPLIANCE_LIST', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_LIST',

        }
        expect(ComplianceReducer({ ...initialState, statusCodeCompliance: 200 }, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


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
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 200,
            messageShow: true,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })

    it('it should check for CLEAR_COMPLIANCE_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_STATUS_CODE',
           
        }
        expect(ComplianceReducer({ ...initialState, statusCodeForAddCompliance: 200 }, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })

    it('it should check for ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: 'error message exist'
           
        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: 'error message exist',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })



    it('it should check for CLEAR_ERROR', () => {
        const action = {
            type: 'CLEAR_ERROR',
            payload: ''
           
        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })

    it('it should check for VENDOR_LIST', () => {
        const action = {
            type: 'VENDOR_LIST',
            payload: {
                response:[],
                statusCode: 200
            }
           
        }
        expect(ComplianceReducer({ ...initialState }, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 200,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for CLEAR_GET_VENDOR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_GET_VENDOR_STATUS_CODE',
          
           
        }
        expect(ComplianceReducer({ ...initialState ,getVendorStatusCode: 200}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for ERROR_VENDOR_LIST', () => {
        const action = {
            type: 'ERROR_VENDOR_LIST',
            payload:{
                statusCode: 201
            }
                     
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
            noVendorStatusCode: 201,
            deleteCompliance: [],
            statusCodeForDeleteCompliance: 0,
            statusCodeCompliance: 0,
            complianceAssignChangeRes: "",
            complianceAssignChangeError: "",
            complianceAssignChangeStatus: 0,
            getComplianceComments: [],
            statusCodeForGetComplianceComment: 0,
            AddComplianceComment: [],
            statusCodeForAddComplianceComment: 0


        })
    })



    it('it should check for CLEAR_ERROR_VENDOR_LIST', () => {
        const action = {
            type: 'CLEAR_ERROR_VENDOR_LIST',
                                 
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for ADD_VENDOR', () => {
        const action = {
            type: 'ADD_VENDOR',
            payload:{
                statusCode: 200
            }
                                 
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 200,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for CLEAR_ADD_VENDOR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_VENDOR_STATUS_CODE',
                                            
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })

    it('it should check for DELETE_VENDOR', () => {
        const action = {
            type: 'DELETE_VENDOR',
            payload:{
                statusCode: 200
            }
                                            
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 200,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for CLEAR_DELETE_VENDOR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_VENDOR_STATUS_CODE',
                                        
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for ALREADY_VENDOR_ERROR', () => {
        const action = {
            type: 'ALREADY_VENDOR_ERROR',
            payload:'already vendor exist'
                                        
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: 'already vendor exist',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for CLEAR_ALREADY_VENDOR_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_VENDOR_ERROR',
            payload:''
                                        
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


   

    it('it should check for  ALREADY_VENDOR_EMAIL_ERROR', () => {
        const action = {
            type: 'ALREADY_VENDOR_EMAIL_ERROR',
            payload:'already vendor email exist'
                                        
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: 'already vendor email exist',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for  CLEAR_ALREADY_VENDOR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_VENDOR_EMAIL_ERROR',
            payload:''
                                        
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })



    it('it should check for  COMPLIANCE_CHANGE_STATUS', () => {
        const action = {
            type: 'COMPLIANCE_CHANGE_STATUS',
            payload:{
                response: "",
                statusCode: 200
            }
                                        
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 200,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for  CLEAR_COMPLIANCE_CHANGE_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_CHANGE_STATUS_CODE',
            
                                        
        }
        expect(ComplianceReducer({ ...initialState,complianceChangeStatus: 200}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for  COMPLIANCE_CHANGE_STATUS_ERROR', () => {
        const action = {
            type: 'COMPLIANCE_CHANGE_STATUS_ERROR',
            payload: 'change status error'
            
                                        
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: 'change status error',
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
            statusCodeForAddComplianceComment: 0


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
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
            noVendorStatusCode: 0,
            deleteCompliance: [],
            statusCodeForDeleteCompliance: 0,
            statusCodeCompliance: 0,
            complianceAssignChangeRes: "",
            complianceAssignChangeError: "",
            complianceAssignChangeStatus: 200,
            getComplianceComments: [],
            statusCodeForGetComplianceComment: 0,
            AddComplianceComment: [],
            statusCodeForAddComplianceComment: 0


        })
    })

    it('it should check for  CLEAR_COMPLIANCE_CHANGE_ASSIGN', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_CHANGE_ASSIGN',
           
            
                                        
        }
        expect(ComplianceReducer({ ...initialState,complianceAssignChangeStatus: 200}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })

    it('it should check for  COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR', () => {
        const action = {
            type: 'COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR',
            payload: "change status error"  
                                        
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
            noVendorStatusCode: 0,
            deleteCompliance: [],
            statusCodeForDeleteCompliance: 0,
            statusCodeCompliance: 0,
            complianceAssignChangeRes: "",
            complianceAssignChangeError: "change status error",
            complianceAssignChangeStatus: 0,
            getComplianceComments: [],
            statusCodeForGetComplianceComment: 0,
            AddComplianceComment: [],
            statusCodeForAddComplianceComment: 0


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
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
            noVendorStatusCode: 0,
            deleteCompliance: [],
            statusCodeForDeleteCompliance: 200,
            statusCodeCompliance: 0,
            complianceAssignChangeRes: "",
            complianceAssignChangeError: "",
            complianceAssignChangeStatus: 0,
            getComplianceComments: [],
            statusCodeForGetComplianceComment: 0,
            AddComplianceComment: [],
            statusCodeForAddComplianceComment: 0


        })
    })

    it('it should check for  CLEAR_DELETE_COMPLIANCE', () => {
        const action = {
            type: 'CLEAR_DELETE_COMPLIANCE',
           
                                        
        }
        expect(ComplianceReducer({ ...initialState,statusCodeForDeleteCompliance: 200}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for  COMPLIANCE_COMENET_LIST', () => {
        const action = {
            type: 'COMPLIANCE_COMENET_LIST',
            payload:{
                response: [],
                statusCode: 200
            }
                                                 
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
            noVendorStatusCode: 0,
            deleteCompliance: [],
            statusCodeForDeleteCompliance: 0,
            statusCodeCompliance: 0,
            complianceAssignChangeRes: "",
            complianceAssignChangeError: "",
            complianceAssignChangeStatus: 0,
            getComplianceComments: [],
            statusCodeForGetComplianceComment: 200,
            AddComplianceComment: [],
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for  CLEAR_COMPLIANCE_COMENET_LIST', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_COMENET_LIST',
                                                            
        }
        expect(ComplianceReducer({ ...initialState,statusCodeForGetComplianceComment: 200}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


    it('it should check for  COMPLIANCE_ADD_COMMENT', () => {
        const action = {
            type: 'COMPLIANCE_ADD_COMMENT',
            payload:{
                response: [],
                statusCode: 200
            }
                                                 
        }
        expect(ComplianceReducer({ ...initialState}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 200


        })
    })

    it('it should check for  CLEAR_COMPLIANCE_ADD_COMMENT', () => {
        const action = {
            type: 'CLEAR_COMPLIANCE_ADD_COMMENT',
                                                           
        }
        expect(ComplianceReducer({ ...initialState, statusCodeForAddComplianceComment: 200}, action)).toStrictEqual({
            Compliance: [],
            message: [],
            statusCodeForAddCompliance: 0,
            messageShow: false,
            errorMessage: '',
            VendorList: [],
            addVendorSuccessStatusCode: 0,
            getVendorStatusCode: 0,
            deleteVendorStatusCode: 0,
            alreadyVendorHere: '',
            alreadyVendorEmailError: '',
            complianceChangeRes: "",
            complianceChangeStatus: 0,
            complianceChangeError: '',
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
            statusCodeForAddComplianceComment: 0


        })
    })


})