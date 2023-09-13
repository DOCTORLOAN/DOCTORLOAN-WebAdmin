import {FC} from 'react'
import {formatDateSever} from 'src/app/utils/commons/date'

type Props = {
  datetime?: string
  hasTime?: boolean
}

const DatetimeCell: FC<Props> = ({datetime, hasTime}) => (
  <div className='badge badge-light fw-bolder'>{formatDateSever(datetime, hasTime ?? true)}</div>
)

export {DatetimeCell}
