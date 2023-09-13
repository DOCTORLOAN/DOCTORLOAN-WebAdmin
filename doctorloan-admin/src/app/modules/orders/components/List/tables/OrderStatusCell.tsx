import clsx from 'clsx'
import {FC} from 'react'
import {OrderStatusEnum} from 'src/app/utils/enums/status.eneum'

type Props = {
  status?: OrderStatusEnum
}

const OrderStatusCell: FC<Props> = ({status}) => {
  let className = 'badge-light-success'
  if (status === OrderStatusEnum.Mới || status === OrderStatusEnum.Đang_vận_chuyển)
    className = 'badge-light-info'
  if (status === OrderStatusEnum.Xác_thực) className = 'badge-light-primary'
  if (status === OrderStatusEnum.Hoàn_hàng) className = 'badge-light-warning'
  if (status === OrderStatusEnum.Hủy) className = 'badge-light-danger'
  if (status === OrderStatusEnum.Hoàn_thành || status === OrderStatusEnum.Hoàn_hàng_thành_công)
    className = 'badge-light-success'
  return (
    <>
      {status && (
        <div className={clsx('badge fw-bolder p-2', className)}>
          {OrderStatusEnum[status].replaceAll('_', ' ')}
        </div>
      )}
    </>
  )
}

export {OrderStatusCell}
