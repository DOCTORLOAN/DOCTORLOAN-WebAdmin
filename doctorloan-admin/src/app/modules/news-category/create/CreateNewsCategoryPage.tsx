/* eslint-disable jsx-a11y/anchor-is-valid */
import TextFieldFormHook from 'src/app/components/Forms/Input'
import {useForm} from 'react-hook-form'

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import SelectFieldFormHook from 'src/app/components/Forms/Select'
import Switcher from 'src/app/components/Forms/Switcher'
import {useEffect} from 'react'
import ButtonFormHook from 'src/app/components/Forms/Button'
import {useNavigate} from 'react-router-dom'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'
import {useNewsCategory} from 'src/app/hooks/News/useNewsCategory'
import {NewsCategoryDto} from '@/types/News/news.model'
import TinyMCEFieldFormHook from 'src/app/components/Forms/TinyMCEField'

const CreateCategoryPage = () => {
  const navigate = useNavigate()
  const {mutationSaveNewsCategory, newsCategoriesOptions, queryNewsCategory} = useNewsCategory()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nhập tên danh mục'),
  })
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: {errors},
  } = useForm<NewsCategoryDto>({
    defaultValues: {},
    resolver: yupResolver(validationSchema),
  })

  const handleSubmitForm = async (data: NewsCategoryDto) => {
    await mutationSaveNewsCategory.mutateAsync(data)
  }

  const title = watch('id') > 0 ? 'Cập nhật danh mục - ' + watch('name') : 'Tạo mới danh mục'
  useEffect(() => {
    if (queryNewsCategory.data) {
      const {succeeded, data} = queryNewsCategory.data
      if (succeeded) reset(data)
      else navigate('/error/404')
    }
  }, [queryNewsCategory.data, reset, navigate])

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className='card mb-5 mb-xl-10'>
        <div
          className='card-header border-0 cursor-pointer'
          role='button'
          data-bs-toggle='collapse'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{title}</h3>
            <a href='#' className='ms-3' onClick={() => navigate('/news-category/list')}>
              {'<<'} Quay lại
            </a>
          </div>
          <div className='card-toolbar'>
            <ButtonFormHook
              disabled={mutationSaveNewsCategory.isLoading}
              loading={mutationSaveNewsCategory.isLoading}
              icon='Save'
              type='submit'
              className='btn btn-sm btn-success'
            >
              {watch('id') > 0 ? 'Cập nhật' : 'Tạo mới'}
            </ButtonFormHook>
          </div>
        </div>
        <div className='collapse show'>
          <div className='card-body border-top p-9'>
            <h5>Thông tin chung</h5>
            <div className='row mb-6'>
              <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>Tên danh mục</label>

                <div>
                  <TextFieldFormHook
                    control={control}
                    id='name'
                    name='name'
                    errorMessage={errors.name?.message}
                    placeholder='Tên danh mục'
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>Thuộc danh mục</label>
                <div>
                  <SelectFieldFormHook
                    listOption={newsCategoriesOptions || []}
                    isClearable
                    isSearchable
                    control={control}
                    register={register}
                    id='parentId'
                    name='parentId'
                    errorMessage={errors.parentId?.message}
                    placeholder='Danh mục cha'
                  />
                </div>
              </div>
              <div className='col-12'>
                <label className='col-form-label fw-bold fs-6'>Mô tả</label>
                <div>
                  <TinyMCEFieldFormHook
                    value={watch('description')}
                    setValue={setValue}
                    name='description'
                    placeholder='Nhập mô tả'
                  />
                </div>
              </div>
              <div className='col-12'>
                <label className='col-form-label fw-bold fs-6'>Sắp xếp</label>
                <div>
                  <TextFieldFormHook
                    type='number'
                    control={control}
                    id='sort'
                    name='sort'
                    errorMessage={errors.sort?.message}
                    placeholder='Sắp xếp'
                  />
                </div>
              </div>
              <div className='col-12'>
                <label className='col-form-label fw-bold fs-6'>Kích hoạt</label>
                <div>
                  <Switcher
                    label='Kích hoạt'
                    checked={watch('status') === StatusEnum.Publish}
                    onChange={(e) =>
                      setValue('status', e.target.checked ? StatusEnum.Publish : StatusEnum.Draft)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
export default CreateCategoryPage
