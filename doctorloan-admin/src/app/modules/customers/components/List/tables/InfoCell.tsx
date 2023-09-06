/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

import {CustomerIndex} from '@/types/Customers/customer.mode'

type Props = {
  data: CustomerIndex
}

const CustomerInfoCell: FC<Props> = ({data}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {data.fullName}
      </a>
      <span>{data.email}</span>
    </div>
  </div>
)

export {CustomerInfoCell}
