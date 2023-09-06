import {toAbsoluteUrl} from 'src/_doctor/helpers'
import OrderProduct from './OrderProduct'
import {OrderForm} from '@/types/Orders/order.model'
import {formatDateSever} from 'src/app/utils/commons/date'
import TextFieldFormHook from 'src/app/components/Forms/Input'
import {Control} from 'react-hook-form'
import {OrderPaymentMethod} from 'src/app/utils/enums/status.eneum'

type Props = {
  order: OrderForm
  control: Control<OrderForm, any>
}

const Information = ({order, control}: Props) => {
  return (
    <div className='d-flex flex-column gap-7 gap-lg-10'>
      <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
        <div className='card card-flush py-4 flex-row-fluid'>
          <div className='card-header'>
            <div className='card-title'>
              <h2>Chi tiết đơn hàng (#{order.orderNo})</h2>
            </div>
          </div>
          <div className='card-body pt-0'>
            <div className='table-responsive'>
              <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                <tbody className='fw-semibold text-gray-600'>
                  <tr key='order-created'>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <span className='svg-icon svg-icon-2 me-2'>
                          <i className='bi bi-calendar fs-4 mr-2'></i>
                        </span>
                        Ngày tạo
                      </div>
                    </td>
                    <td className='fw-bold text-end'>{formatDateSever(order.created, true)}</td>
                  </tr>
                  <tr key='order-method'>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <span className='svg-icon svg-icon-2 me-2'>
                          <i className='bi bi-credit-card-fill fs-4 mr-2'></i>
                        </span>
                        Phương thức thanh toán
                      </div>
                    </td>
                    <td className='fw-bold text-end'>
                      {order.paymentMethod
                        ? OrderPaymentMethod[order.paymentMethod].replaceAll('_', ' ')
                        : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='card card-flush py-4 flex-row-fluid'>
          {/* begin::Card header*/}
          <div className='card-header'>
            <div className='card-title'>
              <h2>Thông tin khách hàng</h2>
            </div>
          </div>
          {/* end::Card header*/}
          {/* begin::Card body*/}
          <div className='card-body pt-0'>
            <div className='table-responsive'>
              {/* begin::Table*/}
              <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                {/* begin::Table body*/}
                <tbody className='fw-semibold text-gray-600'>
                  {/* begin::Customer name*/}
                  <tr key='customer-name'>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        {/* begin::Svg Icon | path: icons/duotune/communication/com006.svg*/}
                        <span className='svg-icon svg-icon-2 me-2'>
                          <i className='bi bi-person-circle fs-4 mr-2'></i>
                        </span>
                        Tên
                      </div>
                    </td>
                    <td className='fw-bold text-end'>
                      <div className='d-flex align-items-center justify-content-end'>
                        {order.customer?.fullName}
                      </div>
                    </td>
                  </tr>
                  <tr key='customer-email'>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <span className='svg-icon svg-icon-2 me-2'>
                          <i className='bi bi-envelope fs-4 mr-2'></i>
                        </span>
                        Email
                      </div>
                    </td>
                    <td className='fw-bold text-end'>{order.customer?.email}</td>
                  </tr>
                  <tr key='customer-phone'>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <span className='svg-icon svg-icon-2 me-2'>
                          <i className='bi bi-telephone fs-4 mr-2'></i>
                        </span>
                        Số điện thoại
                      </div>
                    </td>
                    <td className='fw-bold text-end'>{order.customer?.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='tab-content'>
        <div className='tab-pane fade show active' id='kt_ecommerce_sales_order_summary'>
          <div className='d-flex flex-column gap-7 gap-lg-10'>
            <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
              <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
                <div className='position-absolute top-0 end-0 opacity-10 pe-none text-end'>
                  <img
                    src={toAbsoluteUrl('/media/icons/duotune/ecommerce/ecm006.svg')}
                    className='w-175px'
                    alt=''
                  />
                </div>

                <div className='card-header'>
                  <div className='card-title'>
                    <h2>Địa chỉ nhận hàng</h2>
                  </div>
                </div>

                <div className='card-body pt-0'>
                  {order.fullName}
                  <br />
                  {order.phone}
                  <br />
                  {order.addressLine}
                </div>
              </div>

              <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
                <div className='position-absolute top-0 end-0 opacity-10 pe-none text-end'>
                  <img
                    src={toAbsoluteUrl('/media/icons/duotune/general/gen005.svg')}
                    className='w-175px'
                    alt=''
                  />
                </div>

                <div className='card-header'>
                  <div className='card-title'>
                    <h2>Ghi chú</h2>
                  </div>
                </div>

                <div className='card-body pt-0'>
                  <TextFieldFormHook
                    control={control}
                    type='textarea'
                    id='remarks'
                    name='remarks'
                    placeholder='VD: Hàng tặng gói riêng'
                  />
                </div>
              </div>
            </div>
            <OrderProduct order={order} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
