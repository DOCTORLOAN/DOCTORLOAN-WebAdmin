import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import useLanguage from 'src/app/hooks/Language/useLanguage'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'
import Header from '../apps/cores/detail/Header'
import {BookingForm} from '@/types/Bookings/booking.model'
import bookingService from 'src/app/apis/Bookings/booking.api'
import useBookingDetail from 'src/app/hooks/Bookings/useBookingDetail'
import Information from './components/Details/Information'

const BookingDetailPage = () => {
  const {id} = useParams()
  const [formData, setFormData] = useState<BookingForm>()
  const {
    language: {common},
  } = useLanguage()

  const isUpdate = (): boolean => {
    return (id && Number(id) > 0) || false
  }

  const currentPath = 'information'
  const title = 'Đặt lịch & tư vấn'
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

  const {listTab, mutationUpdateData, errorValidation} = useBookingDetail(Number(id))

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
  } = useForm<BookingForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const {data: getResponse} = useQuery(QUERIES.BOOKING_BY_ID, async () =>
    bookingService.byId(Number(id))
  )

  useEffect(() => {
    if (errorValidation) {
      for (const [key, value] of Object.entries(errorValidation)) {
        const errMessage = value as string[]
        setError(
          (key.charAt(0).toLocaleLowerCase() + key.slice(1)) as
            | 'bookingDate'
            | 'bookingStartTime'
            | 'bookingEndTime'
            | 'status',
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
      const data = getResponse.data as BookingForm
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
      <Header
        listTab={listTab}
        id={id}
        idForm='gace_booking_submit'
        isLoading={false}
        isValid={isValid}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
      />

      <PageTitle breadcrumbs={breadCrumbs}>Thông tin</PageTitle>
      <Information
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
    </form>
  )
}

export default BookingDetailPage
