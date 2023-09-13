import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface FormHookProps<TFieldValues extends FieldValues = FieldValues>{   
    errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,   
    rules?: Omit<
      RegisterOptions<any, any>,
      'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
    control?: Control<TFieldValues>  
    hideErrorMessage?:boolean,
    label?:string,
    labelClassName?:string
}