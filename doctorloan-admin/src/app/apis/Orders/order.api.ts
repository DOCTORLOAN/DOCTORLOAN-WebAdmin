import api from 'src/app/_config/api'
import {APIURL} from 'src/app/utils/constants/api-path'
import {ID, Response} from 'src/_doctor/helpers'
import axios from 'axios'
import {OrderForm, OrderIndexQueryResponse} from '@/types/Orders/order.model'

const orderService = {
  async list(query: string): Promise<OrderIndexQueryResponse> {
    const res = await api.get(`${APIURL.ORDER.FILTER}?${query}`)
    return res.data
  },

  async update(param: OrderForm): Promise<Response<number>> {
    try {
      const res = await api.patch(APIURL.ORDER.UPDATE, param)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async byId(id: ID): Promise<Response<OrderForm>> {
    try {
      const res = await api.get(`${APIURL.ORDER.DEFAULT}/${id}`)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async delete(id: ID): Promise<void> {
    try {
      const res = await api.delete(`${APIURL.ORDER.DEFAULT}/${id}`)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async deleteSelected(ids: Array<ID>): Promise<void> {
    const requests = ids.map((id) => axios.delete(`${APIURL.ORDER.DEFAULT}/${id}`))
    return axios.all(requests).then(() => {})
  },
}

export default orderService
