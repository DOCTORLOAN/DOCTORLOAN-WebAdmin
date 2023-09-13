import {FilterProductQuery} from '@/types/Products/product.model'
import {useForm} from 'react-hook-form'
import {useQuery} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {filterProduct} from 'src/app/apis/Products/product.api'
import Button from 'src/app/components/Forms/Button'
import {KTCard, KTCardBody} from 'src/_doctor/helpers'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import ProductTable from './ProductTable'
import {ProductTableFilter} from './ProductTableFilter'
const productListBreadcrumbs: Array<PageLink> = [
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
const ProductListPage = () => {
  const navigate = useNavigate()
  const {control, watch, setValue, handleSubmit} = useForm<FilterProductQuery>({
    defaultValues: {
      page: 1,
      take: 20,
    },
  })
  const filterParams = watch()
  const {data, isLoading, refetch} = useQuery([filterParams], () => filterProduct(filterParams))

  return (
    <KTCard>
      <PageTitle breadcrumbs={productListBreadcrumbs}>Danh sách sản phẩm</PageTitle>
      <KTCardBody>
        <div className='mb-2 text-end'>
          <Button
            onClick={() => navigate('/products/create')}
            icon='Plus'
            className='btn btn-success btn-sm'
          >
            Tạo mới
          </Button>
        </div>
        <ProductTableFilter control={control} onSubmitForm={handleSubmit(() => {})} />
        <ProductTable
          refetch={refetch}
          onPageChange={(page) => setValue('page', page)}
          data={data?.data}
          isLoading={isLoading}
        ></ProductTable>
      </KTCardBody>
    </KTCard>
  )
}
export default ProductListPage
