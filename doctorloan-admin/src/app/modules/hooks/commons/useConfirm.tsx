import {FC, createContext, useContext, useState} from 'react'
import {WithChildren} from 'src/_doctor/helpers'
export interface ConfirmModalDataContextModel {
  confirmation: ConfirmInfoModel | null
  showConfirmation: (props: ConfirmInfoModel) => void
  hideConfirmation: () => void
}
export interface ConfirmInfoModel {
  title: string
  message: string
  onConfirm: () => void
  onReject?: () => void
}
const ConfirmModalDataContext = createContext<ConfirmModalDataContextModel>({
  confirmation: null,
  showConfirmation: (props: ConfirmInfoModel) => {},
  hideConfirmation: () => {},
})
export const ConfirmModalDataContextProvider: FC<WithChildren> = ({children}) => {
  const [confirmation, setConfirmation] = useState<ConfirmInfoModel | null>(null)
  const showConfirmation = (props: ConfirmInfoModel) => {
    setConfirmation(props)
  }

  const hideConfirmation = () => {
    setConfirmation(null)
  }
  return (
    <ConfirmModalDataContext.Provider value={{confirmation, showConfirmation, hideConfirmation}}>
      {children}
    </ConfirmModalDataContext.Provider>
  )
}
export const useConfirm = () => {
  return useContext(ConfirmModalDataContext)
}
