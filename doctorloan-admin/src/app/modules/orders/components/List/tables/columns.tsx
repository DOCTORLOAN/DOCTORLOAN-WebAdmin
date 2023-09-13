// @ts-nocheck
import {Column} from 'react-table'
import {OrderActionsCell} from './ActionsCell'
import {CustomHeader} from 'src/app/modules/apps/cores/list-management/table/columns/CustomHeader'
import {DatetimeCell} from 'src/app/modules/apps/cores/list-management/table/columns/DatetimeCell'
import {OrderStatusCell} from './OrderStatusCell'
import {OrderIndex} from '@/types/Orders/order.model'
import {OrderInfoCell} from './OrderInfoCell'

const ordersColumns: ReadonlyArray<Column<OrderIndex>> = [
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Mã đơn hàng' className='min-w-125px' />
    ),
    accessor: 'orderNo',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Tên' className='min-w-125px' />,
    id: 'fullName',
    Cell: ({...props}) => <OrderInfoCell order={props.data[props.row.index]} />,
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
    Cell: ({...props}) => (
      <DatetimeCell datetime={props.data[props.row.index].created} hasTime={false} />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Trạng thái' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => <OrderStatusCell status={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Tools' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <OrderActionsCell id={props.data[props.row.index].id} />,
  },
]

export {ordersColumns}
