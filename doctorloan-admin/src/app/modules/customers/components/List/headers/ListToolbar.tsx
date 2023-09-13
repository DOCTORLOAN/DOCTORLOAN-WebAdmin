import {ListFilter} from './ListFilter'
import {Option} from '@/types/Commons/option'

type Props = {
  listRole?: Option[]
}

const ListToolbar = ({listRole}: Props) => {
  return (
    <div className='d-flex justify-content-end' data-kt-customer-table-toolbar='base'>
      <ListFilter listRole={listRole} />
    </div>
  )
}

export {ListToolbar}
