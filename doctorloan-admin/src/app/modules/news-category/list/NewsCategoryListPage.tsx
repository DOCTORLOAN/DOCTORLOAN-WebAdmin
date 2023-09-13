import {GetNewsCategoriesQuery} from '@/types/News/news.model'
import {useForm} from 'react-hook-form'
import {useQuery} from 'react-query'
import {useNavigate} from 'react-router'
import {filterNewsCategories} from 'src/app/apis/News/news.category.api'
import Button from 'src/app/components/Forms/Button'
import {KTCard, KTCardBody} from 'src/_doctor/helpers'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import NewsCategoryTable from './NewsCategoryTable'

const newsCategoryListBreadcrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '/',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
const NewsCategoryListPage = () => {
  const navigate = useNavigate()
  const {watch, setValue} = useForm<GetNewsCategoriesQuery>({
    defaultValues: {
      page: 1,
      take: 20,
    },
  })
  const filterParams = watch()
  const {data, isLoading, refetch} = useQuery([filterParams], () =>
    filterNewsCategories(filterParams)
  )

  return (
    <KTCard>
      <PageTitle breadcrumbs={newsCategoryListBreadcrumbs}>Danh mục tin tức</PageTitle>
      <KTCardBody>
        <div className='mb-2 text-end'>
          <Button
            onClick={() => navigate('/news-category/create')}
            icon='Plus'
            className='btn btn-success btn-sm'
          >
            Tạo mới
          </Button>
        </div>
        <NewsCategoryTable
          refetch={refetch}
          onPageChange={(page) => setValue('page', page)}
          data={data?.data}
          isLoading={isLoading}
        ></NewsCategoryTable>
      </KTCardBody>
    </KTCard>
  )
}
export default NewsCategoryListPage
