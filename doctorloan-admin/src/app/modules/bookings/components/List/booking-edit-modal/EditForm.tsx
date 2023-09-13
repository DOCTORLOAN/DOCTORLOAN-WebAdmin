import {FC, useState} from 'react'
import {BookingForm} from '@/types/Bookings/booking.model'

import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {useForm} from 'react-hook-form'
import TextFieldFormHook from 'src/app/components/Forms/Input'
import ListLoading from 'src/app/modules/apps/cores/list-management/table/ListLoading'
import useLanguage from 'src/app/hooks/Language/useLanguage'
import SelectFieldFormHook from 'src/app/components/Forms/Select'
import {BookingStatusEnum} from 'src/app/utils/enums/status.eneum'
import {Option} from 'src/app/types/Commons/option'
import {AlertType} from 'src/app/utils/enums/base'
import {alertMessage} from 'src/app/utils/commons/alert'
import {useMutation} from 'react-query'
import bookingService from 'src/app/apis/Bookings/booking.api'
import {useQueryResponse} from 'src/app/modules/apps/cores/list-management/QueryResponseProvider'

type Props = {
  isBookingLoading: boolean
  booking: BookingForm
}

const EditModalForm: FC<Props> = ({booking, isBookingLoading}) => {
  const {
    language: {userPage},
  } = useLanguage()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [bookingForEdit] = useState<BookingForm>({
    ...booking,
    fullName: booking.fullName,
    phone: booking.phone,
    type: booking.type,
    address: booking.address,
    bookingTimes: booking.bookingTimes,
    bookingDate: booking.bookingDate,
    bookingStartTime: booking.bookingStartTime,
    bookingEndTime: booking.bookingEndTime,
    status: booking.status,
  })

  const cancel = () => {
    setItemIdForUpdate(undefined)
  }

  const {
    control,
    register,
    handleSubmit,
    formState: {isDirty, touchedFields, isSubmitting},
  } = useForm<BookingForm>({
    mode: 'onSubmit',
    defaultValues: bookingForEdit,
  })

  const StringIsNumber = (value: any) => isNaN(Number(value)) === false
  const mockStatus = Object.keys(BookingStatusEnum)
    .filter(StringIsNumber)
    .map(
      (key) =>
        ({
          value: key,
          label: BookingStatusEnum[key as unknown as number].replaceAll('_', ' '),
        } as Option)
    )

  const mutationUpdateStatus = useMutation(
    (param: BookingForm) => bookingService.updateStatus(param),
    {
      onSuccess: async (response: any) => {
        if (response && response.errors) {
          return
        }

        if (response && response.error) {
          const {error} = response
          alertMessage(error.message, AlertType.Error)
          return
        }

        cancel()
        alertMessage('Successfully', AlertType.Success, function () {
          refetch()
        })
      },
      onError: (error: any) => {
        alertMessage(error.response, AlertType.Error)
      },
    }
  )

  const onSubmit = async (data: any) => {
    console.log('submit = ', data)
    await mutationUpdateStatus.mutateAsync(data)
  }

  return (
    <>
      <form
        id='kt_modal_edit_booking_form'
        className='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>{userPage.name}</label>

            <TextFieldFormHook
              control={control}
              id='fullName'
              name='fullName'
              className='mb-3 mb-lg-0'
              disabled={true}
            />
          </div>

          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>{userPage.phone}</label>

            <TextFieldFormHook
              control={control}
              id='phone'
              name='phone'
              className='mb-3 mb-lg-0'
              disabled={true}
            />
          </div>

          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>{userPage.address}</label>
            <TextFieldFormHook
              control={control}
              id='address'
              name='address'
              className='mb-3 mb-lg-0'
              disabled={true}
            />
          </div>

          {bookingForEdit.bookingDate && (
            <div className='fv-row mb-7'>
              <label className='fw-bold fs-6 mb-2'>Ngày đặt</label>
              <TextFieldFormHook
                control={control}
                id='bookingDate'
                name='bookingDate'
                className='mb-3 mb-lg-0'
                disabled={true}
              />
            </div>
          )}

          {bookingForEdit.bookingStartTime && (
            <div className='fv-row mb-7'>
              <label className='fw-bold fs-6 mb-2'>Giờ đặt</label>

              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <TextFieldFormHook
                    control={control}
                    id='bookingStartTime'
                    name='bookingStartTime'
                    className='mb-3 mb-lg-0'
                    disabled={true}
                  />
                </div>

                <div className='col-lg-6 fv-row'>
                  <TextFieldFormHook
                    control={control}
                    id='bookingEndTime'
                    name='bookingEndTime'
                    className='mb-3 mb-lg-0'
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          )}

          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>Trạng thái</label>
            <SelectFieldFormHook
              control={control}
              register={register}
              id='status'
              name='status'
              touchedFields={touchedFields}
              isDirty={isDirty}
              placeholder='Trạng thái'
              isLoading={false}
              listOption={mockStatus}
            />
          </div>

          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>Ghi chú</label>
            <TextFieldFormHook
              control={control}
              type='textarea'
              id='noted'
              name='noted'
              placeholder='VD: Đã liên hệ khách hàng'
            />
          </div>
        </div>

        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={isSubmitting || isBookingLoading}
          >
            Hủy
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isBookingLoading || isSubmitting}
          >
            <span className='indicator-label'>Lưu</span>
            {(isBookingLoading || isSubmitting) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(isBookingLoading || isSubmitting) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
