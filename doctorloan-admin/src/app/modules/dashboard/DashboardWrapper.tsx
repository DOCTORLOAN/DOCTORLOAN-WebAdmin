/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_doctor/layout/core'
import {toAbsoluteUrl} from 'src/_doctor/helpers'
import {Link} from 'react-router-dom'

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <div
        className='d-flex bgi-size-cover bgi-position-center order-1 order-lg-2 h-100 dashboard-image'
        style={{backgroundImage: `url(${toAbsoluteUrl('/media/misc/auth-bg.png')})`}}
      >
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          {/* begin::Logo */}
          <Link to='/' className='logo-bg-auth'>
            <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo-white.svg')} />
          </Link>
          <img
            className='mx-auto w-275px w-md-50 w-xl-500px'
            src={toAbsoluteUrl('/media/misc/auth-screen.svg')}
            alt=''
          />
          {/* end::Logo */}
        </div>
      </div>
    </>
  )
}

export default DashboardWrapper
