import { generateAdvance } from "../Action/UserListAction";

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
    statusCustomerAddUser: 0,
    CustomerdetailsgetStatuscode: 0,
    AmentiesHistorygetStatuscode: 0,
    bednumberdetails: [],
    statushostelbedstatuscode: '',
    kycValidateSendOtpSuccess: 0,
    deleteFloorSuccessStatusCode: 0,
    Kyc_Ref_Id: '',
    kycValidateOtpVerifySuccess: 0,
    createFloorSuccessStatusCode: 0,
    countrycode: [],
    noHosteListStatusCode: 0,
    alreadyFloorHere: '',
    deleteFloorError: '',
    deleteRoomError: '',
    phoneError: '',
    emailError: '',
    getWalkInStatusCode: 0,
    WalkInCustomerList: [],
    NoDataWalkInCustomer: '',
    NoDataWalkInCustomerStatusCode: 0,
    addWalkInCustomerStatusCode: 0,
    alreadyHere: '',
    deleteWalkInCustomerStatusCode: 0,
    GetCheckOutCustomerStatusCode: 0,
    CheckOutCustomerList: [],
    addCheckoutCustomerStatusCode: 0,
    deleteCheckoutCustomerStatusCode: 0,
    errorMessageAddCheckOut: '',
    availableCheckOutCustomerList: [],
    exportDetails: [],
    statusCodeForExportDetails: 0,
    exportAssetsDetail: [],
    statusCodeforExportAssetsCode: 0,
    exportEbDetails: [],
    statusCodeForExportEb: 0,
    exportExpenceDetails: [],
    statusCodeForExportExpence: 0,
    exportComplianceDetails: [],
    statusCodeForExportcompliance: 0,
    exportBookingDetails: [],
    statusCodeForExportBooking: 0,
    exportWalkinDetails: [],
    statusCodeForExportWalkin: 0,
    exportCheckoutDetails: [],
    statusCodeForExportCheckout: 0,
    statusCodegetConfirmCheckout: 0,
    GetconfirmcheckoutBillDetails: [],
    GetconfirmcheckoutUserDetails: '',
    statusCodeAddConfirmCheckout: 0,
    reassignbeddetails: [],
    statusCodeForReassinBed: 0,
    statusCodeForCustomerCoatact: 0,
    customerContact: [],
    customerAllDetails: [],
    statusCodeForCustomerAllDetails: 0,
    deleteContact: [],
    statusCodeDeleteContact: 0,
    hotelDetailsinPg: [],
    statuscodeForhotelDetailsinPg: 0,
    noAllHosteListStatusCode: 0,
    generateAdvance: [],
    statusCodeForGenerateAdvance: 0,
    statusCodeForUploadDocument: 0,
    uploaddocu: [],
    statusCodeForOtherDocu: 0,
    otherUploaddocu: [],
    adharuploadfileError: '',
    statuscodeForAdharFileError: 0,
    NoUserListStatusCode: 0,
   userRoomfor :null,
   userProfilebill:null,
   deleteCustomerSuccessStatusCode:0,
   userReading: null,
   userHostelRead: null,
   userReadingdelete:null,
   userHosteldelete:null,
}

const UserListReducer = (state = initialState, action) => {

    switch (action.type) {


        case 'DELETE_CUSTOMER' : 
        return {...state, deleteCustomerSuccessStatusCode:action.payload.statusCode}

        case 'REMOVE_DELETE_CUSTOMER' : 
        return {...state, deleteCustomerSuccessStatusCode:0}



        case 'CLEAR_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: '',
            };
        case 'BED_COUNTING_LIST':
            return { ...state, bedCount: action.payload }

        case 'KYC_VALIDATE':
            return { ...state, kycValidateSendOtpSuccess: action.payload.statusCode, Kyc_Ref_Id: action.payload.response }
        case 'CLEAR_KYC_VALIDATE_SATUS_CODE':
            return { ...state, kycValidateSendOtpSuccess: 0 }
        case 'KYC_VALIDATE_OTP_VERIFY':
            return { ...state, kycValidateOtpVerifySuccess: action.payload.statusCode }


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
            return { ...state, addUserAmnities: action.payload.message, statusCustomerAddUser: action.payload.statusCode }

        case 'CLEAR_ADDUSER_AMNETIES':
            return { ...state, statusCustomerAddUser: 0 }

        case 'BED_NUMBER_DETAILS':
            return { ...state, bednumberdetails: action.payload, statushostelbedstatuscode: action.payload.statusCode }

        case 'BED_DETAILS':
            return { ...state, beddetails: action.payload }
        case 'SET_ERROR':
            return { ...state, errormessage: action.payload }
        case 'ROOM_DETAILS':
            return { ...state, roomdetails: action.payload }
        case 'CREATE_FLOOR':
            return { ...state, createFloorSuccessStatusCode: action.payload.statusCode }
        case 'CLEAR_FLOOR_STATUS_CODE':
            return { ...state, createFloorSuccessStatusCode: 0 }
        // createFloorMessage: action.payload.message,
        // number_of_floor: action.payload.number_of_floors

        case 'UPDATE_MESSAGE_FLOOR':
            return { ...state, createFloorMessage: action.message }
        case 'BILL_PAYMENT_HISTORY':
            return { ...state, billPaymentHistory: action.payload }
        case 'USER_LIST':
            return { ...state, Users: action.payload.response, UserListStatusCode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_USER':
            return { ...state, UserListStatusCode: 0 }
        case 'NO_USER_LIST':
            return { ...state, NoUserListStatusCode: action.payload.statusCode }
        case 'CLEAR_NO_USER_LIST':
            return { ...state, NoUserListStatusCode:0 }
        case 'ADD_USER':
            return { ...state, addUser: action.payload.message, statusCodeForAddUser: action.payload.statusCode }
        case 'CLEAR_STATUS_CODES':
            return { ...state, statusCodeForAddUser: 0 }
        case 'ERROR':
            return { ...state, errorMessage: action.payload, roomdetails: [], bednumberdetails: [] }
        case 'HOSTEL_LIST':
            return { ...state, hostelList: action.payload.response, hosteListStatusCode: action.payload.statusCode }
        case 'CLEAR_HOSTELLIST_STATUS_CODE':
            return { ...state, hosteListStatusCode: 0 }
        case 'CLEAR_HOSTEL_LIST':
            return { ...state, hostelList: [] }
        case 'NO_HOSTEL':
            return { ...state, noHosteListStatusCode: action.payload.statusCode }

        case 'CLEAR_NO_HOSTEL_STATUS_CODE':
            return { ...state, noHosteListStatusCode: 0 }


        case 'HOSTEL_LIST_All':
            return { ...state, hotelDetailsinPg: action.payload.response, statuscodeForhotelDetailsinPg: action.payload.statusCode }
        case 'CLEAR_HOSTEL_LIST_All_CODE':
            return { ...state, statuscodeForhotelDetailsinPg: 0 }
        case 'CLEAR_HOSTEL_LIST_All':
            return { ...state, hotelDetailsinPg: [] }

        case 'NO_HOSTEL_DETAILS':
            return { ...state, noAllHosteListStatusCode: action.payload.statusCode }

        case 'CLEAR_NO_HOSTEL_DETAILS':
            return { ...state, noAllHosteListStatusCode: 0 }

        case 'HOSTEL_DETAIL_LIST':
            return { ...state, hosteldetailslist: action.payload }
        case 'CHECKOUT_USER':
            return { ...state, CheckOut: action.payload.response, checkOutStatusCode: action.payload.statusCode }
        case 'CLEAR_STATUS_CODE_CHECK_OUT':
            return { ...state, checkOutStatusCode: 0 }
        case 'COUNTRY_LIST':
            return { ...state, countrycode: action.payload };

        case 'PHONE_ERROR':
            return { ...state, phoneError: action.payload }

        case 'CLEAR_PHONE_ERROR':
            return { ...state, phoneError: '' }

        case 'EMAIL_ERROR':
            return { ...state, emailError: action.payload }

        case 'CLEAR_EMAIL_ERROR':
            return { ...state, emailError: '' }



        case 'DELETE_FLOOR_ERROR':
            return { ...state, deleteFloorError: action.payload }

        case 'CLEAR_DELETE_FLOOR_ERROR':
            return { ...state, deleteFloorError: '' }

        case 'DELETE_ROOM_ERROR':
            return { ...state, deleteRoomError: action.payload }

        case 'CLEAR_DELETE_ROOM_ERROR':
            return { ...state, deleteRoomError: '' }

        case 'ALREADY_FLOOR_ERROR':
            return { ...state, alreadyFloorHere: action.payload }

        case 'CLEAR_ALREADY_FLOOR_ERROR':
            return { ...state, alreadyFloorHere: '' }
        case 'WALK_IN_CUSTOMER_LIST':
            return { ...state, WalkInCustomerList: action.payload.response, getWalkInStatusCode: action.payload.statusCode }
        case 'CLEAR_WALK_IN_STATUS_CODE':
            return { ...state, getWalkInStatusCode: 0 }
        case 'WALK_IN_CUSTOMER_LIST_ERROR':
            return { ...state, NoDataWalkInCustomerStatusCode: action.payload.statusCode }
        case 'CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE':
            return { ...state, NoDataWalkInCustomerStatusCode: 0 }

        case 'ADD_WALK_IN_CUSTOMER':
            return { ...state, addWalkInCustomerStatusCode: action.payload.statusCode }
        case 'CLEAR_ADD_WALK_IN_CUSTOMER':
            return { ...state, addWalkInCustomerStatusCode: 0 }

        case 'ALREADY_EXIST_ERROR':
            return { ...state, alreadyHere: action.payload }

        case 'CLEAR_ALREADY_EXIST_ERROR':
            return { ...state, alreadyHere: '' }

        case 'DELETE_WALK_IN_CUSTOMER':
            return { ...state, deleteWalkInCustomerStatusCode: action.payload.statusCode }
        case 'CLEAR_DELETE_WALK_IN_CUSTOMER':
            return { ...state, deleteWalkInCustomerStatusCode: 0 }

        case 'CHECKOUT_CUSTOMER_LIST':
            return { ...state, CheckOutCustomerList: action.payload.response, GetCheckOutCustomerStatusCode: action.payload.statusCode }

        case 'CLEAR_CHECKOUT_CUSTOMER_LIST':
            return { ...state, GetCheckOutCustomerStatusCode: 0 }

        case 'ADD_CHECKOUT_CUSTOMER':
            return { ...state, addCheckoutCustomerStatusCode: action.payload.statusCode }

        case 'CLEAR_ADD_CHECKOUT_CUSTOMER':
            return { ...state, addCheckoutCustomerStatusCode: 0 }

        case 'DELETE_CHECK_OUT_CUSTOMER':
            return { ...state, deleteCheckoutCustomerStatusCode: action.payload.statusCode }
        case 'CLEAR _DELETE_CHECK_OUT_CUSTOMER':
            return { ...state, deleteCheckoutCustomerStatusCode: 0 }
        case 'ADD_CHECKOUT_CUSTOMER_LIST_ERROR':
            return { ...state, errorMessageAddCheckOut: action.payload }
        case 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR':
            return { ...state, errorMessageAddCheckOut: '' }

        case 'AVAILABLE_CHECK_OUT_CUSTOMER': {
            return { ...state, availableCheckOutCustomerList: action.payload.response }
        }



        case 'ROOM_FULL':
            if (state.roomFullCheck?.length > 0 && action.payload.length > 0) {
                return { ...state, roomFullCheck: [...state.roomFullCheck, action.payload] };
            } else {
                return { ...state, roomFullCheck: action.payload };
            }


        case "EXPORT_DETAILS":
            return {
                ...state,
                exportDetails: action.payload,
                statusCodeForExportDetails: action.payload.statusCode,
            };
        case "CLEAR_EXPORT_DETAILS":
            return { ...state, statusCodeForExportDetails: 0 };
        //   export
        case "EXPORT_ASSETS_DETAILS":
            return {
                ...state,
                exportAssetsDetail: action.payload,
                statusCodeforExportAssetsCode: action.payload.statusCode,
            };
        case "CLEAR_EXPORT_ASSETS_DETAILS":
            return { ...state, statusCodeforExportAssetsCode: 0 };


        case "EXPORT_EB_DETAILS":
            return {
                ...state,
                exportEbDetails: action.payload,
                statusCodeForExportEb: action.payload.statusCode,
            };
        case "CLEAR_EXPORT_EB_DETAILS":
            return { ...state, statusCodeForExportEb: 0 };



        case "EXPORT_EXPENSE_DETAILS":
            return {
                ...state,
                exportExpenceDetails: action.payload,
                statusCodeForExportExpence: action.payload.statusCode,
            };
        case "CLEAR_EXPORT_EXPENSE_DETAILS":
            return { ...state, statusCodeForExportExpence: 0 };


        case "EXPORT_COMPLIANCE_DETAILS":
            return {
                ...state,
                exportComplianceDetails: action.payload,
                statusCodeForExportcompliance: action.payload.statusCode,
            };
        case "CLEAR_EXPORT_COMPLIANCE_DETAILS":
            return { ...state, statusCodeForExportcompliance: 0 };


        case "EXPORT_BOOKING_DETAILS":
            return {
                ...state,
                exportBookingDetails: action.payload,
                statusCodeForExportBooking: action.payload.statusCode,
            };
        case "CLEAR_EXPORT_BOOKING_DETAILS":
            return { ...state, statusCodeForExportBooking: 0 };

        case "EXPORT_WALKIN_DETAILS":
            return {
                ...state,
                exportWalkinDetails: action.payload,
                statusCodeForExportWalkin: action.payload.statusCode,
            };
        case "CLEAR_EXPORT_WALKIN_DETAILS":
            return { ...state, statusCodeForExportWalkin: 0 };

        case "EXPORT_CHECKOUT_DETAILS":
            return {
                ...state,
                exportCheckoutDetails: action.payload,
                statusCodeForExportCheckout: action.payload.statusCode,
            };
        case "CLEAR_EXPORT_CHECKOUT_DETAILS":
            return { ...state, statusCodeForExportCheckout: 0 };

        case "GET_CONFIRM_CHECK_OUT_CUSTOMER":
            return {
                ...state, GetconfirmcheckoutBillDetails: action.payload.response.bill_details,
                GetconfirmcheckoutUserDetails: action.payload.response.checkout_details,
                statusCodegetConfirmCheckout: action.payload.statusCode,
            };
        case "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER":
            return { ...state, statusCodegetConfirmCheckout: 0 };

        case "ADD_CONFIRM_CHECK_OUT_CUSTOMER":
            return { ...state, statusCodeAddConfirmCheckout: action.payload.statusCode };
        case "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER":
            return { ...state, statusCodeAddConfirmCheckout: 0 };


        case "REASSIGN_BED":
            return {
                ...state,
                reassignbeddetails: action.payload,
                statusCodeForReassinBed: action.payload.statusCode,
            };
        case "CLEAR_REASSIGN_BED":
            return { ...state, statusCodeForReassinBed: 0 };

        case "CUSTOMER_ADD_CONTACT":
            return {
                ...state,
                customerContact: action.payload,
                statusCodeForCustomerCoatact: action.payload.statusCode,
            };
        case "CLEAR_CUSTOMER_ADD_CONTACT":
            return { ...state, statusCodeForCustomerCoatact: 0 };
        case "CUSTOMER_ALL_DETAILS":
            return {
                ...state,
                customerAllDetails: action.payload.response,
                statusCodeForCustomerAllDetails: action.payload.statusCode,
            };
        case "CLEAR_CUSTOMER_ALL_DETAILS":
            return { ...state, statusCodeForCustomerAllDetails: 0 };


        case "DELETE_CONTACT":
            return {
                ...state,
                deleteContact: action.payload,
                statusCodeDeleteContact: action.payload.statusCode,
            };
        case "CLEAR_DELETE_CONTACT":
            return { ...state, statusCodeDeleteContact: 0 };



        case 'GENERATE_ADVANCE':
            return { ...state, generateAdvance: action.payload.response, statusCodeForGenerateAdvance: action.payload.statusCode }
        case 'REMOVE_GENERATE_ADVANCE':
            return { ...state, statusCodeForGenerateAdvance: 0 }



        case 'UPLOAD_DOCUMENT':
            return { ...state, uploaddocu: action.payload.message, statusCodeForUploadDocument: action.payload.statusCode }
        case 'CLEAR_UPLOAD_DOCUMENT':
            return { ...state, statusCodeForUploadDocument: 0 }
        case 'UPLOAD_OTHER_DOCUMENT':
            return { ...state, otherUploaddocu: action.payload.message, statusCodeForOtherDocu: action.payload.statusCode }
        case 'CLEAR_UPLOAD_OTHER_DOCUMENT':
            return { ...state, statusCodeForOtherDocu: 0 }

                        case 'USERROOMAVAILABLETRUE':
                            return {...state,userRoomfor:true}
                        case 'USERROOMAVAILABLEFALSE':
                            return {...state,userRoomfor:false}

                            case 'USERPROFILEBILLTRUE':
                                return {...state,userProfilebill:true}
                            case 'USERPROFILEBILLFALSE':
                                return {...state,userProfilebill:false}

        case 'ADHAR_UPLOAD_ERROR':
            return { ...state, adharuploadfileError: action.payload.response, statuscodeForAdharFileError: action.payload.statusCode }
        case 'CLEAR_ADHAR_UPLOAD_ERROR':
            return { ...state, adharuploadfileError: '' }
        case 'CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE':
            return { ...state, statuscodeForAdharFileError: 0 }

            case 'USERREADINGTRUE':
                return {...state,userReading:true}
                case 'USERREADINGFALSE':
                return {...state,userReading:false}

                case 'USERHOSTELREADINGTRUE':
                    return {...state,userHostelRead:true}
                    case 'USERHOSTELREADINGFALSE':
                    return {...state,userHostelRead:false}

                    case 'USERREADING_DELETETRUE':
                        return {...state,userReadingdelete:true}
                        case 'USERREADING_DELETEFALSE':
                        return {...state,userReadingdelete:false}  
                    
                        case 'USERHOSTEL_READING_DELETETRUE':
                            return {...state,userHosteldelete:true}
                            case 'USERHOSTEL_READING_DELETEFALSE':
                            return {...state,userHosteldelete:false}    
                        
    }
    return state;
}
export default UserListReducer;