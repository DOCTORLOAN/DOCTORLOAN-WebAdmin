/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

import {UserIndex} from '@/types/Users/user.model'
// import {User} from '../../core/_models'

type Props = {
  user: UserIndex
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {user.fullName}
      </a>
      <span>{user.email}</span>
    </div>
  </div>
)

export {UserInfoCell}
