import {StatusEnum} from '../enums/status.eneum'

export const listCommonStatus = [
  {
    label: 'Chưa kích hoạt',
    value: StatusEnum.Draft,
  },
  {
    label: 'Kích hoạt',
    value: StatusEnum.Publish,
  }
]
