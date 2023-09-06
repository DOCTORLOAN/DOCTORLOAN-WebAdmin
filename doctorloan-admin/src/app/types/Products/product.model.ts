import {StatusEnum} from 'src/app/utils/enums/status.eneum'
import {Option} from '../Commons/option'
import {QueryParam} from '../Commons/result'
export type ListProductOptions = {
  categories: Option[]
  optionGroups: Option[]
  brands: Option[]
  attributes: Option[]
}
export interface ProductDto {
  id: number
  name: string
  sku: string
  status: number
  slug: string
  price?: number
  priceDiscount?: number
  productItems: ProductItemDto[]
  productAttributes: ProductAttributeDto[]
  productDetails: ProductDetailDto[]
  productMedias: ProductMediaDto[]
  categoryIds: number[]
  productCategories?: ProductCategoryDto[]
  brandId: number
  quantity?: number
}

export interface ProductItemDto {
  name: string
  sku: string
  priceDiscount: number
  price: number
  quantity: number
  productOptions: ProductOptionDto[]
}

export interface ProductAttributeDto {
  attributeId: number
  value: string
}

export interface ProductDetailDto {
  languageId: number
  description?: string
  summary?: string
  metadataKeyword?: string
  metadataTitle?: string
  metadataDesc?: string
}

export interface ProductMediaDto {
  mediaId: number
  file: Blob | File
  mediaUrl?: string
  itemCode?: string
}
export interface ProductOptionDto {
  optionGroupId: number
  name: string
  displayValue: string
}
export interface ProductCategoryDto {
  name: string
  id: number
}
export interface FilterProductQuery extends QueryParam {
  keyword: string | null
  status: StatusEnum | null
  categoryId?: number
}
export interface ProductFilterResultDto {
  id: number
  name: string
  sku: string
  imageUrl: string
  categoryNames: string[]
  status: StatusEnum
  branchName: string
  avaiableStock: number
  stock: number
  lastModified: string
  productItems: ProductItemDto[]
}
export interface UpdateProductStatusCommand {
  ids: number[]
  status: StatusEnum
}
