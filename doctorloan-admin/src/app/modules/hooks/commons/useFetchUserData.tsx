import {QUERIES} from 'src/_doctor/helpers/'
import {useQuery} from 'react-query'
import {getListOptions} from 'src/app/apis/Commons/fetch-data.api'
import {OptionType} from 'src/app/utils/enums/common.enum'

export function useFetchOption(type: OptionType) {
  return useQuery([QUERIES.LIST_ROLE], () => getListOptions(type), {enabled: false})
}
