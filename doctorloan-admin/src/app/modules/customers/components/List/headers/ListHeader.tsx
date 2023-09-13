import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {ListGrouping} from 'src/app/modules/apps/cores/list-management/table/ListGrouping'
import {ListSearchComponent} from 'src/app/modules/apps/cores/list-management/table/headers/UsersListSearchComponent'

const ListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ListSearchComponent />
      <div className='card-toolbar'>{selected.length > 0 && <ListGrouping />}</div>
    </div>
  )
}

export {ListHeader}
