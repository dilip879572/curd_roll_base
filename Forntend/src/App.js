import React, { Component, Suspense, useContext, useEffect } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
// import './scss/_custom.scss'
import ResetPassword from './views/pages/reset/ResetPassword'
import ForgotPassword from './views/pages/forget/ForgotPassword'
import { getFetch } from './Api'
import { StoreContext } from './StoreContext'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const hasToken = !!window.localStorage.getItem('token')

const App = () => {
  const { updateProfile, editUser } = useContext(StoreContext)
  const apiUrl = process.env.REACT_APP_API_URL
  const id = localStorage.getItem('record_id')

  const getUserById = async () => {
    try {
      const user = await getFetch(`${apiUrl}/user/${id}`)
      if (user?.status === 200) {
        localStorage.setItem('record', JSON.stringify(user?.data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserById()
  }, [updateProfile, editUser])
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          {!hasToken === true && <Route path="/" element={<Login />} />}
          {!hasToken && <Route path="/" element={<Login />} />}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          {hasToken && <Route path="*" element={<DefaultLayout />} />}
          <Route path="*" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default React.memo(App)

// import React, { Component, Suspense } from 'react'
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
// import PropTypes from 'prop-types' // Import prop-types
// import './scss/style.scss'

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// // Custom PrivateRoute component to handle authentication
// const PrivateRoute = ({ element, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('token')
//   return isAuthenticated ? element : <Navigate to="/login" />
// }

// PrivateRoute.propTypes = {
//   element: PropTypes.node, // Define prop-types for element
// }

// class App extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//         <Login />
//         <Routes>
//           {/* Public Routes */}
//           <Route exact path="/register" name="Register Page" element={<Register />} />
//           <Route exact path="/404" name="Page 404" element={<Page404 />} />
//           <Route exact path="/500" name="Page 500" element={<Page500 />} />

//           {/* Private Routes */}
//           <Route
//             path="/default/*"
//             name="Home"
//             element={
//               <Suspense fallback={loading}>
//                 <PrivateRoute element={<DefaultLayout />} />
//               </Suspense>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     )
//   }
// }

// export default App
