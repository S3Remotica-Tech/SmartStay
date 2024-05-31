// import axios from 'axios'

// const AxiosConfig = axios.create({
//     baseURL: "http://localhost:2001",
// headers: {
//   'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin' : '*'
// }

// })
// export default AxiosConfig;




// // 65.2.178.113 



import axios from 'axios'
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const AxiosConfig = axios.create({
    baseURL: "http://localhost:2001",
headers: {
  'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
}
})


const token = cookies.get('token');

console.log("token Bearer",token)

if (token) {
  AxiosConfig.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default AxiosConfig;
