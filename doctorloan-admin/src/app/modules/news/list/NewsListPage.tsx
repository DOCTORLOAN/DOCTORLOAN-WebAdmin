import {FilterNewsItemsQuery} from '@/types/News/news.model'
import {useForm} from 'react-hook-form'
import {useQuery} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {filterNews} from 'src/app/apis/News/news.api'
import Button from 'src/app/components/Forms/Button'
import {KTCard, KTCardBody} from 'src/_doctor/helpers'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import NewsTable from './NewsTable'
import {NewsTableFilter} from './NewsTableFilter'

const newsListBreadcrumbs: Array<PageLink> = [
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
const NewsListPage = () => {
  const navigate = useNavigate()
  const {control, watch, setValue, handleSubmit} = useForm<FilterNewsItemsQuery>({
    defaultValues: {
      page: 1,
      take: 20,
    },
  })
  const filterParams = watch()
  const {data, isLoading, refetch} = useQuery([filterParams], () => filterNews(filterParams))

  return (
    <KTCard>
      <PageTitle breadcrumbs={newsListBreadcrumbs}>Danh sách tin tức</PageTitle>
      <KTCardBody>
        <div className='mb-2 text-end'>
          <Button
            onClick={() => navigate('/news/create')}
            icon='Plus'
            className='btn btn-success btn-sm'
          >
            Tạo mới
          </Button>
        </div>
        <NewsTableFilter control={control} onSubmitForm={handleSubmit(() => {})} />
        <NewsTable
          refetch={refetch}
          onPageChange={(page) => setValue('page', page)}
          data={data?.data}
          isLoading={isLoading}
        ></NewsTable>
      </KTCardBody>
    </KTCard>
  )
}
export default NewsListPage
