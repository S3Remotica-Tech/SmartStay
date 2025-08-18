import axios from 'axios'
import Cookies from 'universal-cookie';
import ConfigV2 from './ConfigV2';




const cookies = new Cookies();


const AxiosConfigV2 = axios.create({
    baseURL: ConfigV2.apiBaseUrl,
headers: {
  'Content-Type': 'application/json',
   }
})
AxiosConfigV2.interceptors.request.use(
  (config) => {
      const token = cookies.get('v2-token');
     
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
  },
  (error) => {
      return Promise.reject(error);
      
  }
);
export default AxiosConfigV2;





// http://localhost:2001


// http://smartstaydev.s3remotica.com:2001


// http://13.126.102.54:1010


// http://www.s3remotica.com/


// http://smartstaydev.s3remotica.com:2001/




