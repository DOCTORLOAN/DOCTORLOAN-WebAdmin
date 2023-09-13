import {PropsWithChildren} from 'react'
import {HeaderProps} from 'react-table'
import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'

type Props<T extends object> = {
  tableProps: PropsWithChildren<HeaderProps<T>>
}

const SelectionHeader = <T extends object>({tableProps}: Props<T>) => {
  const {isAllSelected, onSelectAll} = useListView()
  return (
    <th {...tableProps.column.getHeaderProps()} className='w-10px pe-2'>
      <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
        <input
          className='form-check-input'
          type='checkbox'
          data-kt-check={isAllSelected}
          data-kt-check-target='#kt_table_users .form-check-input'
          checked={isAllSelected}
          onChange={onSelectAll}
        />
      </div>
    </th>
  )
}

export {SelectionHeader}
