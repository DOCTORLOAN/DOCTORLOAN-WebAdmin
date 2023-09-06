/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'

import {ID} from 'src/_doctor/helpers'

import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {MenuComponent} from 'src/_doctor/assets/ts/components'
import {useNavigate} from 'react-router-dom'
import {formatString} from 'src/app/utils/commons/string'
import {PathURL} from 'src/app/utils/constants/path'
import {Pencil} from 'react-bootstrap-icons'

type Props = {
  id: ID
}

const OrderActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const navigate = useNavigate()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEdit = () => {
    setItemIdForUpdate(id)
    if (id) {
      navigate(formatString(PathURL.orders.edit, id.toString()))
    }
  }

  return (
    <>
      <button onClick={openEdit} title='Chỉnh sửa' className='btn btn-sm btn-success btn-icon me-1'>
        <Pencil />
      </button>
    </>
  )
}

export {OrderActionsCell}
