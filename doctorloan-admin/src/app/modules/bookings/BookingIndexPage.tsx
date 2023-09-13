import {KTCard} from 'src/_doctor/helpers'
import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'

import {PageLink, PageTitle} from 'src/_doctor/layout/core/PageData'

import {IndexListWrapper} from 'src/app/modules/apps/cores/list-management/IndexListWrapper'
import {PathURL} from 'src/app/utils/constants/path'
import {ListHeader} from './components/List/headers/ListHeader'
import {TableIndex} from './components/List/tables/Table'
import bookingService from 'src/app/apis/Bookings/booking.api'
import {useListView} from '../apps/cores/list-management/ListViewProvider'
import {BookingEditModal} from './components/List/booking-edit-modal/BookingEditModal'

const bookingsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quản lý đặt lịch & tư vấn',
    path: PathURL.bookings.index,
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const BookingIndexPage = () => {
  const fetchData = (query: string) => bookingService.list(query)

  return (
    <>
      <PageTitle breadcrumbs={bookingsBreadcrumbs}>Danh sách đặt lịch khám & tư vấn</PageTitle>
      <IndexListWrapper queryName={`${QUERIES.BOOKING_LIST}`} fetchData={fetchData}>
        <BookingsList />
      </IndexListWrapper>
    </>
  )
}

const BookingsList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ListHeader />
        <TableIndex />
      </KTCard>
      {itemIdForUpdate !== undefined && <BookingEditModal />}
    </>
  )
}

export default BookingIndexPage
