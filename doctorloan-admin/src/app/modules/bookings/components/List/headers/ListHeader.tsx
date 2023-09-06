import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {ListGrouping} from 'src/app/modules/apps/cores/list-management/table/ListGrouping'
import {ListSearchComponent} from 'src/app/modules/apps/cores/list-management/table/headers/UsersListSearchComponent'
import {ListToolbar} from './ListToolbar'

const ListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <ListGrouping /> : <ListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ListHeader}
