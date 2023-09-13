import {TLink} from '@/types/Commons/result'
import {initialQueryState, PaginationState} from 'src/_doctor/helpers'

/**
 * Generate list links paginations
 * @param {number} totalPages Date
 * @param {number} currentPage Date
 * @param {boolean} hasNextPage Date
 * @param {boolean} hasPreviousPage Date
 * @return {PaginationState} List TLinks
 */
function formatPaginationSever(
  totalPages: number,
  currentPage: number,
  take: 10 | 30 | 50 | 100,
  hasNextPage: boolean,
  hasPreviousPage: boolean
): PaginationState {
  const result: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  result.links = []
  result.page = currentPage
  result.take = take

  result.links.push({
    url: hasPreviousPage ? `/?page=${currentPage - 1}` : null,
    label: '&laquo; Previous',
    active: hasPreviousPage,
    page: hasPreviousPage ? currentPage - 1 : null,
  })

  for (let index = 1; index <= totalPages; index++) {
    const data: TLink = {
      label: index.toString(),
      active: currentPage === index,
      url: `/?page=${index}`,
      page: index,
    }
    result.links.push(data)
  }

  result.links.push({
    url: hasNextPage ? `/?page=${currentPage + 1}` : null,
    label: 'Next &raquo;',
    active: hasNextPage,
    page: hasNextPage ? currentPage + 1 : null,
  })

  return result
}

export {formatPaginationSever}
