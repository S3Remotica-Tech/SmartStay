const initialState = {
    Users: []
    
    }
    
    const UserListReducer = (state = initialState, action) => {
        console.log("action",action);
        switch(action.type) {
            case 'USERS_LIST':
                return {...state, Users: action.payload}
        }
        return state;
    } 
 export default UserListReducer;