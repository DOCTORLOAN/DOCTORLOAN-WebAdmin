import {FilterCategoryQuery} from '@/types/Categories/category.model'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useQuery} from 'react-query'
import {useNavigate} from 'react-router'
import {filterCategories} from 'src/app/apis/Categories/category.api'
import Button from 'src/app/components/Forms/Button'
import {KTCard, KTCardBody, KTSVG, useDebounce} from 'src/_doctor/helpers'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import CategoryTable from './CategoryTable'

const categoryListBreadcrumbs: Array<PageLink> = [
  {
    title: 'Dashboard',
    path: '/',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Sản phẩm',
    path: '',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
const CategoryListPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const {watch, setValue, handleSubmit} = useForm<FilterCategoryQuery>({
    defaultValues: {
      page: 1,
      take: 20,
    },
  })
  const filterParams = watch()
  const {data, isLoading, refetch} = useQuery([filterParams], () => filterCategories(filterParams))
  const debouncedSearchTerm = useDebounce(searchTerm, 200)
  // Effect for API call
  useEffect(() => {
    if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
      setValue('keyword', debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, setValue, searchTerm])
  return (
    <KTCard>
      <PageTitle breadcrumbs={categoryListBreadcrumbs}>Quản lý danh mục</PageTitle>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <div className='d-flex align-items-center position-relative my-1'>
            <form onSubmit={handleSubmit(() => {})}>
              <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-1 position-absolute ms-6 mt-3'
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='form-control form-control-solid w-250px ps-14'
                data-kt-user-table-filter='search'
                placeholder='Nhập từ khóa để tìm'
              />
            </form>
          </div>
        </div>
        <div className='card-toolbar'>
          <Button
            onClick={() => navigate('/category/create')}
            icon='Plus'
            className='btn btn-success btn-sm'
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <KTCardBody className='border-top'>
        <div className='mb-2 text-end'></div>
        <CategoryTable
          refetch={refetch}
          onPageChange={(page) => setValue('page', page)}
          data={data?.data}
          isLoading={isLoading}
        ></CategoryTable>
      </KTCardBody>
    </KTCard>
  )
}
export default CategoryListPage
