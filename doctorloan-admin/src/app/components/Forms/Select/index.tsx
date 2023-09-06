import React from 'react'
import clsx from 'clsx'
import Select, {createFilter, MultiValue, SingleValue} from 'react-select'
import {Controller, FieldValues, Path} from 'react-hook-form'
import {Option} from '@/types/Commons/option'
import {FormHookProps} from '@/types/Commons/form-hook'
export interface SelectFieldFormHookProps<FieldName extends FieldValues>
  extends FormHookProps<FieldName> {
  name: Path<FieldName>
  isMulti?: boolean
  isClearable?: boolean
  onSelected?: (event: any) => void
  onInputChange?: (event: any) => void
  listOption?: Option[]
  [key: string]: any
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _SelectFieldFormHook<TFieldValues extends FieldValues = FieldValues>(
  props: SelectFieldFormHookProps<TFieldValues>
) {
  const ignoreCase = true
  const ignoreAccents = true
  const trim = true

  const filterConfig = {
    ignoreCase,
    ignoreAccents,
    trim,
    matchFrom: 'any' as const,
  }

  const handleSelected = (event: any) => {
    props.onSelected && props.onSelected(event)
  }

  const handleInputChange = (value: any) => {
    props.onInputChange && props.onInputChange(value)
  }
  const getSelectedValue = (value: any) => {
    if (value?.length) {
      const arrValue = value as Array<any>
      return props.listOption?.filter((x) => arrValue.includes(x.value))
    }
    return props.listOption?.find((x) => x.value?.toString() === value?.toString())
  }
  return (
    <>
      {props.label && (
        <label className={clsx('form-label', props.labelClassName)}>{props.label}</label>
      )}
      <Controller
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({
          field: {onChange, value, name, ref},
          fieldState: {error, isDirty, isTouched},
        }) => {
          let selectedValue = getSelectedValue(value)
          return (
            <Select
              ref={ref}
              isClearable={props.isClearable}
              isMulti={props.isMulti ?? false}
              options={props.listOption}
              filterOption={createFilter(filterConfig)}
              value={selectedValue}
              onChange={(val) => {
                handleSelected(val)
                return onChange(
                  props.isMulti
                    ? (val as MultiValue<Option>).map((x) => x.value)
                    : (val as SingleValue<Option>)?.value
                )
              }}
              onInputChange={handleInputChange}
              className={clsx(
                'bg-transparent form-select-custom',
                props.className,
                {'is-invalid': (isDirty || isTouched) && error},
                {
                  'is-valid': (isDirty || isTouched) && !error,
                }
              )}
              {...props}
            />
          )
        }}
      />

      {props.errorMessage && !props.hideErrorMessage && (
        <div className='fv-plugins-message-container text-danger'>
          <span role='alert'>{props?.errorMessage.toString()}</span>
        </div>
      )}
    </>
  )
}

const SelectFieldFormHook = React.memo(_SelectFieldFormHook) as typeof _SelectFieldFormHook
export default SelectFieldFormHook
