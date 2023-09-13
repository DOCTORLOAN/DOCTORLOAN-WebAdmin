import {ID} from 'src/_doctor/helpers'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'

export type UserForm = {
  id?: ID
  code?: string
  roleName?: string
  firstName?: string
  lastName?: string
  fullName?: string
  email?: string
  phone?: string
  status?: StatusEnum
  gender?: number
  isResetPassword?: boolean
  isSignOut?: boolean
  lastSignIn?: string

  avatar?: string
  position?: string
  initials?: {
    label: string
    state: string
  }
  password?: string
  confirmPassword?: string
}
