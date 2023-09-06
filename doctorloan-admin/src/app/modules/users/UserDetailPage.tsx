import {useEffect, useState} from 'react'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import {UserForm} from '@/types/Users/user-detail.model'
import useLanguage from 'src/app/hooks/Language/useLanguage'
import Header from 'src/app/modules/apps/user-management/user-detail/Header'
import {PageLink, PageTitle} from 'src/_doctor/layout/core'
import Information from 'src/app/modules/apps/user-management/user-detail/Information'
import {RegexField} from 'src/app/utils/constants/regex-custom'
import useUserProfile from 'src/app/hooks/Users/useUserProfile'
import {useQuery} from 'react-query'
import {QUERIES} from 'src/_doctor/helpers/crud-helper/consts'
import {getUserById} from 'src/app/apis/Users/user.api'

const UserDetailPage = () => {
  const {id} = useParams()
  const [userData, setUserData] = useState<UserForm>()
  const {
    language: {common, userPage},
  } = useLanguage()

  const isUpdate = (): boolean => {
    return (id && Number(id) > 0) || false
  }
  const currentPath = isUpdate() ? `${id}/information` : 'information'
  const title = isUpdate()
    ? `${common.update} ${userPage.title}`
    : `${common.create} ${userPage.title}`
  const userBreadCrumbs: Array<PageLink> = [
    {
      title: title,
      path: currentPath,
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const {listTab, mutationSaveUser, mutationUpdateUser, errorValidation} = useUserProfile(
    Number(id)
  )

  const validationSchema = Yup.object().shape({
    code: Yup.string().max(50, userPage.validation.code.max),
    firstName: Yup.string().required(userPage.validation.firstName.required),
    lastName: Yup.string().required(userPage.validation.lastName.required),
    email: Yup.string()
      .required(userPage.validation.email.required)
      .email(userPage.validation.email.invalid),
    gender: Yup.string().required(userPage.validation.gender.required),
    password: Yup.string().when([], {
      is: () => !isUpdate(),
      then: Yup.string()
        .required(userPage.validation.password.required)
        .matches(RegexField.password, userPage.validation.password.formatPassword),
    }),
    confirmPassword: Yup.string().when([], {
      is: () => !isUpdate(),
      then: Yup.string()
        .required(userPage.validation.confirmPassword.required)
        .oneOf([Yup.ref('password'), null], userPage.validation.confirmPassword.match),
    }),
  })

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: {errors, isDirty, touchedFields, isValid},
  } = useForm<UserForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const {refetch: refetchGetUser, data: getUserResponse} = useQuery(
    QUERIES.USERS_BY_ID,
    async () => getUserById(Number(id)),
    {
      enabled: false,
      cacheTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    if (errorValidation) {
      for (const [key, value] of Object.entries(errorValidation)) {
        const errMessage = value as string[]
        setError(
          (key.charAt(0).toLocaleLowerCase() + key.slice(1)) as
            | 'code'
            | 'firstName'
            | 'lastName'
            | 'email'
            | 'gender'
            | 'password'
            | 'status',
          {
            type: 'custom',
            message: errMessage.join(' '),
          }
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorValidation])

  useEffect(() => {
    if (isUpdate()) {
      refetchGetUser()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (getUserResponse) {
      const data = getUserResponse.data as UserForm
      reset(data)
      setUserData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserResponse])

  const onSubmit = async (data: any) => {
    if (data && Number(data.id) > 0) {
      await mutationUpdateUser.mutateAsync(data)
    } else {
      await mutationSaveUser.mutateAsync(data)
    }
  }

  if (isUpdate() && !userData) {
    return <></>
  }

  return (
    <form noValidate className='form' onSubmit={handleSubmit(onSubmit)}>
      <Routes>
        <Route
          element={
            <>
              <Header
                listTab={listTab}
                id={id}
                idForm='gace_user_submit'
                isLoading={false}
                isValid={isValid}
                setValue={setValue}
                onSubmit={handleSubmit(onSubmit)}
              />
              <Outlet />
            </>
          }
        >
          <Route
            path={'information'}
            element={
              <>
                <PageTitle breadcrumbs={userBreadCrumbs}>{userPage.tab_infor}</PageTitle>
                <Information
                  control={control}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  isDirty={isDirty}
                  touchedFields={touchedFields}
                  isValid={isValid}
                  isUpdate={isUpdate()}
                />
              </>
            }
          />
          <Route
            index
            element={
              <Navigate to={isUpdate() ? `/${id}/information` : '/user/create/information'} />
            }
          />
        </Route>
      </Routes>
    </form>
  )
}

export default UserDetailPage
