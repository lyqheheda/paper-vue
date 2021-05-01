// Author: Lin Yunqi
// This code is used to provide response interceptor, to popup a dialog if the username or password
// is wrong when login
import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'


// axios.defaults.baseURL = "http://10.129.158.217:9000"


axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
    let res = response.data;


    if (res.code === 200) {
      return response
    } else {

      Element.Message.error(response.data.message, {duration: 3 * 1000})

      return Promise.reject(response.data.message)
    }
  },
  
)
