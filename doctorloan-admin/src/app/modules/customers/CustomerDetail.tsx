import {useEffect, useState} from 'react'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import useLanguage from 'src/app/hooks/Language/useLanguage'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'
import {CustomerForm} from '@/types/Customers/customer.mode'
import customerService from 'src/app/apis/Customers/customer.api'
import Header from '../apps/cores/detail/Header'
import Information from './components/Detail/Information'
import useCustomerDetail from 'src/app/hooks/Customers/useCustomerDetail'
import Addresses from './components/Detail/Addresses'

const CustomerDetailPage = () => {
  const {id} = useParams()
  const [formData, setFormData] = useState<CustomerForm>()
  const {
    language: {common},
  } = useLanguage()

  const isUpdate = (): boolean => {
    return (id && Number(id) > 0) || false
  }
  const currentPath = isUpdate() ? `/customer/${id}/information` : 'information'
  const title = 'Khách hàng'
  const breadCrumbs: Array<PageLink> = [
    {
      title: title,
      path: currentPath,
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const {listTab, mutationUpdateData, errorValidation} = useCustomerDetail(Number(id))

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().max(50, common.validation.max),
    firstName: Yup.string().required(common.validation.required),
    lastName: Yup.string().required(common.validation.required),
    email: Yup.string().required(common.validation.required).email(common.validation.invalid),
    gender: Yup.string().required(common.validation.required),
  })

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: {errors, isDirty, touchedFields, isValid},
  } = useForm<CustomerForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const {data: getResponse} = useQuery(QUERIES.CUSTOMER_BY_ID, async () =>
    customerService.byId(Number(id))
  )

  useEffect(() => {
    if (errorValidation) {
      for (const [key, value] of Object.entries(errorValidation)) {
        const errMessage = value as string[]
        setError(
          (key.charAt(0).toLocaleLowerCase() + key.slice(1)) as
            | 'fullName'
            | 'email'
            | 'phone'
            | 'gender'
            | 'dob',
          {
            type: 'custom',
            message: errMessage.join(' '),
          }
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorValidation])

  useEffect(() => {
    if (getResponse) {
      const data = getResponse.data as CustomerForm
      reset(data)
      setFormData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getResponse])

  const onSubmit = async (data: any) => {
    await mutationUpdateData.mutateAsync(data)
  }

  if (isUpdate() && !formData) {
    return <></>
  }

  return (
    <form noValidate className='form' onSubmit={handleSubmit(onSubmit)}>
      <Routes>
        <Route
          element={
            <>
              <Header
                listTab={listTab}
                id={id}
                idForm='gace_customer_submit'
                isLoading={false}
                isValid={isValid}
                setValue={setValue}
                onSubmit={handleSubmit(onSubmit)}
              />
              <Outlet />
            </>
          }
        >
          <Route
            path={'information'}
            element={
              <>
                <PageTitle breadcrumbs={breadCrumbs}>Thông tin</PageTitle>
                <Information
                  data={formData}
                  control={control}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  isDirty={isDirty}
                  touchedFields={touchedFields}
                  isValid={isValid}
                  isUpdate={isUpdate()}
                />
              </>
            }
          />
          <Route
            path={'address'}
            element={
              <>
                <PageTitle breadcrumbs={breadCrumbs}>Địa chỉ</PageTitle>
                <Addresses id={id as unknown as Number} />
              </>
            }
          />
          <Route index element={<Navigate to={`/${id}/information`} />} />
        </Route>
      </Routes>
    </form>
  )
}

export default CustomerDetailPage
