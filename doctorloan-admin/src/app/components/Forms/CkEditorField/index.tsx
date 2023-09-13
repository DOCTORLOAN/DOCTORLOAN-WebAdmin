import React from 'react'
import clsx from 'clsx'
// @ts-ignore
import {CKEditor} from '@ckeditor/ckeditor5-react'
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {FormHookProps} from '@/types/Commons/form-hook'
import {FieldValues, UseFormSetValue} from 'react-hook-form'
import {APIURL} from 'src/app/utils/constants/api-path'
import api from 'src/app/_config/api'
import {MediaType} from 'src/app/types/Commons/media.model'

export interface CkEditorFieldFormHookProps<TFormType extends FieldValues>
  extends FormHookProps<TFormType> {
  setValue?: UseFormSetValue<TFormType>
  value?: string
  onBlur?: () => void
  onChange?: (data: any) => void
  [key: string]: any
  mediaType?: MediaType
}

function _CkEditorFieldFormHook<TFormType extends FieldValues = FieldValues>(
  props: CkEditorFieldFormHookProps<TFormType>
) {
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData()
          loader.file.then((file: any) => {
            body.append('file', file)
            body.append('type', (props.mediaType || MediaType.Product).toString())

            api
              .post(`${process.env.REACT_APP_API_BASE}/${APIURL.COMMON.UploadImage}`, body)
              .then(({data}) => {
                resolve({
                  default: `${data.data}`,
                })
              })
              .catch((err) => {
                reject(err)
              })
          })
        })
      },
    }
  }
  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader)
    }
    console.log(Array.from(editor.ui.componentFactory.names()))
  }
  return (
    <>
      {props.label && (
        <label className={clsx('form-label', props.labelClassName)}>{props.label}</label>
      )}

      <CKEditor
        config={{
          toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'uploadImage',
            'insertTable',
            'mediaEmbed',
            '|',
            'bulletedList',
            'numberedList',
            'outdent',
            'indent',
          ],

          extraPlugins: [uploadPlugin],
        }}
        editor={ClassicEditor}
        data={props?.value || ''}
        onChange={(event: any, editor: {getData: () => any}) => {
          const data = editor.getData()
          props.setValue && props.setValue(props.name, data)
          props.onChange && props.onChange(data)
          // console.log({event, editor, data})
        }}
      />

      {props.errorMessage && !props.hideErrorMessage && (
        <div className='fv-plugins-message-container text-danger'>
          <span role='alert'>{props.errorMessage?.toString()}</span>
        </div>
      )}
    </>
  )
}

const CkEditorFieldFormHook = React.memo(_CkEditorFieldFormHook) as typeof _CkEditorFieldFormHook
export default CkEditorFieldFormHook
