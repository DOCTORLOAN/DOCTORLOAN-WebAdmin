import api from 'src/app/_config/api'
import {APIURL} from 'src/app/utils/constants/api-path'
import {ID, Response} from 'src/_doctor/helpers'
import axios from 'axios'
import {
  CustomerAddressIndexQueryResponse,
  CustomerForm,
  CustomerIndexQueryResponse,
} from '@/types/Customers/customer.mode'

const customerService = {
  async list(query: string): Promise<CustomerIndexQueryResponse> {
    const res = await api.get(`${APIURL.CUSTOMER.FILTER}?${query}`)
    return res.data
  },

  async listAddress(id: number): Promise<CustomerAddressIndexQueryResponse> {
    const res = await api.get(`${APIURL.CUSTOMER.LIST_ADDRESS}?CustomerId=${id}`)
    return res.data
  },

  async create(param: CustomerForm): Promise<Response<number>> {
    try {
      const res = await api.post(APIURL.CUSTOMER.CREATE, param)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async update(param: CustomerForm): Promise<Response<number>> {
    try {
      const res = await api.put(APIURL.CUSTOMER.UPDATE, param)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async byId(id: ID): Promise<Response<CustomerForm>> {
    try {
      const res = await api.get(`${APIURL.CUSTOMER.DEFAULT}/${id}`)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async delete(id: ID): Promise<void> {
    try {
      const res = await api.delete(`${APIURL.CUSTOMER.DEFAULT}/${id}`)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async deleteSelected(ids: Array<ID>): Promise<void> {
    const requests = ids.map((id) => axios.delete(`${APIURL.CUSTOMER.DEFAULT}/${id}`))
    return axios.all(requests).then(() => {})
  },
}

export default customerService
