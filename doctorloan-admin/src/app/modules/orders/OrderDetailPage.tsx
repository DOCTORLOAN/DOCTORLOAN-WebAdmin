import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'
import {OrderForm} from '@/types/Orders/order.model'
import useOrderDetail from 'src/app/hooks/Orders/useOrderDetail'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import Information from './components/Detail/Information'
import orderService from 'src/app/apis/Orders/order.api'
import Header from './components/Detail/Header'

const OrderDetailPage = () => {
  const {id} = useParams()
  const [formData, setFormData] = useState<OrderForm>()

  const isUpdate = (): boolean => {
    return (id && Number(id) > 0) || false
  }

  const title = 'Chi tiết đơn hàng'
  const breadCrumbs: Array<PageLink> = [
    {
      title: title,
      path: '#',
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

  const {mutationUpdateData, errorValidation} = useOrderDetail(Number(id))

  const validationSchema = Yup.object()

  const {
    handleSubmit,
    setError,
    reset,
    control,
    setValue,
    formState: {isLoading},
  } = useForm<OrderForm>({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  })

  const {data: getResponse} = useQuery(QUERIES.ORDER_BY_ID, async () =>
    orderService.byId(Number(id))
  )

  useEffect(() => {
    if (errorValidation) {
      for (const [key, value] of Object.entries(errorValidation)) {
        const errMessage = value as string[]
        setError((key.charAt(0).toLocaleLowerCase() + key.slice(1)) as 'remarks', {
          type: 'custom',
          message: errMessage.join(' '),
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorValidation])

  useEffect(() => {
    if (getResponse) {
      const data = getResponse.data as OrderForm
      reset(data)
      setFormData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getResponse])

  const handleOnSubmit = async (data?: any) => {
    await mutationUpdateData.mutateAsync(data)
  }

  if (isUpdate() && !formData) {
    return <></>
  }

  return (
    <form noValidate className='form' onSubmit={handleSubmit(handleOnSubmit)}>
      <PageTitle breadcrumbs={breadCrumbs}>Thông tin</PageTitle>
      <Information order={formData as OrderForm} control={control} />
      <Header
        isLoading={isLoading}
        setValue={setValue}
        order={formData as OrderForm}
        idForm='gace_oder_submit'
        onSubmit={handleSubmit(handleOnSubmit)}
      />
    </form>
  )
}

export default OrderDetailPage
