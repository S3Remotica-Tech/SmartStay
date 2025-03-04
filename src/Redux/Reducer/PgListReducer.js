
export const initialState = {
    Name: '',
    phoneNumber: '',
    email_Id: '',
    location: '',
    number_Of_Floor: '',
    room_Id: '',
    number_Of_Bed: '',
    message: '',
    floor_Id: '',
    checkRoomList: [],
    checkEBList: [],
    createEBList: [],
    EB_Customerlist: [],
    EB_startmeterlist: [],
    statusCodeForEbRoomList: 0,
    createRoomMessage: '',
    errMessage: "",
    roomCount: [],
    roomCreationSuccess: false,
    createPGMessage: '',
    bedDetailsForUser: [],
    statusCode: '',
    errorForBed: "",
    errorStatusCode: 0,
    statusCodeCreateRoom: 0,
    dashboardDetails: [],
    deleteFloor: '',
    deleteRoom: '',
    deleteBed: '',
    roomCountStatusCode: 0,
    noRoomsInFloorStatusCode: 0,
    createPgStatusCode: 0,
    createBedStatusCode: 0,
    alreadyBedAvailable: 0,
    statusCodeForDeleteRoom: 0,
    statusCodeDeleteBed: 0,
    AddEBstatusCode: 0,
    ebError: '',
    deletePgSuccessStatusCode: 0,
    alreadyRoomHere: ' ',
    deletePgError: '',
    deleteBedError: '',
    updateFloorSuccessStatusCode: 0,
    alreadyfloorNameHere: '',
    OccupiedCustomer: [],
    OccupiedCustomerGetStatusCode: 0,
    EB_customerTable: [],
    statusCodeforEbCustomer: 0,
    dleteHostelImagesStatusCode: 0,
    statusCodeForEditElectricity: 0,
    editElectricity: [],
    statusCodeForDeleteElectricity: 0,
    deleteElectricity: [],
    ebEditError: '',
    dashboardFilter: [],
    statusCodeForDashboardFilter: 0,
    dashboardFilterCashback: [],
    statusCodeForDashboardFilterCashBack: 0,
    dashboardFilterRevenu: [],
    statusCodeForDashboardFilterRevenue: 0,
    addHostelBasedReading: [],
    statusCodeForAddHostelBased: 0,
    editHostelBasedReading: [],
    statusCodeForEditHostelBased: 0,
    getHostelBasedRead: [],
    getStatusCodeForHostelBased: 0,
    deleteHostelBasedReading: [],
    statusCodeForDeleteHostelBased: 0,
    dateAlready: '',
    editDateAlready: '',
    isManageEnable: null,
    announcementList: [],
    statuscodeForAnnounceMentList: 0,
    statuscodeForAddAnnouncement: 0,
    addAnnounceMent: [],
    TitleAlready: '',
    statuscodeForDashboard: 0,
    TittleUnique: '',
    deleteAnnounmentSuccessStatus: 0,
    getCommentsSuccessStatus: 0,
    addCommentsSuccessStatus: 0,
    CommentsList: [],
    addSubCommentsSuccessStatus: 0,

}

const PgListReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'MANAGE_PG':
            return { ...state, isManageEnable: true }

        case 'REMOVE_MANAGE_PG':
            return { ...state, isManageEnable: false }

        case 'DELETE_ANNOUNCEMENT':
            return { ...state, deleteAnnounmentSuccessStatus: action.payload.statusCode }

        case 'REMOVE_DELETE_ANNOUNCEMENT':
            return { ...state, deleteAnnounmentSuccessStatus: 0 }

        case 'GET_COMMENTS':
            return { ...state, CommentsList: action.payload.response, getCommentsSuccessStatus: action.payload.statusCode }
        case 'REMOVE_GET_COMMENTS':
            return { ...state, getCommentsSuccessStatus: 0 }

        case 'CREATE_COMMENTS':
            return { ...state, addCommentsSuccessStatus: action.payload.statusCode }
        case 'REMOVE_CREATE_COMMENTS':
            return { ...state, addCommentsSuccessStatus: 0 }

        case 'CREATE_SUB_COMMENTS':
            return { ...state, addSubCommentsSuccessStatus: action.payload.statusCode }
        case 'REMOVE_CREATE_SUB_COMMENTS':
            return { ...state, addSubCommentsSuccessStatus: 0 }

        case 'DELETE_FLOOR':
            return { ...state, deleteFloor: action.payload.message }
        case 'CLEAR_DELETE_FLOOR':
            return { ...state, deleteFloor: action.message }

        case 'DELETE_HOSTEL_IMAGES':
            return { ...state, dleteHostelImagesStatusCode: action.payload.statusCode }

        case 'CLEAR_DELETE_HOSTEL_IMAGES':
            return { ...state, dleteHostelImagesStatusCode: 0 }


        case 'OCCUPIED_CUSTOMER':
            return { ...state, OccupiedCustomer: action.payload.response, OccupiedCustomerGetStatusCode: action.payload.statusCode }

        case 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE':
            return { ...state, OccupiedCustomerGetStatusCode: 0 }


        case 'DELETE_ROOM':
            return { ...state, 
                // deleteRoom: action.payload, 
                statusCodeForDeleteRoom: action.payload.statusCode }
        case 'CLEAR_DELETE_ROOM':
            return { ...state, statusCodeForDeleteRoom: 0 }
        // case 'DELETE_BED':
        //     return { ...state, deleteBed: action.payload }
        case 'PG_LIST':
            return { ...state, message: action.payload.message, createPgStatusCode: action.payload.statusCode }
        case 'CLEAR_PG_STATUS_CODE':
            return { ...state, createPgStatusCode: 0 }
        case 'AFTER_CREATE_PG_MSG':
            return { ...state, createPGMessage: action.message }

        case 'DELETE_PG':
            return { ...state, deletePgSuccessStatusCode: action.payload.statusCode }
        case 'CLEAR_DELETE_PG_STATUS_CODE':
            return { ...state, deletePgSuccessStatusCode: 0 }

        case 'CREATE_ROOM':
            return { ...state, roomCreationSuccess: true, floor_Id: action.payload.floorId, room_Id: action.payload.roomId, number_Of_Bed: action.payload.number_of_beds, statusCodeCreateRoom: action.payload.statusCode, }
        case 'CLEAR_CREATE_ROOM_STATUS_CODE':
            return { ...state, statusCodeCreateRoom: 0 }
        case 'CHECK_ROOM':
            return { ...state, checkRoomList: action.payload }
        case 'CHECK_EB':
            return { ...state, checkEBList: action.payload }
        case 'CREATE_EB':
            return { ...state, createEBList: action.payload.response, AddEBstatusCode: action.payload.statusCode }
        case 'CLEAR_EB':
            return { ...state, AddEBstatusCode: 0 }
        case 'EB_LIST':
            return { ...state, EB_Customerlist: action.payload }
        case 'EB_STARTMETER_LIST':
            return { ...state, EB_startmeterlist: action.payload.response, statusCodeForEbRoomList: action.payload.statusCode }
        case 'CLEAR_EB_STARTMETER_LIST':
            return { ...state, statusCodeForEbRoomList: 0 }


        case 'EB_CUSTOMER_EBLIST':
            return { ...state, EB_customerTable: action.payload.response, statusCodeforEbCustomer: action.payload.statusCode }
        case 'CLEAR_EB_CUSTOMER_EBLIST':
            return { ...state, statusCodeforEbCustomer: 0 }

        // case 'NO_HOSTEL':
        //     return { ...state, nostatusCodeforEbCustomer: action.payload.statusCode }
        // case 'CLEAR_NOHOSTEL':
        //     return { ...state, nostatusCodeforEbCustomer: 0 }


        case 'EB_ERROR':
            return { ...state, ebError: action.payload }

        case 'CLEAR_EB_ERROR':
            return { ...state, ebError: '' }


        case 'ALREADY_ROOM_ERROR':
            return { ...state, alreadyRoomHere: action.payload }
        case 'CLEAR_ALREADY_ROOM_ERROR':
            return { ...state, alreadyRoomHere: '' }



        case 'ERROR':
            if (state.roomCount.length > 0) {
                let index = state.roomCount.findIndex((item) => {
                    return item[0]?.Floor_Id === action.payload.floor_Id
                })
                state.roomCount[index] = []
            }
            return { ...state, errMessage: action.payload.response }
        case 'UPDATE_MESSAGE_AFTER_CREATION':
            return { ...state, createRoomMessage: action.message }

        case 'BED_DETAILS':
            return { ...state,
                //  bedDetailsForUser: action.payload, 
                statusCode: action.payload.statusCode }

        case 'NO_USER_BED':
            return { ...state, 
                // errorForBed: action.payload, 
                errorStatusCode: action.payload.statusCode }

        case 'CLEAR_STATUS_CODE':
            return { ...state, errorStatusCode: ' ' }
        case 'CLEAR_STATUS_CODE_BED':
            return { ...state, statusCode: ' ' }
        case 'CREATE_PG_DASHBOARD':
            return { ...state, dashboardDetails: action.payload.response, statuscodeForDashboard: action.payload.statusCode }

        case 'CLEAR_CREATE_PG_DASHBOARD':
            return { ...state, statuscodeForDashboard: 0 }
        case 'CLEAR_STATUS_CODE_ROOM_COUNT':
            return { ...state, roomCountStatusCode: 0 }
        case 'ROOM_COUNT':
            return { ...state, roomCount: action.payload.response, roomCountStatusCode: action.payload.statusCode }
        case 'NO_ROOMS':
            return { ...state, noRoomsInFloorStatusCode: action.payload.statusCode }
        case 'CLEAR_NO_ROOM_STATUS_CODE':
            return { ...state, noRoomsInFloorStatusCode: 0 }
        case 'CREATE_BED':
            return { ...state, createBedStatusCode: action.payload.statusCode }
        case 'CLEAR_CREATE_BED_STATUS_CODE':
            return { ...state, createBedStatusCode: 0 }
        case 'DELETE_BED':
            return { ...state, statusCodeDeleteBed: action.payload.statusCode }
        case 'CLEAR_DELETE_BED_STATUS_CODE':
            return { ...state, statusCodeDeleteBed: 0 }


        case 'ALREADY_BED':
            return { ...state, alreadyBedAvailable: action.payload.response }
        case 'CLEAR_ALREADY_BED':
            return { ...state, alreadyBedAvailable: 0 }

        case 'DELETE_PG_ERROR':
            return { ...state, deletePgError: action.payload }
        case 'CLEAR_DELETE_PG_ERROR':
            return { ...state, deletePgError: '' }

        case 'DELETE_BED_ERROR':
            return { ...state, deleteBedError: action.payload }
        case 'CLEAR_DELETE_BED_ERROR':
            return { ...state, deleteBedError: '' }


        // UPDATE FLOOR

        case 'UPDATE_FLOOR':
            return { ...state, updateFloorSuccessStatusCode: action.payload.statusCode }

        case 'CLEAR_UPDATE_FLOOR_STATUS_CODE':
            return { ...state, updateFloorSuccessStatusCode: 0 }

        case 'UPDATE_FLOOR_ERROR':
            return { ...state, alreadyfloorNameHere: action.payload }
        case 'CLEAR_UPDATE_FLOOR_ERROR':
            return { ...state, alreadyfloorNameHere: '' }



        // EB

        case "EDIT_ELECTRICITY":
            return {
                ...state,
                editElectricity: action.payload.response,
                statusCodeForEditElectricity: action.payload.statusCode,
            };
        case "CLEAR_EDIT_ELECTRICITY":
            return { ...state, statusCodeForEditElectricity: 0 };



        case 'ERROR_EDIT_ELECTRICITY':
            return { ...state, ebEditError: action.payload }

        case 'CLEAR_ERROR_EDIT_ELECTRICITY':
            return { ...state, ebEditError: '' }

        case "DELETE_ELECTRICITY":
            return {
                ...state,
                deleteElectricity: action.payload.response,
                statusCodeForDeleteElectricity: action.payload.statusCode,
            };
        case "CLEAR_DELETE_ELECTRICITY":
            return { ...state, statusCodeForDeleteElectricity: 0 };


        case "DASHBOARD_FILTER_DETAILS":
            return {
                ...state,
                dashboardFilter: action.payload,
                statusCodeForDashboardFilter: action.payload.statusCode,
            };
        case "CLEAR_DASHBOARD_FILTER_DETAILS":
            return { ...state, statusCodeForDashboardFilter: 0 };


        case "DASHBOARD_FILTER_CASHBACK":
            return {
                ...state,
                dashboardFilterCashback: action.payload,
                statusCodeForDashboardFilterCashBack: action.payload.statusCode,
            };
        case "CLEAR_DASHBOARD_FILTER_DETAILS_CASHBACK":
            return { ...state, statusCodeForDashboardFilterCashBack: 0 };

        case "DASHBOARD_FILTER_REVENUE":
            return {
                ...state,
                dashboardFilterRevenu: action.payload,
                statusCodeForDashboardFilterRevenue: action.payload.statusCode,
            };
        case "CLEAR_DASHBOARD_FILTER_REVENUE":
            return { ...state, statusCodeForDashboardFilterRevenue: 0 };
        case "CLEAR_DASHBOARD":
            return { ...state, dashboardFilterCashback: [], dashboardFilter: [], dashboardFilterRevenu: [], dashboardDetails: [] };


        // HostelBased
        case "ADD_HOSTEL_BASED":
            return {
                ...state,
                addHostelBasedReading: action.payload,
                statusCodeForAddHostelBased: action.payload.statusCode,
            };
        case "CLEAR_ADD_HOSTEL_BASED":
            return { ...state, statusCodeForAddHostelBased: 0 };



        case "EDIT_HOSTEL_BASED":
            return {
                ...state,
                editHostelBasedReading: action.payload,
                statusCodeForEditHostelBased: action.payload.statusCode,
            };
        case "CLEAR_EDIT_HOSTEL_BASED":
            return { ...state, statusCodeForEditHostelBased: 0 };



        case "DELETE_HOSTEL_BASED":
            return {
                ...state,
                deleteHostelBasedReading: action.payload,
                statusCodeForDeleteHostelBased: action.payload.statusCode,
            };
        case "CLEAR_DELETE_HOSTEL_BASED":
            return { ...state, statusCodeForDeleteHostelBased: 0 };


        case "EB_CUSTOMER_HOSTEL_EBLIST":
            return {
                ...state,
                getHostelBasedRead: action.payload,
                getStatusCodeForHostelBased: action.payload.statusCode,
            };
        case "CLEAR_EB_CUSTOMER_HOSTEL_EBLIST":
            return { ...state, getStatusCodeForHostelBased: 0 };

        // ///////////////////////////////////////////////

        case 'SAME_DATE_ALREADY':
            return { ...state, dateAlready: action.payload.response }

        case 'CLEAR_SAME_DATE_ALREADY':
            return { ...state, dateAlready: '' }



        case 'EDIT_SAME_DATE_ALREADY':
            return { ...state, editDateAlready: action.payload.response }

        case 'CLEAR_EDIT_SAME_DATE_ALREADY':
            return { ...state, editDateAlready: '' }




        case "ANNOUNCEMENT_LIST":
            return {
                ...state,
                announcementList: action.payload.response,
                statuscodeForAnnounceMentList: action.payload.statusCode,
            };
        case "CLEAR_ANNOUNCEMENT_LIST":
            return { ...state, statuscodeForAnnounceMentList: 0 };





        case "ADD_ANNOUNCEMENT":
            return {
                ...state,
                addAnnounceMent: action.payload.response,
                statuscodeForAddAnnouncement: action.payload.statusCode,
            };
        case "CLEAR_ADD_ANNOUNCEMENT":
            return { ...state, statuscodeForAddAnnouncement: 0 };




        case 'SAME_TITLE':

            return { ...state, TitleAlready: action.payload.response }

        case 'CLEAR_SAME_TITLE':
            return { ...state, TitleAlready: '' }


        case 'TITTLE_UNIQUE':
            return { ...state, TittleUnique: action.payload.response }

        case 'CLEAR_TITTLE_UNIQUE':
            return { ...state, TittleUnique: '' }

        //         case 'ROOM_COUNT':
        //             if (state.roomCount.length > 0) {
        //                 if (action.payload.response.length > 0) {
        //                     let floor = action.payload.response[0].Floor_Id
        //                     let index = state.roomCount.findIndex((item) => {
        //                         return item[0]?.Floor_Id === floor
        //                     })
        //                     if (index < 0) {
        //                         const temp = state.roomCount
        //                         temp.push(action.payload.response)
        //                         return { ...state, roomCount: temp,  roomCountStatusCode:action.payload.statusCode }
        //                     }
        //                     else {
        //                         state.roomCount[index] = action.payload.response
        //                         return { ...state , roomCountStatusCode:action.payload.statusCode}
        //                     }


        //                 }
        //                 else {
        //                     return state
        //                 }
        //             }
        //             else {
        //                 const temp = state.roomCount
        //                 temp.push(action.payload.response)
        //                 return { ...state, roomCount: temp, errMessage: '' , roomCountStatusCode:action.payload.statusCode}
        //             }

    }
    return state;
}
export default PgListReducer;