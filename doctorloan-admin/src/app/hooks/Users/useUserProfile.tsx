import {useState} from 'react'
import {useMutation} from 'react-query'
import {useNavigate} from 'react-router-dom'

import useLanguage from '../Language/useLanguage'
import {TabModel} from '@/types/Commons/tab.model'
import {UserForm} from '@/types/Users/user-detail.model'
import {saveUser, updateUser} from 'src/app/apis/Users/user.api'
import {alertMessage} from 'src/app/utils/commons/alert'
import {AlertType} from 'src/app/utils/enums/base'
import {PathURL} from 'src/app/utils/constants/path'

function useUserProfile(id?: number) {
  const navigate = useNavigate()
  const [errorValidation, setErrorValidation] = useState(null)

  const {
    language: {userPage},
  } = useLanguage()

  //#region function
  const getUrl = (tab: string) => {
    return id && Number(id) > 0 ? `/user/${id}/${tab}` : `/user/create/${tab}`
  }
  //#endregion

  //#region mock data

  const listTab: TabModel[] = [
    {
      label: userPage.tab_infor,
      url: getUrl('information'),
      prefix: 'information',
    },
  ]

  //#endregion

  const mutationSaveUser = useMutation((param: UserForm) => saveUser(param), {
    onSuccess: async (response: any) => {
      if (response && response.errors) {
        const {errors} = response
        setErrorValidation(errors)
        return
      }

      if (response && response.error) {
        const {error} = response
        alertMessage(error.message, AlertType.Error)
        return
      }

      alertMessage('Successfully', AlertType.Success, function () {
        navigate(PathURL.users.index)
      })
    },
    onError: (error: any) => {
      alertMessage(error.response, AlertType.Error)
    },
  })

  const mutationUpdateUser = useMutation((param: UserForm) => updateUser(param), {
    onSuccess: async (response: any) => {
      if (response && response.errors) {
        const {errors} = response
        setErrorValidation(errors)
        return
      }

      if (response && response.error) {
        const {error} = response
        alertMessage(error.message, AlertType.Error)
        return
      }

      alertMessage('Successfully', AlertType.Success, function () {
        navigate(PathURL.users.index)
      })
    },
    onError: (error: any) => {
      alertMessage(error.response, AlertType.Error)
    },
  })

  return {
    errorValidation,
    listTab,
    mutationSaveUser,
    mutationUpdateUser,
  }
}

export default useUserProfile
