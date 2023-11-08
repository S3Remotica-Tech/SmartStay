import { combineReducers } from "redux";
import SmartStayReducer from '../Reducer/smartStayReducer'



const RootReducer = combineReducers({
login:SmartStayReducer

})
export default RootReducer;