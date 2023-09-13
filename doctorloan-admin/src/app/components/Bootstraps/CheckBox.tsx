import clsx from 'clsx'
import React from 'react'
import {useId} from 'react'

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  btSize?: 'lg' | 'sm'
}
const _CheckBox = (props: CheckBoxProps) => {
  const id = useId()
  const _size = props.size || 'sm'
  return (
    <>
      <div
        className={clsx('form-check form-check-custom form-check-solid', {
          ['form-check-' + _size]: 'form-check-' + _size,
        })}
      >
        <input {...props} className='form-check-input' type='checkbox' value='' id={id} />
        {props.label && (
          <label className='form-check-label' htmlFor={id}>
            {props.label}
          </label>
        )}
      </div>
    </>
  )
}
const CheckBox = React.memo(_CheckBox)
export default CheckBox
