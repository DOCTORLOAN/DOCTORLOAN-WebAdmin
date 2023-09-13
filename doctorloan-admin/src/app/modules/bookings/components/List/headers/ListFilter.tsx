import {useEffect, useState} from 'react'
import {Option} from '@/types/Commons/option'

import {useQueryRequest} from 'src/app/modules/apps/cores/list-management/QueryRequestProvider'
import {useQueryResponse} from 'src/app/modules/apps/cores/list-management/QueryResponseProvider'
import {MenuComponent} from 'src/_doctor/assets/ts/components'
import {KTSVG, initialQueryState} from 'src/_doctor/helpers'

import ButtonFormHook from 'src/app/components/Forms/Button'
import {BookingTypeEnum} from 'src/app/utils/enums/booking-type.enum'

type Props = {
  listOption?: Option[]
}

const ListFilter = ({listOption}: Props) => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [type, setType] = useState<string | undefined>()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    setType('')
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {type},
      ...initialQueryState,
    })
  }

  const StringIsNumber = (value: any) => isNaN(Number(value)) === false
  const mockType = Object.keys(BookingTypeEnum)
    .filter(StringIsNumber)
    .map(
      (key) =>
        ({
          value: key,
          label: BookingTypeEnum[key as unknown as number].replaceAll('_', ' '),
        } as Option)
    )

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
        Tìm kiếm
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Tùy chọn bộ lọc</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-booking-table-filter='form'>
          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Loại:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='role'
              data-hide-search='true'
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value=''></option>
              {mockType &&
                mockType.map((item: Option) => (
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
              data-kt-booking-table-filter='reset'
            >
              Hủy
            </ButtonFormHook>

            <ButtonFormHook
              type='button'
              disabled={isLoading}
              className='btn btn-primary fw-bold px-6'
              onClick={filterData}
              data-kt-menu-dismiss='true'
              data-kt-booking-table-filter='filter'
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

export {ListFilter}
