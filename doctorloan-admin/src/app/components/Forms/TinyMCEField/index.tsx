import React, {useRef} from 'react'
import clsx from 'clsx'

// TinyMCE wants to be in global scope, even if loaded from npm module
import {Editor} from '@tinymce/tinymce-react'
import {FormHookProps} from '@/types/Commons/form-hook'
import {FieldValues, UseFormSetValue} from 'react-hook-form'
import {MediaType} from 'src/app/types/Commons/media.model'

export interface TinyMCEFieldFormHookProps<TFormType extends FieldValues>
  extends FormHookProps<TFormType> {
  setValue?: UseFormSetValue<TFormType>
  value?: string
  onBlur?: () => void
  onChange?: (data: any) => void
  [key: string]: any
  mediaType?: MediaType
}

function _TinyMCEFieldFormHook<TFormType extends FieldValues = FieldValues>(
  props: TinyMCEFieldFormHookProps<TFormType>
) {
  const editorRef = useRef(null)
  const file_picker_callback = (cb: any, value: any, meta: any) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')

    input.addEventListener('change', (e: any) => {
      const file = e!.target!.files[0]
      var editor = editorRef.current as any
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        const id = 'blobid' + new Date().getTime()
        const blobCache = editor.editorUpload.blobCache
        const base64 = (reader!.result! as any).split(',')[1]
        const blobInfo = blobCache.create(id, file, base64)
        blobCache.add(blobInfo)

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), {title: file.name})
      })
      reader.readAsDataURL(file)
    })

    input.click()
  }
  return (
    <>
      {props.label && (
        <label className={clsx('form-label', props.labelClassName)}>{props.label}</label>
      )}
      <Editor
        onChange={(e) => {
          const content = e.target.getContent()
          props.setValue && props.setValue(props.name, content as any)
          props.onChange && props.onChange(content)
        }}
        apiKey='vf3umhtpen2z00qnpa7vay5yg8ku63ffst0xu9epfhcfwm2y'
        onInit={(evt, editor) => ((editorRef as any).current = editor)}
        initialValue={props.value || ''}
        init={{
          height: 500,
          menubar: 'file edit view insert format tools table help',
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: file_picker_callback,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </>
  )
}

const TinyMCEFieldFormHook = React.memo(_TinyMCEFieldFormHook) as typeof _TinyMCEFieldFormHook
export default TinyMCEFieldFormHook
