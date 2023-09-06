import {KTCard} from 'src/_doctor/helpers'
import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'

import {PageLink, PageTitle} from 'src/_doctor/layout/core/PageData'

import {IndexListWrapper} from 'src/app/modules/apps/cores/list-management/IndexListWrapper'
import {PathURL} from 'src/app/utils/constants/path'
import orderService from 'src/app/apis/Orders/order.api'
import {ListHeader} from './components/List/headers/ListHeader'
import {TableIndex} from './components/List/tables/Table'

const ordersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quản lý đơn hàng',
    path: PathURL.orders.index,
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

const OrderIndexPage = () => {
  const fetchData = (query: string) => orderService.list(query)

  return (
    <>
      <PageTitle breadcrumbs={ordersBreadcrumbs}>Danh sách đơn hàng</PageTitle>
      <IndexListWrapper queryName={`${QUERIES.ORDER_LIST}`} fetchData={fetchData}>
        <OrdersList />
      </IndexListWrapper>
    </>
  )
}

const OrdersList = () => {
  return (
    <>
      <KTCard>
        <ListHeader />
        <TableIndex />
      </KTCard>
    </>
  )
}

export default OrderIndexPage
