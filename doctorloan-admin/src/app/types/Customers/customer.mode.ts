import {ID, Response} from 'src/_doctor/helpers'

export type CustomerIndex = {
  id?: ID
  fullName?: string
  email?: string
  phone?: string
  gender?: number
  dob?: Date
}

export type CustomerIndexQueryResponse = Response<Array<CustomerIndex>>

export interface CustomerForm extends CustomerIndex {}

export type CustomerAddressIndex = {
  id?: ID
  fullName?: string
  phone?: string
  remarks?: string
  isDefault?: boolean
  address?: string
}

export type CustomerAddressIndexQueryResponse = Response<Array<CustomerAddressIndex>>
