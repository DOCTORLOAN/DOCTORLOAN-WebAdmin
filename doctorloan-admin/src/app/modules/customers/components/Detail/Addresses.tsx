import {QUERIES} from 'src/_doctor/helpers'
import {useQuery} from 'react-query'
import customerService from 'src/app/apis/Customers/customer.api'
import {CustomerAddressIndex} from '@/types/Customers/customer.mode'

type Props = {
  id: Number
}

const Addresses = ({id}: Props) => {
  const {data: getResponse} = useQuery(QUERIES.CUSTOMER_LIST_ADDRESS, async () =>
    customerService.listAddress(Number(id))
  )

  return (
    //card-xl-stretch mb-xl-8
    <div className={`card mb-5 mb-xl-10`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Danh sách địa chỉ</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='border-0'>
                    <th className='p-0 min-w-150px'></th>
                    <th></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {getResponse?.data?.items &&
                    getResponse.data.items.map((item: CustomerAddressIndex) => (
                      <tr key={item.id}>
                        <td>
                          <p className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                            {item.fullName}
                          </p>
                          <span className='text-muted fw-semibold d-block'>{item.phone}</span>
                        </td>
                        <td className='text-end text-muted fw-semibold'>{item.address}</td>
                      </tr>
                    ))}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export default Addresses
