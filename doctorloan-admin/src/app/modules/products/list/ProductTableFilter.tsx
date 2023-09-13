import {FilterProductQuery} from '@/types/Products/product.model'
import {Control} from 'react-hook-form'
import TextFieldFormHook from 'src/app/components/Forms/Input'
import SelectFieldFormHook from 'src/app/components/Forms/Select'
import useSaveProduct from 'src/app/hooks/Products/useSaveProduct'
import {listCommonStatus} from 'src/app/utils/constants/list'

export interface ProductTableFilterProps {
  control: Control<FilterProductQuery, any>
  onSubmitForm: () => void
}
export const ProductTableFilter = ({control, onSubmitForm}: ProductTableFilterProps) => {
  const {listProductOptions} = useSaveProduct()
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div className='row mb-3'>
          <div className='col-3'>
            <label className='form-label'>Từ khóa</label>
            <TextFieldFormHook
              control={control}
              name='keyword'
              type='text'
              className='form-control'
              placeholder='Nhập tên, mã sản phẩm'
            />
          </div>
          <div className='col-3'>
            <label className='form-label'>Danh mục</label>
            <SelectFieldFormHook
              isClearable
              listOption={listProductOptions?.categories}
              control={control}
              name='categoryId'
            />
          </div>
          <div className='col-3'>
            <label className='form-label'>Trạng thái</label>
            <SelectFieldFormHook
              isClearable
              listOption={listCommonStatus}
              control={control}
              name='status'
            />
          </div>
        </div>
      </form>
    </>
  )
}
