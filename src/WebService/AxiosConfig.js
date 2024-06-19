import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const AxiosConfig = axios.create({
    baseURL: "http://smartstaydev.s3remotica.com:2001",
headers: {
  'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
}
})
AxiosConfig.interceptors.request.use(
  (config) => {
      const token = cookies.get('token');
      console.log("token Bearer",token)
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);
export default AxiosConfig;




















// import axios from 'axios'

// const AxiosConfig = axios.create({
//     baseURL: "http://localhost:2001",
// headers: {
//   'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin' : '*'
// }

// })



// const token = cookies.get('token');
// if (token) {
//   AxiosConfig.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }
// console.log("token Bearer",token)
// export default AxiosConfig;




// // 65.2.178.113 