import {useState} from 'react'
import {useMutation} from 'react-query'
import {useNavigate} from 'react-router-dom'

import api from 'src/app/_config/api'
import {getProfile, signin} from 'src/app/apis/Authenticates/authen.api'
import {useAuth} from 'src/app/modules/auth/core/Auth'
import {AuthModel} from 'src/app/modules/auth'
import {TSignInResponse, TSignIn} from '@/types/Authens/authen.model'
import {PathURL} from 'src/app/utils/constants/path'
import {TError} from '@/types/Commons/error.model'
import {TResult} from '@/types/Commons/result'

function useAuthen() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<TError>()
  const [errorValidation, setErrorValidation] = useState(null)
  const {saveAuth, auth, setCurrentUser} = useAuth()

  const mutationSignIn = useMutation((item: TSignIn) => signin(item), {
    onSuccess: async (response: TResult<TSignInResponse>) => {
      const {data, succeeded, error} = response
      if (succeeded && data) {
        const auth: AuthModel = {
          api_token: data.access_token,
          refreshToken: data.refresh_token,
          expires_in: data.expires_in,
          expires_on: data.expires_on,
        }
        saveAuth(auth)
        api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`
        await mutationGetProfile.mutateAsync()
      } else {
        saveAuth(undefined)
        setErrorMessage(error)
      }
    },
    onError: (err: any) => {
      saveAuth(undefined)
      if (err) {
        const {errors} = err?.response
        setErrorValidation(errors)
      }
    },
  })

  const mutationGetProfile = useMutation(() => getProfile(), {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: async (response: TResult<any>) => {
      if (!response.succeeded) return
      const updateCurrentUser = {...auth, ...response.data}
      setCurrentUser(updateCurrentUser)
      navigate(`${PathURL.dashboard}`)
    },
    onError: (err: any) => {
      setCurrentUser(undefined)
    },
  })

  async function login(data: TSignIn) {
    setErrorMessage(undefined)
    setErrorValidation(null)
    await mutationSignIn.mutateAsync(data)
  }

  async function signOut(event: any) {
    event.preventDefault()
    navigate(`${PathURL.signin}`)
  }

  return {
    login,
    signOut,
    mutationSignIn,
    errorMessage,
    errorValidation,
  }
}

export default useAuthen
