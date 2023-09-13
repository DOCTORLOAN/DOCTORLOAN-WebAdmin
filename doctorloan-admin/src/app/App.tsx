import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_doctor/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_doctor/layout/core'
import {MasterInit} from '../_doctor/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ConfirmModalDataContextProvider} from './modules/hooks/commons/useConfirm'
import {ConfirmModal} from './components/Bootstraps/ConfirmModal'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ConfirmModalDataContextProvider>
            <ConfirmModal />
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ConfirmModalDataContextProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
