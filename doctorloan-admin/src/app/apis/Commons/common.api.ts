import {TResult} from '@/types/Commons/result'
import api from 'src/app/_config/api'
import {APIURL} from 'src/app/utils/constants/api-path'
import {MenuDto} from '@/types/Commons/menu.model'

export const getMenus = async (): Promise<TResult<MenuDto[]>> => {
  const res = await api.get<TResult<MenuDto[]>>(APIURL.COMMON.GetMenus)
  return res.data

}
