const initialState = {
    Users: [],
    addUser :[],
    errorMessage :{},
    hostelList:[]
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
        }
        return state;
    } 
 export default UserListReducer;