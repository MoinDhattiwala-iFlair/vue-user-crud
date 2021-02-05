import axios from "axios";

let config = {
    baseURL: "http://localhost/api/v1/",
    timeout: 60 * 1000, // Timeout
    //withCredentials: true, // Check cross-site Access-Control
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('testl8_auth_token') }
};

const _axios = axios.create(config);

//module.exports = axiosInstance;
export default _axios;