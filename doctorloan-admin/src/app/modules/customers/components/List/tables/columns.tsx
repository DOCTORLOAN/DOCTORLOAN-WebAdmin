// @ts-nocheck
import {Column} from 'react-table'
import {CustomerInfoCell} from './InfoCell'
import {CustomerActionsCell} from './ActionsCell'
import {CustomHeader} from 'src/app/modules/apps/cores/list-management/table/columns/CustomHeader'
import {SelectionHeader} from 'src/app/modules/apps/cores/list-management/table/columns/SelectionHeader'
import {SelectionCell} from 'src/app/modules/apps/cores/list-management/table/columns/SelectionCell'
import {DatetimeCell} from 'src/app/modules/apps/cores/list-management/table/columns/DatetimeCell'
import {CustomerIndex} from '@/types/Customers/customer.mode'

const customersColumns: ReadonlyArray<Column<CustomerIndex>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Tên' className='min-w-125px' />,
    id: 'fullName',
    Cell: ({...props}) => <CustomerInfoCell data={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Số điện thoại' className='min-w-125px' />
    ),
    accessor: 'phone',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Ngày tạo' className='min-w-125px' />,
    id: 'created',
    Cell: ({...props}) => <DatetimeCell datetime={props.data[props.row.index].created} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Tools' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CustomerActionsCell id={props.data[props.row.index].id} />,
  },
]

export {customersColumns}
