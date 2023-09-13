import {  PaginatedList, TResult } from "@/types/Commons/result"
import { FilterNewsItemsQuery, NewsItemDto, NewsItemFilterResultDto, UpdateNewsItemStatusCommand } from "@/types/News/news.model"
import { objectToFormData } from "src/app/utils/commons/helper"
import { APIURL } from "src/app/utils/constants/api-path"
import api from "src/app/_config/api"

  export const getNews=async (id:number):Promise<TResult<NewsItemDto>>=> {
    const res = await api.get<TResult<NewsItemDto>>(APIURL.NEWS.GetNewById+"?id="+id)
    return res.data
  }
  export const filterNews=async (params:FilterNewsItemsQuery)=> {
    const res = await api.get<TResult<PaginatedList<NewsItemFilterResultDto>>>(APIURL.NEWS.FilterNews,{
      params:params
    })
    return res.data
  }
  export const getTags=async ()=> {
    const res = await api.get<TResult<{id:number,name:string}[]>>(APIURL.NEWS.GetTags)
    return res.data
  }
  export const insertNews = async (param:  NewsItemDto): Promise<TResult<number>> => {
    try {
      var formData=objectToFormData(param)
      const res = await api.post<TResult<number>>(APIURL.NEWS.InsertNews, formData,{
        headers: { "Content-Type": "multipart/form-data" },
      })
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const updateNews = async (param:  NewsItemDto): Promise<TResult<number>> => {
    try {
      var formData=objectToFormData(param)
      const res = await api.put<TResult<number>>(APIURL.NEWS.UpdateNews+"/"+param.id, formData,{
        headers: { "Content-Type": "multipart/form-data" },
      })
    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const updateNewsStatus = async (param:  UpdateNewsItemStatusCommand):Promise<TResult<boolean>>=> {
    try {
      const res = await api.put<TResult<boolean>>(APIURL.NEWS.UpdatNewsStatus,param)    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }
  export const deleteNews = async (id:number):Promise<TResult<boolean>>=> {
    try {
      const res = await api.delete<TResult<boolean>>(APIURL.NEWS.DeleteNews,{data:{id}})    
      return res.data
    } catch (error: any) {
      return error?.response?.data
    }
  }