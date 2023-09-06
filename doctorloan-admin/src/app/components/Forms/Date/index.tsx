import React, {useState} from 'react'
import clsx from 'clsx'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Controller, FieldValues, Path} from 'react-hook-form'
import {FormHookProps} from '@/types/Commons/form-hook'
import moment from 'moment'
export interface DateFieldFormHookProps<FieldName extends FieldValues>
  extends FormHookProps<FieldName> {
  name: Path<FieldName>
  [key: string]: any
}
function _DateFieldFormHook<TFieldValues extends FieldValues = FieldValues>(
  props: DateFieldFormHookProps<TFieldValues>
) {
  const [startDate, setStartDate] = useState(
    props.defaultValue ? moment(props.defaultValue).toDate() : new Date()
  )

  const onchange = (date: any) => {
    setStartDate(date)
    if (props.setValue && props.name) {
      props.setValue(props.name, date)
    }
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
        render={({field: {onChange, value, name}, fieldState: {isDirty, error, isTouched}}) => (
          <DatePicker
            {...props}
            selected={startDate}
            onChange={(date: any) => onchange(date)}
            className={clsx(
              'form-control bg-transparent',
              props.className,
              {'is-invalid': (error || isTouched) && props.errorMessage},
              {
                'is-valid': (error || isTouched) && !props.errorMessage,
              }
            )}
          />
        )}
      />

      {props.errorMessage && !props.hideErrorMessage && (
        <div className='fv-plugins-message-container text-danger'>
          <span role='alert'>{props.errorMessage.toString()}</span>
        </div>
      )}
    </>
  )
}
const DateFieldFormHook = React.memo(_DateFieldFormHook) as typeof _DateFieldFormHook
export default DateFieldFormHook
