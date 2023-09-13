import {ID, Response} from 'src/_doctor/helpers'
import {CustomerIndex} from '../Customers/customer.mode'
import {OrderPaymentMethod, OrderStatusEnum} from 'src/app/utils/enums/status.eneum'

export type OrderIndex = {
  id?: ID
  orderNo?: string
  fullName?: string
  phone?: string
  email?: string
  addressLine?: string
  remarks?: string
  created?: string

  subTotal?: number
  totalPrice?: number
  status?: OrderStatusEnum
  paymentMethod?: OrderPaymentMethod

  orderItems?: OrderItem[]
  customer?: CustomerIndex
}

export type OrderItem = {
  id?: ID
  productItemId?: number
  name?: string
  productSku?: string
  optionName?: string
  price?: number
  quantity?: number
  totalPrice?: number
}

export type OrderIndexQueryResponse = Response<Array<OrderIndex>>

export interface OrderForm extends OrderIndex {}
