import {TError} from './error.model'

export type TResult<T> = {
  data?: T
  succeeded?: boolean
  error?: TError
}

export type PaginatedList<T> = {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageSize:number
}

export type TLink = {
  label: string
  active: boolean
  url: string | null
  page: number | null
}
export interface QueryParam {
  page: number;
  take: number;
  sortBy?: string;
  sortAsc?: boolean;
}