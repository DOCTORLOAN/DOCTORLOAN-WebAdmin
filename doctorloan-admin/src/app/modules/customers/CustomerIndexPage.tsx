import {KTCard} from 'src/_doctor/helpers'
import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'

import {PageLink, PageTitle} from 'src/_doctor/layout/core/PageData'

import {IndexListWrapper} from 'src/app/modules/apps/cores/list-management/IndexListWrapper'
import {PathURL} from 'src/app/utils/constants/path'
import customerService from 'src/app/apis/Customers/customer.api'
import {ListHeader} from './components/List/headers/ListHeader'
import {TableIndex} from './components/List/tables/Table'

const customersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quản lý khách hàng',
    path: PathURL.customers.index,
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

const CustomerIndexPage = () => {
  const fetchData = (query: string) => customerService.list(query)

  return (
    <>
      <PageTitle breadcrumbs={customersBreadcrumbs}>Danh sách khách hàng</PageTitle>
      <IndexListWrapper queryName={`${QUERIES.CUSTOMER_LIST}`} fetchData={fetchData}>
        <CustomersList />
      </IndexListWrapper>
    </>
  )
}

const CustomersList = () => {
  return (
    <>
      <KTCard>
        <ListHeader />
        <TableIndex />
      </KTCard>
    </>
  )
}

export default CustomerIndexPage
