import UserListReducer, { initialState } from "../../Redux/Reducer/UserListReducer";

describe('it should check userList reducers', () => {


    it('it should check DELETE_CUSTOMER', () => {
        const action = {
            type: 'DELETE_CUSTOMER',
            payload: {
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteCustomerSuccessStatusCode: 200,
        });
    });

    it('it should check REMOVE_DELETE_CUSTOMER', () => {
        const action = {
            type: 'REMOVE_DELETE_CUSTOMER',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteCustomerSuccessStatusCode: 0,
        });
    });

    it('it should check CLEAR_ERROR_MESSAGE', () => {
        const action = {
            type: 'CLEAR_ERROR_MESSAGE',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorMessage: '',
        });
    });

    it('it should check BED_COUNTING_LIST', () => {
        const action = {
            type: 'BED_COUNTING_LIST',
            payload: 10,
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bedCount: 10,
        });
    });



    it('it should check KYC_VALIDATE', () => {
        const action = {
            type: 'KYC_VALIDATE',
            payload: {
                statusCode: 200,
                response: 'KYC12345',
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            kycValidateSendOtpSuccess: 200,
            Kyc_Ref_Id: 'KYC12345',
        });
    });

    it('it should check CLEAR_KYC_VALIDATE_SATUS_CODE', () => {
        const action = {
            type: 'CLEAR_KYC_VALIDATE_SATUS_CODE',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            kycValidateSendOtpSuccess: 0,
        });
    });

    it('it should check KYC_VALIDATE_OTP_VERIFY', () => {
        const action = {
            type: 'KYC_VALIDATE_OTP_VERIFY',
            payload: {
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            kycValidateOtpVerifySuccess: 200,
        });
    });




    it('it should check DELETE_FLOOR', () => {
        const action = {
            type: 'DELETE_FLOOR',
            payload: {
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteFloorSuccessStatusCode: 200,
        });
    });

    it('it should check CLEAR_DELETE_FLOOR', () => {
        const action = {
            type: 'CLEAR_DELETE_FLOOR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteFloorSuccessStatusCode: 0,
        });
    });

    it('it should check CUSTOMER_DETAILS', () => {
        const action = {
            type: 'CUSTOMER_DETAILS',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            customerdetails: action.payload,
            CustomerdetailsgetStatuscode: 200,
        });
    });

    it('it should check CLEAR_CUSTOMER_DETAILS', () => {
        const action = {
            type: 'CLEAR_CUSTOMER_DETAILS',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            CustomerdetailsgetStatuscode: 0,
        });
    });




    it('it should check AMENITIES_HISTORY', () => {
        const action = {
            type: 'AMENITIES_HISTORY',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            amnetieshistory: [],
            AmentiesHistorygetStatuscode: 200,
        });
    });

    it('it should check CLEAR_AMENITIES_HISTORY_DETAILS', () => {
        const action = {
            type: 'CLEAR_AMENITIES_HISTORY_DETAILS',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            AmentiesHistorygetStatuscode: 0,
        });
    });



    it('it should check AMNITIES_NAME', () => {
        const action = {
            type: 'AMNITIES_NAME',
            payload: [],
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            amnitiesnamelist: [],
        });
    });

    it('it should check ADD_USER_AMENITIES', () => {
        const action = {
            type: 'ADD_USER_AMENITIES',
            payload: {
                message: 'Amenities added successfully',
                statusCode: 201,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addUserAmnities: 'Amenities added successfully',
            statusCustomerAddUser: 201,
        });
    });

    it('it should check CLEAR_ADDUSER_AMNETIES', () => {
        const action = {
            type: 'CLEAR_ADDUSER_AMNETIES',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCustomerAddUser: 0,
        });
    });




    it('it should check BED_NUMBER_DETAILS', () => {
        const action = {
            type: 'BED_NUMBER_DETAILS',
            payload: {
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bednumberdetails: action.payload,
            statushostelbedstatuscode: 200,
        });
    });

    it('it should check BED_DETAILS', () => {
        const action = {
            type: 'BED_DETAILS',
            payload: [],
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            beddetails: [],
        });
    });

    it('it should check SET_ERROR', () => {
        const action = {
            type: 'SET_ERROR',
            payload: 'some error',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errormessage: 'some error',
        });
    });

    it('it should check ROOM_DETAILS', () => {
        const action = {
            type: 'ROOM_DETAILS',
            payload: []
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            roomdetails: [],
        });
    });



    it('it should check CREATE_FLOOR', () => {
        const action = {
            type: 'CREATE_FLOOR',
            payload: {
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            createFloorSuccessStatusCode: 200,
        });
    });

    it('it should check CLEAR_FLOOR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_FLOOR_STATUS_CODE',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            createFloorSuccessStatusCode: 0,
        });
    });



    it('it should check UPDATE_MESSAGE_FLOOR', () => {
        const action = {
            type: 'UPDATE_MESSAGE_FLOOR',
            message: 'Floor updated successfully',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            createFloorMessage: 'Floor updated successfully',
        });
    });

    it('it should check BILL_PAYMENT_HISTORY', () => {
        const action = {
            type: 'BILL_PAYMENT_HISTORY',
            payload: [],
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            billPaymentHistory: [],
        });
    });





    it('it should check USER_LIST', () => {
        const action = {
            type: 'USER_LIST',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            Users: [],
            UserListStatusCode: 200,
        });
    });

    it('it should check REMOVE_STATUS_CODE_USER', () => {
        const action = {
            type: 'REMOVE_STATUS_CODE_USER'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            UserListStatusCode: 0,
        });
    });

    it('it should check NO_USER_LIST', () => {
        const action = {
            type: 'NO_USER_LIST',
            payload: {
                statusCode: 201
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            NoUserListStatusCode: 201,
        });
    });

    it('it should check CLEAR_NO_USER_LIST', () => {
        const action = {
            type: 'CLEAR_NO_USER_LIST'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            NoUserListStatusCode: 0,
        });
    });



    it('it should check ADD_USER', () => {
        const action = {
            type: 'ADD_USER',
            payload: {
                message: 'User added successfully',
                statusCode: 201,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addUser: 'User added successfully',
            statusCodeForAddUser: 201,
        });
    });

    it('it should check CLEAR_STATUS_CODES', () => {
        const action = {
            type: 'CLEAR_STATUS_CODES'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddUser: 0,
        });
    });





    it('it should check ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: 'some error',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorMessage: 'some error',
            roomdetails: [],
            bednumberdetails: [],
        });
    });



    it('it should check HOSTEL_LIST', () => {
        const action = {
            type: 'HOSTEL_LIST',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            hostelList: [],
            hosteListStatusCode: 200,
        });
    });

    it('it should check CLEAR_HOSTELLIST_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_HOSTELLIST_STATUS_CODE',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            hosteListStatusCode: 0,
        });
    });

    it('it should check NO_HOSTEL', () => {
        const action = {
            type: 'NO_HOSTEL',
            payload: {
                statusCode: 201,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            noHosteListStatusCode: 201,
        });
    });

    it('it should check CLEAR_NO_HOSTEL_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_NO_HOSTEL_STATUS_CODE',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            noHosteListStatusCode: 0,
        });
    });






    it('it should check HOSTEL_LIST_All', () => {
        const action = {
            type: 'HOSTEL_LIST_All',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            hotelDetailsinPg: [],
            statuscodeForhotelDetailsinPg: 200,
        });
    });

    it('it should check CLEAR_HOSTEL_LIST_All_CODE', () => {
        const action = {
            type: 'CLEAR_HOSTEL_LIST_All_CODE',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statuscodeForhotelDetailsinPg: 0,
        });
    });




    it('it should check CLEAR_HOSTEL_LIST_All', () => {
        const action = {
            type: 'CLEAR_HOSTEL_LIST_All',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            hotelDetailsinPg: [],
        });
    });

    it('it should check NO_HOSTEL_DETAILS', () => {
        const action = {
            type: 'NO_HOSTEL_DETAILS',
            payload: {
                statusCode: 201,
            },
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            noAllHosteListStatusCode: 201,
        });
    });

    it('it should check CLEAR_NO_HOSTEL_DETAILS', () => {
        const action = {
            type: 'CLEAR_NO_HOSTEL_DETAILS',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            noAllHosteListStatusCode: 0,
        });
    });




    it('it should check HOSTEL_DETAIL_LIST', () => {
        const action = {
            type: 'HOSTEL_DETAIL_LIST',
            payload: []
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            hosteldetailslist: []
        });
    });



    it('it should check CHECKOUT_USER', () => {
        const action = {
            type: 'CHECKOUT_USER',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            CheckOut: [],
            checkOutStatusCode: 200
        });
    });

    it('it should check CLEAR_STATUS_CODE_CHECK_OUT', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_CHECK_OUT',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            checkOutStatusCode: 0
        });
    });




    it('it should check CHECKOUT_CUSTOMER_LIST_ERROR', () => {
        const action = {
            type: 'CHECKOUT_CUSTOMER_LIST_ERROR',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            checkoutcustomeEmpty: 200
        });
    });

    it('it should check REMOVE_CLEAR_CHECKOUT_CUSTOMER_LIST_ERROR', () => {
        const action = {
            type: 'REMOVE_CLEAR_CHECKOUT_CUSTOMER_LIST_ERROR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            checkoutcustomeEmpty: 0
        });
    });



    it('it should check COUNTRY_LIST', () => {
        const action = {
            type: 'COUNTRY_LIST',
            payload: []
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            countrycode: []
        });
    });

    it('it should check PHONE_ERROR', () => {
        const action = {
            type: 'PHONE_ERROR',
            payload: 'Invalid phone number'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            phoneError: 'Invalid phone number'
        });
    });

    it('it should check CLEAR_PHONE_ERROR', () => {
        const action = {
            type: 'CLEAR_PHONE_ERROR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            phoneError: ''
        });
    });

    it('it should check EMAIL_ERROR', () => {
        const action = {
            type: 'EMAIL_ERROR',
            payload: 'invalid email id'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            emailError: 'invalid email id'
        });
    });

    it('it should check CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            emailError: ''
        });
    });



    it('it should check DELETE_FLOOR_ERROR', () => {
        const action = {
            type: 'DELETE_FLOOR_ERROR',
            payload: 'delete floor error'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteFloorError: 'delete floor error'
        });
    });

    it('it should check CLEAR_DELETE_FLOOR_ERROR', () => {
        const action = {
            type: 'CLEAR_DELETE_FLOOR_ERROR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteFloorError: ''
        });
    });

    it('it should check DELETE_ROOM_ERROR', () => {
        const action = {
            type: 'DELETE_ROOM_ERROR',
            payload: 'delete room error'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteRoomError: 'delete room error'
        });
    });

    it('it should check CLEAR_DELETE_ROOM_ERROR', () => {
        const action = {
            type: 'CLEAR_DELETE_ROOM_ERROR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteRoomError: ''
        });
    });



    it('it should check ALREADY_FLOOR_ERROR', () => {
        const action = {
            type: 'ALREADY_FLOOR_ERROR',
            payload: 'Floor already exist'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            alreadyFloorHere: 'Floor already exist'
        });
    });

    it('it should check CLEAR_ALREADY_FLOOR_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_FLOOR_ERROR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            alreadyFloorHere: ''
        });
    });


    it('it should check WALK_IN_CUSTOMER_LIST', () => {
        const action = {
            type: 'WALK_IN_CUSTOMER_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            WalkInCustomerList: [],
            getWalkInStatusCode: 200
        });
    });

    it('it should check CLEAR_WALK_IN_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_WALK_IN_STATUS_CODE',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            getWalkInStatusCode: 0
        });
    });

    it('it should check WALK_IN_CUSTOMER_LIST_ERROR', () => {
        const action = {
            type: 'WALK_IN_CUSTOMER_LIST_ERROR',
            payload: {
                statusCode: 201
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            NoDataWalkInCustomerStatusCode: 201
        });
    });

    it('it should check CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            NoDataWalkInCustomerStatusCode: 0
        });
    });

    it('it should check ADD_WALK_IN_CUSTOMER', () => {
        const action = {
            type: 'ADD_WALK_IN_CUSTOMER',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addWalkInCustomerStatusCode: 200
        });
    });

    it('it should check CLEAR_ADD_WALK_IN_CUSTOMER', () => {
        const action = {
            type: 'CLEAR_ADD_WALK_IN_CUSTOMER',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addWalkInCustomerStatusCode: 0
        });
    });




    it('it should check ALREADY_EXIST_ERROR', () => {
        const action = {
            type: 'ALREADY_EXIST_ERROR',
            payload: 'Customer already exist'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            alreadyHere: 'Customer already exist'
        });
    });

    it('it should check CLEAR_ALREADY_EXIST_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_EXIST_ERROR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            alreadyHere: ''
        });
    });

    it('it should check DELETE_WALK_IN_CUSTOMER', () => {
        const action = {
            type: 'DELETE_WALK_IN_CUSTOMER',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteWalkInCustomerStatusCode: 200
        });
    });

    it('it should check CLEAR_DELETE_WALK_IN_CUSTOMER', () => {
        const action = {
            type: 'CLEAR_DELETE_WALK_IN_CUSTOMER',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteWalkInCustomerStatusCode: 0
        });
    });





    it('it should check CHECKOUT_CUSTOMER_LIST', () => {
        const action = {
            type: 'CHECKOUT_CUSTOMER_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            CheckOutCustomerList: [],
            GetCheckOutCustomerStatusCode: 200
        });
    });

    it('it should check CLEAR_CHECKOUT_CUSTOMER_LIST', () => {
        const action = {
            type: 'CLEAR_CHECKOUT_CUSTOMER_LIST',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            GetCheckOutCustomerStatusCode: 0
        });
    });

    it('it should check ADD_CHECKOUT_CUSTOMER', () => {
        const action = {
            type: 'ADD_CHECKOUT_CUSTOMER',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addCheckoutCustomerStatusCode: 200
        });
    });

    it('it should check CLEAR_ADD_CHECKOUT_CUSTOMER', () => {
        const action = {
            type: 'CLEAR_ADD_CHECKOUT_CUSTOMER',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addCheckoutCustomerStatusCode: 0
        });
    });





    it('it should check DELETE_CHECK_OUT_CUSTOMER', () => {
        const action = {
            type: 'DELETE_CHECK_OUT_CUSTOMER',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteCheckoutCustomerStatusCode: 200
        });
    });

    it('it should check CLEAR_DELETE_CHECK_OUT_CUSTOMER', () => {
        const action = {
            type: 'CLEAR _DELETE_CHECK_OUT_CUSTOMER',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteCheckoutCustomerStatusCode: 0
        });
    });

    it('it should check ADD_CHECKOUT_CUSTOMER_LIST_ERROR', () => {
        const action = {
            type: 'ADD_CHECKOUT_CUSTOMER_LIST_ERROR',
            payload: 'error checkout customer'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorMessageAddCheckOut: 'error checkout customer'
        });
    });

    it('it should check CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR', () => {
        const action = {
            type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR',
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorMessageAddCheckOut: ''
        });
    });




    it('it should check AVAILABLE_CHECK_OUT_CUSTOMER', () => {
        const action = {
            type: 'AVAILABLE_CHECK_OUT_CUSTOMER',
            payload: {
                response: []
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            availableCheckOutCustomerList: []
        });
    });



  

    it('it should check EXPORT_DETAILS', () => {
        const action = {
            type: 'EXPORT_DETAILS',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            exportDetails: action.payload,
            statusCodeForExportDetails: 200
        });
    });

    it('it should check CLEAR_EXPORT_DETAILS', () => {
        const action = {
            type: 'CLEAR_EXPORT_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForExportDetails: 0
        });
    });

    it('it should check EXPORT_ASSETS_DETAILS', () => {
        const action = {
            type: 'EXPORT_ASSETS_DETAILS',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            exportAssetsDetail: action.payload,
            statusCodeforExportAssetsCode: 200
        });
    });

    it('it should check CLEAR_EXPORT_ASSETS_DETAILS', () => {
        const action = {
            type: 'CLEAR_EXPORT_ASSETS_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeforExportAssetsCode: 0
        });
    });








    it('it should check EXPORT_EB_DETAILS', () => {
        const action = {
            type: 'EXPORT_EB_DETAILS',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            exportEbDetails: action.payload,
            statusCodeForExportEb: 200
        });
    });

    it('it should check CLEAR_EXPORT_EB_DETAILS', () => {
        const action = {
            type: 'CLEAR_EXPORT_EB_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForExportEb: 0
        });
    });





    it('it should check EXPORT_EXPENSE_DETAILS', () => {
        const action = {
            type: 'EXPORT_EXPENSE_DETAILS',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            exportExpenceDetails: action.payload,
            statusCodeForExportExpence: 200
        });
    });

    it('it should check CLEAR_EXPORT_EXPENSE_DETAILS', () => {
        const action = {
            type: 'CLEAR_EXPORT_EXPENSE_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForExportExpence: 0
        });
    });

    it('it should check EXPORT_COMPLIANCE_DETAILS', () => {
        const action = {
            type: 'EXPORT_COMPLIANCE_DETAILS',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            exportComplianceDetails: action.payload,
            statusCodeForExportcompliance: 200
        });
    });

    it('it should check CLEAR_EXPORT_COMPLIANCE_DETAILS', () => {
        const action = {
            type: 'CLEAR_EXPORT_COMPLIANCE_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForExportcompliance: 0
        });
    });

    it('it should check EXPORT_BOOKING_DETAILS', () => {
        const action = {
            type: 'EXPORT_BOOKING_DETAILS',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            exportBookingDetails: action.payload,
            statusCodeForExportBooking: 200
        });
    });

    it('it should check CLEAR_EXPORT_BOOKING_DETAILS', () => {
        const action = {
            type: 'CLEAR_EXPORT_BOOKING_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForExportBooking: 0
        });
    });

    it('it should check EXPORT_WALKIN_DETAILS', () => {
        const action = {
            type: 'EXPORT_WALKIN_DETAILS',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            exportWalkinDetails: action.payload,
            statusCodeForExportWalkin: 200
        });
    });

    it('it should check CLEAR_EXPORT_WALKIN_DETAILS', () => {
        const action = {
            type: 'CLEAR_EXPORT_WALKIN_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForExportWalkin: 0
        });
    });




    it('it should check EXPORT_CHECKOUT_DETAILS', () => {
        const action = {
            type: 'EXPORT_CHECKOUT_DETAILS',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            exportCheckoutDetails: action.payload,
            statusCodeForExportCheckout: 200
        });
    });

    it('it should check CLEAR_EXPORT_CHECKOUT_DETAILS', () => {
        const action = {
            type: 'CLEAR_EXPORT_CHECKOUT_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForExportCheckout: 0
        });
    });





    it('it should check GET_CONFIRM_CHECK_OUT_CUSTOMER', () => {
        const action = {
            type: 'GET_CONFIRM_CHECK_OUT_CUSTOMER',
            payload: {
                response: {
                    bill_details: [],
                    checkout_details: []
                },
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            GetconfirmcheckoutBillDetails: [],
            GetconfirmcheckoutUserDetails: [],
            statusCodegetConfirmCheckout: 200
        });
    });

    it('it should check CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER', () => {
        const action = {
            type: 'CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodegetConfirmCheckout: 0
        });
    });






    it('it should check ADD_CONFIRM_CHECK_OUT_CUSTOMER', () => {
        const action = {
            type: 'ADD_CONFIRM_CHECK_OUT_CUSTOMER',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeAddConfirmCheckout: 200
        });
    });

    it('it should check CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER', () => {
        const action = {
            type: 'CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeAddConfirmCheckout: 0
        });
    });



    it('it should check REASSIGN_BED', () => {
        const action = {
            type: 'REASSIGN_BED',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            reassignbeddetails: action.payload,
            statusCodeForReassinBed: 200
        });
    });

    it('it should check CLEAR_REASSIGN_BED', () => {
        const action = {
            type: 'CLEAR_REASSIGN_BED'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForReassinBed: 0
        });
    });



    it('it should check CUSTOMER_ADD_CONTACT', () => {
        const action = {
            type: 'CUSTOMER_ADD_CONTACT',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            customerContact: action.payload,
            statusCodeForCustomerCoatact: 200
        });
    });

    it('it should check CLEAR_CUSTOMER_ADD_CONTACT', () => {
        const action = {
            type: 'CLEAR_CUSTOMER_ADD_CONTACT'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForCustomerCoatact: 0
        });
    });


    it('it should check CUSTOMER_ALL_DETAILS', () => {
        const action = {
            type: 'CUSTOMER_ALL_DETAILS',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            customerAllDetails: [],
            statusCodeForCustomerAllDetails: 200
        });
    });

    it('it should check CLEAR_CUSTOMER_ALL_DETAILS', () => {
        const action = {
            type: 'CLEAR_CUSTOMER_ALL_DETAILS'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForCustomerAllDetails: 0
        });
    });







    it('it should check DELETE_CONTACT', () => {
        const action = {
            type: 'DELETE_CONTACT',
            payload: {
                statusCode: 200
            }
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteContact: action.payload,
            statusCodeDeleteContact: 200
        });
    });

    it('it should check CLEAR_DELETE_CONTACT', () => {
        const action = {
            type: 'CLEAR_DELETE_CONTACT'
        };

        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeDeleteContact: 0
        });
    });


    it('should check CONTACT_ERROR', () => {
        const action = {
            type: 'CONTACT_ERROR',
            payload: {
                response: 'error contact details'
            }
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            contactError: 'error contact details'
        });
    });
    
    it('should check CLEAR_CONTACT_ERROR', () => {
        const action = {
            type: 'CLEAR_CONTACT_ERROR'
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            contactError: ''
        });
    });
    



    it('should check GENERATE_ADVANCE', () => {
        const action = {
            type: 'GENERATE_ADVANCE',
            payload: {
                response: [],
                statusCode: 200
            }
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            generateAdvance: [],
            statusCodeForGenerateAdvance: 200
        });
    });
    
    it('should check REMOVE_GENERATE_ADVANCE', () => {
        const action = {
            type: 'REMOVE_GENERATE_ADVANCE'
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForGenerateAdvance: 0
        });
    });
    





    it('should check GENERATE_ERROR', () => {
        const action = {
            type: 'GENERATE_ERROR',
            payload: 'some error occured'
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            generateError: 'some error occured'
        });
    });
    
    it('should check CLEAR_GENERATE_ERROR', () => {
        const action = {
            type: 'CLEAR_GENERATE_ERROR'
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            generateError: ''
        });
    });
    
    it('should check UPLOAD_DOCUMENT', () => {
        const action = {
            type: 'UPLOAD_DOCUMENT',
            payload: {
                 message: 'Document uploaded successfully', 
                 statusCode: 200 
                }
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            uploaddocu: 'Document uploaded successfully',
            statusCodeForUploadDocument: 200
        });
    });
    
    it('should check CLEAR_UPLOAD_DOCUMENT', () => {
        const action = {
            type: 'CLEAR_UPLOAD_DOCUMENT'
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForUploadDocument: 0
        });
    });
    
    it('should check UPLOAD_OTHER_DOCUMENT', () => {
        const action = {
            type: 'UPLOAD_OTHER_DOCUMENT',
            payload: {
                message: 'Other document uploaded', 
                statusCode: 200 
            }
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            otherUploaddocu: 'Other document uploaded',
            statusCodeForOtherDocu: 200
        });
    });
    
    it('should check CLEAR_UPLOAD_OTHER_DOCUMENT', () => {
        const action = {
            type: 'CLEAR_UPLOAD_OTHER_DOCUMENT'
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForOtherDocu: 0
        });
    });
    
    it('should check USERROOMAVAILABLETRUE', () => {
        const action = { 
            type: 'USERROOMAVAILABLETRUE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userRoomfor: true
        });
    });
    
    it('should check USERROOMAVAILABLEFALSE', () => {
        const action = { 
            type: 'USERROOMAVAILABLEFALSE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userRoomfor: false
        });
    });
    
    it('should check USERPROFILEBILLTRUE', () => {
        const action = { 
            type: 'USERPROFILEBILLTRUE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userProfilebill: true
        });
    });
    
    it('should check USERPROFILEBILLFALSE', () => {
        const action = {
             type: 'USERPROFILEBILLFALSE'
             };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userProfilebill: false
        });
    });
    
    it('should check ADHAR_UPLOAD_ERROR', () => {
        const action = {
            type: 'ADHAR_UPLOAD_ERROR',
            payload: {
                 response: 'Aadhar upload error', 
                statusCode: 200 }
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            adharuploadfileError: 'Aadhar upload error',
            statuscodeForAdharFileError: 200
        });
    });
    
    it('should check CLEAR_ADHAR_UPLOAD_ERROR', () => {
        const action = { type: 'CLEAR_ADHAR_UPLOAD_ERROR' };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            adharuploadfileError: ''
        });
    });
    
    it('should check CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE', () => {
        const action = { 
            type: 'CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statuscodeForAdharFileError: 0
        });
    });
    
    it('should check USERREADINGTRUE', () => {
        const action = { 
            type: 'USERREADINGTRUE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userReading: true
        });
    });
    
    it('should check USERREADINGFALSE', () => {
        const action = { 
            type: 'USERREADINGFALSE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userReading: false
        });
    });
    
    it('should check USERHOSTELREADINGTRUE', () => {
        const action = { 
            type: 'USERHOSTELREADINGTRUE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userHostelRead: true
        });
    });
    
    it('should check USERHOSTELREADINGFALSE', () => {
        const action = { 
            type: 'USERHOSTELREADINGFALSE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userHostelRead: false
        });
    });
    
    it('should check USERREADING_DELETETRUE', () => {
        const action = { 
            type: 'USERREADING_DELETETRUE'
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userReadingdelete: true
        });
    });
    
    it('should check USERREADING_DELETEFALSE', () => {
        const action = { 
            type: 'USERREADING_DELETEFALSE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userReadingdelete: false
        });
    });
    
    it('should check USERHOSTEL_READING_DELETETRUE', () => {
        const action = { 
            type: 'USERHOSTEL_READING_DELETETRUE'
         };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userHosteldelete: true
        });
    });
    
    it('should check USERHOSTEL_READING_DELETEFALSE', () => {
        const action = { 
            type: 'USERHOSTEL_READING_DELETEFALSE' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            userHosteldelete: false
        });
    });
    
    it('should check UPDATE_USERSLIST_TRUE', () => {
        const action = {
             type: 'UPDATE_USERSLIST_TRUE' 
            };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            isUsersListTrue: 3
        });
    });
    
    it('should check UPDATE_USERSLIST_FALSE', () => {
        const action = {
             type: 'UPDATE_USERSLIST_FALSE' 
            };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            isUsersListTrue: 1
        });
    });
    
    it('should check HOSTEL_ID_LIST', () => {
        const action = {
            type: 'HOSTEL_ID_LIST',
            payload: 
            { 
             statusCode: 200
             }
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            hostelListNewDetails: action.payload,
            statusCodeForhostelListNewDetails: 200
        });
    });
    
    it('should check CLEAR_HOSTEL_ID_LIST', () => {
        const action = { 
            type: 'CLEAR_HOSTEL_ID_LIST' 
        };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForhostelListNewDetails: 0
        });
    });
    
    it('should check CLEAR_HOSTEL_LIST', () => {
        const action = { 
            type: 'CLEAR_HOSTEL_LIST'
         };
    
        expect(UserListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            hostelList: [],
            hostelListNewDetails: []
        });
    });
    

    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',
           

        }
        expect(UserListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
                   })

    })




    it('should check CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR', () => {
    const action = {
        type: 'CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR'
    };

    expect(UserListReducer(initialState, action)).toStrictEqual({
        ...initialState,
        conformChekoutError: ''
    });
});


it('should handle EDIT_CONFIRM_CHECK_OUT_CUSTOMER', () => {
    const action = {
        type: 'EDIT_CONFIRM_CHECK_OUT_CUSTOMER',
        payload: { statusCode: 200 }
    };
    expect(UserListReducer(initialState, action)).toStrictEqual({
        ...initialState,
        statusCodeConformEdit: 200
    });
});

it('should handle CLEAR_EDIT_CONFIRM_CHECK_OUT_CUSTOMER', () => {
    const action = {
        type: 'CLEAR_EDIT_CONFIRM_CHECK_OUT_CUSTOMER'
    };
    expect(UserListReducer(initialState, action)).toStrictEqual({
        ...initialState,
        statusCodeConformEdit: 0
    });
});


it('should handle EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR', () => {
    const action = {
        type: 'EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR',
        payload: 'some error occurred'
    };

    expect(UserListReducer(initialState, action)).toStrictEqual({
        ...initialState,
        conformChekoutEditError: 'some error occurred'
    });
});

it('should handle CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR', () => {
    const action = {
        type: 'CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR'
    };

    expect(UserListReducer(initialState, action)).toStrictEqual({
        ...initialState,
        conformChekoutEditError: ''
    });
});





})