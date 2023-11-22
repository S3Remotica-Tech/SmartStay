import { combineReducers } from "redux";
import SmartStayReducer from '../Reducer/smartStayReducer';
import CreateAccountReducer from "./CreateAccountReducer";
import ForgetReducer from "./ForgetReducer";
import UserListReducer from "./UserListReducer";
import InvoiceReducer from "./InvoiceReducer";
import ComplianceReducer from "./ComplianceReducer";


const RootReducer = combineReducers({
login:SmartStayReducer,
createAccount :CreateAccountReducer,
NewPass:ForgetReducer,
UsersList:UserListReducer,
InvoiceList:InvoiceReducer,
ComplianceList:ComplianceReducer


})
export default RootReducer;