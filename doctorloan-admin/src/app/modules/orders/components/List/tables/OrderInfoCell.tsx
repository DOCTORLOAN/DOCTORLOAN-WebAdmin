/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

import {OrderIndex} from '@/types/Orders/order.model'

type Props = {
  order: OrderIndex
}

const OrderInfoCell: FC<Props> = ({order}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {order?.fullName}
      </a>
      <span>{order?.email}</span>
    </div>
  </div>
)

export {OrderInfoCell}
