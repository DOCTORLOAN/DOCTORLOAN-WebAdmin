/* eslint-disable jsx-a11y/anchor-is-valid */
import TextFieldFormHook from 'src/app/components/Forms/Input'
import {useFieldArray, useForm} from 'react-hook-form'

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import MyDropzone from 'src/app/components/Forms/MyDropzone'
import SelectFieldFormHook from 'src/app/components/Forms/Select'
import {useEffect} from 'react'
import clsx from 'clsx'
import ButtonFormHook from 'src/app/components/Forms/Button'
import {useNavigate} from 'react-router-dom'
import {NewsItemDto} from '@/types/News/news.model'
import useSaveNews from 'src/app/hooks/News/useSaveNews'
import {useNewsCategory} from 'src/app/hooks/News/useNewsCategory'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'
import TinyMCEFieldFormHook from 'src/app/components/Forms/TinyMCEField'
const languages = [
  {id: 1, name: 'vi', text: 'Tiếng việt'},
  {id: 2, name: 'en', text: 'English'},
]

const resources = {
  vi: {
    title: 'Tiêu đề tiếng việt',
    short: 'Mô tả ngắn',
    full: 'Chi tiết',
  },
  en: {
    title: 'English title',
    short: 'Short description',
    full: 'Full description',
  },
}
const CreateNewsPage = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Nhập tiêu đề '),
    metaDescription: Yup.string(),
  })
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    watch,

    formState: {errors, touchedFields, isValid},
  } = useForm<NewsItemDto>({
    defaultValues: {
      newsItemDetails: languages.map((x) => ({
        languageId: x.id,
      })),
      categoryIds: [],
      tags: [],
      newsMedias: [],
      status: StatusEnum.Draft,
    },
    resolver: yupResolver(validationSchema),
  })
  const {newsCategoriesOptions} = useNewsCategory()
  const {mutationSaveNews, queryGetNews} = useSaveNews()
  const {fields: newsItemDetails} = useFieldArray({name: 'newsItemDetails', control: control})

  const {
    fields: newsMedias,
    append: appendNewsMedias,
    remove: removeNewsMedias,
  } = useFieldArray({name: 'newsMedias', control: control})

  const handleUploadFile = (files: File[]) => {
    for (const file of files) appendNewsMedias({mediaId: 0, file: file})
  }
  const handleFileRemove = (index: number) => {
    removeNewsMedias(index)
  }
  const handleSubmitForm = async (data: NewsItemDto) => {
    await mutationSaveNews.mutateAsync(data)
  }

  const title = watch('id') > 0 ? 'Cập nhật tin tức - ' + watch('title') : 'Tạo mới tin tức'
  useEffect(() => {
    if (queryGetNews.data) {
      reset(queryGetNews.data)
    }
  }, [queryGetNews.data, reset])

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
            <a href='#' className='ms-3' onClick={() => navigate('/news/list')}>
              {'<<'} Quay lại
            </a>
          </div>
          <div className='card-toolbar'>
            <ButtonFormHook
              disabled={mutationSaveNews.isLoading}
              loading={mutationSaveNews.isLoading}
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
              <div className='col-12'>
                <label className='col-form-label fw-bold fs-6 required'>Tiêu đề</label>

                <div>
                  <TextFieldFormHook
                    control={control}
                    name='title'
                    errorMessage={errors.title?.message}
                    placeholder='Tiêu đề tin tức'
                  />
                </div>
              </div>

              <div className='col-4'>
                <label className='col-form-label fw-bold fs-6 required'>Danh mục</label>
                <div>
                  <SelectFieldFormHook
                    listOption={newsCategoriesOptions || []}
                    isMulti
                    isClearable
                    isSearchable
                    control={control}
                    register={register}
                    id='categoryIds'
                    name='categoryIds'
                    errorMessage={errors.categoryIds?.message}
                    touchedFields={touchedFields}
                    isValid={isValid}
                    placeholder='Danh mục chính'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='collapse show'>
          <div className='card-body border-top p-9'>
            <h5>Chi tiết tin tức</h5>
            <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
              {languages.map((l) => {
                return (
                  <li key={l.id} className='nav-item'>
                    <a
                      className={clsx('nav-link', {active: l.name === 'vi'})}
                      data-bs-toggle='tab'
                      href={'#tab_' + l.id}
                    >
                      {l.text}
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className='tab-content' id='myTabContent'>
              {newsItemDetails.map((item, index) => {
                let language = languages.find((x) => x.id === item.languageId)
                if (!language) language = languages[0]
                return (
                  <div
                    key={item.languageId}
                    className={clsx('tab-pane', {active: index === 0})}
                    id={`tab_${item.languageId}`}
                    role='tabpanel'
                  >
                    <div className='row mb-6'>
                      <div className='col-12'>
                        <label className='col-form-label fw-bold fs-6'>
                          {(resources as any)[language.name].title}
                        </label>

                        <div>
                          <TextFieldFormHook
                            control={control}
                            id='name'
                            name={`newsItemDetails.${index}.title`}
                            placeholder={(resources as any)[language.name].title}
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label className='col-form-label fw-bold fs-6'>
                          {(resources as any)[language.name].short}
                        </label>

                        <div>
                          <TextFieldFormHook
                            control={control}
                            id='name'
                            name={`newsItemDetails.${index}.short`}
                            type='textarea'
                            placeholder={(resources as any)[language.name].short}
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label className='col-form-label fw-bold fs-6'>
                          {(resources as any)[language.name].full}
                        </label>
                        <div>
                          <TinyMCEFieldFormHook
                            value={watch(`newsItemDetails.${index}.full`)}
                            setValue={setValue}
                            name={`newsItemDetails.${index}.full`}
                            touchedFields={touchedFields}
                            isValid={isValid}
                            placeholder={(resources as any)[language.name].full}
                          />
                        </div>
                      </div>
                      <h3 className='my-2'>SEO</h3>
                      <div className='col-12'>
                        <label className='col-form-label fw-bold fs-6'>Meta title</label>

                        <div>
                          <TextFieldFormHook
                            control={control}
                            id='name'
                            name={`newsItemDetails.${index}.metaTitle`}
                            placeholder='Meta title'
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label className='col-form-label fw-bold fs-6'>Meta description</label>

                        <div>
                          <TextFieldFormHook
                            control={control}
                            id='name'
                            name={`newsItemDetails.${index}.metaDescription`}
                            placeholder='Meta description'
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label className='col-form-label fw-bold fs-6'>Meta keyword</label>

                        <div>
                          <TextFieldFormHook
                            control={control}
                            id='name'
                            name={`newsItemDetails.${index}.metaKeyword`}
                            placeholder='Meta keyword'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='collapse show'>
          <div className='card-body border-top p-9'>
            <h5>Hình ảnh</h5>
            <div className='row mb-6'>
              <div className='col-12'>
                <MyDropzone
                  existingFiles={newsMedias.map((x) => x.mediaUrl || '')}
                  onFileDrop={handleUploadFile}
                  onFileRemove={handleFileRemove}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
export default CreateNewsPage
