import {Option} from '@/types/Commons/option'
import {TResult} from '@/types/Commons/result'
import {AxiosResponse} from 'axios'
import api from 'src/app/_config/api'
import {APIURL} from 'src/app/utils/constants/api-path'
import {OptionType} from 'src/app/utils/enums/common.enum'

const getListOptions = (type: OptionType): Promise<TResult<Option[]>> => {
  return api
    .get(APIURL.COMMON.LIST_OPTION + type)
    .then((d: AxiosResponse<TResult<Option[]>>) => d.data)
}

//#region Page permission API
// export const getListOptions = async (type: OptionType) => {
//   try {
//     const res = await api.get(APIURL.COMMON.LIST_OPTION + type)
//     return res.data as AxiosResponse<Option[]>
//   } catch (error: any) {}
// }

export {getListOptions}
