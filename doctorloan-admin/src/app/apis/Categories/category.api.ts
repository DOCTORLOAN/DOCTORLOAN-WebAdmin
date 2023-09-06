import { CategoryDto, FilterCategoryQuery } from "@/types/Categories/category.model"
import {  PaginatedList, TResult } from "@/types/Commons/result"
import { APIURL } from "src/app/utils/constants/api-path"
import api from "src/app/_config/api"

  export const getCategory=async (id:number):Promise<TResult<CategoryDto>>=> {
    const res = await api.get<TResult<CategoryDto>>(APIURL.CATEGORY.GetCategory+"?id="+id)
    return res.data
  }
  export const filterCategories=async (params:FilterCategoryQuery)=> {
    const res = await api.get<TResult<PaginatedList<CategoryDto>>>(APIURL.CATEGORY.FilterCategories,{
      params:params
    })
    return res.data
  }
  export const saveCategory = async (param:  CategoryDto): Promise<TResult<number>> => {
    try {
      
      const res = await api.post<TResult<number>>(APIURL.CATEGORY.SaveCategory, param)
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const deleteCategory = async (id:number):Promise<TResult<boolean>>=> {
    try {
      const res = await api.delete<TResult<boolean>>(APIURL.CATEGORY.DeleteCategory+"/"+id)    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }