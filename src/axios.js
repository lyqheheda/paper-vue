import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'


// axios.defaults.baseURL = "http://10.129.158.217:9000"

// 前置拦截，转换get请求的数组形式
axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
    let res = response.data;

    // console.log("=================axios.js")
    // console.log(res)
    // console.log("=================")

    if (res.code === 200) {
      return response
    } else {

      Element.Message.error('错了哦，这是一条错误消息', {duration: 3 * 1000})

      return Promise.reject(response.data.msg)
    }
  },
  error => {
    console.log(error)
    if(error.response.data) {
      error.message = error.response.data.msg
    }

    if(error.response.status === 401) {
      store.commit("REMOVE_INFO")
      router.push("/login")
    }

    Element.Message.error(error.message, {duration: 3 * 1000})
    return Promise.reject(error)
  }
)
