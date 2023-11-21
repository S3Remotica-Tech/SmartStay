import { combineReducers } from "redux";
import SmartStayReducer from '../Reducer/smartStayReducer';
import CreateAccountReducer from "./CreateAccountReducer";



const RootReducer = combineReducers({
login:SmartStayReducer,
createAccount :CreateAccountReducer,

})
export default RootReducer;