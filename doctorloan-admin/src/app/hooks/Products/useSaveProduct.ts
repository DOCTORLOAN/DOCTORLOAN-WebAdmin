import {TResult} from '@/types/Commons/result'
import {ProductDto} from '@/types/Products/product.model'
import _ from 'lodash'
import {useMutation, useQuery} from 'react-query'
import {useParams} from 'react-router-dom'
import {
  getProduct,
  getProductOptions,
  insertProduct,
  updateProduct,
} from 'src/app/apis/Products/product.api'
import {alertMessage} from 'src/app/utils/commons/alert'
import {AlertType} from 'src/app/utils/enums/base'

function useSaveProduct() {
  const {productId} = useParams()

  //#endregion

  //#region mock data
  const {data: listProductOptions} = useQuery(
    'getProductOptions',
    async () => {
      const response = await getProductOptions()
      return response.data
    },
    {
      cacheTime: 30,
    }
  )
  const queryGetProduct = useQuery(
    ['getProduct', productId],
    async () => {
      const response = await getProduct(_.toInteger(productId))
      return response.data
    },
    {
      enabled: _.toInteger(productId) > 0,
    }
  )

  //#endregion

  const mutationSaveProduct = useMutation(
    (param: ProductDto) => (param.id > 0 ? updateProduct(param) : insertProduct(param)),
    {
      onSuccess: async (response: TResult<number>) => {
        console.log(response)
        if (!response.succeeded) {
          alertMessage(response.error?.message || '', AlertType.Error)
          return
        }
        alertMessage('Successfully', AlertType.Success, function () {
          if (productId)
              queryGetProduct.refetch()
          else  window.location.href=`/products/edit/${response.data}`
        })
      },
      onError: (error: any) => {
        alertMessage(error.response, AlertType.Error)
      },
    }
  )

  return {
    listProductOptions,
    mutationSaveProduct,
    queryGetProduct,
  }
}

export default useSaveProduct
