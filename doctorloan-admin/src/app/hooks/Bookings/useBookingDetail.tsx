import {useState} from 'react'
import {useMutation} from 'react-query'
import {useNavigate} from 'react-router-dom'

import useLanguage from '../Language/useLanguage'
import {TabModel} from '@/types/Commons/tab.model'
import {alertMessage} from 'src/app/utils/commons/alert'
import {AlertType} from 'src/app/utils/enums/base'
import {PathURL} from 'src/app/utils/constants/path'
import {BookingForm} from '@/types/Bookings/booking.model'
import bookingService from 'src/app/apis/Bookings/booking.api'

function useBookingDetail(id?: number) {
  const navigate = useNavigate()
  const [errorValidation, setErrorValidation] = useState(null)

  const {
    language: {userPage},
  } = useLanguage()

  //#region function
  const getUrl = (tab: string) => {
    return id && Number(id) > 0 ? `/booking/${id}/${tab}` : `/customers`
  }
  //#endregion

  //#region mock data

  const listTab: TabModel[] = [
    {
      label: userPage.tab_infor,
      url: getUrl('information'),
      prefix: 'information',
    },
  ]

  //#endregion

  const mutationUpdateData = useMutation((param: BookingForm) => bookingService.update(param), {
    onSuccess: async (response: any) => {
      if (response && response.errors) {
        const {errors} = response
        setErrorValidation(errors)
        return
      }

      if (response && response.error) {
        const {error} = response
        alertMessage(error.message, AlertType.Error)
        return
      }

      alertMessage('Successfully', AlertType.Success, function () {
        navigate(PathURL.customers.index)
      })
    },
    onError: (error: any) => {
      alertMessage(error.response, AlertType.Error)
    },
  })

  return {
    errorValidation,
    listTab,
    mutationUpdateData,
  }
}

export default useBookingDetail
