import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'

import {
  useQueryResponseData,
  useQueryResponseLoading,
} from 'src/app/modules/apps/cores/list-management/QueryResponseProvider'
import {KTCardBody} from 'src/_doctor/helpers'
import {CustomHeaderColumn} from 'src/app/modules/apps/cores/list-management/table/columns/CustomHeaderColumn'
import {CustomRow} from 'src/app/modules/apps/cores/list-management/table/columns/CustomRow'
import {ListPagination} from 'src/app/modules/apps/cores/list-management/table/ListPagination'
import ListLoading from 'src/app/modules/apps/cores/list-management/table/ListLoading'
import {CustomerIndex} from '@/types/Customers/customer.mode'
import {customersColumns} from './columns'

const TableIndex = () => {
  const customers = useQueryResponseData() as CustomerIndex[]
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => customers, [customers])
  const columns = useMemo(() => customersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_customers'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<CustomerIndex>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<CustomerIndex>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    Không tìm thấy kết quả
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ListPagination />
      {isLoading && <ListLoading />}
    </KTCardBody>
  )
}

export {TableIndex}
