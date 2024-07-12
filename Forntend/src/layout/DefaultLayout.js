import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
;<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
></link>
const DefaultLayout = () => {
  return (
    <div className="page-wrap">
      {/* <AppSidebar /> */}
      <div className="wrapper min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-md-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
