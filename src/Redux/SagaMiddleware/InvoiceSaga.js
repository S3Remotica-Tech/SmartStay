import { takeEvery, call, put } from "redux-saga/effects";
import {invoicelist, invoiceList,addInvoice ,InvoiceSettings,InvoicePDf} from "../Action/InvoiceAction"


 function* handleinvoicelist (){
    const response = yield call (invoicelist);
    if (response.status === 200){
       yield put ({type : 'INVOICE-ITEM' , payload:response.data})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
}


function* handleInvoiceList() {
   const response = yield call(invoiceList)
   if (response.status === 200) {
      yield put({ type: 'INVOICE_LIST', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleAddInvoiceDetails (param){
   const response = yield call (addInvoice,param.payload)
   if (response.status === 200) {
      yield put({ type: 'ADDINVOICE_DETAILS', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleInvoiveSettings(param){
   const response = yield call (InvoiceSettings,param.payload)
   if (response.status === 200) {
      yield put({ type: 'INVOICE_SETTINGS', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}


function* handleInvoicePdf() {
   const response = yield call(InvoicePDf)
   if (response.status === 200) {
      yield put({ type: 'INVOICE_PDF', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}



function* InvoiceSaga() {
    yield takeEvery('INVOICEITEM', handleinvoicelist)
    yield takeEvery('INVOICELIST', handleInvoiceList)
    yield takeEvery('ADDINVOICEDETAILS',handleAddInvoiceDetails)
    yield takeEvery('INVOICESETTINGS',handleInvoiveSettings)
    yield takeEvery('INVOICEPDF',handleInvoicePdf)

}
export default InvoiceSaga;