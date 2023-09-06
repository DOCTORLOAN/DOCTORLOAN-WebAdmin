export type TSignIn = {
  userName?: string
  password: string
  firstName?: string
  lastName?: string
  email?: string
  code?: string
}

export type TResetToken = {
  email: string
  password: string
  token: string
}

export type TForgotPassword = {
  token: string
  newPassword: string
  reTypeNewPassword: string
}

export type TSignInResponse = {
  access_token: string
  expires_in: number
  expires_on: number
  refresh_token: string
}
