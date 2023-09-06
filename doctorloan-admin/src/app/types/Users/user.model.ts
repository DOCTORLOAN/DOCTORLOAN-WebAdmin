import {ID, Response} from 'src/_doctor/helpers'

export type UserIndex = {
  id?: ID
  code?: string
  roleName?: string
  fullName?: string
  email?: string
  phone?: string
  status?: number
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
}

export type UserIndexQueryResponse = Response<Array<UserIndex>>

export const initialUser: UserIndex = {
  code: 'A01',
  avatar: 'avatars/300-6.jpg',
  position: 'Art Director',
  roleName: 'Administrator',
  fullName: '',
  email: '',
}
