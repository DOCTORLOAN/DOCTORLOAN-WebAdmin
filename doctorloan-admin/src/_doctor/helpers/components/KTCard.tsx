import {FC} from 'react'
import clsx from 'clsx'
import {WithChildren} from '../react18MigrationHelpers'

// Wrapper on html card:

type Props = {
  className?: string
  shadow?: boolean
  flush?: boolean
  resetSidePaddings?: boolean
  border?: boolean
  dashed?: boolean
  stretch?: 'stretch' | 'stretch-75' | 'stretch-50' | 'stretch-33' | 'stretch-25'
  rounded?: 'rounded' | 'rounded-top' | 'rounded-bottom'
  utilityP?: number
  utilityPY?: number
  utilityPX?: number
}

const KTCard: FC<Props & WithChildren> = (props) => {
  const {
    className,
    shadow,
    flush,
    resetSidePaddings,
    border,
    dashed,
    stretch,
    rounded,
    utilityP,
    utilityPY,
    utilityPX,
    children,
  } = props
  return (
    <div
      className={clsx(
        'card',
        className && className,
        {
          'shadow-sm': shadow,
          'card-flush': flush,
          'card-px-0': resetSidePaddings,
          'card-bordered': border,
          'card-dashed': dashed,
        },
        stretch && `card-${stretch}`,
        utilityP && `p-${utilityP}`,
        utilityPX && `px-${utilityPX}`,
        utilityPY && `py-${utilityPY}`,
        rounded && `card-${rounded}`
      )}
    >
      {children}
    </div>
  )
}

export {KTCard}
