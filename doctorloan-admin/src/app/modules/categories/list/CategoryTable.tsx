import {CategoryDto} from '@/types/Categories/category.model'
import {PaginatedList} from '@/types/Commons/result'
import React from 'react'
import {Pencil, Trash} from 'react-bootstrap-icons'
import {Column, useTable} from 'react-table'
import TablePagination from 'src/app/components/Table/Pagination'
import {StatusCell} from '../../apps/cores/list-management/table/columns/StatusCell'
import ListLoading from '../../apps/cores/list-management/table/ListLoading'
import {useMutation} from 'react-query'
import {deleteCategory} from 'src/app/apis/Categories/category.api'
import {alertMessage} from 'src/app/utils/commons/alert'
import {AlertType} from 'src/app/utils/enums/base'
import {DatetimeCell} from '../../apps/cores/list-management/table/columns/DatetimeCell'

export interface CategoryTableProps {
  isLoading: boolean
  refetch: () => void
  data?: PaginatedList<CategoryDto>
  onPageChange: (page: number) => void
}
const CategoryTable = ({isLoading, onPageChange, refetch, data}: CategoryTableProps) => {
  const mutationDelete = useMutation((id: number) => deleteCategory(id), {
    onSuccess: (response) => {
      response.succeeded && refetch()
      response.succeeded
        ? alertMessage('Xóa danh mục sản phẩm thành công', AlertType.Success)
        : alertMessage('Xóa danh mục sản phẩm thất bại', AlertType.Error)
    },
    onError: () => {
      alertMessage('Xóa danh mục sản phẩm thất bại', AlertType.Error)
    },
  })
  const handleDelete = async (id: number) => {
    await mutationDelete.mutateAsync(id)
  }
  const columns = React.useMemo<ReadonlyArray<Column<CategoryDto>>>(
    () => [
      {
        Header: 'Tên',
        accessor: 'name',
      },
      {
        Header: 'Thuộc danh mục',
        accessor: 'parentName',
        Cell: ({cell}) => {
          return <>{cell.row.original.parentId > 0 ? cell.value : 'Danh mục chính'}</>
        },
      },

      {
        Header: 'Sắp xếp',
        accessor: 'sort',
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
              <button
                onClick={() => handleDelete(cell.row.original.id)}
                title='Xóa'
                className='btn btn-sm btn-danger btn-icon me-1'
              >
                <Trash />
              </button>
              <a
                href={`/category/edit/${cell.row.original.id}`}
                title='Chỉnh sửa'
                className='btn btn-sm btn-info btn-icon me-1'
              >
                <Pencil />
              </a>
            </>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data: data?.items || [],
  })

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
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
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
export default CategoryTable
