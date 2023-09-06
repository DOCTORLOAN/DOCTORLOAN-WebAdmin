/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'

import {ID} from 'src/_doctor/helpers'

import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {MenuComponent} from 'src/_doctor/assets/ts/components'
import {Pencil} from 'react-bootstrap-icons'

type Props = {
  id: ID
}

const BookingActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEdit = () => {
    setItemIdForUpdate(id)
  }

  return (
    <>
      <button onClick={openEdit} title='Chỉnh sửa' className='btn btn-sm btn-success btn-icon me-1'>
        <Pencil />
      </button>
    </>
  )
}

export {BookingActionsCell}
