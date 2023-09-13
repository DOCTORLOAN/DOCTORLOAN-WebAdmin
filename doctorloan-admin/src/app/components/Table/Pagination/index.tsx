import React from 'react'
import ReactPaginate from 'react-paginate'
type PaginationProps = {
  loading?: boolean
  currentPageNumber: number
  onPageChange: (pageIndex: number) => void
  totalItems?: number
  pageSize: number
}
const TablePagination = ({
  currentPageNumber,
  onPageChange,
  totalItems,
  pageSize,
}: PaginationProps) => {
  let totalPages = 0
  if (totalItems && totalItems > 0) {
    totalPages = Math.ceil(totalItems / pageSize)
  }
  if (totalItems === 0) return <span />
  return (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPageNumber - 1}
      onPageChange={(page: {selected: number}) => onPageChange(page.selected + 1)}
      pageCount={totalPages}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pr-1 mt-1'
    />
  )
}
export default TablePagination
