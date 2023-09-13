// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserActionsCell} from './UserActionsCell'
import {UserIndex} from '@/types/Users/user.model'
import {CustomHeader} from 'src/app/modules/apps/cores/list-management/table/columns/CustomHeader'
import {SelectionHeader} from 'src/app/modules/apps/cores/list-management/table/columns/SelectionHeader'
import {SelectionCell} from 'src/app/modules/apps/cores/list-management/table/columns/SelectionCell'
import {StatusCell} from 'src/app/modules/apps/cores/list-management/table/columns/StatusCell'
import {DatetimeCell} from 'src/app/modules/apps/cores/list-management/table/columns/DatetimeCell'

const usersColumns: ReadonlyArray<Column<UserIndex>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Tên' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Vai trò' className='min-w-125px' />,
    accessor: 'roleName',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Đăng nhập mới nhất' className='min-w-125px' />
    ),
    id: 'last_login',
    Cell: ({...props}) => <DatetimeCell datetime={props.data[props.row.index].lastSignIn} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Trạng thái' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => <StatusCell status={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Công cụ' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <UserActionsCell
        id={props.data[props.row.index].id}
        status={props.data[props.row.index].status}
      />
    ),
  },
]

export {usersColumns}
