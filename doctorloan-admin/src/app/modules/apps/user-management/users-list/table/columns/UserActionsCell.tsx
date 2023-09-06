/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_doctor/assets/ts/components'
import {ID, QUERIES} from '../../../../../../../_doctor/helpers'
import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {useQueryResponse} from 'src/app/modules/apps/cores/list-management/QueryResponseProvider'
import {deleteUser} from 'src/app/apis/Users/user.api'
import {useNavigate} from 'react-router-dom'
import {PathURL} from 'src/app/utils/constants/path'
import {formatString} from 'src/app/utils/commons/string'
import {Pencil, Trash} from 'react-bootstrap-icons'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'

type Props = {
  id: ID
  status?: StatusEnum
}

const UserActionsCell: FC<Props> = ({id, status}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditUser = () => {
    setItemIdForUpdate(id)
    if (id) {
      navigate(formatString(PathURL.users.edit_user, id.toString()))
    }
  }

  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <button
        onClick={openEditUser}
        title='Chỉnh sửa'
        className='btn btn-sm btn-success btn-icon me-1'
      >
        <Pencil />
      </button>
      {status && status !== StatusEnum.Removed && (
        <button
          onClick={async () => await deleteItem.mutateAsync()}
          title='Xóa'
          className='btn btn-sm btn-danger btn-icon me-1'
        >
          <Trash />
        </button>
      )}
    </>
  )
}

export {UserActionsCell}
