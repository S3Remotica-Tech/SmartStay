import { takeEvery, call, put } from "redux-saga/effects";
import {forgetpage} from "../Action/ForgetAction";
import Swal from 'sweetalert2'


function* handleforgetpage(rpsd) {
    console.log("rpsd",rpsd);
    try {
       const response = yield call(forgetpage, rpsd.payload)
   
    if(response.status === 200){

        yield put ({type:'NEWPASSWORD_LIST',payload:response.data})
        Swal.fire({
            title: "Good job!",
            text: "NewPassword is Updated",
            icon: "success"
          });
          
    }

    else if  (response.status === 201){
        yield put ({type:'ERROREMAILL',payload:response.data.message})
       
    }
    // else{
       
    //     yield put ({type:'ERROR',payload:response.data.message})
    // }

    }
    catch(error) {
        yield put ({type:'ERROR',payload:'Email Id Is Inorrect'})
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email Id is InCorrect!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
 
    }
   
 }
 
function* ForgetSaga() {
    yield takeEvery('FORGETPAGE', handleforgetpage)
 

}
export default ForgetSaga;