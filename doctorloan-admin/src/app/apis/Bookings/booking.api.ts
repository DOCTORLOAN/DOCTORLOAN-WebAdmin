import api from 'src/app/_config/api'
import {APIURL} from 'src/app/utils/constants/api-path'
import {ID, Response} from 'src/_doctor/helpers'
import axios from 'axios'
import {BookingForm, BookingIndexQueryResponse} from '@/types/Bookings/booking.model'

const bookingService = {
  async list(query: string): Promise<BookingIndexQueryResponse> {
    const res = await api.get(`${APIURL.BOOKING.FILTER}?${query}`)
    return res.data
  },

  async update(param: BookingForm): Promise<Response<number>> {
    try {
      const res = await api.put(APIURL.BOOKING.UPDATE, param)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async updateStatus(param: BookingForm): Promise<Response<number>> {
    try {
      const res = await api.patch(APIURL.BOOKING.UPDATE_STATUS, param)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async byId(id: ID): Promise<Response<BookingForm>> {
    try {
      const res = await api.get(`${APIURL.BOOKING.DEFAULT}/${id}`)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async delete(id: ID): Promise<void> {
    try {
      const res = await api.delete(`${APIURL.BOOKING.DEFAULT}/${id}`)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async deleteSelected(ids: Array<ID>): Promise<void> {
    const requests = ids.map((id) => axios.delete(`${APIURL.BOOKING.DEFAULT}/${id}`))
    return axios.all(requests).then(() => {})
  },
}

export default bookingService
