/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import useLanguage from '../../../hooks/Language/useLanguage'
import {RegexField} from '../../../utils/constants/regex-custom'
import useAuthen from 'src/app/hooks/Authenticate/authen'
import {formatErrorMessage} from 'src/_doctor/helpers/commons/error'
import TextFieldFormHook from 'src/app/components/Forms/Input'
import ButtonFormHook from 'src/app/components/Forms/Button'

export function Login() {
  const {
    language: {signInPage},
  } = useLanguage()
  const {login, mutationSignIn, errorMessage, errorValidation} = useAuthen()

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required(signInPage.validation.userName.required)
      .min(3, signInPage.validation.userName.min)
      .max(150, signInPage.validation.userName.max),
    password: Yup.string()
      .required(signInPage.validation.password.required)
      .matches(RegexField.password, signInPage.validation.password.formatPassword),
  })

  const {
    handleSubmit,
    setError,
    control,
    formState: {errors, isValid},
  } = useForm({mode: 'onSubmit', resolver: yupResolver(validationSchema)})

  useEffect(() => {
    if (errorValidation) {
      for (const [key, value] of Object.entries(errorValidation)) {
        setError(key.charAt(0).toLocaleLowerCase() + key.slice(1), {
          type: 'custom',
          message: value as string,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorValidation])

  const onSubmit = async (data: any) => {
    await login(data)
  }

  return (
    <form
      className='form w-100'
      noValidate
      id='kt_login_signin_form'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* begin::Heading */}
      <div className='text-center mb-5'>
        <h1 className='text-dark fw-bolder mb-3 text-uppercase'>{signInPage.title}</h1>
      </div>
      {/* begin::Heading */}

      {errorMessage && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formatErrorMessage(errorMessage)}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <TextFieldFormHook
          control={control}
          id='userName'
          name='userName'
          label={signInPage.userName}
          labelClassName='fw-bolder text-dark fs-6 mb-0'
          errorMessage={errors.userName?.message}
        />
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <TextFieldFormHook
          control={control}
          id='password'
          name='password'
          type='password'
          label={signInPage.password}
          labelClassName='fw-bolder text-dark fs-6 mb-0'
          errorMessage={errors.password?.message}
        />
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary text-capitalize'>
          {signInPage.forget_pass}
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <ButtonFormHook
          type='submit'
          id='kt_sign_in_submit'
          label={signInPage.btn_login}
          loading={mutationSignIn.isLoading}
          className='btn-primary'
          disabled={mutationSignIn.isLoading || !isValid}
        />
      </div>
      {/* end::Action */}
    </form>
  )
}
