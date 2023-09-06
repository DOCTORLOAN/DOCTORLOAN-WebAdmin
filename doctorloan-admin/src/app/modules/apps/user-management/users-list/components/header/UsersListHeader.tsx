import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {UsersListToolbar} from './UserListToolbar'
import {ListGrouping} from 'src/app/modules/apps/cores/list-management/table/ListGrouping'
import {ListSearchComponent} from 'src/app/modules/apps/cores/list-management/table/headers/UsersListSearchComponent'
import {Option} from '@/types/Commons/option'

type Props = {
  listRole?: Option[]
}

const UsersListHeader = ({listRole}: Props) => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <ListGrouping /> : <UsersListToolbar listRole={listRole} />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {UsersListHeader}
