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
    checkEBList:[],
    createEBList:[],
    EB_Customerlist:[],
    EB_startmeterlist:[],
    createRoomMessage: '',
    errMessage: "",
    roomCount: [],
    roomCreationSuccess: false,
    createPGMessage: '',
    bedDetailsForUser: [],
    statusCode: '',
    errorForBed: "",
    errorStatusCode: 0,
    statusCodeCreateRoom:0,
}
const PgListReducer = (state = initialState, action) => {
    console.log("action",action.payload);
    switch (action.type) {
        case 'PG_LIST':
            console.log("createPG", action);
            return { message: action.payload.message, roomCount: action.roomCount }
        // return {...state ,Name:action.payload.name,phoneNumber:action.payload.phoneNo,email_Id:action.payload.email_Id,location:action.payload.location,number_Of_Floor:action.payload.number_of_floors,room_Id:action.payload.room,number_Of_Bed:action.payload.bed}
        case 'AFTER_CREATE_PG_MSG':
            return { ...state, createPGMessage: action.message }
        case 'CREATE_ROOM':
            return {...state, roomCreationSuccess: true, floor_Id: action.payload.floorId, room_Id: action.payload.roomId, number_Of_Bed: action.payload.number_of_beds, statusCodeCreateRoom:action.payload.statusCode}
        case 'CLEAR_CREATE_ROOM_STATUS_CODE':
            return {...state, statusCodeCreateRoom:0}
            //  createRoomMessage: action.payload.message,

        //  return { ...state, floor_Id: action.payload.floorId, room_Id: action.payload.roomId, number_Of_Bed: action.payload.number_of_beds,createRoomMessage: state.createRoomMessage !== '' ? '' : action.payload.message }
        case 'CHECK_ROOM':
            return { ...state, checkRoomList: action.payload }
        case 'CHECK_EB':
            return { ...state, checkEBList: action.payload }
            case 'CREATE_EB':
            return { ...state, createEBList: action.payload }
            case 'EB_LIST':
            return { ...state, EB_Customerlist: action.payload }
            case 'EB_STARTMETER_LIST':
            return { ...state, EB_startmeterlist: action.payload}
        case 'ERROR':
            if (state.roomCount.length > 0) {
                let index = state.roomCount.findIndex((item) => {
                    return item[0]?.Floor_Id === action.payload.floor_Id
                })
                state.roomCount[index] = []
            }
            console.log("statePGReducer", state);
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
        case 'ROOM_COUNT':
            console.log("stateForROOM_COUNT", action.payload);

            if (state.roomCount.length > 0) {
                if (action.payload.length > 0) {
                    let floor = action.payload[0].Floor_Id
                    let index = state.roomCount.findIndex((item) => {
                        return item[0]?.Floor_Id === floor
                    })
                    if (index < 0) {
                        console.log("index < 0", index);
                        const temp = state.roomCount
                        temp.push(action.payload)
                        return { ...state, roomCount: temp }
                    }
                    else {
                        console.log("index > 0", action.payload);
                        state.roomCount[index] = action.payload
                        return { ...state }
                    }


                }
                else {
                    console.log("action.payload.length=0");
                    return state
                }
            }
            else {
                console.log("state.roomCount.length=0");
                const temp = state.roomCount
                temp.push(action.payload)
                console.log("temp", temp);
                return { ...state, roomCount: temp, errMessage: '' }
            }







    }
    return state;
}
export default PgListReducer;