import {ListFilter} from './ListFilter'
import {Option} from '@/types/Commons/option'

type Props = {
  listOption?: Option[]
}

const ListToolbar = ({listOption}: Props) => {
  return (
    <div className='d-flex justify-content-end' data-kt-order-table-toolbar='base'>
      <ListFilter listOption={listOption} />
    </div>
  )
}

export {ListToolbar}
