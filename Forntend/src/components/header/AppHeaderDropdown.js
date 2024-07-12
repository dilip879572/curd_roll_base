import React, { useState } from 'react'
import { CAvatar, CBadge, CDropdown, CDropdownItem } from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'

const content = (
  <div className="notification-wrap px-2">
    <div className="row align-items-center mb-3 border-bottom">
      <div className="col-12">
        <h5 className="h5-heading d-flex justify-content-between align-items-center">
          <span>Benachrichtigungen</span>
        </h5>
      </div>
    </div>
    <div className="row align-items-center pb-2 mb-2 border-bottom">
      <div className="col-2 col-sm-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
        >
          <path
            d="M2.5 1.875C2.15625 1.875 1.875 2.15625 1.875 2.5V3.36328L8.61328 8.89453C9.42188 9.55859 10.582 9.55859 11.3906 8.89453L18.125 3.36328V2.5C18.125 2.15625 17.8438 1.875 17.5 1.875H2.5ZM1.875 5.78906V12.5C1.875 12.8438 2.15625 13.125 2.5 13.125H17.5C17.8438 13.125 18.125 12.8438 18.125 12.5V5.78906L12.5781 10.3438C11.0781 11.5742 8.91797 11.5742 7.42188 10.3438L1.875 5.78906ZM0 2.5C0 1.12109 1.12109 0 2.5 0H17.5C18.8789 0 20 1.12109 20 2.5V12.5C20 13.8789 18.8789 15 17.5 15H2.5C1.12109 15 0 13.8789 0 12.5V2.5Z"
            fill="#bbb"
          />
        </svg>
      </div>
      <div className="col-10 col-sm-10 border-start">
        <p className="m-0">
          Lorem Ipsum ist einfach{' '}
          <Link style={{ textDecoration: 'none', color: '#015291' }}>
            <small className="m-0">Lorem Ipsum ist einfach ei</small>
          </Link>
        </p>
      </div>
    </div>

    <div className="row align-items-center pb-2 mb-2 border-bottom">
      <div className="col-2 col-sm-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
        >
          <path
            d="M2.5 1.875C2.15625 1.875 1.875 2.15625 1.875 2.5V3.36328L8.61328 8.89453C9.42188 9.55859 10.582 9.55859 11.3906 8.89453L18.125 3.36328V2.5C18.125 2.15625 17.8438 1.875 17.5 1.875H2.5ZM1.875 5.78906V12.5C1.875 12.8438 2.15625 13.125 2.5 13.125H17.5C17.8438 13.125 18.125 12.8438 18.125 12.5V5.78906L12.5781 10.3438C11.0781 11.5742 8.91797 11.5742 7.42188 10.3438L1.875 5.78906ZM0 2.5C0 1.12109 1.12109 0 2.5 0H17.5C18.8789 0 20 1.12109 20 2.5V12.5C20 13.8789 18.8789 15 17.5 15H2.5C1.12109 15 0 13.8789 0 12.5V2.5Z"
            fill="#bbb"
          />
        </svg>
      </div>
      <div className="col-10 col-sm-10 border-start">
        <p className="m-0">
          Lorem Ipsum ist einfach{' '}
          <Link style={{ textDecoration: 'none', color: '#015291' }}>
            <small className="m-0">Lorem Ipsum ist einfach ei</small>
          </Link>
        </p>
      </div>
    </div>

    <div className="row align-items-center pb-2 mb-2 border-bottom">
      <div className="col-2 col-sm-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
        >
          <path
            d="M2.5 1.875C2.15625 1.875 1.875 2.15625 1.875 2.5V3.36328L8.61328 8.89453C9.42188 9.55859 10.582 9.55859 11.3906 8.89453L18.125 3.36328V2.5C18.125 2.15625 17.8438 1.875 17.5 1.875H2.5ZM1.875 5.78906V12.5C1.875 12.8438 2.15625 13.125 2.5 13.125H17.5C17.8438 13.125 18.125 12.8438 18.125 12.5V5.78906L12.5781 10.3438C11.0781 11.5742 8.91797 11.5742 7.42188 10.3438L1.875 5.78906ZM0 2.5C0 1.12109 1.12109 0 2.5 0H17.5C18.8789 0 20 1.12109 20 2.5V12.5C20 13.8789 18.8789 15 17.5 15H2.5C1.12109 15 0 13.8789 0 12.5V2.5Z"
            fill="#bbb"
          />
        </svg>
      </div>
      <div className="col-10 col-sm-10 border-start">
        <p className="m-0">
          Lorem Ipsum ist einfach{' '}
          <Link style={{ textDecoration: 'none', color: '#015291' }}>
            <small className="m-0">Lorem Ipsum ist einfach ei</small>
          </Link>
        </p>
      </div>
    </div>

    <div className="row align-items-center justify-content-center text-center">
      <Link style={{ textDecoration: 'none', color: '#015291' }}>Alle Benachrichtigungen</Link>
    </div>
  </div>
)
const AppHeaderDropdown = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [open, setOpen] = useState(false)

  const modalOpen = () => {
    setOpen(true)
  }
  const navigate = useNavigate()

  const handleLogout = () => {
    let a = window.localStorage.clear()
    if (a === undefined) {
      navigate('/')
      window.location.reload()
    }
  }

  let res = localStorage.getItem('record')
  let result = JSON.parse(res)
  return (
    <>
      <CDropdown variant="nav-item">
        <div className="top-right-header">
          <CDropdownItem onClick={handleLogout}>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_382_11646)">
                <path
                  d="M17.1469 10.5692C17.4374 10.2545 17.4374 9.74554 17.1469 9.43415L13.1908 5.14509C12.9003 4.83036 12.4305 4.83036 12.1431 5.14509C11.8557 5.45982 11.8526 5.96875 12.1431 6.28013L14.832 9.19308L7.22588 9.19643C6.81482 9.19643 6.48412 9.55469 6.48412 10C6.48412 10.4453 6.81482 10.8036 7.22588 10.8036H14.832L12.1431 13.7165C11.8526 14.0312 11.8526 14.5402 12.1431 14.8516C12.4336 15.1629 12.9034 15.1663 13.1908 14.8516L17.1469 10.5692ZM6.73137 4.10714C7.14243 4.10714 7.47313 3.74888 7.47313 3.30357C7.47313 2.85826 7.14243 2.5 6.73137 2.5H4.25884C2.75678 2.5 1.53906 3.8192 1.53906 5.44643V14.5536C1.53906 16.1808 2.75678 17.5 4.25884 17.5H6.73137C7.14243 17.5 7.47313 17.1417 7.47313 16.6964C7.47313 16.2511 7.14243 15.8929 6.73137 15.8929H4.25884C3.57581 15.8929 3.02258 15.2935 3.02258 14.5536V5.44643C3.02258 4.70647 3.57581 4.10714 4.25884 4.10714H6.73137Z"
                  fill="#005291"
                />
              </g>
              <defs>
                <clipPath id="clip0_382_11646">
                  <rect width="18.4615" height="21.6667" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Logout
          </CDropdownItem>
        </div>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
