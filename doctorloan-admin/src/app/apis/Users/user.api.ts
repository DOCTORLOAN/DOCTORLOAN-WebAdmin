import {UserForm} from '@/types/Users/user-detail.model'
import api from 'src/app/_config/api'
import {APIURL} from 'src/app/utils/constants/api-path'
import {ID, Response} from 'src/_doctor/helpers'
import {UserIndexQueryResponse} from '@/types/Users/user.model'
import axios from 'axios'

const getUsers = async (query: string): Promise<UserIndexQueryResponse> => {
  const res = await api.get(`${APIURL.USER.FILTER}?${query}`)
  return res.data
}

const create = async (params: UserForm) => {
  const res = await api.post(APIURL.USER.CREATE, params)
  return res.data
}

const saveUser = async (param: UserForm): Promise<Response<number>> => {
  try {
    const res = await api.post(APIURL.USER.CREATE, param)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

const updateUser = async (param: UserForm): Promise<Response<number>> => {
  try {
    const res = await api.put(APIURL.USER.UPDATE, param)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

const getUserById = async (id: number): Promise<Response<UserForm>> => {
  try {
    const res = await api.get(`${APIURL.USER.DEFAULT}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

const deleteUser = async (userId: ID): Promise<void> => {
  try {
    const res = await api.delete(`${APIURL.USER.DEFAULT}/${userId}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${APIURL.USER.DEFAULT}/${id}`))
  return axios.all(requests).then(() => {})
}

const forgetPassword = async (email: string): Promise<void> => {
  try {
    const res = await api.patch(APIURL.USER.RESET_PASS, {email: email})
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export {
  saveUser,
  create,
  updateUser,
  getUserById,
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  forgetPassword,
}
