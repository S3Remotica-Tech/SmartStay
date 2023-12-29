const initialState = {
    Users: [],
    addUser :[],
    errorMessage :{},
    hostelList:[],
    roomCount:[],
    }
    
    const UserListReducer = (state = initialState, action) => {
        console.log("action",action);
        switch(action.type) {
            case 'USER_LIST':
                return {...state, Users: action.payload}
            case 'ADD_USER':
                return {...state, addUser:action.payload}
            case 'ERROR':
                return {...state, errorMessage:action.payload}
            case 'HOSTEL_LIST':
                return {...state, hostelList:action.payload}
            case 'ROOM_COUNT':
                if (state.roomCount.length > 0) {
                    if(action.payload.length > 0){
                    let tempArray = state.roomCount.filter((item)=>{
                        console.log("item",item);
                        return item[0]?.Floor_Id === action.payload[0].Floor_Id
                    })

                    if(tempArray.length > 0){
                        return {...state}
                    }
                   
                }
            }

                return {...state, roomCount: [...state.roomCount, action.payload]}
              }
        return state;
    } 
 export default UserListReducer;