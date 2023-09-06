import React, {InputHTMLAttributes} from 'react'
import clsx from 'clsx'
import {FormHookProps} from '@/types/Commons/form-hook'
import {Controller, FieldValues, Path} from 'react-hook-form'
import _ from 'lodash'
export interface TextFieldFormHookProps<FieldName extends FieldValues>
  extends FormHookProps<FieldName>,
    InputHTMLAttributes<HTMLInputElement> {
  name: Path<FieldName>
}

function _TextFieldFormHook<TFieldValues extends FieldValues = FieldValues>(
  props: TextFieldFormHookProps<TFieldValues>
) {
  const Tag = props.type === 'textarea' ? 'textarea' : ('input' as any)

  const importedProps = _.pick(props, [
    'autoComplete',
    'autoFocus',
    'className',
    'disabled',
    'id',
    'label',
    'multiline',
    'name',
    'onBlur',
    'onChange',
    'onFocus',
    'placeholder',
    'required',
    'type',
    'value',
    'onClick',
  ])

  return (
    <>
      {props.label && (
        <label className={clsx('form-label', props.labelClassName)}>{props.label}</label>
      )}

      <Controller
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({field: {value, onChange, ref}, fieldState: {error, isTouched}}) => {
          return (
            <>
              <Tag
                {...importedProps}
                placeholder={props.placeholder}
                type={props.type}
                value={value ?? (props.type === 'number' ? 0 : '')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e)
                  if (props.onChange) props.onChange(e)
                }}
                className={clsx(
                  'form-control bg-transparent',
                  props.className,
                  {'is-invalid': (error || isTouched) && props.errorMessage},
                  {
                    'is-valid': (error || isTouched) && !props.errorMessage,
                  }
                )}
              />
            </>
          )
        }}
      />
      {props.errorMessage && !props.hideErrorMessage && (
        <div className='fv-plugins-message-container text-danger'>
          <span role='alert'>{props?.errorMessage?.toString()}</span>
        </div>
      )}
    </>
  )
}
const TextFieldFormHook = React.memo(_TextFieldFormHook) as typeof _TextFieldFormHook
export default TextFieldFormHook
