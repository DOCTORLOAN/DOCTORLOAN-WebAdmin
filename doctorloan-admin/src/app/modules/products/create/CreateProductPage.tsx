/* eslint-disable jsx-a11y/anchor-is-valid */
import TextFieldFormHook from 'src/app/components/Forms/Input'
import {ProductDto, ProductItemDto} from '@/types/Products/product.model'
import {useFieldArray, useForm} from 'react-hook-form'

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import MyDropzone from 'src/app/components/Forms/MyDropzone'
import SelectFieldFormHook from 'src/app/components/Forms/Select'
import CreatableSelect from 'react-select/creatable'
import Switcher from 'src/app/components/Forms/Switcher'
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react'
import Select, {MultiValue} from 'react-select'
import clsx from 'clsx'
import useSaveProduct from 'src/app/hooks/Products/useSaveProduct'
import {Option} from '@/types/Commons/option'
import _, {toInteger} from 'lodash'
import {removeAccents} from 'src/app/utils/commons/string'
import ButtonFormHook from 'src/app/components/Forms/Button'
import {useNavigate} from 'react-router-dom'
import TinyMCEFieldFormHook from 'src/app/components/Forms/TinyMCEField'
const languages = [
  {id: 1, name: 'vi', text: 'Tiếng việt'},
  {id: 2, name: 'en', text: 'English'},
]
interface ISelectOpt {
  optionName: string
  optionId: number
  values: string[]
}
const defaultProductItem = {
  sku: '',
  name: '',
  price: 0,
  priceDiscount: 0,
  productOptions: [],
  quantity: 0,
}

const resources = {
  vi: {
    summary: 'Mô tả ngắn',
    description: 'Chi tiết',
  },
  en: {
    summary: 'Short description',
    description: 'Full description',
  },
}
const CreateProductPage = () => {
  const navigate = useNavigate()
  const [hasOption, setHasOption] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<ISelectOpt[]>([])

  const validateItemSchema = Yup.object().shape({
    price: Yup.number()
      .required('Vui lòng nhập giá')
      .min(0, 'Vui lòng nhập giá lớn hơn hoặc bằng 0')
      .max(9000000000, 'Vui lòng nhập giá nhỏ hơn hoặc bằng 9.000.000.000'),
    priceDiscount: Yup.number()
      .min(0, 'Vui lòng nhập giá khuyến mãi lớn hơn hoặc bằng 0')
      .max(9000000000, 'Vui lòng nhập giá khuyến mãi nhỏ hơn hoặc bằng 9.000.000.000')
      .nullable(),
    quantity: Yup.number()
      .min(0, 'Vui lòng nhập số lượng lớn hơn hoặc bằng 0')
      .max(1000000, 'Vui lòng nhập số lượng nhỏ hơn hoặc bằng 1.000.000')
      .nullable(),
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nhập tên sản phẩm'),
    sku: Yup.string().required('Nhập mã sản phẩm'),
    brandId: Yup.number().required('Chọn thương hiệu'),
    categoryIds: Yup.array().required('Chọn 1 danh mục'),
    id: Yup.number().default(0),
    productAttributes: Yup.array(),
    productDetails: Yup.array(),
    productItems: Yup.array().of(validateItemSchema),
    productMedias: Yup.array(),
    status: Yup.number(),
    slug: Yup.string(),
    price: Yup.number()
      .required('Vui lòng nhập giá')
      .min(0, 'Vui lòng nhập giá lớn hơn hoặc bằng 0')
      .max(9000000000, 'Vui lòng nhập giá nhỏ hơn hoặc bằng 9.000.000.000'),
    priceDiscount: Yup.number()
      .min(0, 'Vui lòng nhập giá khuyến mãi lớn hơn hoặc bằng 0')
      .max(9000000000, 'Vui lòng nhập giá khuyến mãi nhỏ hơn hoặc bằng 9.000.000.000')
      .nullable(),
    quantity: Yup.number()
      .min(0, 'Vui lòng nhập số lượng lớn hơn hoặc bằng 0')
      .max(1000000, 'Vui lòng nhập số lượng nhỏ hơn hoặc bằng 1.000.000')
      .nullable(),
  })
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    formState: {errors, touchedFields, isValid},
  } = useForm<ProductDto>({
    defaultValues: {
      productItems: [defaultProductItem],
      productDetails: languages.map((x) => ({
        languageId: x.id,
      })),
      productMedias: [],
      productAttributes: [],
    },
    resolver: yupResolver(validationSchema),
  })
  const {listProductOptions, mutationSaveProduct, queryGetProduct} = useSaveProduct()
  const {fields: productDetails} = useFieldArray({name: 'productDetails', control: control})

  const {
    fields: productMedias,
    append: appendProductMedias,
    remove: removeProductMedias,
  } = useFieldArray({name: 'productMedias', control: control})
  const {
    fields: productAttributes,
    append: appendProductAttributes,
    remove: removeProductAttributes,
  } = useFieldArray({
    name: 'productAttributes',
    control: control,
  })
  const {
    fields: productItems,
    append: addProductItem,
    remove: removeProductItem,
  } = useFieldArray({
    name: 'productItems',
    control: control,
  })

  const handleHasOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasOption(e.target.checked)
    if (e.target.checked) {
      setSelectedOptions([])
      setValue('productItems', [])
    } else setValue('productItems', [defaultProductItem])
  }
  const handleOptionValueChange = (optionId: number, options: MultiValue<Option>) => {
    const _optionIndex = selectedOptions.findIndex((x) => x.optionId === optionId)
    setSelectedOptions((prev) => {
      prev[_optionIndex].values = options.map((x) => x.value?.toString() || '')
      generateVariants(prev)
      return prev
    })
  }
  const handleSelectGroupOption = (options: MultiValue<Option>) => {
    const _selectedOptions = _.clone(selectedOptions).filter((x) =>
      options.find((i) => toInteger(i.value) === x.optionId)
    )
    for (let item of options) {
      if (!_selectedOptions.find((x) => x.optionId === item.value))
        _selectedOptions.push({
          optionId: toInteger(item.value),
          optionName: item.label || '',
          values: [],
        })
    }

    setSelectedOptions(_selectedOptions)
  }
  const handleSetImage = (value: any, index: number) => {
    const productItems = getValues('productItems')
    var productItem = productItems.find((x) => x.sku === value)
    if (productItem) {
      const productMedias = getValues('productMedias')
      productMedias[index].itemCode = productItem.sku
      setValue('productMedias', productMedias)
    }
  }
  const generateVariants = useCallback(
    (_selectedOptions: ISelectOpt[]) => {
      const variants: ProductItemDto[] = []

      function generateCombinations(variantIndex: number, currentCombination: ProductItemDto) {
        if (variantIndex === _selectedOptions.length) {
          variants.push({...currentCombination})
          return
        }

        const currentAttribute = _selectedOptions[variantIndex]
        for (const value of currentAttribute.values) {
          const newOption = {
            optionGroupId: currentAttribute.optionId,
            name: value,
            displayValue: value,
          }
          // Create a new object for each combination
          const newCombination: ProductItemDto = {
            ...currentCombination,
            productOptions: [...currentCombination.productOptions, newOption],
          }
          generateCombinations(variantIndex + 1, newCombination)
        }
      }

      generateCombinations(0, defaultProductItem)
      removeProductItem()
      for (let v of variants) {
        v.price = getValues('price') ?? 0
        v.priceDiscount = getValues('priceDiscount') ?? 0
        const optionsName = v.productOptions.map((x) => x.name).join('-')
        v.name = getValues('name') + ' - ' + optionsName
        v.sku = getValues('sku') + '-' + removeAccents(optionsName).toUpperCase()
        addProductItem(v)
      }
    },
    [addProductItem, removeProductItem, getValues]
  )
  const handleUploadFile = (files: File[]) => {
    for (const file of files) appendProductMedias({mediaId: 0, file: file})
  }
  const handleFileRemove = (index: number) => {
    removeProductMedias(index)
  }
  const handleSubmitForm = async (data: ProductDto) => {
    if (data.productItems.length === 1) {
      data.productItems[0].name = data.name
      data.productItems[0].sku = data.sku
      data.productItems[0].price = data.price || 0
      data.productItems[0].priceDiscount = data.priceDiscount || 0
      data.productItems[0].quantity = data.quantity || 0
    }
    data.productAttributes = data.productAttributes.filter((x) => x.attributeId > 0)
    await mutationSaveProduct.mutateAsync(data)
  }
  const selectedGroup = useMemo(
    () =>
      listProductOptions?.optionGroups?.filter((x) =>
        selectedOptions.find((c) => c.optionId === x.value)
      ),
    [listProductOptions?.optionGroups, selectedOptions]
  )
  const title = watch('id') > 0 ? 'Cập nhật sản phẩm - ' + watch('name') : 'Tạo mới sản phẩm'
  useEffect(() => {
    if (queryGetProduct.data) {
      reset(queryGetProduct.data)
      setHasOption(queryGetProduct.data.productItems.length > 1)
      if (queryGetProduct.data.productItems.length > 1) {
        const options = queryGetProduct.data.productItems.flatMap((x) => x.productOptions)
        const _groupOptions = _.groupBy(options, (x) => x.optionGroupId)
        const _optionValues: ISelectOpt[] = Object.keys(_groupOptions).map((x) => ({
          optionName:
            listProductOptions?.optionGroups?.find((o) => o.value?.toString() === x.toString())
              ?.label || '',
          optionId: +x,
          values: _groupOptions[x]
            .map((c) => c.name)
            .filter((value, index, arr) => arr.indexOf(value) === index),
        }))
        setSelectedOptions(_optionValues)
      } else {
      }
    }
  }, [listProductOptions?.optionGroups, queryGetProduct.data, reset])

  if (!listProductOptions?.categories) return <></>

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
            <a href='#' className='ms-3' onClick={() => navigate('/products/list')}>
              {'<<'} Quay lại
            </a>
          </div>
          <div className='card-toolbar'>
            <ButtonFormHook
              disabled={mutationSaveProduct.isLoading}
              loading={mutationSaveProduct.isLoading}
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
                <label className='col-form-label fw-bold fs-6 required'>Tên sản phẩm</label>

                <div>
                  <TextFieldFormHook
                    control={control}
                    id='name'
                    name='name'
                    errorMessage={errors.name?.message}
                    placeholder='Tên sản phẩm'
                  />
                </div>
              </div>
              <div className='col-4'>
                <label className='col-form-label fw-bold fs-6 required'>Mã sản phẩm</label>
                <div>
                  <TextFieldFormHook
                    control={control}
                    id='code'
                    name='sku'
                    errorMessage={errors.sku?.message}
                    placeholder='Mã sản phẩm'
                  />
                </div>
              </div>

              <div className='col-4'>
                <label className='col-form-label fw-bold fs-6 required'>Danh mục</label>
                <div>
                  <SelectFieldFormHook
                    listOption={listProductOptions.categories || []}
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
                    placeholder='Chọn danh mục'
                  />
                </div>
              </div>
              <div className='col-4'>
                <label className='col-form-label fw-bold fs-6 required'>Thương hiệu</label>
                <div>
                  <SelectFieldFormHook
                    listOption={listProductOptions.brands || []}
                    control={control}
                    register={register}
                    id='brandId'
                    name='brandId'
                    errorMessage={errors.brandId?.message}
                    touchedFields={touchedFields}
                    isValid={isValid}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='collapse show'>
          <div className='card-body border-top p-9'>
            <h5>Mô tả sản phẩm</h5>
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
              {productDetails.map((item, index) => {
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
                          {(resources as any)[language.name].summary}
                        </label>

                        <div>
                          <TextFieldFormHook
                            control={control}
                            id='name'
                            name={`productDetails.${index}.summary`}
                            type='textarea'
                            placeholder={(resources as any)[language.name].summary}
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label className='col-form-label fw-bold fs-6'>
                          {(resources as any)[language.name].description}
                        </label>
                        <div>
                          <TinyMCEFieldFormHook
                            value={watch(`productDetails.${index}.description`)}
                            setValue={setValue}
                            name={`productDetails.${index}.description`}
                            touchedFields={touchedFields}
                            isValid={isValid}
                            placeholder={(resources as any)[language.name].description}
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
            <h5>Thông số sản phẩm</h5>
            <div className='row mb-6'>
              <div className='col-12 px-2'>
                <table className='table table-hover table-rounded table-striped border gy-4 gs-7'>
                  <thead>
                    <tr className='fw-bold text-gray-800'>
                      <th>Tên</th>
                      <th>Giá trị</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productAttributes.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <SelectFieldFormHook
                              rules={{required: 'Vui lòng chọn'}}
                              control={control}
                              name={`productAttributes.${index}.attributeId`}
                              isClearable
                              isOptionDisabled={(option: Option) =>
                                watch('productAttributes').find(
                                  (x) => x.attributeId === option.value
                                )
                              }
                              listOption={listProductOptions.attributes}
                            />
                          </td>
                          <td>
                            <TextFieldFormHook
                              type='textarea'
                              control={control}
                              rules={{required: 'Nhập mô tả'}}
                              id={`productAttributes.${index}.value`}
                              name={`productAttributes.${index}.value`}
                              placeholder='Mô tả'
                            />
                          </td>
                          <td>
                            <button
                              onClick={() => removeProductAttributes(index)}
                              type='button'
                              className='btn btn-danger btn-sm'
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>
                        <button
                          onClick={() => appendProductAttributes({attributeId: 0, value: ''})}
                          type='button'
                          className='btn btn-info btn-sm'
                        >
                          Thêm
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='collapse show'>
          <div className='card-body border-top p-9'>
            <h5>Giá / Tồn kho sản phẩm</h5>
            <div className='row mb-6'>
              <div className='col-4'>
                <label className='col-form-label fw-bold fs-6'>Giá Bán</label>
                <div>
                  <TextFieldFormHook
                    type='number'
                    control={control}
                    name='price'
                    errorMessage={errors.price?.message}
                    placeholder='Giá'
                  />
                </div>
              </div>

              <div className='col-4'>
                <label className='col-form-label fw-bold fs-6'>Giá Khuyến Mãi</label>

                <div>
                  <TextFieldFormHook
                    type='number'
                    control={control}
                    name='priceDiscount'
                    errorMessage={errors.priceDiscount?.message}
                    placeholder='Giá khuyến mãi'
                  />
                </div>
              </div>
              <div className='col-4'>
                <label className='col-form-label fw-bold fs-6'>Số lượng bán</label>
                <div>
                  <TextFieldFormHook
                    type='number'
                    control={control}
                    name='quantity'
                    placeholder='Số lượng bán'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='collapse show'>
          <div className='card-body border-top p-9'>
            <h5>
              <Switcher
                checked={hasOption}
                onChange={(e) => handleHasOptionChange(e)}
                label='Sản phẩm có thuộc tính '
              />
            </h5>
            {hasOption && (
              <div className='row mb-6'>
                <div className='col-6'>
                  <label className='col-form-label fw-bold fs-6'>Chọn thuộc tính</label>
                  <Select
                    onChange={(newValue) => handleSelectGroupOption(newValue)}
                    isMulti
                    isClearable
                    options={listProductOptions.optionGroups}
                    value={selectedGroup}
                  />
                </div>
                <table className='table table-hover table-rounded table-striped border gy-4 gs-7'>
                  <thead>
                    <tr>
                      <th style={{width: '30%'}}>Tên thuộc tính</th>
                      <th>Giá trị</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOptions.map((item) => {
                      const values = item.values.map((x) => ({value: x, label: x} as Option))
                      return (
                        <tr key={item.optionId}>
                          <td>{item.optionName}</td>
                          <td>
                            <CreatableSelect
                              onChange={(e) => handleOptionValueChange(item.optionId, e)}
                              placeholder='Gõ ký tự và ấn Enter để thêm thuộc tính'
                              isMulti
                              isClearable
                              options={values}
                              value={values}
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {hasOption && (
          <div className='collapse show'>
            <div className='card-body border-top p-9'>
              <h5>Phiên bản</h5>
              <div className='row mb-6'>
                <div className='col-12 px-2'>
                  <table className='table table-hover table-rounded table-striped border gy-4 gs-7'>
                    <thead>
                      <tr className='fw-bold text-gray-800'>
                        <th>Thuộc tính</th>
                        <th>Tên</th>
                        <th>Mã SKU</th>
                        <th>Giá bán </th>
                        <th>Giá khuyến mãi</th>
                        <th>Số lượng bán</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productItems.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.productOptions.map((x) => x.name).join('-')}</td>
                            <td>
                              <TextFieldFormHook
                                control={control}
                                rules={{required: 'Nhập tên'}}
                                id={`productItems.${index}.name`}
                                name={`productItems.${index}.name`}
                                placeholder='Tên'
                              />
                            </td>
                            <td>
                              <TextFieldFormHook
                                control={control}
                                rules={{required: 'Nhập sku'}}
                                id={`productItems.${index}.sku`}
                                name={`productItems.${index}.sku`}
                                placeholder='Mã SKU'
                              />
                            </td>
                            <td>
                              <TextFieldFormHook
                                control={control}
                                id={`productItems.${index}.price`}
                                name={`productItems.${index}.price`}
                                placeholder='Giá bán'
                                errorMessage={
                                  errors.productItems
                                    ? errors.productItems[index]?.price?.message
                                    : ''
                                }
                              />
                            </td>
                            <td>
                              <TextFieldFormHook
                                control={control}
                                id={`productItems.${index}.priceDiscount`}
                                name={`productItems.${index}.priceDiscount`}
                                errorMessage={
                                  errors.productItems
                                    ? errors.productItems[index]?.priceDiscount?.message
                                    : ''
                                }
                                placeholder='Giá khuyến mãi'
                              />
                            </td>
                            <td>
                              <TextFieldFormHook
                                control={control}
                                id={`productItems.${index}.quantity`}
                                name={`productItems.${index}.quantity`}
                                placeholder='Số lượng bán'
                                errorMessage={
                                  errors.productItems
                                    ? errors.productItems[index]?.quantity?.message
                                    : ''
                                }
                              />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='collapse show'>
        <div className='card-body border-top p-9'>
          <h5>Hình ảnh</h5>
          <div className='row mb-6'>
            <div className='col-12'>
              <MyDropzone
                existingFiles={productMedias.map((x) => x.mediaUrl || '')}
                onFileDrop={handleUploadFile}
                onFileRemove={handleFileRemove}
                renderChild={(index) => {
                  const selectedVal = watch('productMedias')[index].itemCode
                  return (
                    <>
                      <select
                        style={{position: 'absolute', bottom: 0}}
                        name={'a_' + index}
                        onChange={(e) => handleSetImage(e.target.value, index)}
                        value={selectedVal}
                      >
                        <option value=''>Dùng cho tất cả</option>
                        {watch('productItems').map((op, index) => {
                          return (
                            <option value={op.sku} key={index}>
                              {op.name}
                            </option>
                          )
                        })}
                      </select>
                    </>
                  )
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
export default CreateProductPage
