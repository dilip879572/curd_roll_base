import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CiUser } from 'react-icons/ci'
import { ImInfo } from 'react-icons/im'

const User = () => {
  const location = useLocation()
  console.log('location', location)
  // console.log('parama', `/${params['*']}`)
  const navigate = useNavigate()

  let activeTab = localStorage.getItem('tabIdd') || 'createuser'

  if (location.pathname === '/settings/role') {
    activeTab = 'role'
  }

  const handleTabClick = (tabId, name, e) => {
    if (e && e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault()
    }

    if (name === 'Mitarbeiterlnnen') {
      localStorage.setItem('tabIdd', 'createuser')
      navigate('/settings/createuser')
    } else if (name === 'Rollen') {
      localStorage.setItem('tabIdd', 'role')
      navigate('/settings/role')
    }
  }

  useEffect(() => {
    handleTabClick()
    localStorage.removeItem('tabIdd')
  }, [activeTab])

  return (
    <>
      <div className="whiteBoxWithPdLR" style={{ borderRadius: '5px' }}>
        <div className="row">
          <div className="col-sm-12 mx-3">
            <nav>
              <div className="row nav nav-tabs" id="nav-tab" role="tablist">
                <div className="col-sm-3">
                  <button
                    className={`nav-link ${activeTab === 'createuser' ? 'active' : ''}`}
                    id="createuser-tab"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-selected={activeTab === 'createuser'}
                    onClick={(e) => handleTabClick('createuser', 'Mitarbeiterlnnen', e)}
                  >
                    <CiUser />
                    Mitarbeiterlnnen
                  </button>
                </div>
                <div className="col-sm-3">
                  <button
                    className={`nav-link ${activeTab === 'role' ? 'active' : ''}`}
                    id="role-tab"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="role"
                    aria-selected={activeTab === 'role'}
                    onClick={(e) => handleTabClick('role', 'Rollen', e)}
                  >
                    <ImInfo />
                    Rollen
                  </button>
                </div>
                <div className="col-sm-6"></div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(User)
