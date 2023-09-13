import {useRef} from 'react'
import {InfoCircle} from 'react-bootstrap-icons'
import {useConfirm} from 'src/app/modules/hooks/commons/useConfirm'

export const ConfirmModal = () => {
  const {confirmation, hideConfirmation} = useConfirm()
  const btnRef = useRef()

  if (!confirmation) {
    return null
  }
  const handleConfirm = () => {
    confirmation.onConfirm()
    hideConfirmation()
  }
  const handleClose = () => {
    confirmation.onReject && confirmation.onReject()
    hideConfirmation()
  }
  return (
    <>
      <button
        ref={btnRef as any}
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#staticBackdrop'
      >
        Launch static backdrop modal
      </button>

      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex={-1}
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>
                <InfoCircle /> {confirmation.title}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>{confirmation.message}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-default'
                onClick={handleClose}
                data-bs-dismiss='modal'
              >
                Đóng
              </button>
              <button onClick={handleConfirm} type='button' className='btn btn-danger'>
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
