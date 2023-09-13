import {useQuery} from 'react-query'
import {isNotEmpty, QUERIES} from '../../../../../../_doctor/helpers'
import {EditModalForm} from './EditForm'
import bookingService from 'src/app/apis/Bookings/booking.api'
import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {BookingForm} from '@/types/Bookings/booking.model'

const BookingEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery(
    `${QUERIES.BOOKING_LIST}-user-${itemIdForUpdate}`,
    () => {
      return bookingService.byId(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <EditModalForm isBookingLoading={isLoading} booking={{id: undefined}} />
  }

  if (!isLoading && !error && booking) {
    return <EditModalForm isBookingLoading={isLoading} booking={booking?.data as BookingForm} />
  }

  return null
}

export {BookingEditModalFormWrapper}
