import { combineReducers } from "redux";
import SmartStayReducer from '../Reducer/smartStayReducer';
import CreateAccountReducer from "./CreateAccountReducer";
import ForgetReducer from "./ForgetReducer";
import UserListReducer from "./UserListReducer";
import InvoiceReducer from "./InvoiceReducer";
import ComplianceReducer from "./ComplianceReducer";
import PgListReducer from "./PgListReducer";
import AssetReducer from './AssetReducer';
import SettingsReducer from "./SettingsReducer";
import ExpenseReducer from './ExpenseReducer';
import BookingReducer from "./BookingReducer";
import BankingReducer from "./BankingReducer";
import SubscriptionReducer from "./SubscriptionReducer";



const RootReducer = combineReducers({
login:SmartStayReducer,
createAccount :CreateAccountReducer,
NewPass:ForgetReducer,
UsersList:UserListReducer,
InvoiceList:InvoiceReducer,
ComplianceList:ComplianceReducer,
PgList: PgListReducer,
AssetList:AssetReducer,
Settings : SettingsReducer,
ExpenseList:ExpenseReducer,
Booking:BookingReducer,
bankingDetails:BankingReducer,
subscription:SubscriptionReducer,

})
export default RootReducer;