import { call, takeEvery, put } from 'redux-saga/effects';
import { CreateAccountAction ,TwoStepVerification} from '../Action/smartStayAction';
import Swal from 'sweetalert2';


function* CreateAccountPage(args) {

  
    try {
      const response = yield call(CreateAccountAction, args.payload);
      console.log(" args.payload", args.payload)
      console.log("response for createAccount Api",response)
      if (response.status === 200) {
        yield put({ type: 'CREATEACCOUNT',
         payload: {
          data: response.data,
          status: response.status, 
        },});
        Swal.fire({
          icon: 'success',
          text: response.data.message,
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
                                   }
        });
      }else if(response.status === 201){
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          html: `<span style="color: red">${args.payload.emailId}</span> This  ${response.data.message}`,
          confirmButtonText: 'Ok'
        });
        
      }else if (response.status === 202){
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          html: `<span style="color: red">${args.payload.mobileNo} </span> This  ${response.data.message}`,
          confirmButtonText: 'Ok'
        })
      }else if(response.status === 203){
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          html: `<span style="color: red">${args.payload.mobileNo} & ${args.payload.emailId} </span> This ${response.data.message}`,
          confirmButtonText: 'Ok'
        })
      }
    } catch (error) {
        console.log("error",error);
    }
  }
 
  function* HandleTwoStepVerification(action){
    const response = yield call (TwoStepVerification,action.payload)
    if (response.status === 200) {
       yield put({ type: 'TWO_STEP_VERIFY', payload:{response: response.data ,statusCode:response.status}})
       Swal.fire({
        icon: 'success',
        text:  'Updated successfully',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
                                 }
      });
    }
    else {
       yield put({ type: 'ERROR', payload: response.data.message })
    }
 } 





  function* CreateAccountSaga() {
    yield takeEvery('CREATE_ACCOUNT', CreateAccountPage)
    yield takeEvery('TWOSTEPVERIFY', HandleTwoStepVerification)
  }
  export default CreateAccountSaga;