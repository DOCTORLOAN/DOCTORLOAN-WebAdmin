import {InputHTMLAttributes, useId} from 'react'
export interface SwitcherProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}
export default function Switcher({label, ...props}: SwitcherProps) {
  const id = useId()
  return (
    <div className='form-check form-switch form-check-custom form-check-solid me-10'>
      <input
        className='form-check-input h-20px w-30px'
        type='checkbox'
        value=''
        id={'switch_' + id}
        {...props}
      />
      <label className='form-check-label' htmlFor={'switch_' + id}>
        {label}
      </label>
    </div>
  )
}
