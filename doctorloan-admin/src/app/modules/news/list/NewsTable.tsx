/* eslint-disable react-hooks/exhaustive-deps */
import {PaginatedList} from '@/types/Commons/result'
import {NewsItemFilterResultDto, UpdateNewsItemStatusCommand} from '@/types/News/news.model'
import React, {Fragment} from 'react'
import {Gear, Pencil, Send, Trash, X} from 'react-bootstrap-icons'
import {useMutation} from 'react-query'
import {Column, useTable} from 'react-table'
import {deleteNews, updateNewsStatus} from 'src/app/apis/News/news.api'
import TablePagination from 'src/app/components/Table/Pagination'
import {alertMessage} from 'src/app/utils/commons/alert'
import {AlertType} from 'src/app/utils/enums/base'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'
import {StatusCell} from '../../apps/cores/list-management/table/columns/StatusCell'
import ListLoading from '../../apps/cores/list-management/table/ListLoading'
import {DatetimeCell} from '../../apps/cores/list-management/table/columns/DatetimeCell'

export interface NewsTableProps {
  isLoading: boolean
  refetch: () => void
  data?: PaginatedList<NewsItemFilterResultDto>
  onPageChange: (page: number) => void
}
const NewsTable = ({isLoading, onPageChange, refetch, data}: NewsTableProps) => {
  const mutationUpdateNewsStatus = useMutation(
    (params: UpdateNewsItemStatusCommand) => updateNewsStatus(params),
    {
      onSuccess: (response) => {
        response.succeeded
          ? alertMessage('Cập nhật trạng thái tin tức thành công', AlertType.Success)
          : alertMessage('Cập nhật trạng thái tin tức thất bại', AlertType.Error)
      },
      onError: () => {
        alertMessage('Cập nhật trạng thái tin tức thất bại', AlertType.Error)
      },
    }
  )
  const updateStatus = async (id: number, status: StatusEnum) => {
    const res = await mutationUpdateNewsStatus.mutateAsync({ids: [id], status: status})
    if (res.succeeded) refetch()
  }
  const mutationDelete = useMutation((id: number) => deleteNews(id), {
    onSuccess: (response) => {
      response.succeeded && refetch()
      response.succeeded
        ? alertMessage('Xóa tin thành công', AlertType.Success)
        : alertMessage('Xóa tin thất bại', AlertType.Error)
    },
    onError: () => {
      alertMessage('Xóa  tin thất bại', AlertType.Error)
    },
  })
  const handleDelete = async (id: number) => {
    await mutationDelete.mutateAsync(id)
  }
  const columns = React.useMemo<ReadonlyArray<Column<NewsItemFilterResultDto>>>(
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
      },
      {
        Header: 'Ảnh',
        accessor: 'imageUrl',
        Cell: (cell) => (
          <img
            className='border'
            width={50}
            alt={cell.row.original.title}
            src={cell.row.original.imageUrl}
          />
        ),
      },
      {
        Header: 'Tiêu đề',
        accessor: 'title',
      },

      {
        Header: 'Danh mục',
        accessor: 'categories',
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.categories &&
                cell.row.original.categories.map((c) => (
                  <span key={c} className='badge badge-success ms-1'>
                    {c}
                  </span>
                ))}
            </>
          )
        },
      },
      {
        Header: 'Trạng thái',
        accessor: 'status',
        Cell: ({...props}) => <StatusCell status={props.cell.value} />,
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
                href={`/news/edit/${cell.row.original.id}`}
                title='Chỉnh sửa'
                className='btn btn-sm btn-info btn-icon me-1'
              >
                <Pencil />
              </a>
              {cell.row.original.status === StatusEnum.Draft ? (
                <button
                  onClick={() => updateStatus(cell.row.original.id, StatusEnum.Publish)}
                  title='Hiện thị tin'
                  className='btn btn-sm btn-success btn-icon'
                >
                  <Send />
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(cell.row.original.id, StatusEnum.Draft)}
                  title='Ẩn tin'
                  className='btn btn-sm btn-danger btn-icon'
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
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <Fragment key={row.id}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
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
export default NewsTable
