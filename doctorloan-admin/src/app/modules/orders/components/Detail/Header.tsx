/* eslint-disable jsx-a11y/anchor-is-valid */
import {OrderForm} from '@/types/Orders/order.model'
import ButtonFormHook from 'src/app/components/Forms/Button'
import {OrderStatusEnum} from 'src/app/utils/enums/status.eneum'

type Props = {
  order: OrderForm
  isLoading: boolean
  idForm?: string
  isValid?: boolean
  setValue?: any
  onSubmit?: () => void
}

const Header = ({order, idForm, isLoading, isValid, setValue, onSubmit}: Props) => {
  const handleSubmitDelivery = () => {
    setValue('status', OrderStatusEnum.Đang_vận_chuyển)
    onSubmit && onSubmit()
  }

  const handleSubmitComplete = () => {
    setValue('status', OrderStatusEnum.Hoàn_thành)
    onSubmit && onSubmit()
  }

  const handleSubmitReturn = () => {
    setValue('status', OrderStatusEnum.Hoàn_hàng)
    onSubmit && onSubmit()
  }

  const handleSubmitCancel = () => {
    setValue('status', OrderStatusEnum.Hủy)
    onSubmit && onSubmit()
  }

  return (
    <div className='mb-5 mb-xl-10'>
      <div className='p-0'>
        <div className='d-flex justify-content-between align-items-center'>
          <div style={{paddingLeft: '1rem'}}></div>

          <div className='mb-2'>
            <div className='my-4'>
              {(order.status as number) < OrderStatusEnum.Hủy && (
                <ButtonFormHook
                  type='button'
                  id={'btn-draft-' + idForm}
                  label='Hủy'
                  className='btn-sm btn-danger me-2'
                  onClick={handleSubmitCancel}
                />
              )}

              {order.status === OrderStatusEnum.Mới && (
                <ButtonFormHook
                  type='button'
                  id={'btn-publish-' + idForm}
                  label='Giao Hàng'
                  className='btn-sm btn-primary me-3'
                  onClick={handleSubmitDelivery}
                />
              )}

              {order.status === OrderStatusEnum.Đang_vận_chuyển && (
                <ButtonFormHook
                  type='button'
                  id={'btn-publish-' + idForm}
                  label='Hoàn Thành'
                  className='btn-sm btn-success me-3'
                  onClick={handleSubmitComplete}
                />
              )}

              {order.status === OrderStatusEnum.Hoàn_thành && (
                <ButtonFormHook
                  type='button'
                  id={'btn-publish-' + idForm}
                  label='Trả hàng'
                  className='btn-sm btn-warning me-3'
                  onClick={handleSubmitReturn}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
