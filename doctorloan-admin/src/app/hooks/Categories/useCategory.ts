import { CategoryDto } from "@/types/Categories/category.model"
import { Option } from "@/types/Commons/option"
import { TResult } from "@/types/Commons/result"
import _ from "lodash"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { filterCategories, getCategory, saveCategory } from "src/app/apis/Categories/category.api"
import { alertMessage } from "src/app/utils/commons/alert"
import { AlertType } from "src/app/utils/enums/base"

function useCategory() {
    const {categoryId}=useParams()
    
    //#endregion
  
    //#region mock data
    const {data:listParentCategory}=useQuery("getCategories",async()=>{
      const response=await filterCategories({page:1,take:Number.MAX_VALUE})
      return preparingCategoryTree(response.data?.items||[])
    },{
      cacheTime:30
    })
    const queryGetCategory=useQuery(["getCategory",categoryId],async()=>{
      const response=await getCategory(_.toInteger(categoryId))
      return response.data
    },{
      
      enabled: _.toInteger(categoryId)>0
    })

    //#endregion
   
    const mutationSaveCategory = useMutation((param: CategoryDto) =>saveCategory(param), {
      onSuccess: async (response: TResult<number>) => {
        console.log(response)
        if (!response.succeeded) {
          alertMessage(response.error?.message||"", AlertType.Error)      
          return;
        }
        alertMessage('Successfully', AlertType.Success, function () {
          if(categoryId)
          queryGetCategory.refetch()
          else
          window.location.href=`/category/edit/${response.data}`
        })
      },
      onError: (error: any) => {
        alertMessage(error.response, AlertType.Error)
      },
    })
    const preparingCategoryTree=( categories:CategoryDto[])=>{
      const options:Option[]=[]
      const getName=(name:string, category:CategoryDto):string=>{
        if(!category?.parentId)
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
    return {
        listParentCategory,
        mutationSaveCategory,
        queryGetCategory
    }
  }
  
  export default useCategory
  