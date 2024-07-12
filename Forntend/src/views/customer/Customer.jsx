import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
const Customer = ({ getCustomerData, updateData, updateStreet, updateLand }) => {
  const [customerInfo, setCustomerInfo] = useState([])
  let ress = localStorage.getItem('customerRecord')
  let resultt = JSON.parse(ress)
  const apiUrl = process.env.REACT_APP_API_URL
  Customer.propTypes = {
    getCustomerData: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    updateStreet: PropTypes.func.isRequired,
    updateLand: PropTypes.func.isRequired,
  }

  const navigate = useNavigate()

  let activeTab = localStorage.getItem('tabId') || 'customer_info'

  const handleTabClick = (tabId, name, e) => {
    if (e && e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault()
    }
    if (name === 'KlientInnen') {
      localStorage.setItem('tabId', 'customer_info')
      return navigate('/customer/customer_info')
    } else if (name === 'Kontakte') {
      localStorage.setItem('tabId', 'contact')
      return navigate('/customer/contact')
    } else if (name === 'Aktivität') {
      localStorage.setItem('tabId', 'activity')
      return navigate('/customer/activity')
    } else if (name === 'Dokumente') {
      localStorage.setItem('tabId', 'document')
      return navigate('/customer/document')
    } else if (name === 'Vollmachten') {
      localStorage.setItem('tabId', 'attorney')
      return navigate('/customer/attorney')
    } else if (name === 'HVD-PV') {
      localStorage.setItem('tabId', 'services')
      return navigate('/customer/services')
    } else if (name === 'Rechnung') {
      localStorage.setItem('tabId', 'bills')
      return navigate('/customer/bills')
    }
  }
  useEffect(() => {
    handleTabClick()
  }, [activeTab])
  console.log('customerInfo', customerInfo)
  let customer = localStorage.getItem('customerRecord')
  let res = JSON.parse(customer)
  const dateString = customerInfo?.customer?.startDate
  const date = new Date(dateString)

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const formattedDate = date.toLocaleDateString('en-IN', options).replace(/\//g, '.')

  const firstName = customerInfo?.customer?.fname
  const lastName =
    customerInfo?.customer?.lname?.slice(0, 1).toUpperCase() +
    customerInfo?.customer?.lname?.slice(1).toLowerCase()

  let street =
    (customerInfo?.customer?.street?.length > 1 ? customerInfo?.customer?.street + ',  ' : '') +
    (customerInfo?.customer?.street
      ? customerInfo?.customer?.plz + '  ' + customerInfo?.customer?.ort
      : '')

  let status = customerInfo?.customer?.status
  const getRecordById = async () => {
    const response = await fetch(`${apiUrl}/customer/get_record/${resultt?._id}`)
    const updatedData = await response.json()
    setCustomerInfo(updatedData)
  }
  useEffect(() => {
    getRecordById()
  }, [updateData, updateStreet, updateLand])
  return (
    <>
      <div className="whiteBox">
        <div className="blueBoxTop">
          <div className="container-fluid">
            <div className="row d-flex align-items-center">
              <div className="col-md-4">
                <h3>KlientIn: {`${firstName} ${lastName}`}</h3>

                <address>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_207_8532)">
                      <path
                        d="M16.817 8.89543C16.817 5.62623 14.1646 2.97386 10.8954 2.97386C7.62623 2.97386 4.97386 5.62623 4.97386 8.89543C4.97386 9.40534 5.15891 10.1949 5.60303 11.2476C6.03481 12.2674 6.64753 13.3942 7.35071 14.5333C8.52269 16.4331 9.87972 18.2671 10.8954 19.5748C11.9153 18.2671 13.2723 16.4331 14.4402 14.5333C15.1433 13.3942 15.7561 12.2674 16.1878 11.2476C16.632 10.1949 16.817 9.40534 16.817 8.89543ZM18.7909 8.89543C18.7909 12.4895 13.9796 18.8881 11.87 21.5281C11.3642 22.1573 10.4266 22.1573 9.92084 21.5281C7.81128 18.8881 3 12.4895 3 8.89543C3 4.5365 6.5365 1 10.8954 1C15.2544 1 18.7909 4.5365 18.7909 8.89543ZM12.2113 8.89543C12.2113 8.54643 12.0727 8.21173 11.8259 7.96495C11.5791 7.71817 11.2444 7.57953 10.8954 7.57953C10.5464 7.57953 10.2117 7.71817 9.96495 7.96495C9.71817 8.21173 9.57953 8.54643 9.57953 8.89543C9.57953 9.24443 9.71817 9.57914 9.96495 9.82592C10.2117 10.0727 10.5464 10.2113 10.8954 10.2113C11.2444 10.2113 11.5791 10.0727 11.8259 9.82592C12.0727 9.57914 12.2113 9.24443 12.2113 8.89543ZM7.60567 8.89543C7.60567 8.02293 7.95227 7.18617 8.56922 6.56922C9.18617 5.95227 10.0229 5.60567 10.8954 5.60567C11.7679 5.60567 12.6047 5.95227 13.2216 6.56922C13.8386 7.18617 14.1852 8.02293 14.1852 8.89543C14.1852 9.76793 13.8386 10.6047 13.2216 11.2216C12.6047 11.8386 11.7679 12.1852 10.8954 12.1852C10.0229 12.1852 9.18617 11.8386 8.56922 11.2216C7.95227 10.6047 7.60567 9.76793 7.60567 8.89543Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_207_8532">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>{street}</span>
                </address>
              </div>
              <div className="col-md-8 text-md-end">
                <div style={{ marginBottom: '8px' }}>
                  {status?.slice(0, 6)?.map((tag, index) => (
                    <span
                      key={index}
                      className="dm-badge"
                      style={{
                        background: '#4EB772',
                        border: 'white',
                        padding: '3px',
                        marginRight: '2mm',
                        fontSize: '13px',
                      }}
                    >
                      <span>{tag.name}</span>
                    </span>
                  ))}
                </div>

                <div className="d-flex justify-content-md-end justify-content-between mt-1">
                  <button className="btn btn me-3 header-button">
                    <span style={{ fontSize: '14px', marginRight: '3px', marginLeft: '3px' }}>
                      {' '}
                      {formattedDate}
                    </span>
                  </button>
                  <button className="btn btn header-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 18 18"
                      fill="none"
                      style={{ marginRight: '2px', marginRight: '1px', marginBottom: '3px' }}
                    >
                      <g clipPath="url(#clip0_207_8539)">
                        <path
                          d="M14.01 11.0623C13.5295 10.8573 12.9729 10.992 12.6418 11.3963L11.6691 12.5858C10.3214 11.8036 9.19642 10.6786 8.41418 9.33086L9.60073 8.36112C10.005 8.03005 10.1427 7.4734 9.93472 6.99292L8.52844 3.7116C8.30871 3.19596 7.75499 2.90885 7.20712 3.02604L3.9258 3.72918C3.38673 3.84344 3 4.32099 3 4.87471C3 11.6483 8.13293 17.2265 14.7219 17.9268C15.0091 17.9561 15.2962 17.9795 15.5891 17.9912H15.5921C15.7708 17.9971 15.9466 18.0029 16.1253 18.0029C16.679 18.0029 17.1566 17.6162 17.2708 17.0771L17.974 13.7958C18.0912 13.2479 17.804 12.6942 17.2884 12.4745L14.0071 11.0682L14.01 11.0623ZM15.9349 16.5937C9.61538 16.4912 4.50882 11.3846 4.40921 5.06515L7.31552 4.44111L8.57532 7.38258L7.52354 8.24393C6.99032 8.68046 6.85262 9.43927 7.19833 10.0369C8.10363 11.5985 9.40444 12.8993 10.966 13.8046C11.5637 14.1503 12.3225 14.0126 12.759 13.4794L13.6203 12.4276L16.5618 13.6874L15.9349 16.5937Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_207_8539">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span style={{ fontSize: '14px', marginRight: '3px' }}>
                      {customerInfo?.customer?.phone}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="whiteBoxWithPdLR">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className={`nav-link ${activeTab === 'customer_info' ? 'active' : ''}`}
                      id="customer_info-tab"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-selected={activeTab === 'customer_info'}
                      onClick={(e) => handleTabClick('customer_info', 'KlientInnen', e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_91_3542)">
                          <path d="M12 3.875C14.1549 3.875 16.2215 4.73102 17.7452 6.25476C19.269 7.77849 20.125 9.84512 20.125 12C20.125 14.1549 19.269 16.2215 17.7452 17.7452C16.2215 19.269 14.1549 20.125 12 20.125C9.84512 20.125 7.77849 19.269 6.25476 17.7452C4.73102 16.2215 3.875 14.1549 3.875 12C3.875 9.84512 4.73102 7.77849 6.25476 6.25476C7.77849 4.73102 9.84512 3.875 12 3.875ZM12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22ZM10.4375 15.125C9.91797 15.125 9.5 15.543 9.5 16.0625C9.5 16.582 9.91797 17 10.4375 17H13.5625C14.082 17 14.5 16.582 14.5 16.0625C14.5 15.543 14.082 15.125 13.5625 15.125H13.25V11.6875C13.25 11.168 12.832 10.75 12.3125 10.75H10.4375C9.91797 10.75 9.5 11.168 9.5 11.6875C9.5 12.207 9.91797 12.625 10.4375 12.625H11.375V15.125H10.4375ZM12 9.5C12.3315 9.5 12.6495 9.3683 12.8839 9.13388C13.1183 8.89946 13.25 8.58152 13.25 8.25C13.25 7.91848 13.1183 7.60054 12.8839 7.36612C12.6495 7.1317 12.3315 7 12 7C11.6685 7 11.3505 7.1317 11.1161 7.36612C10.8817 7.60054 10.75 7.91848 10.75 8.25C10.75 8.58152 10.8817 8.89946 11.1161 9.13388C11.3505 9.3683 11.6685 9.5 12 9.5Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0_91_3542">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span> KlientInnen </span>
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                      id="contact-tab"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="contact"
                      aria-selected={activeTab === 'contact'}
                      onClick={(e) => handleTabClick('contact', 'Kontakte', e)}
                    >
                      {' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_431_39097)">
                          <path d="M13.917 3C14.192 3 14.417 3.225 14.417 3.5V15.5C14.417 15.775 14.192 16 13.917 16H4.91699C4.64199 16 4.41699 15.775 4.41699 15.5V3.5C4.41699 3.225 4.64199 3 4.91699 3H13.917ZM4.91699 1.5C3.81387 1.5 2.91699 2.39688 2.91699 3.5V15.5C2.91699 16.6031 3.81387 17.5 4.91699 17.5H13.917C15.0201 17.5 15.917 16.6031 15.917 15.5V3.5C15.917 2.39688 15.0201 1.5 13.917 1.5H4.91699ZM9.41699 9.5C9.94742 9.5 10.4561 9.28929 10.8312 8.91421C11.2063 8.53914 11.417 8.03043 11.417 7.5C11.417 6.96957 11.2063 6.46086 10.8312 6.08579C10.4561 5.71071 9.94742 5.5 9.41699 5.5C8.88656 5.5 8.37785 5.71071 8.00278 6.08579C7.62771 6.46086 7.41699 6.96957 7.41699 7.5C7.41699 8.03043 7.62771 8.53914 8.00278 8.91421C8.37785 9.28929 8.88656 9.5 9.41699 9.5ZM8.41699 10.5C7.03574 10.5 5.91699 11.6188 5.91699 13C5.91699 13.275 6.14199 13.5 6.41699 13.5H12.417C12.692 13.5 12.917 13.275 12.917 13C12.917 11.6188 11.7982 10.5 10.417 10.5H8.41699ZM17.917 4C17.917 3.725 17.692 3.5 17.417 3.5C17.142 3.5 16.917 3.725 16.917 4V6C16.917 6.275 17.142 6.5 17.417 6.5C17.692 6.5 17.917 6.275 17.917 6V4ZM17.417 7.5C17.142 7.5 16.917 7.725 16.917 8V10C16.917 10.275 17.142 10.5 17.417 10.5C17.692 10.5 17.917 10.275 17.917 10V8C17.917 7.725 17.692 7.5 17.417 7.5ZM17.917 12C17.917 11.725 17.692 11.5 17.417 11.5C17.142 11.5 16.917 11.725 16.917 12V14C16.917 14.275 17.142 14.5 17.417 14.5C17.692 14.5 17.917 14.275 17.917 14V12Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0_431_39097">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(0.666992)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span> Kontakte</span>
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                      id="activity-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#activity"
                      role="tab"
                      aria-controls="activity"
                      aria-selected={activeTab === 'activity'}
                      onClick={(e) => handleTabClick('activity', 'Aktivität', e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_207_8581)">
                          <path d="M9.48594 3.00021C9.74609 2.99317 9.97813 3.16661 10.0438 3.41974L11.9023 10.5424L12.5375 9.19005C12.7531 8.73067 13.2172 8.43536 13.7258 8.43536H16.4375C16.7492 8.43536 17 8.68614 17 8.99786C17 9.30958 16.7492 9.56036 16.4375 9.56036H13.7258C13.6531 9.56036 13.5875 9.60255 13.557 9.66817L12.2586 12.4268C12.1578 12.64 11.9328 12.769 11.6984 12.7479C11.4641 12.7268 11.2648 12.558 11.2062 12.3307L9.56328 6.03302L7.80078 14.5525C7.74922 14.808 7.52891 14.9932 7.26875 15.0002C7.00859 15.0072 6.77656 14.8385 6.70859 14.5877L5.35859 9.70099C5.33516 9.61896 5.2625 9.56271 5.17813 9.56271H2.5625C2.25078 9.56271 2 9.31192 2 9.00021C2 8.68849 2.25078 8.43771 2.5625 8.43771H5.17813C5.76875 8.43771 6.28672 8.83146 6.44375 9.40099L7.17031 12.0401L8.94922 3.44786C9.00313 3.19239 9.22344 3.00724 9.48594 3.00021Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0_207_8581">
                            <rect width="18" height="18" fill="white" transform="translate(0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span> Aktivität</span>
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'document' ? 'active' : ''}`}
                      id="document-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#document"
                      role="tab"
                      aria-controls="document"
                      aria-selected={activeTab === 'document'}
                      onClick={(e) => handleTabClick('document', 'Dokumente', e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_207_8589)">
                          <path d="M13.125 15.0938C13.3828 15.0938 13.5938 14.8828 13.5938 14.625V6.1875H11.25C10.7314 6.1875 10.3125 5.76855 10.3125 5.25V2.90625H5.625C5.36719 2.90625 5.15625 3.11719 5.15625 3.375V14.625C5.15625 14.8828 5.36719 15.0938 5.625 15.0938H13.125ZM3.75 3.375C3.75 2.34082 4.59082 1.5 5.625 1.5H10.4736C10.9717 1.5 11.4492 1.69629 11.8008 2.04785L14.4521 4.69922C14.8037 5.05078 15 5.52832 15 6.02637V14.625C15 15.6592 14.1592 16.5 13.125 16.5H5.625C4.59082 16.5 3.75 15.6592 3.75 14.625V3.375Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0_207_8589">
                            <rect width="18" height="18" fill="white" transform="translate(0.75)" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span> Dokumente</span>
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'attorney' ? 'active' : ''}`}
                      id="attorney-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#attorney"
                      role="tab"
                      aria-controls="attorney"
                      aria-selected={activeTab === 'attorney'}
                      onClick={(e) => handleTabClick('attorney', 'Vollmachten', e)}
                    >
                      <i className="fa-solid fa-paint-roller fa-fw"></i>
                      &nbsp; Vollmachten
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
                      id="services-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#services"
                      role="tab"
                      aria-controls="services"
                      aria-selected={activeTab === 'services'}
                      onClick={(e) => handleTabClick('services', 'HVD-PV', e)}
                    >
                      {' '}
                      <i className="fa-regular fa-lightbulb fa-fw"></i>
                      &nbsp; HVD-PV
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'bills' ? 'active' : ''}`}
                      id="bills-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bills"
                      role="tab"
                      aria-controls="bills"
                      aria-selected={activeTab === 'bills'}
                      onClick={(e) => handleTabClick('bills', 'Rechnung', e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_207_8565)">
                          <path d="M5.125 15.0938H12.625C12.8828 15.0938 13.0938 14.8828 13.0938 14.625V6.1875H10.75C10.2314 6.1875 9.8125 5.76855 9.8125 5.25V2.90625H5.125C4.86719 2.90625 4.65625 3.11719 4.65625 3.375V14.625C4.65625 14.8828 4.86719 15.0938 5.125 15.0938ZM3.25 3.375C3.25 2.34082 4.09082 1.5 5.125 1.5H9.97363C10.4717 1.5 10.9492 1.69629 11.3008 2.04785L13.9521 4.69922C14.3037 5.05078 14.5 5.52832 14.5 6.02637V14.625C14.5 15.6592 13.6592 16.5 12.625 16.5H5.125C4.09082 16.5 3.25 15.6592 3.25 14.625V3.375ZM5.59375 4.78125C5.59375 4.52344 5.80469 4.3125 6.0625 4.3125H8.40625C8.66406 4.3125 8.875 4.52344 8.875 4.78125C8.875 5.03906 8.66406 5.25 8.40625 5.25H6.0625C5.80469 5.25 5.59375 5.03906 5.59375 4.78125ZM5.59375 6.65625C5.59375 6.39844 5.80469 6.1875 6.0625 6.1875H8.40625C8.66406 6.1875 8.875 6.39844 8.875 6.65625C8.875 6.91406 8.66406 7.125 8.40625 7.125H6.0625C5.80469 7.125 5.59375 6.91406 5.59375 6.65625ZM8.875 13.2188C8.875 12.9609 9.08594 12.75 9.34375 12.75H11.6875C11.9453 12.75 12.1562 12.9609 12.1562 13.2188C12.1562 13.4766 11.9453 13.6875 11.6875 13.6875H9.34375C9.08594 13.6875 8.875 13.4766 8.875 13.2188ZM6.53125 8.0625H11.2188C11.7373 8.0625 12.1562 8.48145 12.1562 9V10.875C12.1562 11.3936 11.7373 11.8125 11.2188 11.8125H6.53125C6.0127 11.8125 5.59375 11.3936 5.59375 10.875V9C5.59375 8.48145 6.0127 8.0625 6.53125 8.0625Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0_207_8565">
                            <rect width="18" height="18" fill="white" transform="translate(0.25)" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span> Rechnung </span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(Customer)
