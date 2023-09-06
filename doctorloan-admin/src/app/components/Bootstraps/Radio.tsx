import clsx from 'clsx'
import React from 'react'
import {useId} from 'react'

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  btSize?: 'lg' | 'sm'
}
const _Radio = (props: RadioProps) => {
  const id = useId()
  const _size = props.size || 'sm'
  return (
    <>
      <div
        className={clsx('form-check form-check-custom form-check-solid', {
          ['form-check-' + _size]: 'form-check-' + _size,
        })}
      >
        <input className='form-check-input' type='radio' value='' id={id} {...props} />
        {props.label && (
          <label className='form-check-label' htmlFor={id}>
            {props.label}
          </label>
        )}
      </div>
    </>
  )
}
const Radio = React.memo(_Radio)
export default Radio
