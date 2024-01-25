const initialState = {
    Name: '',
    phoneNumber: '',
    email_Id: '',
    location: '',
    number_Of_Floor: '',
    room_Id: '',
    number_Of_Bed: '',
    message:'',
    floor_Id: '',
    room_Id: '',
    number_Of_Bed: '',
    checkRoomList: [],
    createRoomMessage:'',
    errMessage : ""
}
const PgListReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'PG_LIST' :
            return {message:action.payload.message}
            // return {...state ,Name:action.payload.name,phoneNumber:action.payload.phoneNo,email_Id:action.payload.email_Id,location:action.payload.location,number_Of_Floor:action.payload.number_of_floors,room_Id:action.payload.room,number_Of_Bed:action.payload.bed}
         case 'CREATE_ROOM':
            return { ...state,createRoomMessage:action.payload.message }            
        //  return { ...state, floor_Id: action.payload.floorId, room_Id: action.payload.roomId, number_Of_Bed: action.payload.number_of_beds,createRoomMessage: state.createRoomMessage !== '' ? '' : action.payload.message }
        case 'CHECK_ROOM' :
            return {...state, checkRoomList:action.payload}
        case 'ERROR':
            return {...state,errMessage:action.payload}
        case 'UPDATE_MESSAGE_AFTER_CREATION':
            return {...state, createRoomMessage: action.message}
    }
    return state;
}
export default PgListReducer;