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
    createRoomMessage: '',
    errMessage: "",
    roomCount: [],
    roomCreationSuccess: false,
}
const PgListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PG_LIST':
            console.log("createPG", action);
            return { message: action.payload.message, roomCount: action.roomCount }
        // return {...state ,Name:action.payload.name,phoneNumber:action.payload.phoneNo,email_Id:action.payload.email_Id,location:action.payload.location,number_Of_Floor:action.payload.number_of_floors,room_Id:action.payload.room,number_Of_Bed:action.payload.bed}
        case 'CREATE_ROOM':
            return { ...state,
                //  createRoomMessage: action.payload.message,
                  roomCreationSuccess: true }
        //  return { ...state, floor_Id: action.payload.floorId, room_Id: action.payload.roomId, number_Of_Bed: action.payload.number_of_beds,createRoomMessage: state.createRoomMessage !== '' ? '' : action.payload.message }
        case 'CHECK_ROOM':
            return { ...state, checkRoomList: action.payload }
        case 'ERROR':
            if(state.roomCount.length>0){
                let index = state.roomCount.findIndex((item) => {
                    return item[0]?.Floor_Id === action.payload.floor_Id
                })
                console.log("index",index);
                state.roomCount[index] = []
            }
            return { ...state, errMessage: action.payload.response}
        case 'UPDATE_MESSAGE_AFTER_CREATION':
            return { ...state, createRoomMessage: action.message }
        case 'ROOM_COUNT':
            console.log("stateForROOM_COUNT",action.payload);
         
            if (state.roomCount.length > 0) {
                if (action.payload.length > 0) {
                    let floor = action.payload[0].Floor_Id
                    let index = state.roomCount.findIndex((item) => {
                        return item[0]?.Floor_Id === floor
                    })
                    if (index < 0) {
                        const temp = state.roomCount
                        temp.push(action.payload)
                        return { ...state, roomCount: temp }
                    }
                    else {
                        state.roomCount[index] = action.payload
                        return state
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
                return { ...state, roomCount: temp }
            }
       






    }
    return state;
}
export default PgListReducer;