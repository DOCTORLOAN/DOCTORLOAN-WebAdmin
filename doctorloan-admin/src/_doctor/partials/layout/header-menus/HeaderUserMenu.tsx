/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useAuth } from '../../../../app/modules/auth'
import { toAbsoluteUrl } from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.fullName}
              {currentUser?.roleName ? `- ${currentUser?.roleName}` : ''}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item p-1'>
        <a onClick={logout} className='menu-link justify-content-center'>
          <i className="bi bi-box-arrow-left fs-2 me-2"></i> Đăng xuất
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
