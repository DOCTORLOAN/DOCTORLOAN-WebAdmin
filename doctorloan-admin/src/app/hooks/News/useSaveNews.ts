import { TResult } from "@/types/Commons/result"
import { Option } from "@/types/Commons/option"
import { NewsItemDto } from "@/types/News/news.model"
import _ from "lodash"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getNews, getTags, insertNews, updateNews } from "src/app/apis/News/news.api"
import { alertMessage } from "src/app/utils/commons/alert"
import { AlertType } from "src/app/utils/enums/base"

function useSaveNews() {
    const {newsId}=useParams()
    
    //#endregion
  
    //#region mock data
    
    const queryGetNews=useQuery(["queryGetNews",newsId],async()=>{
      const response=await getNews(_.toInteger(newsId))
      return response.data
    },{
      
      enabled: _.toInteger(newsId)>0
    })
    const queryTags=useQuery(["getTags"],async()=>{
      const response=await getTags()
      return response?.data?.map(x=>({value:x.name,label:x.name,other:x.id} as Option))
    },{
      
    })
    //#endregion
   
    const mutationSaveNews = useMutation((param: NewsItemDto) =>param.id>0?updateNews(param): insertNews(param), {
      onSuccess: async (response: TResult<number>) => {
        console.log(response)
        if (!response.succeeded) {
          alertMessage(response.error?.message||"", AlertType.Error)      
          return;
        }
        alertMessage('Successfully', AlertType.Success, function () {
          if(newsId)
          queryGetNews.refetch()
          else
          window.location.href=`/news/edit/${response.data}`
        })
      },
      onError: (error: any) => {
        alertMessage(error.response, AlertType.Error)
      },
    })
  
    return {
  
        mutationSaveNews,
        queryGetNews,
        queryTags
    }
  }
  
  export default useSaveNews
  