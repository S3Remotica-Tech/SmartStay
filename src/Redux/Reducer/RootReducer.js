import { combineReducers } from "redux";
import SmartStayReducer from '../Reducer/smartStayReducer';
// import CreateAccountReducer from "./CreateAccountReducer";
import ForgetReducer from "./ForgetReducer";



const RootReducer = combineReducers({
login:SmartStayReducer,
// createAccount :CreateAccountReducer,
NewPass:ForgetReducer

})
export default RootReducer;