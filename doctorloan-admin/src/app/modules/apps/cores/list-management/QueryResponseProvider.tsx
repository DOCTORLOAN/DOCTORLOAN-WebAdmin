/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useMemo, useState} from 'react'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  stringifyRequestQuery,
} from 'src/_doctor/helpers'
import {formatPaginationSever} from 'src/app/utils/commons/pagination-customer'
import {useQueryRequest} from './QueryRequestProvider'
import {useQuery} from 'react-query'

type ResponseProp<T> = {
  queryName: string
  children?: React.ReactNode
  fetchData: (query: string) => T
}

const QueryResponseContext = createResponseContext(initialQueryResponse)

//props: ResponseProp<T> & {children?: React.ReactNode}
const QueryResponseProvider = <T extends object>({
  queryName,
  children,
  fetchData,
}: ResponseProp<T>) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [query, updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${queryName}-${query}`,
    () => {
      return fetchData(query)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data?.items || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()

  if (!response?.data) return defaultPaginationState
  const paged = response.data

  return formatPaginationSever(
    paged.totalPages,
    paged.pageNumber,
    defaultPaginationState.take,
    paged.hasNextPage,
    paged.hasPreviousPage
  )
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
