import {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
export interface DropzoneProps {
  existingFiles?: string[]
  onFileDrop: (acceptedFiles: File[]) => void
  onFileRemove?: (index: number) => void
  renderChild?: (imageIndex: number) => React.ReactNode
}

export default function MyDropzone({
  onFileDrop,
  onFileRemove,
  existingFiles,
  renderChild,
  ...props
}: DropzoneProps) {
  const [files, setFiles] = useState<({preview: string} & (File | any))[]>([])
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      onFileDrop(acceptedFiles)
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ])
    },
  })
  const handleRemove = useCallback(
    (index: number) => {
      setFiles((prev) => {
        onFileRemove && onFileRemove(index)
        return prev.filter((_, i) => i !== index)
      })
    },
    [onFileRemove]
  )
  useEffect(() => {
    if (existingFiles && existingFiles.length > 0) {
      const _files = existingFiles
        .filter((x) => x !== '' && !files.find((c) => c.preview === x))
        .map((file) => ({preview: file}))
      if (_files.length > 0) setFiles((prev) => [...prev, ..._files])
    }
  }, [existingFiles, files])

  const thumbs = files.map((file, index) => (
    <div className='thumb' key={index}>
      <div className='thumb-inner'>
        <span
          className='text-danger'
          style={{cursor: 'pointer', fontWeight: 'bold', position: 'absolute'}}
          onClick={() => handleRemove(index)}
        >
          Xóa
        </span>
        <img
          src={file.preview}
          alt={file.name}
          className='img'
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
        {renderChild && renderChild(index)}
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <section>
      <div {...getRootProps({className: 'dropzone'})} {...props}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className='thumbs-container '>{thumbs}</aside>
    </section>
  )
}
