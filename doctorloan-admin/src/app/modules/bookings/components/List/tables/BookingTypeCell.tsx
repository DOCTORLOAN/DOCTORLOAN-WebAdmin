import clsx from 'clsx'
import {FC} from 'react'
import {BookingTypeEnum} from 'src/app/utils/enums/booking-type.enum'

type Props = {
  type?: BookingTypeEnum
}

const BookingTypeCell: FC<Props> = ({type}) => {
  let className = 'badge-light-success'
  if (type === BookingTypeEnum.Tư_vấn_sản_phẩm) className = 'badge-light-info'
  if (type === BookingTypeEnum.Tư_vấn_sức_khỏe) className = 'badge-light-success'
  if (type === BookingTypeEnum.Đặt_lịch_khám) className = 'badge-light-warning'
  return (
    <>
      {type && (
        <div className={clsx('badge fw-bolder p-2', className)}>
          {BookingTypeEnum[type].replaceAll('_', ' ')}
        </div>
      )}
    </>
  )
}

export {BookingTypeCell}
