/* eslint-disable react-hooks/exhaustive-deps */
import {PaginatedList} from '@/types/Commons/result'
import {NewsCategoryDto} from '@/types/News/news.model'
import React from 'react'
import {Pencil, Trash} from 'react-bootstrap-icons'
import {Column, useTable} from 'react-table'
import TablePagination from 'src/app/components/Table/Pagination'
import {StatusCell} from '../../apps/cores/list-management/table/columns/StatusCell'
import ListLoading from '../../apps/cores/list-management/table/ListLoading'
import {deleteNewsCategory} from 'src/app/apis/News/news.category.api'
import {useMutation} from 'react-query'
import {alertMessage} from 'src/app/utils/commons/alert'
import {AlertType} from 'src/app/utils/enums/base'
import {DatetimeCell} from '../../apps/cores/list-management/table/columns/DatetimeCell'

export interface NewsCategoryTableProps {
  isLoading: boolean
  refetch: () => void
  data?: PaginatedList<NewsCategoryDto>
  onPageChange: (page: number) => void
}
const NewsCategoryTable = ({isLoading, onPageChange, refetch, data}: NewsCategoryTableProps) => {
  const mutationDelete = useMutation((id: number) => deleteNewsCategory(id), {
    onSuccess: (response) => {
      response.succeeded && refetch()
      response.succeeded
        ? alertMessage('Xóa danh mục tin thành công', AlertType.Success)
        : alertMessage('Xóa danh mục tin thất bại', AlertType.Error)
    },
    onError: () => {
      alertMessage('Xóa danh mục tin thất bại', AlertType.Error)
    },
  })
  const handleDelete = async (id: number) => {
    await mutationDelete.mutateAsync(id)
  }
  const columns = React.useMemo<ReadonlyArray<Column<NewsCategoryDto>>>(
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
        width: 100,
        accessor: 'id',
        Cell: (cell) => {
          return (
            <>
              <a
                href={`/news-category/edit/${cell.row.original.id}`}
                title='Chỉnh sửa'
                className='btn btn-sm btn-info btn-icon me-1'
              >
                <Pencil />
              </a>
              <button
                onClick={() => handleDelete(cell.row.original.id)}
                title='Xóa'
                className='btn btn-sm btn-danger btn-icon me-1'
              >
                <Trash />
              </button>
            </>
          )
        },
      },
    ],
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
export default NewsCategoryTable
