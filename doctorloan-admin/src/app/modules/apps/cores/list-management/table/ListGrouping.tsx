import {useQueryClient, useMutation} from 'react-query'

import {useQueryResponse} from 'src/app/modules/apps/cores/list-management/QueryResponseProvider'
import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'
import {deleteSelectedUsers} from 'src/app/apis/Users/user.api'

const ListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const deleteSelectedItems = useMutation(() => deleteSelectedUsers(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      clearSelected()
    },
  })

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        Delete Selected
      </button>
    </div>
  )
}

export {ListGrouping}
