import clsx from 'clsx'
import {FC} from 'react'
import {BookingStatusEnum} from 'src/app/utils/enums/status.eneum'

type Props = {
  status?: BookingStatusEnum
}

const BookingStatusCell: FC<Props> = ({status}) => {
  let className = 'badge-light-success'
  if (status === BookingStatusEnum.Mới) className = 'badge-light-info'
  if (status === BookingStatusEnum.Xác_thực) className = 'badge-light-primary'
  if (status === BookingStatusEnum.Từ_chối) className = 'badge-light-warning'
  if (status === BookingStatusEnum.Đang_khám) className = 'badge-light-success'
  if (status === BookingStatusEnum.Hoàn_thành) className = 'badge-light-danger'
  return (
    <>
      {status && (
        <div className={clsx('badge fw-bolder p-2', className)}>
          {BookingStatusEnum[status].replaceAll('_', ' ')}
        </div>
      )}
    </>
  )
}

export {BookingStatusCell}
