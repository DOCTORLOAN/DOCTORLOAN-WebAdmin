import { Option } from "@/types/Commons/option"
import { TResult } from "@/types/Commons/result"
import { NewsCategoryDto } from "@/types/News/news.model"
import _ from "lodash"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { filterNewsCategories, getNewsCategoryId, saveNewsCategory } from "src/app/apis/News/news.category.api"
import { alertMessage } from "src/app/utils/commons/alert"
import { AlertType } from "src/app/utils/enums/base"


export const useNewsCategory=()=>{
  const {categoryId}=useParams()
    const {data:newsCategoriesOptions}=useQuery("",async()=>{
      const response= await filterNewsCategories({page:1,take:Number.MAX_VALUE})
      return [{label:"Danh mục chính",value:"0"} as Option].concat(preparingCategoryTree(response.data!.items))
    })
    const queryNewsCategory=useQuery(["getNewsCategoryId",categoryId],async()=>{
      const response=await getNewsCategoryId(_.toInteger(categoryId))
      return response
    },{
      
      enabled: _.toInteger(categoryId)>0
    })
  

    //#endregion
   
    const mutationSaveNewsCategory = useMutation((param: NewsCategoryDto) =>saveNewsCategory(param), {
      onSuccess: async (response: TResult<number>) => {
        console.log(response)
        if (!response.succeeded) {
          alertMessage(response.error?.message||"", AlertType.Error)      
          return;
        }
        alertMessage('Successfully', AlertType.Success, function () {
          if(categoryId)
          queryNewsCategory.refetch()
          else
          window.location.href =`/news-category/edit/${response.data}`
        })
      },
      onError: (error: any) => {
        alertMessage(error.response, AlertType.Error)
      },
    })
    const preparingCategoryTree=( categories:NewsCategoryDto[])=>{
        const options:Option[]=[]
        const getName=(name:string, category:NewsCategoryDto):string=>{
          if(!category.parentId)
          return name
          const parent=categories.find(x=>x.id===category.parentId)
        return getName(name,parent!) + " >> " +name;
        }   
        for(let c of categories)
          {
            const name=getName(c.name,c)
            options.push({value:c.id,label:name})
          }
        return options
  
      }
      return{
        newsCategoriesOptions,
        mutationSaveNewsCategory,
        queryNewsCategory,
        categoryId
      }
}