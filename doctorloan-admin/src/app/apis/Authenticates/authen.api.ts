import {TSignIn} from '@/types/Authens/authen.model'
import axios from 'axios'
import queryString from 'query-string'
import {APIURL} from '../../utils/constants/api-path'
import api from '../../_config/api'

export async function signup(params: TSignIn) {
  const res = await api.post(APIURL.AUTHEN.SIGNUP, params)
  return res.data
}

export async function signin(param: TSignIn) {
  const defaultParam = {
    userName: param.userName,
    password: param.password,
  }
  const res = await api.post(APIURL.AUTHEN.SIGNIN, defaultParam)
  return res.data
}

export async function refreshToken(refreshToken: string) {
  const formValue = {
    ...{
      grant_type: 'refresh_token',
      response_type: 'id_token',
      client_id: process.env.REACT_APP_B2C_CLIENT_ID,
      resource: process.env.REACT_APP_B2C_CLIENT_ID,
      refresh_token: refreshToken,
    },
  }

  const res = await axios({
    method: 'post',
    url: process.env.REACT_APP_B2C_REFESH_TOKEN_URL,
    data: queryString.stringify(formValue),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  })

  return res.data
}

export const getProfile = async () => {
  const res = await api.get(APIURL.USER.PROFILE)
  return res.data
}
