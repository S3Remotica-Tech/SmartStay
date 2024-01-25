import { call, takeEvery, put } from 'redux-saga/effects';
import { CreateAccountAction } from '../Action/smartStayAction';
import Swal from 'sweetalert2';


function* CreateAccountPage(args) {

  
    try {
      const response = yield call(CreateAccountAction, args.payload);
      console.log("response for createAccount Api",response)
      if (response.status === 200) {
        yield put({ type: 'CREATEACCOUNT', payload: response.data });
        Swal.fire({
          icon: 'success',
          text: 'Account Created Successfully!',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
          
                         }
        });
      }else if(response.status === 201){
        Swal.fire({
          icon: 'warning',
          text: response.data.message,
          confirmButtonText: 'Ok'
        })
      }
    } catch (error) {
        console.log("error",error);
    }
  }
  
  
  function* CreateAccountSaga() {
    yield takeEvery('CREATE_ACCOUNT', CreateAccountPage)
  
  }
  export default CreateAccountSaga;