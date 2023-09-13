import TextFieldFormHook from 'src/app/components/Forms/Input'
import SelectFieldFormHook from 'src/app/components/Forms/Select'
import DateFieldFormHook from 'src/app/components/Forms/Date'
import useLanguage from 'src/app/hooks/Language/useLanguage'
import {Option} from '@/types/Commons/option'
import {CustomerForm} from '@/types/Customers/customer.mode'

type Props = {
  data?: CustomerForm
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

const Information = ({
  register,
  errors,
  control,
  isDirty,
  touchedFields,
  setValue,
  data,
}: Props) => {
  const {
    language: {userPage},
  } = useLanguage()

  const mockGender: Option[] = [
    {value: 0, label: userPage.male},
    {value: 1, label: userPage.female},
  ]

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
          <h3 className='fw-bolder m-0'>Thông tin khách hàng</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>{userPage.name}</label>

            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <TextFieldFormHook
                    control={control}
                    id='firstName'
                    name='firstName'
                    errorMessage={errors.firstName?.message}
                    placeholder={userPage.firstName}
                    className='mb-3 mb-lg-0'
                  />
                </div>

                <div className='col-lg-6 fv-row'>
                  <TextFieldFormHook
                    control={control}
                    id='lastName'
                    name='lastName'
                    errorMessage={errors.lastName?.message}
                    placeholder={userPage.lastName}
                    className=''
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {userPage.email}
            </label>

            <div className='col-lg-8 fv-row'>
              <TextFieldFormHook
                control={control}
                id='email'
                name='email'
                errorMessage={errors.email?.message}
                placeholder={userPage.email}
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
              />
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {userPage.gender}
            </label>

            <div className='col-lg-8 fv-row'>
              <SelectFieldFormHook
                control={control}
                register={register}
                id='gender'
                name='gender'
                errorMessage={errors.gender?.message}
                touchedFields={touchedFields}
                isDirty={isDirty}
                placeholder={userPage.gender}
                isLoading={false}
                listOption={mockGender}
              />
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>{userPage.dob}</label>

            <div className='col-lg-8 fv-row'>
              <DateFieldFormHook
                control={control}
                id='dob'
                name='dob'
                errorMessage={errors.dob?.message}
                placeholder={userPage.dob}
                setValue={setValue}
                defaultValue={data?.dob}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
