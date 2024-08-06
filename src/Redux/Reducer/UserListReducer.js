const initialState = {
    Users: [],
    addUser: [],
    errorMessage: {},
    hostelList: [],
    roomCount: [],
    billPaymentHistory: [],
    number_of_floor: '',
    roomdetails: [],
    message: {},
    roomFullCheck: [],
    beddetails: [],
    UserListStatusCode: 0,
    bedCount: [],
    createFloorMessage: '',
    statusCodeForAddUser: '',
    errormessage: {},
    CheckOut: [],
    checkOutStatusCode: 0,
    hosteListStatusCode: 0,
    customerdetails: [],
    amnetieshistory: [],
    amnitiesnamelist: [],
    addUserAmnities: '',
    usermessage: '',
    statusCustomerAddUser: '',
    CustomerdetailsgetStatuscode: 0,
    AmentiesHistorygetStatuscode: 0,
    bednumberdetails: [],
    statushostelbedstatuscode: '',
    kycValidateSendOtpSuccess: 0,
    deleteFloorSuccessStatusCode: 0,
    Kyc_Ref_Id: '',
    kycValidateOtpVerifySuccess:0,
}

const UserListReducer = (state = initialState, action) => {
    console.log("actionredu", action.payload)
    switch (action.type) {
        case 'CLEAR_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: '',
            };
        case 'BED_COUNTING_LIST':
            return { ...state, bedCount: action.payload }

        case 'KYC_VALIDATE':
            return { ...state, kycValidateSendOtpSuccess: action.payload.statusCode , Kyc_Ref_Id: action.payload.response}
        case 'CLEAR_KYC_VALIDATE_SATUS_CODE':
            return { ...state, kycValidateSendOtpSuccess: 0 }
         case 'KYC_VALIDATE_OTP_VERIFY':
         return {...state, kycValidateOtpVerifySuccess:action.payload.statusCode}


        case 'DELETE_FLOOR':
            return { ...state, deleteFloorSuccessStatusCode: action.payload.statusCode }

        case 'CLEAR_DELETE_FLOOR':
            return { ...state, deleteFloorSuccessStatusCode: 0 }

        case 'CUSTOMER_DETAILS':
            return { ...state, customerdetails: action.payload, CustomerdetailsgetStatuscode: action.payload.statusCode };
        case 'CLEAR_CUSTOMER_DETAILS':
            return { ...state, CustomerdetailsgetStatuscode: 0 }

        case 'AMENITIES_HISTORY':
            return { ...state, amnetieshistory: action.payload.response, AmentiesHistorygetStatuscode: action.payload.statusCode };
        case 'CLEAR_AMENITIES_HISTORY_DETAILS':
            return { ...state, AmentiesHistorygetStatuscode: 0 }
        case 'AMNITIES_NAME':
            return { ...state, amnitiesnamelist: action.payload };
        case 'ADD_USER_AMENITIES':
            console.log("ADD_USER_AMENITIES", action.payload.message);
            return { ...state, addUserAmnities: action.payload.message, statusCustomerAddUser: action.payload.statusCode }

        case 'CLEAR_ADDUSER_AMNETIES':
            return { ...state, statusCustomerAddUser: 0 }

        case 'BED_NUMBER_DETAILS':
            console.log("BED_NUMBER_DETAILS", action.payload.message);
            return { ...state, bednumberdetails: action.payload, statushostelbedstatuscode: action.payload.statusCode }

        case 'BED_DETAILS':
            return { ...state, beddetails: action.payload }
        case 'SET_ERROR':
            return { ...state, errormessage: action.payload }
        case 'ROOM_DETAILS':
            return { ...state, roomdetails: action.payload }
        case 'CREATE_FLOOR':
            return {
                ...state,
                createFloorMessage: action.payload.message,
                number_of_floor: action.payload.number_of_floors
            }
        case 'UPDATE_MESSAGE_FLOOR':
            return { ...state, createFloorMessage: action.message }
        case 'BILL_PAYMENT_HISTORY':
            return { ...state, billPaymentHistory: action.payload }
        case 'USER_LIST':
            return { ...state, Users: action.payload.response, UserListStatusCode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_USER':
            return { ...state, UserListStatusCode: 0 }
        case 'ADD_USER':
            return { ...state, addUser: action.payload.message, statusCodeForAddUser: action.payload.statusCode }
        case 'CLEAR_STATUS_CODES':
            return { ...state, statusCodeForAddUser: 0 }
        case 'ERROR':
            return { ...state, errorMessage: action.payload ,roomdetails :[],bednumberdetails:[]}
        case 'HOSTEL_LIST':
            return { ...state, hostelList: action.payload.response, hosteListStatusCode: action.payload.statusCode }
        case 'CLEAR_HOSTELLIST_STATUS_CODE':
            return { ...state, hosteListStatusCode: 0 }

        case 'HOSTEL_DETAIL_LIST':
            return { ...state, hosteldetailslist: action.payload }
        case 'CHECKOUT_USER':
            return { ...state, CheckOut: action.payload.response, checkOutStatusCode: action.payload.statusCode }
        case 'CLEAR_STATUS_CODE_CHECK_OUT':
            return { ...state, checkOutStatusCode: 0 }

        case 'ROOM_FULL':
            if (state.roomFullCheck?.length > 0 && action.payload.length > 0) {
                return { ...state, roomFullCheck: [...state.roomFullCheck, action.payload] };
            } else {
                return { ...state, roomFullCheck: action.payload };
            }



    }
    return state;
}
export default UserListReducer;