import React, {ReactNode, useCallback} from 'react'
import useLanguage from 'src/app/hooks/Language/useLanguage'
import clsx from 'clsx'
import * as icons from 'react-bootstrap-icons'
export interface ButtonFormHookProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  loading?: boolean
  icon?: keyof typeof icons
  children?: ReactNode
}
function _ButtonFormHook({label, loading, icon, children, ...props}: ButtonFormHookProps) {
  const {
    language: {common},
  } = useLanguage()
  const isLoading = loading ? true : undefined
  const renderIcon = useCallback(() => {
    if (!icon) return <></>
    const BootstrapIcon = icons[icon]
    return <BootstrapIcon className='me-2' size={20} />
  }, [icon])
  return (
    <>
      <button {...props} className={clsx('btn', props.className)}>
        {renderIcon()}
        {!isLoading && label && <span className='indicator-label text-capitalize'>{label}</span>}
        {isLoading && (
          <span className='indicator-progress' style={{display: 'block'}}>
            {common.waiting}
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        )}

        {isLoading !== true && children}
      </button>
    </>
  )
}
const ButtonFormHook = React.memo(_ButtonFormHook)
export default ButtonFormHook
