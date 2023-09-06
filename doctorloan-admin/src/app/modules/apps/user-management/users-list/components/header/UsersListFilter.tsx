import {useEffect, useState} from 'react'
import moment from 'moment'
import {Option} from '@/types/Commons/option'

import {MenuComponent} from '../../../../../../../_doctor/assets/ts/components'
import {initialQueryState, KTSVG} from '../../../../../../../_doctor/helpers'
import {useQueryRequest} from 'src/app/modules/apps/cores/list-management/QueryRequestProvider'
import {useQueryResponse} from 'src/app/modules/apps/cores/list-management/QueryResponseProvider'

import ButtonFormHook from 'src/app/components/Forms/Button'

type Props = {
  listRole?: Option[]
}

const UsersListFilter = ({listRole}: Props) => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()
  const listTime: Option[] = [
    {
      value: moment().subtract(1, 'days').startOf('day').utc(true).format('x'),
      label: 'Yesterday',
    },
    {
      value: moment().subtract(2, 'days').startOf('day').utc(true).format('x'),
      label: '2 days ago',
    },
    {
      value: moment().subtract(5, 'hours').utc(true).format('x'),
      label: '5 hours ago',
    },
    {
      value: moment().subtract(30, 'minutes').utc(true).format('x'),
      label: '30 minutes ago',
    },
  ]

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    setRole('')
    setLastLogin('')
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {role, last_login: lastLogin},
      ...initialQueryState,
    })
  }

  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        Lọc
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Tùy chọn lọc</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Vai trò:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='role'
              data-hide-search='true'
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value=''></option>
              {listRole &&
                listRole.map((item: Option) => (
                  <option value={item.value?.toString()} key={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Đăng nhập mới nhất:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='two-step'
              data-hide-search='true'
              onChange={(e) => setLastLogin(e.target.value)}
              value={lastLogin}
            >
              <option value=''></option>
              {listTime &&
                listTime.map((item: Option) => (
                  <option value={item.value?.toString()} key={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <ButtonFormHook
              type='button'
              disabled={isLoading}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              onClick={resetData}
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Hủy
            </ButtonFormHook>

            <ButtonFormHook
              type='button'
              disabled={isLoading}
              className='btn btn-primary fw-bold px-6'
              onClick={filterData}
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Tìm kiếm
            </ButtonFormHook>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {UsersListFilter}
