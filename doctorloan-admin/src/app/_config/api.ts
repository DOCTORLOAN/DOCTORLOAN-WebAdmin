import axios from 'axios'
import * as _ from 'lodash'
import * as authHelper from 'src/app/modules/auth/core/AuthHelpers'
import {TResult} from '@/types/Commons/result'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || '',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  responseType: 'json',
})

axiosInstance.interceptors.request.use(
  function (config: any) {
    const auth = authHelper.getAuth()
    if (auth && auth.api_token) {
      config.headers.common['Authorization'] = `Bearer ${auth.api_token}`
      config.baseURL = process.env.REACT_APP_API_BASE || ''
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    if (err.response && err.response.data) {
      if (!err.response.data.errors) {
        const result: TResult<number> = {
          error: {
            code: err.response.status || 500,
            message: `Error:${err.response.data?.title}`,
          },
          succeeded: false,
        }
        return Promise.resolve({data: result})
      }
    }
    return Promise.reject(err)
  }
)

export const baseUrl: string | undefined = process.env.REACT_APP_API_BASE

export default _.clone(axiosInstance)
