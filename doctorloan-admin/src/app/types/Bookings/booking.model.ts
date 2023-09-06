import {ID, Response} from 'src/_doctor/helpers'

export type BookingIndex = {
  id?: ID
  fullName?: string
  phone?: string
  type?: string
  address?: string
  bookingTimes?: number
  bookingDate?: string
  bookingStartTime?: string
  bookingEndTime?: string
  status?: string
  noted?: string
}

export type BookingIndexQueryResponse = Response<Array<BookingIndex>>

export interface BookingForm extends BookingIndex {}
