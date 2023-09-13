import React, {InputHTMLAttributes} from 'react'
import clsx from 'clsx'
import {Controller, FieldValues, Path} from 'react-hook-form'
import {FormHookProps} from '@/types/Commons/form-hook'

export interface CheckboxFieldFormHookProps<FieldName extends FieldValues>
  extends FormHookProps<FieldName>,
    InputHTMLAttributes<HTMLInputElement> {
  name: Path<FieldName>
  [key: string]: any
}
function CheckboxFieldFormHook<TFieldValues extends FieldValues = FieldValues>(
  props: CheckboxFieldFormHookProps<TFieldValues>
) {
  return (
    <>
      <div className='form-check form-check-custom form-check-solid me-10'>
        <Controller
          defaultValue={null as any}
          control={props.control}
          name={props.name}
          rules={props.rules}
          render={({field: {value, onChange, ref}, fieldState: {error, isTouched}}) => (
            <input
              {...props}
              value={value || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e)
                if (props.onChange) props.onChange(e)
              }}
              className={clsx(
                'form-check-input',
                props.className,
                {'is-invalid': (error || isTouched) && props.errorMessage},
                {
                  'is-valid': (error || isTouched) && !props.errorMessage,
                }
              )}
            />
          )}
        />

        <label className='form-check-label' htmlFor={props.id}>
          {props.label}
        </label>
      </div>

      {props.errorMessage && !props.hideErrorMessage && (
        <div className='fv-plugins-message-container text-danger'>
          <span role='alert'>{props.errorMessage.toString()}</span>
        </div>
      )}
    </>
  )
}

export default React.memo(CheckboxFieldFormHook) as typeof CheckboxFieldFormHook
