import clsx from 'clsx'
import {FC} from 'react'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'

type Props = {
  status?: StatusEnum
}

const StatusCell: FC<Props> = ({status}) => {
  let className = 'badge-light-success'
  let labelName = ''
  if (status === StatusEnum.Draft) {
    className = 'badge-light-info'
    labelName = 'Chưa kích hoạt'
  }
  if (status === StatusEnum.Publish) {
    className = 'badge-light-success'
    labelName = 'Kích hoạt'
  }
  if (status === StatusEnum.Removed) {
    className = 'badge-light-danger'
    labelName = 'Xóa'
  }
  if (status === StatusEnum.Blocked) {
    className = 'badge-light-warning'
    labelName = 'Khóa'
  }
  return <>{status && <div className={clsx('badge fw-bolder p-2', className)}>{labelName}</div>}</>
}

export {StatusCell}
