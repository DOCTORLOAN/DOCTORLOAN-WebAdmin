import ProfileDetails from './Cards/ProfileDetails'

type Props = {
  register: any
  setError: any
  errors: any
  control: any
  setValue: any
  isDirty?: boolean
  touchedFields?: any
  isValid?: any
  isUpdate?: boolean
}

const Information = ({
  register,
  errors,
  control,
  isDirty,
  isValid,
  touchedFields,
  isUpdate,
}: Props) => {
  return (
    <>
      <ProfileDetails
        register={register}
        errors={errors}
        control={control}
        isDirty={isDirty}
        isValid={isValid}
        touchedFields={touchedFields}
        isUpdate={isUpdate}
      />
    </>
  )
}

export default Information
