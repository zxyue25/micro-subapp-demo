import { axiosInstance, restful } from './axios-ajax'
import { Message } from 'element-ui'
import router from '@/router'
import { isMicro } from '@/constants'

function debounce(func, wait, immediate) {
  let timer

  return function() {
    let context = this
    let args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}

function toastMsg() {
  Object.keys(errorMsgObj).map((item) => {
    Message.error(item)
    delete errorMsgObj[item]
  })
}

let errorMsgObj = {}

axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code == '20001' || data.error === 'NotLogin') {
      // window.location.href = ''
    } else if (data.code == '20002' || data.error === 'NotPermission') {
      if (!isMicro) {
        router.replace({ path: '/401' })
      } else {
        window.eventCenter && window.eventCenter.emit('SYSTEM_USER_INVALID')
      }
    }
    if (data.code == '10000' || data.success) {
      return Promise.resolve(data)
    } else {
      const msg = data.desc || data.message
      if (!errorMsgObj[msg]) {
        errorMsgObj[msg] = msg
      }
      setTimeout(debounce(toastMsg, 1000, true), 1000)
      return Promise.reject(data)
    }
  },
  (error) => {
    console.log(error)
    if (error.response) {
      let { data } = error.response
      const resCode = data.status
      const resMsg = data.message || '服务异常'
      Message({ message: resMsg, type: 'error' })
      const err = { code: resCode, respMsg: resMsg }
      return Promise.reject(err)
    } else {
      const err = { type: 'canceled', respMsg: '数据请求超时' }
      return Promise.reject(err)
    }
  }
)

export default restful
