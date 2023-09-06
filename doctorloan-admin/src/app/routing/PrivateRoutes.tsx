import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_doctor/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'

import {getCSSVariableValue} from '../../_doctor/assets/ts/_utils'
import {WithChildren} from '../../_doctor/helpers'
import DashboardWrapper from '../modules/dashboard/DashboardWrapper'

const PrivateRoutes = () => {
  const UserDetailPage = lazy(() => import('../modules/users/UserDetailPage'))
  const UserIndexPage = lazy(() => import('../modules/users/UserIndexPage'))
  const CreateProductPage = lazy(() => import('../modules/products/create/CreateProductPage'))
  const ProductListPage = lazy(() => import('../modules/products/list/ProductListPage'))
  const CreateCategoryPage = lazy(() => import('../modules/categories/create/CreateCategoryPage'))
  const CategoryListPage = lazy(() => import('../modules/categories/list/CategoryListPage'))

  const CustomerIndexPage = lazy(() => import('../modules/customers/CustomerIndexPage'))
  const CustomerDetailPage = lazy(() => import('../modules/customers/CustomerDetail'))

  const BookingIndexPage = lazy(() => import('../modules/bookings/BookingIndexPage'))
  const BookingDetailPage = lazy(() => import('../modules/bookings/BookingDetailPage'))

  const CreateNewsPage = lazy(() => import('../modules/news/create/CreateNewsPage'))
  const NewsListPage = lazy(() => import('../modules/news/list/NewsListPage'))
  const CreateNewsCategoryPage = lazy(
    () => import('../modules/news-category/create/CreateNewsCategoryPage')
  )
  const NewsCategoryListPage = lazy(
    () => import('../modules/news-category/list/NewsCategoryListPage')
  )

  const OrderIndexPage = lazy(() => import('../modules/orders/OrderIndexPage'))
  const OrderDetailPage = lazy(() => import('../modules/orders/OrderDetailPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<DashboardWrapper />} />
        {/* Lazy Modules */}

        <Route
          path={'users'}
          element={
            <SuspensedView>
              <UserIndexPage />
            </SuspensedView>
          }
        />

        <Route
          path='user/create/*'
          element={
            <SuspensedView>
              <UserDetailPage />
            </SuspensedView>
          }
        />

        <Route
          path='user/:id/*'
          element={
            <SuspensedView>
              <UserDetailPage />
            </SuspensedView>
          }
        />

        <Route
          path={'customers'}
          element={
            <SuspensedView>
              <CustomerIndexPage />
            </SuspensedView>
          }
        />

        <Route
          path='customer/:id/*'
          element={
            <SuspensedView>
              <CustomerDetailPage />
            </SuspensedView>
          }
        />

        <Route
          path='bookings'
          element={
            <SuspensedView>
              <BookingIndexPage />
            </SuspensedView>
          }
        />

        <Route
          path='booking/:id/*'
          element={
            <SuspensedView>
              <BookingDetailPage />
            </SuspensedView>
          }
        />

        <Route
          path='orders'
          element={
            <SuspensedView>
              <OrderIndexPage />
            </SuspensedView>
          }
        />

        <Route
          path='order/:id/*'
          element={
            <SuspensedView>
              <OrderDetailPage />
            </SuspensedView>
          }
        />

        <Route
          path='products/list'
          element={
            <SuspensedView>
              <ProductListPage />
            </SuspensedView>
          }
        />
        <Route
          path='products/create'
          element={
            <SuspensedView>
              <CreateProductPage />
            </SuspensedView>
          }
        />
        <Route
          path='products/edit/:productId'
          element={
            <SuspensedView>
              <CreateProductPage />
            </SuspensedView>
          }
        />
        <Route
          path='category/list'
          element={
            <SuspensedView>
              <CategoryListPage />
            </SuspensedView>
          }
        />
        <Route
          path='category/create'
          element={
            <SuspensedView>
              <CreateCategoryPage />
            </SuspensedView>
          }
        />
        <Route
          path='category/edit/:categoryId'
          element={
            <SuspensedView>
              <CreateCategoryPage />
            </SuspensedView>
          }
        />

        <Route
          path='news/list'
          element={
            <SuspensedView>
              <NewsListPage />
            </SuspensedView>
          }
        />
        <Route
          path='news/create'
          element={
            <SuspensedView>
              <CreateNewsPage />
            </SuspensedView>
          }
        />
        <Route
          path='news/edit/:newsId'
          element={
            <SuspensedView>
              <CreateNewsPage />
            </SuspensedView>
          }
        />
        <Route
          path='news-category/list'
          element={
            <SuspensedView>
              <NewsCategoryListPage />
            </SuspensedView>
          }
        />
        <Route
          path='news-category/create'
          element={
            <SuspensedView>
              <CreateNewsCategoryPage />
            </SuspensedView>
          }
        />
        <Route
          path='news-category/edit/:categoryId'
          element={
            <SuspensedView>
              <CreateNewsCategoryPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
