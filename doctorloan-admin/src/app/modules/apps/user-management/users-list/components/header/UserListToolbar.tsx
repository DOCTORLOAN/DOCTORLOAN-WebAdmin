import {useListView} from 'src/app/modules/apps/cores/list-management/ListViewProvider'
import {KTSVG} from 'src/_doctor/helpers'

import {UsersListFilter} from './UsersListFilter'
import ButtonFormHook from 'src/app/components/Forms/Button'
import {Option} from '@/types/Commons/option'
import {PathURL} from 'src/app/utils/constants/path'
import {useNavigate} from 'react-router-dom'

type Props = {
  listRole?: Option[]
}

const UsersListToolbar = ({listRole}: Props) => {
  const navigate = useNavigate()
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
    navigate(PathURL.users.create_user)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter listRole={listRole} />
      <ButtonFormHook
        type='button'
        className='btn btn-light-primary me-3'
        onClick={openAddUserModal}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Thêm
      </ButtonFormHook>
    </div>
  )
}

export {UsersListToolbar}
