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
import {CategoryDto} from '@/types/Categories/category.model'
import useCategory from 'src/app/hooks/Categories/useCategory'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'
import {KTCard, KTCardBody} from 'src/_doctor/helpers'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import TinyMCEFieldFormHook from 'src/app/components/Forms/TinyMCEField'
const categoryCreateBreadcrumbs: Array<PageLink> = [
  {
    title: 'Dashboard',
    path: '/',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Danh mục sản phẩm',
    path: '/category/list',
    isSeparator: false,
    isActive: false,
  },
]

const CreateCategoryPage = () => {
  const navigate = useNavigate()
  const {mutationSaveCategory, queryGetCategory, listParentCategory} = useCategory()
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
  } = useForm<CategoryDto>({
    defaultValues: {},
    resolver: yupResolver(validationSchema),
  })

  const handleSubmitForm = async (data: CategoryDto) => {
    await mutationSaveCategory.mutateAsync(data)
  }

  const title = watch('id') > 0 ? 'Cập nhật danh mục - ' + watch('name') : 'Tạo mới danh mục'
  useEffect(() => {
    if (queryGetCategory.data) {
      reset(queryGetCategory.data)
    }
  }, [queryGetCategory.data, reset])

  return (
    <KTCard>
      <PageTitle breadcrumbs={categoryCreateBreadcrumbs}></PageTitle>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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
            <a href='#' className='ms-3' onClick={() => navigate('/category/list')}>
              {'<<'} Quay lại
            </a>
          </div>
          <div className='card-toolbar'>
            <ButtonFormHook
              disabled={mutationSaveCategory.isLoading}
              loading={mutationSaveCategory.isLoading}
              icon='Save'
              type='submit'
              className='btn btn-sm btn-success'
            >
              {watch('id') > 0 ? 'Cập nhật' : 'Tạo mới'}
            </ButtonFormHook>
          </div>
        </div>
        <KTCardBody className='border-top'>
          <div className='mb-10 fv-row fv-plugins-icon-container'>
            <label className='required col-form-label fw-bold fs-6'>Tên danh mục</label>

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
          <div className='mb-10 fv-row fv-plugins-icon-container'>
            <label className='col-form-label fw-bold fs-6'>Thuộc danh mục</label>
            <div>
              <SelectFieldFormHook
                listOption={listParentCategory || []}
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
          <div className='mb-10 fv-row fv-plugins-icon-container'>
            <label className='col-form-label fw-bold fs-6'>Mô tả</label>
            <div>
              <TinyMCEFieldFormHook
                value={watch('content')}
                setValue={setValue}
                name='content'
                placeholder='Nhập mô tả'
              />
            </div>
          </div>
          <div className='mb-10 fv-row fv-plugins-icon-container'>
            <label className='col-form-label fw-bold fs-6'>Sắp xếp</label>
            <div>
              <TextFieldFormHook
                type='number'
                defaultValue={0}
                control={control}
                id='sort'
                name='sort'
                errorMessage={errors.sort?.message}
                placeholder='Sắp xếp'
              />
            </div>
          </div>
          <div className='mb-10 fv-row fv-plugins-icon-container'>
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
        </KTCardBody>
      </form>
    </KTCard>
  )
}
export default CreateCategoryPage
