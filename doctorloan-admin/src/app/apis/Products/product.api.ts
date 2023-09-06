import {  PaginatedList, TResult } from "@/types/Commons/result"
import { FilterProductQuery, ListProductOptions, ProductDto, ProductFilterResultDto, UpdateProductStatusCommand } from "@/types/Products/product.model"
import { objectToFormData } from "src/app/utils/commons/helper"
import { APIURL } from "src/app/utils/constants/api-path"
import api from "src/app/_config/api"
export const getProductOptions=async ():Promise<TResult<ListProductOptions>>=> {
    const res = await api.get<TResult<ListProductOptions>>(APIURL.PRODUCT.GetOptions)
    return res.data
  }
  export const getProduct=async (id:number):Promise<TResult<ProductDto>>=> {
    const res = await api.get<TResult<ProductDto>>(APIURL.PRODUCT.GetProduct+"?id="+id)
    return res.data
  }
  export const filterProduct=async (params:FilterProductQuery)=> {
    const res = await api.get<TResult<PaginatedList<ProductFilterResultDto>>>(APIURL.PRODUCT.FilterProducts,{
      params:params
    })
    return res.data
  }
  export const insertProduct = async (param:  ProductDto): Promise<TResult<number>> => {
    try {
      var formData=objectToFormData(param)
      const res = await api.post<TResult<number>>(APIURL.PRODUCT.InsertProduct, formData,{
        headers: { "Content-Type": "multipart/form-data" },
      })
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const updateProduct = async (param:  ProductDto): Promise<TResult<number>> => {
    try {
      var formData=objectToFormData(param)
      const res = await api.put<TResult<number>>(APIURL.PRODUCT.UpdateProduct+"/"+param.id, formData,{
        headers: { "Content-Type": "multipart/form-data" },
      })
    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const updateProductStatus = async (param:  UpdateProductStatusCommand):Promise<TResult<boolean>>=> {
    try {
      const res = await api.put<TResult<boolean>>(APIURL.PRODUCT.UpdateProductStatus,param)    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const deleteProduct = async (id:  number):Promise<TResult<boolean>>=> {
    try {
      const res = await api.delete<TResult<boolean>>(APIURL.PRODUCT.DeleteProduct+"/"+id)    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }