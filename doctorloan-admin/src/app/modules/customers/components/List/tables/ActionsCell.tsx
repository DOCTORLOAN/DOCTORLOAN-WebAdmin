/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'

import {ID, QUERIES} from 'src/_doctor/helpers'

import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {useQueryResponse} from 'src/app/modules/apps/cores/list-management/QueryResponseProvider'
import {PathURL} from 'src/app/utils/constants/path'
import {formatString} from 'src/app/utils/commons/string'
import {MenuComponent} from 'src/_doctor/assets/ts/components'
import customerService from 'src/app/apis/Customers/customer.api'
import {Pencil, Trash} from 'react-bootstrap-icons'

type Props = {
  id: ID
}

const CustomerActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEdit = () => {
    setItemIdForUpdate(id)
    if (id) {
      console.log(formatString(PathURL.customers.edit, id.toString()))
      navigate(formatString(PathURL.customers.edit, id.toString()))
    }
  }

  const deleteItem = useMutation(() => customerService.delete(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.CUSTOMER_LIST}-${query}`])
    },
  })

  return (
    <>
      <button onClick={openEdit} title='Chỉnh sửa' className='btn btn-sm btn-success btn-icon me-1'>
        <Pencil />
      </button>
      <button
        onClick={async () => await deleteItem.mutateAsync()}
        title='Xóa'
        className='btn btn-sm btn-danger btn-icon me-1'
      >
        <Trash />
      </button>
    </>
  )
}

export {CustomerActionsCell}
