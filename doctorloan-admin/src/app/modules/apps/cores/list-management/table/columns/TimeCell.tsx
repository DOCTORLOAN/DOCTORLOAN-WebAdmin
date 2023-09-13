import {FC} from 'react'

type Props = {
  startTime?: string
  endTime?: string
}

const TimeCell: FC<Props> = ({startTime, endTime}) => (
  <div className='badge badge-light fw-bolder'>
    {startTime} - {endTime}
  </div>
)

export {TimeCell}
