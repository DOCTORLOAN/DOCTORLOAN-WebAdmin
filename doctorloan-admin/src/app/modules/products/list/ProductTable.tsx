/* eslint-disable react-hooks/exhaustive-deps */
import {PaginatedList} from '@/types/Commons/result'
import {ProductFilterResultDto, UpdateProductStatusCommand} from '@/types/Products/product.model'
import React, {Fragment, useState} from 'react'
import {
  Cart,
  ChevronDoubleDown,
  ChevronDoubleUp,
  Gear,
  Pencil,
  Trash,
  X,
} from 'react-bootstrap-icons'
import {useMutation} from 'react-query'
import {Column, useTable} from 'react-table'
import {deleteProduct, updateProductStatus} from 'src/app/apis/Products/product.api'
import TablePagination from 'src/app/components/Table/Pagination'
import {alertMessage} from 'src/app/utils/commons/alert'
import {currentcyFormatter} from 'src/app/utils/commons/number'
import {AlertType} from 'src/app/utils/enums/base'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'
import {StatusCell} from '../../apps/cores/list-management/table/columns/StatusCell'
import ListLoading from '../../apps/cores/list-management/table/ListLoading'
import {DatetimeCell} from '../../apps/cores/list-management/table/columns/DatetimeCell'

export interface ProductTableProps {
  isLoading: boolean
  refetch: () => void
  data?: PaginatedList<ProductFilterResultDto>
  onPageChange: (page: number) => void
}
const ProductTable = ({isLoading, onPageChange, refetch, data}: ProductTableProps) => {
  const [showIds, setShowIds] = useState<number[]>([])

  const mutationUpdateProductStatus = useMutation(
    (params: UpdateProductStatusCommand) => updateProductStatus(params),
    {
      onSuccess: (response) => {
        response.succeeded
          ? alertMessage('Cập nhật trạng thái sản phẩm thành công', AlertType.Success)
          : alertMessage('Cập nhật trạng thái sản phẩm thất bại', AlertType.Error)
      },
      onError: () => {
        alertMessage('Cập nhật trạng thái sản phẩm thất bại', AlertType.Error)
      },
    }
  )
  const updateStatus = async (id: number, status: StatusEnum) => {
    const res = await mutationUpdateProductStatus.mutateAsync({ids: [id], status: status})
    if (res.succeeded) refetch()
  }
  const mutationDelete = useMutation((id: number) => deleteProduct(id), {
    onSuccess: (response) => {
      response.succeeded && refetch()
      response.succeeded
        ? alertMessage('Xóa sản phẩm thành công', AlertType.Success)
        : alertMessage('Xóa sản phẩm thất bại', AlertType.Error)
    },
    onError: () => {
      alertMessage('Xóa  sản phẩm thất bại', AlertType.Error)
    },
  })
  const handleDelete = async (id: number) => {
    await mutationDelete.mutateAsync(id)
  }
  const columns = React.useMemo<ReadonlyArray<Column<ProductFilterResultDto>>>(
    () => [
      {
        id: 'chk',
        Header: () => {
          return (
            <div className='d-flex'>
              <Gear className='me-4' />
            </div>
          )
        },
        accessor: 'id',
        Cell: (cell) => {
          return (
            <div className='d-flex'>
              <span
                className='fw-bold text-success fs-2 me-3 pointer'
                onClick={() => toggleShowDetail(cell.row.original.id)}
              >
                {showIds.includes(cell.row.original.id) ? (
                  <ChevronDoubleUp />
                ) : (
                  <ChevronDoubleDown />
                )}
              </span>
            </div>
          )
        },
      },
      {
        Header: 'Ảnh',
        accessor: 'imageUrl',
        Cell: (cell) => (
          <img
            className='border'
            width={50}
            alt={cell.row.original.name}
            src={cell.row.original.imageUrl}
          />
        ),
      },
      {
        Header: 'Mã SP',
        accessor: 'sku',
      },
      {
        Header: 'Tên SP',
        accessor: 'name',
      },
      {
        Header: 'Loại',
        accessor: 'categoryNames',
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.categoryNames &&
                cell.row.original.categoryNames.map((c) => (
                  <span key={c} className='badge badge-success ms-1'>
                    {c}
                  </span>
                ))}
            </>
          )
        },
      },
      {
        Header: 'Thương hiệu',
        accessor: 'branchName',
      },

      {
        Header: 'Phiên bản',
        accessor: 'productItems',
        Cell: (cell) => {
          return (
            <>
              <span>{cell.row.original.productItems?.length || 0} phiên bản</span> <br />
              <span>
                (Tổng số lượng <b>{cell.row.original.stock}</b>)
              </span>
            </>
          )
        },
      },
      {
        Header: 'Trạng thái',
        accessor: 'status',
        Cell: ({...props}) => <StatusCell status={props.data[props.row.index].status} />,
      },
      {
        Header: 'Ngày cập nhật',
        accessor: 'lastModified',
        Cell: ({...props}) => (
          <DatetimeCell datetime={props.data[props.row.index].lastModified} hasTime={true} />
        ),
      },
      {
        id: 'tool',
        Header: 'Công cụ',
        maxWidth: 100,
        accessor: 'id',
        Cell: (cell) => {
          return (
            <>
              <a
                href={`/products/edit/${cell.row.original.id}`}
                title='Chỉnh sửa'
                className='btn btn-sm btn-info btn-icon me-1'
              >
                <Pencil />
              </a>
              {cell.row.original.status === StatusEnum.Draft ? (
                <button
                  onClick={() => updateStatus(cell.row.original.id, StatusEnum.Publish)}
                  title='Mở bán'
                  className='btn btn-sm btn-success btn-icon'
                >
                  <Cart />
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(cell.row.original.id, StatusEnum.Draft)}
                  title='Khóa bán'
                  className='btn btn-sm btn-danger btn-icon '
                >
                  <X />
                </button>
              )}
              <button
                onClick={() => handleDelete(cell.row.original.id)}
                title='Xóa'
                className='btn btn-sm btn-danger btn-icon ms-1'
              >
                <Trash />
              </button>
            </>
          )
        },
      },
    ],
    [showIds]
  )
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data: data?.items || [],
  })
  const toggleShowDetail = (id: number) => {
    setShowIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, ...[id]]))
  }
  const renderSubTable = (product: ProductFilterResultDto) => {
    const {productItems} = product
    if (!showIds.includes(product.id)) return <></>
    return (
      <tr>
        <td colSpan={99}>
          <table className='table table-row-dashed table-row-gray-500 gy-5 gs-5 mb-0'>
            <thead>
              <tr className='fw-bolder fs-6 text-gray-800'>
                <th>Mã SP</th>
                <th>Tên SP</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {productItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>{currentcyFormatter(item.price)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </td>
      </tr>
    )
  }

  // Render the UI for your table
  return (
    <>
      <table
        className='table table-striped table-rounded border border-gray-300 table-row-bordered table-row-gray-300 gy-7 gs-7'
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <Fragment key={row.id}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
                {renderSubTable(row.original)}
              </Fragment>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={99}>
              {data && (
                <TablePagination
                  currentPageNumber={data.pageNumber}
                  pageSize={data.pageSize}
                  totalItems={data.totalCount}
                  onPageChange={onPageChange}
                />
              )}
            </td>
          </tr>
        </tfoot>
      </table>
      {isLoading && <ListLoading />}
    </>
  )
}
export default ProductTable
