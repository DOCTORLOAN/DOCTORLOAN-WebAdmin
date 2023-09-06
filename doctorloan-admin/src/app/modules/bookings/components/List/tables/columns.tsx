// @ts-nocheck
import {Column} from 'react-table'
import {BookingActionsCell} from './ActionsCell'
import {CustomHeader} from 'src/app/modules/apps/cores/list-management/table/columns/CustomHeader'
import {DatetimeCell} from 'src/app/modules/apps/cores/list-management/table/columns/DatetimeCell'
import {BookingIndex} from '@/types/Bookings/booking.model'
import {TimeCell} from 'src/app/modules/apps/cores/list-management/table/columns/TimeCell'
import {BookingStatusCell} from './BookingStatusCell'
import {BookingTypeCell} from './BookingTypeCell'

const bookingsColumns: ReadonlyArray<Column<BookingIndex>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Loại' className='min-w-125px' />,
    id: 'type',
    Cell: ({...props}) => <BookingTypeCell type={props.data[props.row.index].type} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Tên' className='min-w-125px' />,
    accessor: 'fullName',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Số điện thoại' className='min-w-125px' />
    ),
    accessor: 'phone',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Giờ' className='min-w-125px' />,
    id: 'time',
    Cell: ({...props}) => (
      <TimeCell
        startTime={props.data[props.row.index].bookingStartTime}
        endTime={props.data[props.row.index].bookingEndTime}
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Ngày khám' className='min-w-125px' />
    ),
    id: 'bookingDate',
    Cell: ({...props}) => (
      <DatetimeCell datetime={props.data[props.row.index].bookingDate} hasTime={false} />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Trạng thái' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => <BookingStatusCell status={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Tools' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <BookingActionsCell id={props.data[props.row.index].id} />,
  },
]

export {bookingsColumns}
