import SettingsReducer, { initialState } from "../../Redux/Reducer/SettingsReducer";



describe('it should check settings reducers', () => {
    it('it should check ERROR_USER', () => {
        const action = {
            type: 'ERROR_USER',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState, errorUser: 200,
        });
    });

    it('it should check REMOVE_ERROR_USER', () => {
        const action = {
            type: 'REMOVE_ERROR_USER',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState, errorUser: 0,
        });
    });



    it('it should check ERROR_ROLE', () => {
        const action = {
            type: 'ERROR_ROLE',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState, errorRole: 200,
        });
    });

    it('it should check REMOVE_ERROR_ROLE', () => {
        const action = {
            type: 'REMOVE_ERROR_ROLE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState, errorRole: 0,
        });
    });


    it('it should check ASSIGNED_ERROR', () => {
        const action = {
            type: 'ASSIGNED_ERROR',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState, assignedUserRoleStatusCode: 200,
        });
    });

    it('it should check REMOVE_ASSIGNED_ERROR', () => {
        const action = {
            type: 'REMOVE_ASSIGNED_ERROR',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState, assignedUserRoleStatusCode: 0,
        });
    });


    it('it should check ERROR_CATEGORY', () => {
        const action = {
            type: 'ERROR_CATEGORY',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState, categoryError: 200,
        });
    });

    it('it should check REMOVE_ERROR_CATEGORY', () => {
        const action = {
            type: 'REMOVE_ERROR_CATEGORY',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState, categoryError: 0,
        });
    });



    it('it should check EXPENCES_CATEGORY_LIST', () => {
        const action = {
            type: 'EXPENCES_CATEGORY_LIST',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            Expences: [],
            getExpensesStatuscode: 200,
        });
    });

    it('it should check CLEAR_GET_EXPENSES_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_GET_EXPENSES_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            getExpensesStatuscode: 0,
        });
    });



    it('it should check EXPENCES_ADD', () => {
        const action = {
            type: 'EXPENCES_ADD',
            payload: {
                message: 'Expense added successfully',
                statusCode: 200,
                Type: 'others',
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            message: 'Expense added successfully',
            addexpencesStatuscode: 200,
            AddCategoryType: 'others',
        });
    });

    it('it should check CLEAR_TYPE', () => {
        const action = {
            type: 'CLEAR_TYPE',
            payload: {
                Type: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            AddCategoryType: 0,
        });
    });

    it('it should check CLEAR_ADD_EXPENCES_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_EXPENCES_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addexpencesStatuscode: 0,
        });
    });


    it('it should check EDIT-EXPENCES-CATEGORY', () => {
        const action = {
            type: 'EDIT-EXPENCES-CATEGORY',
            payload: {
                message: 'Expense category updated successfully',
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            message: 'Expense category updated successfully',
            editexpencesStatuscode: 200,
        });
    });

    it('it should check CLEAR_EDITEXPENCES_CATEGORY_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_EDITEXPENCES_CATEGORY_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            editexpencesStatuscode: 0,
        });
    });


    it('it should check DELETE_EXPENCES', () => {
        const action = {
            type: 'DELETE_EXPENCES',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteexpencesStatusCode: 200,
        });
    });

    it('it should check CLEAR_DELETE_EXPENCES_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_EXPENCES_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteexpencesStatusCode: 0,
        });
    });


    it('it should check ALREADY_EXPENCE_CATEGORY_ERROR', () => {
        const action = {
            type: 'ALREADY_EXPENCE_CATEGORY_ERROR',
            payload: "Category already exists",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            alreadycategoryerror: "Category already exists",
        });
    });

    it('it should check CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR',
            payload: "",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            alreadycategoryerror: "",
        });
    });


    it('it should check COMPLAINT_TYPE_LIST', () => {
        const action = {
            type: 'COMPLAINT_TYPE_LIST',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 200,
        });
    });

    it('it should check CLEAR_GET_COMPLAINTTYPE_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_GET_COMPLAINTTYPE_STATUS_CODE',
            payload: {
                statusCode: 0
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            getcomplainttypeStatuscode: 0,
        });
    });


    it('it should check COMPLAINT_TYPE_ADD', () => {
        const action = {
            type: 'COMPLAINT_TYPE_ADD',
            payload: {
                message: "Complaint type added successfully",
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            message: "Complaint type added successfully",
            addComplaintSuccessStatusCode: 200,
        });
    });

    it('it should check CLEAR_ADD_COMPLAINT_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_COMPLAINT_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addComplaintSuccessStatusCode: 0,
        });
    });





    it('it should check COMPLAINT_TYPE_EDIT', () => {
        const action = {
            type: 'COMPLAINT_TYPE_EDIT',
            payload: {
                response: "Complaint type edited successfully",
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            message: "Complaint type edited successfully",
            editComplaintSuccessStatusCode: 200,
        });
    });

    it('it should check CLEAR_EDIT_COMPLAINT_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_EDIT_COMPLAINT_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            editComplaintSuccessStatusCode: 0,
        });
    });



    it('it should check DELETE_COMPLAINT_TYPE', () => {
        const action = {
            type: 'DELETE_COMPLAINT_TYPE',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deletecomplaintStatuscode: 200,
        });
    });

    it('it should check CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deletecomplaintStatuscode: 0,
        });
    });




    it('it should check ALREADY_COMPLAINTTYPE_ERROR', () => {
        const action = {
            type: 'ALREADY_COMPLAINTTYPE_ERROR',
            payload: "Complaint type already exist",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            alreadytypeerror: "Complaint type already exist",
        });
    });

    it('it should check CLEAR_ALREADY_COMPLAINTTYPE_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_COMPLAINTTYPE_ERROR',
            payload: "",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            alreadytypeerror: "",
        });
    });



    it('it should check EB_BILLING_UNIT_ADD', () => {
        const action = {
            type: 'EB_BILLING_UNIT_ADD',
            payload: {
                message: "EB Bill Unit added successfully",
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            message: "EB Bill Unit added successfully",
            addEbbillingUnitStatuscode: 200,
        });
    });

    it('it should check CLEAR_ADD_EB_BILLING_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_EB_BILLING_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addEbbillingUnitStatuscode: 0,
        });
    });



    it('it should check ERROR_EB_BILLING_UNIT_LIST', () => {
        const action = {
            type: 'ERROR_EB_BILLING_UNIT_LIST',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorEbUnitStatusCode: 200,
        });
    });

    it('it should check REMOVE_ERROR_EB_BILLING_UNIT_LIST', () => {
        const action = {
            type: 'REMOVE_ERROR_EB_BILLING_UNIT_LIST',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorEbUnitStatusCode: 0,
        });
    });




    it('it should check ERROR_COMPLIANTS', () => {
        const action = {
            type: 'ERROR_COMPLIANTS',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorCompliants: 200,
        });
    });

    it('it should check REMOVE_ERROR_COMPLIANTS', () => {
        const action = {
            type: 'REMOVE_ERROR_COMPLIANTS',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorCompliants: 0,
        });
    });



    it('it should check EB_BILLING_UNIT_LIST', () => {
        const action = {
            type: 'EB_BILLING_UNIT_LIST',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            EBBillingUnitlist: [],
            getebStatuscode: 200,
        });
    });

    it('it should check CLEAR_GET_EBBILLINGS_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_GET_EBBILLINGS_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            getebStatuscode: 0,
        });
    });



    it('it should check DELETE_ELECTRICITY', () => {
        const action = {
            type: 'DELETE_ELECTRICITY',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteElectricityStatuscode: 200,
        });
    });

    it('it should check CLEAR_DELETE_ELECTRICITY_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_ELECTRICITY_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteElectricityStatuscode: 0,
        });
    });


    it('it should check ROLE_LIST', () => {
        const action = {
            type: 'ROLE_LIST',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            getsettingRoleList: [],
            statusCodeForRoleList: 200,
        });
    });

    it('it should check CLEAR_ROLE_LIST', () => {
        const action = {
            type: 'CLEAR_ROLE_LIST',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForRoleList: 0,
        });
    });



    it('it should check ADD_SETTING_ROLE', () => {
        const action = {
            type: 'ADD_SETTING_ROLE',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addRoleSetting: { statusCode: 200 },
            statusCodeForAddRole: 200,
        });
    });

    it('it should check CLEAR_ADD_SETTING_ROLE', () => {
        const action = {
            type: 'CLEAR_ADD_SETTING_ROLE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddRole: 0,
        });
    });



    it('it should check EDIT_PERMISSION', () => {
        const action = {
            type: 'EDIT_PERMISSION',
            payload: {
                permissions: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            editRolePermission: { permissions: [], statusCode: 200 },
            editStatusCosePermission: 200,
        });
    });

    it('it should check CLEAR_EDIT_PERMISSION', () => {
        const action = {
            type: 'CLEAR_EDIT_PERMISSION',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            editStatusCosePermission: 0,
        });
    });




    it('it should check EDIT_SETTING_ROLE', () => {
        const action = {
            type: 'EDIT_SETTING_ROLE',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            editSettingRole: { statusCode: 200 },
            StatusForEditPermission: 200,
        });
    });

    it('it should check CLEAR_EDIT_SETTING_ROLE', () => {
        const action = {
            type: 'CLEAR_EDIT_SETTING_ROLE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusForEditPermission: 0,
        });
    });


    it('it should check DELETE_SETTING_ROLE', () => {
        const action = {
            type: 'DELETE_SETTING_ROLE',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteSettingRole: { statusCode: 200 },
            StatusForDeletePermission: 200,
        });
    });

    it('it should check CLEAR_DELETE_SETTING_ROLE', () => {
        const action = {
            type: 'CLEAR_DELETE_SETTING_ROLE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusForDeletePermission: 0,
        });
    });




    it('it should check ADD_STAFF_USER', () => {
        const action = {
            type: 'ADD_STAFF_USER',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addSettingUser: {
                statusCode: 200,
            },
            StatusForaddSettingUser: 200,
        });
    });

    it('it should check CLEAR_ADD_STAFF_USER', () => {
        const action = {
            type: 'CLEAR_ADD_STAFF_USER',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusForaddSettingUser: 0,
        });
    });


    it('it should check PHONE_NUM_ERROR', () => {
        const action = {
            type: 'PHONE_NUM_ERROR',
            payload: "Invalid phone number",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            phoneNumError: "Invalid phone number",
        });
    });

    it('it should check CLEAR_PHONE_NUM_ERROR', () => {
        const action = {
            type: 'CLEAR_PHONE_NUM_ERROR',
            payload: "",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            phoneNumError: "",
        });
    });



    it('it should check EMAIL_ID_ERROR', () => {
        const action = {
            type: 'EMAIL_ID_ERROR',
            payload: "Invalid email address",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            emailIdError: "Invalid email address",
        });
    });

    it('it should check CLEAR_EMAIL_ID_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ID_ERROR',
            payload: "",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            emailIdError: "",
        });
    });


    it('it should check USER_STAFF_LIST', () => {
        const action = {
            type: 'USER_STAFF_LIST',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 200,
        });
    });

    it('it should check CLEAR_USER_STAFF_LIST', () => {
        const action = {
            type: 'CLEAR_USER_STAFF_LIST',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusForaddSettingStaffList: 0,
        });
    });



    it('it should check EB_UNIT_ERROR', () => {
        const action = {
            type: 'EB_UNIT_ERROR',
            payload: "Invalid EB Unit",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            ebUnitError: "Invalid EB Unit",
        });
    });

    it('it should check CLEAR_EB_UNIT_ERROR', () => {
        const action = {
            type: 'CLEAR_EB_UNIT_ERROR',
            payload: "",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            ebUnitError: "",
        });
    });




    it('it should check REPORT_LIST', () => {
        const action = {
            type: 'REPORT_LIST',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            reportList: action.payload,
            StatusForReport: 200,
        });
    });

    it('it should check CLEAR_REPORT_LIST', () => {
        const action = {
            type: 'CLEAR_REPORT_LIST',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusForReport: 0,
        });
    });


    it('it should check SETTING_GENERAL_ADD', () => {
        const action = {
            type: 'SETTING_GENERAL_ADD',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 200,
        });
    });

    it('it should check CLEAR_SETTING_GENERAL_ADD', () => {
        const action = {
            type: 'CLEAR_SETTING_GENERAL_ADD',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusCodeForSettingGeneral: 0,
        });
    });



    it('it should check GENERAL_EMAIL_ERROR', () => {
        const action = {
            type: 'GENERAL_EMAIL_ERROR',
            payload: 'Invalid email',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            generalEmailError: 'Invalid email',
        });
    });

    it('it should check CLEAR_GENERAL_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_GENERAL_EMAIL_ERROR',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            generalEmailError: '',
        });
    });



    it('it should check MOBILE_ERROR', () => {
        const action = {
            type: 'MOBILE_ERROR',
            payload: 'invalid mobile number',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            generalMobileError: 'invalid mobile number',
        });
    });

    it('it should check CLEAR_MOBILE_ERROR', () => {
        const action = {
            type: 'CLEAR_MOBILE_ERROR',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            generalMobileError: '',
        });
    });




    it('it should check GET_ALL_GENERAL', () => {
        const action = {
            type: 'GET_ALL_GENERAL',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 200,
        });
    });

    it('it should check CLEAR_GET_ALL_GENERAL', () => {
        const action = {
            type: 'CLEAR_GET_ALL_GENERAL',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusCodeforGetGeneral: 0,
        });
    });



    it('it should check GENERAL_PASSWORD_CHANGES', () => {
        const action = {
            type: 'GENERAL_PASSWORD_CHANGES',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 200,
        });
    });

    it('it should check CLEAR_GENERAL_PASSWORD_CHANGES', () => {
        const action = {
            type: 'CLEAR_GENERAL_PASSWORD_CHANGES',

        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusCodeforGeneralPassword: 0,
        });
    });




    it('it should check GENERAL_PASSWORD_CHECK', () => {
        const action = {
            type: 'GENERAL_PASSWORD_CHECK',
            payload: {
                response: [],
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            checkPassword: [],
            statusCodeForCheckPassword: 200,
        });
    });

    it('it should check CLEAR_GENERAL_PASSWORD_CHECK', () => {
        const action = {
            type: 'CLEAR_GENERAL_PASSWORD_CHECK',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForCheckPassword: 0,
        });
    });



    it('it should check PASSWORD_ERROR', () => {
        const action = {
            type: 'PASSWORD_ERROR',
            payload: "password error",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            notmatchpass: "password error",
        });
    });

    it('it should check CLEAR_PASSWORD_ERROR', () => {
        const action = {
            type: 'CLEAR_PASSWORD_ERROR',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            notmatchpass: "",
        });
    });



    it('it should check CONFORM_PASSWORD_MATCHES', () => {
        const action = {
            type: 'CONFORM_PASSWORD_MATCHES',
            payload: "confirm password error",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            conformPassNotmatch: "confirm password error",
        });
    });

    it('it should check CLEAR_CONFORM_PASSWORD_MATCHES', () => {
        const action = {
            type: 'CLEAR_CONFORM_PASSWORD_MATCHES',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            conformPassNotmatch: "",
        });
    });



    it('it should check DELETE_GENERAL', () => {
        const action = {
            type: 'DELETE_GENERAL',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            generalDelete: action.payload,
            statusCodeForGeneralDelete: 200,
        });
    });

    it('it should check CLEAR_DELETE_GENERAL', () => {
        const action = {
            type: 'CLEAR_DELETE_GENERAL',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForGeneralDelete: 0,
        });
    });



    it('it should check RECURRING_ROLE', () => {
        const action = {
            type: 'RECURRING_ROLE',
            payload: {
                statusCode: 200,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addRecurringRole: 200,
        });
    });

    it('it should check REMOVE_RECURRING_ROLE', () => {
        const action = {
            type: 'REMOVE_RECURRING_ROLE',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            addRecurringRole: 0,
        });
    });



    it('it should check ROLE_ERROR', () => {
        const action = {
            type: 'ROLE_ERROR',
            payload: "Role error message",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            roleError: "Role error message",
        });
    });

    it('it should check CLEAR_ROLE_ERROR', () => {
        const action = {
            type: 'CLEAR_ROLE_ERROR',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            roleError: "",
        });
    });

    it('it should check ROLE_EDIT_ERROR', () => {
        const action = {
            type: 'ROLE_EDIT_ERROR',
            payload: "Role edit error message",
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            roleEditError: "Role edit error message",
        });
    });

    it('it should check CLEAR_ROLE_EDIT_ERROR', () => {
        const action = {
            type: 'CLEAR_ROLE_EDIT_ERROR',
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({
            ...initialState,
            roleEditError: "",
        });
    });




    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',


        }
        expect(SettingsReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
        })

    })




    it('it should check NEW_SUBSCRIPTION', () => {
        const action = {
            type: 'NEW_SUBSCRIPTION',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 200,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });
    it('it should check CLEAR_NEW_SUBSCRIPTION', () => {
        const action = {
            type: 'CLEAR_NEW_SUBSCRIPTION',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });




    it('it should check NEW_SUBSCRIPTION_LIST', () => {
        const action = {
            type: 'NEW_SUBSCRIPTION_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 200,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });


    it('it should check CLEAR_NEW_SUBSCRIPTION_LIST', () => {
        const action = {
            type: 'CLEAR_NEW_SUBSCRIPTION_LIST',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });


    
    it('it should check SUBSCRIPTION_PDF', () => {
        const action = {
            type: 'SUBSCRIPTION_PDF',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 200,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });


    it('it should check CLEAR_SUBSCRIPTION_PDF', () => {
        const action = {
            type: 'CLEAR_SUBSCRIPTION_PDF_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });

     it('it should check SETTINGSADDRECURRING', () => {
        const action = {
            type: 'SETTINGSADDRECURRING',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:200,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });


    it('it should check CLEAR_SETTINGSADDRECURRING', () => {
        const action = {
            type: 'CLEAR_SETTINGSADDRECURRING_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });

    it('it should check FREQUENCYTYPESLIST', () => {
        const action = {
            type: 'FREQUENCYTYPESLIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 200 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });


    it('it should check CLEAR_FREQUENCYTYPESLIST', () => {
        const action = {
            type: 'CLEAR_FREQUENCYTYPESLIST_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });

    it('it should check NOTIFICATIONTYPESLIST', () => {
        const action = {
            type: 'NOTIFICATIONTYPESLIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 200,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });


    it('it should check CLEAR_NOTIFICATIONTYPESLIST', () => {
        const action = {
            type: 'CLEAR_NOTIFICATIONTYPESLIST_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });

     it('it should check SETTINGSGETRECURRING', () => {
        const action = {
            type: 'SETTINGSGETRECURRING',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 200,
            settingsAddInvoiceSucesscode: 0,
        });
    });


    it('it should check CLEAR_SETTINGSGETRECURRING', () => {
        const action = {
            type: 'CLEAR_SETTINGSGETRECURRING_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });

     it('it should check ADDINVOICE_SETTINGS', () => {
        const action = {
            type: 'ADDINVOICE_SETTINGS',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 200,
        });
    });


    it('it should check CLEAR_ADDINVOICE_SETTINGS', () => {
        const action = {
            type: 'CLEAR_ADDINVOICE_SETTINGS_STATUS_CODE',
            payload: {
                statusCode: 0,
            },
        };

        expect(SettingsReducer(initialState, action)).toStrictEqual({

            Expences: [],
            message: "",
            getExpensesStatuscode: 0,
            addexpencesStatuscode: 0,
            editexpencesStatuscode: 0,
            alreadycategoryerror: "",
            deleteexpencesStatusCode: 0,
            Complainttypelist: [],
            getcomplainttypeStatuscode: 0,
            addComplaintSuccessStatusCode: 0,
            alreadytypeerror: "",
            deletecomplaintStatuscode: 0,
            addEbbillingUnitStatuscode: 0,
            EBBillingUnitlist: [],
            getebStatuscode: 0,
            getsettingRoleList: [],
            statusCodeForRoleList: 0,
            addRoleSetting: [],
            statusCodeForAddRole: 0,
            editRolePermission: [],
            editStatusCosePermission: 0,
            editSettingRole: [],
            StatusForEditPermission: 0,
            deleteSettingRole: [],
            StatusForDeletePermission: 0,
            StatusForaddSettingUser: 0,
            addSettingUser: [],
            addSettingStaffList: [],
            StatusForaddSettingStaffList: 0,
            emailIdError: "",
            phoneNumError: "",
            ebUnitError: "",
            reportList: [],
            StatusForReport: 0,
            settingGeneralPage: [],
            StatusCodeForSettingGeneral: 0,
            settingGetGeneralData: [],
            StatusCodeforGetGeneral: 0,
            settingGeneraLPasswordChanges: [],
            StatusCodeforGeneralPassword: 0,
            generalDelete: [],
            statusCodeForGeneralDelete: 0,
            generalEmailError: "",
            generalMobileError: "",
            addRecurringRole: 0,
            checkPassword: [],
            statusCodeForCheckPassword: 0,
            notmatchpass: "",
            conformPassNotmatch: "",
            editComplaintSuccessStatusCode: 0,
            deleteElectricityStatuscode: 0,
            assignedUserRoleStatusCode: 0,
            categoryError: 0,
            errorEbUnitStatusCode: 0,
            errorCompliants: 0,
            errorUser: 0,
            errorRole: 0,
            AddCategoryType: 0,
            roleError: '',
            roleEditError: '',
            generalDeleteError: '',
            subscriptionNew: [],
            statusCodeNewSubscription: 0,
            subcripitionAllDetails: [],
            statusCodeForSubcripitionAllDetails: 0,
            toTriggerPDF: false,
            SubscriptionPDF: [],
            SubscriptionPdfSuccess: 0,
            SettingsRecurringAddSuccess:0,
            FrequencyTypeList : [],
            NotificationTypeList: [],
            FrequncyTypegetSuccessCode: 0 ,
            NotificationypegetSuccessCode: 0,
            SettingsBillsGetRecurring:[],
            settingsBillsggetRecurrSucesscode: 0,
            settingsAddInvoiceSucesscode: 0,
        });
    });


})