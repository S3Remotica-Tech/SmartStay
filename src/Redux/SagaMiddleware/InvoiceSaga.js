import { takeEvery, call, put } from "redux-saga/effects";
import {invoicelist} from "../Action/InvoiceAction"


 function* handleinvoicelist (){
    const response = yield call (invoicelist);
    console.log("response",response);
    if (response.status === 200){
       yield put ({type : 'INVOICE_LIST' , payload:response.data})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
}

function* InvoiceSaga() {
    yield takeEvery('INVOICE-LIST', handleinvoicelist)
 

}
export default InvoiceSaga;