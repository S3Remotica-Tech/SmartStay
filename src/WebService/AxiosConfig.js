import axios from 'axios'

const AxiosConfig = axios.create({
    baseURL: "http://localhost:2000",
headers: {
    'Access-Control-Allow-Origin' : '*'
}

})
export default AxiosConfig;