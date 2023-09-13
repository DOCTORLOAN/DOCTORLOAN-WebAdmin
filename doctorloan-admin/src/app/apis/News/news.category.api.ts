import { PaginatedList, TResult } from "@/types/Commons/result"
import { GetNewsCategoriesQuery, NewsCategoryDto } from "@/types/News/news.model"
import { APIURL } from "src/app/utils/constants/api-path"
import api from "src/app/_config/api"
import { StatusEnum } from "src/app/utils/enums/status.eneum"

export const getNewsCategoryId=async (id:number):Promise<TResult<NewsCategoryDto>>=> {
    const res = await api.get<TResult<NewsCategoryDto>>(APIURL.NEWS_CATEGORY.GetNewsCategoryId+"?id="+id)
    return res.data
  }
  export const filterNewsCategories=async (params:GetNewsCategoriesQuery)=> {
    const res = await api.get<TResult<PaginatedList<NewsCategoryDto>>>(APIURL.NEWS_CATEGORY.FilterCategories,{
      params:params
    })
    return res.data
  }
  export const saveNewsCategory = async (param:  NewsCategoryDto): Promise<TResult<number>> => {
    try {
     
      const res = await api.post<TResult<number>>(APIURL.NEWS_CATEGORY.SaveCategory, param,{

      })
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const updateNewsCategoryStatus = async (id:number,status:StatusEnum):Promise<TResult<boolean>>=> {
    try {
      const res = await api.put<TResult<boolean>>(APIURL.NEWS_CATEGORY.DeleteCategory+"/id")    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const deleteNewsCategory = async (id:number):Promise<TResult<boolean>>=> {
    try {
      const res = await api.delete<TResult<boolean>>(APIURL.NEWS_CATEGORY.DeleteCategory+"/"+id)    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }