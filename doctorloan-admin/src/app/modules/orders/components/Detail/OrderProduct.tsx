import {OrderForm, OrderItem} from '@/types/Orders/order.model'
import {formatAmount} from 'src/app/utils/commons/amount'

type Props = {
  order: OrderForm
}

const OrderProduct = ({order}: Props) => {
  return (
    <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Order #{order.orderNo}</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        <div className='table-responsive'>
          <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
            <thead>
              <tr key='head' className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                <th className='min-w-175px'>Sản phẩm</th>
                <th className='min-w-100px text-end'>SKU</th>
                <th className='min-w-70px text-end'>Số lượng</th>
                <th className='min-w-100px text-end'>Đơn giá</th>
                <th className='min-w-100px text-end'>Thành tiền</th>
              </tr>
            </thead>
            <tbody className='fw-semibold text-gray-600'>
              {order.orderItems &&
                order.orderItems.map((item: OrderItem) => (
                  <tr key={`${item.id}-${item.name}`}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div>
                          {item.name}
                          {item.optionName && (
                            <div className='fs-7 text-muted'>Phân loại: {item.optionName}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className='text-end'>{item.productSku}</td>
                    <td className='text-end'>{item.quantity}</td>
                    <td className='text-end'>{formatAmount(item.price)}</td>
                    <td className='text-end'>{formatAmount(item.totalPrice)}</td>
                  </tr>
                ))}
              <tr key='subtotal'>
                <td colSpan={4} className='text-end'>
                  Chi phí khác
                </td>
                <td className='text-end'>{formatAmount(order.subTotal)}</td>
              </tr>
              <tr key='grand-total'>
                <td colSpan={4} className='fs-3 text-dark text-end'>
                  Tổng tiền
                </td>
                <td className='text-dark fs-3 fw-bolder text-end'>
                  {formatAmount(order.totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderProduct
