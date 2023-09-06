import clsx from 'clsx'
import { toAbsoluteUrl } from '../../../helpers'
import { HeaderUserMenu, ThemeModeSwitcher } from '../../../partials'

const itemClass = 'ms-1 ms-lg-3'
const userAvatarClass = 'symbol-35px symbol-md-40px'

const Navbar = () => {
  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='' />
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  )
}

export { Navbar }
