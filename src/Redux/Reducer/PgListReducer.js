import { OccupiedCustomer } from "../Action/PgListAction";

const initialState = {
    Name: '',
    phoneNumber: '',
    email_Id: '',
    location: '',
    number_Of_Floor: '',
    room_Id: '',
    number_Of_Bed: '',
    message: '',
    floor_Id: '',
    room_Id: '',
    number_Of_Bed: '',
    checkRoomList: [],
    checkEBList: [],
    createEBList: [],
    EB_Customerlist: [],
    EB_startmeterlist: [],
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
    OccupiedCustomer:[],
    OccupiedCustomerGetStatusCode:0,
    EB_customerTable:[],
    dleteHostelImagesStatusCode:0,

}
const PgListReducer = (state = initialState, action) => {
    console.log("action.payload", action.payload);
    switch (action.type) {
        case 'DELETE_FLOOR':
            return { ...state, deleteFloor: action.payload.message }
        case 'CLEAR_DELETE_FLOOR':
            return { ...state, deleteFloor: action.message }

case 'DELETE_HOSTEL_IMAGES' : 
return { ...state, dleteHostelImagesStatusCode:action.payload.statusCode}

case 'CLEAR_DELETE_HOSTEL_IMAGES':
    return { ...state, dleteHostelImagesStatusCode:0}


case 'OCCUPIED_CUSTOMER':
    return {...state, OccupiedCustomer:action.payload.response , OccupiedCustomerGetStatusCode:action.payload.statusCode}

case 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE':
    return {...state, OccupiedCustomerGetStatusCode: 0}


        case 'DELETE_ROOM':
            return { ...state, deleteRoom: action.payload, statusCodeForDeleteRoom: action.payload.statusCode }
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
            console.log("EB_STARTMETER_LIST", action.payload)
            return { ...state, EB_startmeterlist: action.payload }
            case 'EB_CUSTOMER_EBLIST':
                console.log("EB_CUSTOMER_EBLIST", action.payload)
                return { ...state, EB_customerTable: action.payload }


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
            return { ...state, bedDetailsForUser: action.payload, statusCode: action.payload.statusCode }

        case 'NO_USER_BED':
            return { ...state, errorForBed: action.payload, errorStatusCode: action.payload.statusCode }

        case 'CLEAR_STATUS_CODE':
            return { ...state, errorStatusCode: ' ' }
        case 'CLEAR_STATUS_CODE_BED':
            return { ...state, statusCode: ' ' }
        case 'CREATE_PG_DASHBOARD':
            return { ...state, dashboardDetails: action.payload }
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
            return { ...state, alreadyBedAvailable: '' }

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

// ///////////////////////////////////////////////




        //         case 'ROOM_COUNT':
        // console.log("action.payload.response",action.payload.response)
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