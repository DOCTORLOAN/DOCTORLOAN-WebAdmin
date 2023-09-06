import TextFieldFormHook from 'src/app/components/Forms/Input'
import DateFieldFormHook from 'src/app/components/Forms/Date'
import useLanguage from 'src/app/hooks/Language/useLanguage'

type Props = {
  register: any
  errors: any
  control: any
  setValue?: any
  isDirty?: boolean
  touchedFields?: any
  isValid?: any
  setError?: any
  isUpdate?: boolean
}

const Information = ({errors, control}: Props) => {
  const {
    language: {userPage},
  } = useLanguage()

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Thông tin đặt lịch & tư vấn</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>{userPage.name}</label>

            <div className='col-lg-8 fv-row'>
              <TextFieldFormHook
                control={control}
                id='fullName'
                name='fullName'
                errorMessage={errors.fullName?.message}
                className='mb-3 mb-lg-0'
                disabled={true}
              />
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {userPage.phone}
            </label>

            <div className='col-lg-8 fv-row'>
              <TextFieldFormHook
                control={control}
                id='phone'
                name='phone'
                errorMessage={errors.phone?.message}
                placeholder={userPage.phone}
                disabled={true}
              />
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {userPage.address}
            </label>

            <div className='col-lg-8 fv-row'>
              <TextFieldFormHook
                control={control}
                id='address'
                name='address'
                errorMessage={errors.address?.message}
                placeholder={userPage.address}
                disabled={true}
              />
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>Ngày khám</label>

            <div className='col-lg-2 fv-row'>
              <DateFieldFormHook
                control={control}
                id='bookingStartTime'
                name='bookingStartTime'
                errorMessage={errors.bookingStartTime?.message}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat='h:mm aa'
              />
            </div>

            <div className='col-lg-2 fv-row'>
              <DateFieldFormHook
                control={control}
                id='bookingEndTime'
                name='bookingEndTime'
                errorMessage={errors.bookingStartTime?.message}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat='h:mm aa'
              />
            </div>

            <div className='col-lg-4 fv-row'>
              <DateFieldFormHook
                control={control}
                id='bookingDate'
                name='bookingDate'
                errorMessage={errors.bookingDate?.message}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
