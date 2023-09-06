import {FilterNewsItemsQuery} from '@/types/News/news.model'
import {Control} from 'react-hook-form'
import TextFieldFormHook from 'src/app/components/Forms/Input'
import SelectFieldFormHook from 'src/app/components/Forms/Select'
import {useNewsCategory} from 'src/app/hooks/News/useNewsCategory'
import {listCommonStatus} from 'src/app/utils/constants/list'

export interface NewsTableFilterProps {
  control: Control<FilterNewsItemsQuery, any>
  onSubmitForm: () => void
}
export const NewsTableFilter = ({control, onSubmitForm}: NewsTableFilterProps) => {
  const {newsCategoriesOptions} = useNewsCategory()
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
              placeholder='Nhập từ khóa'
            />
          </div>
          <div className='col-3'>
            <label className='form-label'>Danh mục</label>
            <SelectFieldFormHook
              isClearable={true}
              listOption={newsCategoriesOptions}
              control={control}
              name='categoryId'
            />
          </div>
          <div className='col-3'>
            <label className='form-label'>Trạng thái</label>
            <SelectFieldFormHook
              isClearable={true}
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
