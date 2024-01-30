const initialState = {
    Users: [],
    addUser: [],
    errorMessage: {},
    hostelList: [],
    roomCount: [],
    billPaymentHistory: [],
    number_of_floor: '',
    roomdetails: [],
    message: ''
}

const UserListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: '',
            };
        case 'ROOM_DETAILS':
            return { ...state, roomdetails: action.payload }
        case 'CREATE_FLOOR':
            return { ...state, message: action.payload.message, number_of_floor: action.payload.number_of_floors }
        case 'BILL_PAYMENT_HISTORY':
            return { ...state, billPaymentHistory: action.payload }
        case 'USER_LIST':
            return { ...state, Users: action.payload }
        case 'ADD_USER':
            return { ...state, addUser: action.payload }
        case 'ERROR':
            return { ...state, errorMessage: action.payload }
        case 'HOSTEL_LIST':
            console.log("hostelList...");
            return { ...state, hostelList: action.payload }
        case 'HOSTEL_DETAIL_LIST':
            return { ...state, hosteldetailslist: action.payload }
        // case 'ROOM_COUNT':
        //     // tempArray has one index and array of object
        //     // action.payload has a list of rooms based on the floor_id and hostel_id
        //     // state.roomCount=[]
        //     if (state.roomCount.length > 0) {
        //         if (action.payload.length > 0) {
        //             console.log("action.payload[0]",action.payload[0]);
        //             let floor = action.payload[0].Floor_Id
        //             let index = state.roomCount.findIndex((item) => {
        //                 return item[0]?.Floor_Id === floor
        //             })
        //             // let hostel=action.payload[0].Hostel_Id
        //             // let index = state.roomCount.findIndex((item) => {
        //             //     return item[0]?.Hostel_Id === hostel
        //             // })
        //             if (index < 0) {
        //                 const temp = state.roomCount
        //                 temp.push(action.payload)
        //                 return { ...state, roomCount: temp }
        //             }
        //             else {
        //                 state.roomCount[index] = action.payload

        //                 return state
        //             }


        //         }
        //         else {
        //             return state
        //         }
        //     }
        //     else {
        //         const temp = state.roomCount
        //         temp.push(action.payload)
        //         return { ...state, roomCount: temp }
        //     }
    }
    return state;
}
export default UserListReducer;