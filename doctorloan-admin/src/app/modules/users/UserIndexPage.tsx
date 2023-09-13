import {useEffect} from 'react'

import {KTCard} from 'src/_doctor/helpers'
import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'

import {OptionType} from 'src/app/utils/enums/common.enum'
import {Option} from '@/types/Commons/option'
import {PageLink, PageTitle} from 'src/_doctor/layout/core/PageData'

import {useFetchOption} from 'src/app/modules/hooks/commons/useFetchUserData'
import {IndexListWrapper} from 'src/app/modules/apps/cores/list-management/IndexListWrapper'
import {UsersListHeader} from 'src/app/modules/apps/user-management/users-list/components/header/UsersListHeader'
import {UsersTable} from 'src/app/modules/apps/user-management/users-list/table/UsersTable'
import {PathURL} from 'src/app/utils/constants/path'
import {getUsers} from 'src/app/apis/Users/user.api'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quản lý người dùng',
    path: PathURL.users.index,
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

const UserIndexPage = () => {
  const fetchData = (query: string) => getUsers(query)
  const fetchRoleOption = useFetchOption(OptionType.Role)

  // did mount
  // fetch data first time
  useEffect(() => {
    fetchRoleOption.refetch()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={usersBreadcrumbs}>Danh sách người dùng</PageTitle>
      <IndexListWrapper queryName={`${QUERIES.USERS_LIST}`} fetchData={fetchData}>
        <UsersList listRole={fetchRoleOption?.data?.data} />
      </IndexListWrapper>
    </>
  )
}

type Props = {
  listRole?: Option[]
}
const UsersList = ({listRole}: Props) => {
  return (
    <>
      <KTCard>
        <UsersListHeader listRole={listRole} />
        <UsersTable />
      </KTCard>
    </>
  )
}

export default UserIndexPage
