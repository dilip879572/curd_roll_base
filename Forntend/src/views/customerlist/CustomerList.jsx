import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import PaginationItem from '@mui/material/PaginationItem'
import { MdLocalPrintshop } from 'react-icons/md'
import { Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditModal from './EditModal'
import Form from 'react-bootstrap/Form'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { verifyDelPer, verifyEditPer } from 'src/components/verifyPermission'
import PrintModal from './PrintModal'
import 'react-datepicker/dist/react-datepicker.css'
import DatePic from '../customer/Date'
import Select from 'react-select'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import { MultiSelect } from 'primereact/multiselect'
import 'react-phone-input-2/lib/style.css'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchCustomerRecords } from 'src/redux/reducers/customerSlice'
import { useSelector, useDispatch } from 'react-redux'

const CustomerList = () => {
  // console.log('verifyEditPer', verifyEditPer())
  let lgUser = localStorage.getItem('record')
  let loginData = JSON.parse(lgUser)
  // console.log('loginData', loginData)
  const apiUrl = process.env.REACT_APP_API_URL
  const [customer_record, setCustomerRecord] = useState([])
  const [printRecord, setPrintRecord] = useState([])
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [phone, setPhone] = useState()
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [land, setLand] = useState()
  const [plz, setPlz] = useState()
  const [ort, setOrt] = useState()
  const [street, setStreet] = useState()
  const [status, setStatus] = useState(null)
  const [clientStatus, setClientStatus] = useState([])
  const [created_by] = useState(loginData?.user?._id)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('')
  const navigate = useNavigate()
  const today = new Date()
  const year = today.getFullYear().toString().slice(-2)
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')
  const formattedDate = `${year}${month}${day}`
  const generateSequentialId = () => {
    return formattedDate + '-0000'
  }
  let adm = window.localStorage.getItem('record')
  let is_admin_true = JSON.parse(adm)

  const [id] = useState(generateSequentialId())

  const notify = (data) => toast(data)
  const [email, setEmail] = useState('')

  const handlePageChange = (event, value) => {
    setPage(value)
  }
  const handleClose = () => {
    resetForm()
    setShow(false)
  }
  const handleShow = () => setShow(true)
  const [selectedRecordId, setSelectedRecordId] = useState(null)

  const [print, setPrint] = useState(false)

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'fname',
      width: '10%',
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
      width: '20%',
    },
    {
      title: 'E-MAIL',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'TELEFON',
      dataIndex: 'phone',
      width: '20%',
    },
    {
      title: 'AKTION',
      dataIndex: 'action',
      width: '10%',
      // hidden: true,
      render: (_, record) => (
        <>
          {(loginData?.user?._id === record?.created_by && verifyEditPer().includes('owned')) ||
          verifyEditPer().includes('yes') ||
          loginData?.user?.isAdminFullRights === 'true' ? (
            <>
              <button
                style={{ background: 'none', border: 'none' }}
                onClick={() => editRecord(record)}
              >
                {/* <MdOutlineEdit className="fs-5" style={{ color: '#5C86B4' }} /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_476_24741)">
                    <path
                      d="M4 20.0003H8L18.5 9.5003C19.0304 8.96987 19.3284 8.25045 19.3284 7.5003C19.3284 6.75016 19.0304 6.03074 18.5 5.5003C17.9696 4.96987 17.2501 4.67188 16.5 4.67188C15.7499 4.67187 15.0304 4.96987 14.5 5.5003L4 16.0003V20.0003Z"
                      stroke="#005291"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5 6.5L17.5 10.5"
                      stroke="#005291"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_476_24741">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Edit</span>
              </button>
            </>
          ) : (
            ''
          )}
          {(loginData?.user?._id === record?.created_by && verifyDelPer().includes('owned')) ||
          verifyDelPer().includes('yes') ||
          loginData?.user?.isAdminFullRights === 'true' ? (
            <button
              style={{ background: 'none', border: 'none' }}
              onClick={() => handleIconClick(record._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_431_1048)">
                  <path
                    d="M5 8H19"
                    stroke="#C20F0F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 11V16"
                    stroke="#C20F0F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 11V16"
                    stroke="#C20F0F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 8L6.85714 18.2857C6.85714 18.7404 7.03775 19.1764 7.35925 19.4979C7.68074 19.8194 8.11677 20 8.57143 20H15.4286C15.8832 20 16.3193 19.8194 16.6408 19.4979C16.9622 19.1764 17.1429 18.7404 17.1429 18.2857L18 8"
                    stroke="#C20F0F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 8V5C9 4.73478 9.10536 4.48043 9.29289 4.29289C9.48043 4.10536 9.73478 4 10 4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5V8"
                    stroke="#C20F0F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_431_1048">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span> Delete</span>
            </button>
          ) : (
            ''
          )}

          <button
            style={{ background: 'none', border: 'none' }}
            onClick={() => handlePrint(record)}
          >
            {' '}
            <MdLocalPrintshop className="fs-5" style={{ color: '#615e55' }} />
            &nbsp;View
          </button>
        </>
      ),
    },
  ]
  let a = localStorage.getItem('tabId') || 'customer_info'
  const handleChangeStreet = (event) => {
    setStreet(event.target.value)
  }

  const editRecord = (record) => {
    if (record) {
      localStorage.setItem('customerRecord', JSON.stringify(record))
      setHide(true)
    } else {
      console.error('Record is undefined or null.')
    }
  }

  const handleIconClick = (record) => {
    setSelectedRecordId(record)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    resetForm()
    setIsModalVisible(false)
  }
  const handleDeleteConfirm = async () => {
    if (selectedRecordId) {
      try {
        const response = await fetch(`${apiUrl}/customer/get_record/delete/${selectedRecordId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          getDetails()
          toast.success('Record delete successfully')
        } else {
          const errorData = await response.json()
          // console.error('Failed to delete record:', response.status, response.statusText, errorData)
        }
      } catch (error) {
        toast.error('Beim Löschen des Datensatzes ist ein Fehler aufgetreten')
      }
      setIsModalVisible(false)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      searchHandle()
    }
  }

  console.log('startDate', startDate)
  const saveData = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
    let data = {
      customer: {
        fname,
        lname,
        street,
        title,
        ort,
        phone,
        startDate,
        plz,
        email,
        land,
        status: clientStatus,
        id,
        created_by,
      },
    }

    if (!fname || !lname) {
      return toast.warning('Please Fill First and Last Name')
    }
    if (!email) {
      return toast.warning('Please filled email filed')
    }

    if (phone && phone.startsWith('000')) {
      return toast.warning('Invalid Phone Number')
    }

    const emailRegex = /^[^\s@]+(\s[^\s@]+)*@[^\s@]+\.[^\s@]+$/

    try {
      if (email) {
        // console.log('regx1', emailRegex.test(email))
        if (emailRegex.test(email) === false) {
          return toast.warning('Please correct email format')
        } else {
          const response = await fetch(`${apiUrl}/customer/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }

          const result = await response.json()
          console.log('result', result)
          if (result.status === 400) {
            toast.warning('Please correct email format')
          } else if (response.status === 201) {
            toast.success('User Create Successfully')
            resetForm()
            handleClose()
            getDetails()
          }
        }
        return
      }

      if (email?.length === 0) {
        const response = await fetch(`${apiUrl}/customer/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        if (result.status === 400) {
          toast.warning('Please correct email format')
        } else if (response.status === 201) {
          toast.success('User Create Successfully')
          resetForm()
          handleClose()
          getDetails()
        }
      }
    } catch (error) {
      toast.error('E-Mail-ID existiert bereits')
      // console.error('error', error)
    }
  }
  function resetForm() {
    setFname('')
    setTitle('')
    setLand('')
    setLname('')
    setEmail('')
    setPlz('')
    setStreet('')
    setPhone('')
    setOrt('')
    setValidated(false)
  }
  const dispatch = useDispatch()
  const { customerRecords, pageCount, loading, error } = useSelector((state) => state.customers)

  useEffect(() => {
    dispatch(fetchCustomerRecords({ page: page, itemsPerPage: itemsPerPage }))
  }, [dispatch, page, itemsPerPage])

  const getDetails = async () => {
    try {
      const result = await fetch(
        `${apiUrl}/customer/get_records?page=${page}&resultPerPage=${itemsPerPage}`,
      )
      const data = await result.json()
      setCountPage(data?.pageCount)
      const activeRecords = data?.result?.filter((record) => record.status === 'active')
      setCustomerRecord(activeRecords)
    } catch (error) {
      console.error('Error fetching customer record:', error)
    }
  }

  const modifiedDataSource = customer_record?.map((customerRecord) => {
    const {
      customer: { fname, lname, email, id, phone, startDate, plz, land, street, ort },
      _id,
      countId,
    } = customerRecord

    return {
      countId,
      _id,
      id,
      fname,
      lname,
      email,
      phone,
      startDate,
      plz,
      land,
      street,
      ort,
    }
  })
  const [hide, setHide] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const rowSelection = {
    // onChange: (selectedRowKeys, selectedRows) => {},
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record?.name === 'Disabled User',
      // Column configuration not to be checked
      name: record?.name,
    }),
  }
  const [search, setSearch] = useState('')
  const handleChange = (e) => {
    setSearch(e.target.value)
    setIsTyping(true)
  }
  const [isTyping, setIsTyping] = useState(false)
  const searchHandle = async () => {
    try {
      // let key = searchInputRef.current.value
      if (search === '') {
        return getDetails()
      }
      const response = await fetch(`${apiUrl}/customer/search/${search}`)
      const data = await response.json()
      const activeRecords = data.filter((record) => record.status === 'active')

      if (activeRecords?.length > 0) {
        setCustomerRecord(activeRecords)
      } else {
        getDetails()
        setCustomerRecord(data)
      }
    } catch (error) {
      console.error('Error searching data:', error.message)
    }
  }
  const customerItems = []

  printRecord?.map((item) => {
    if (item?.designation === 'customer') {
      customerItems?.push(item)
    }
    return null
  })

  const handlePrint = (record) => {
    let res = JSON.stringify(record)
    localStorage.setItem('CustomerRecord', res)
    setPrint(true)
  }

  useEffect(() => {
    getDetails()
    // getPrintDetails()
  }, [page, itemsPerPage])
  return (
    <>
      <div>
        {hide ? <EditModal setHide={setHide} getDetails={getDetails} /> : ''}
        {print ? <PrintModal setPrint={setPrint} getDetails={getDetails} /> : ''}
        <div className="page-title">
          <h2>UserList</h2>
        </div>
        <div className="search-filter-row" style={{ background: 'white', borderRadius: '5px' }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 mb-md-0 mb-3">
                <div className="d-flex align-items-center">
                  <input
                    // ref={searchInputRef}
                    name="search"
                    // value={search}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    type="search"
                    id="form1"
                    placeholder="Search here..."
                    // className="form-control form-search-control"
                    className={`form-control form-search-control-without ${
                      isTyping ? '' : 'form-search-control'
                    }`}
                  />
                  <button onClick={searchHandle} className="filter-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M17.2837 3.19758L17.2819 3.19982L11.4249 10.3893L11.3125 10.5272V10.7051V15.7395C11.3125 16.0891 11.0266 16.375 10.677 16.375C10.538 16.375 10.4145 16.3294 10.3142 16.2343L10.2972 16.2182L10.2788 16.2037L7.02898 13.6566C6.81324 13.4832 6.6875 13.2225 6.6875 12.948V10.7051V10.5272L6.57512 10.3892L0.717141 3.19979L0.716307 3.19877C0.5768 3.02847 0.5 2.81363 0.5 2.59102C0.5 2.05751 0.932509 1.625 1.46602 1.625H16.534C17.0667 1.625 17.5 2.05774 17.5 2.59102C17.5 2.81391 17.4234 3.02809 17.2837 3.19758ZM1.93219 2.3125H0.879712L1.54459 3.12837L7.29738 10.1875C7.29744 10.1876 7.2975 10.1877 7.29756 10.1877C7.34744 10.2491 7.375 10.3272 7.375 10.4062V12.8109V13.0524L7.56415 13.2026L9.81415 14.9885L10.625 15.6321V14.5969V10.4062C10.625 10.3272 10.6526 10.2491 10.7025 10.1877C10.7025 10.1876 10.7026 10.1876 10.7026 10.1875L16.454 3.12832L17.1187 2.3125H16.0664H1.93219Z"
                        fill="#1C1D21"
                        stroke="white"
                      />
                    </svg>
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {is_admin_true?.user?.user_type === 'admin' ? (
                <div className="col-md-5 text-end">
                  <div className="d-flex align-items-center justify-content-between justify-content-md-end text-md-end flex-md-row flex-column">
                    <button className="primary-btn" style={{ border: 'none' }} onClick={handleShow}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_437_8819)">
                          <path
                            d="M12 5V19"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 12H19"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_437_8819">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>New User Create</span>
                    </button>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <Modal show={show} onHide={handleClose} className="modal-form">
              <Modal.Header>
                <Modal.Title>New User Create</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate validated={validated}>
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        value={fname}
                        onChange={(e) => {
                          setFname(e.target.value)
                        }}
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        value={lname}
                        onChange={(e) => {
                          setLname(e.target.value)
                        }}
                        placeholder="Last Name"
                        className="form-control"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <input
                        value={street}
                        onChange={handleChangeStreet}
                        type="text"
                        placeholder="Address"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="email"
                        onChange={handleEmailChange}
                        placeholder="E-Mail"
                        className="form-control"
                        // required={true}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        placeholder="Phone"
                        className="form-control"
                        value={phone}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/[^\d+ ]/g, '')
                          if (/^\+?(?:[0-9] ?){0,}$/.test(inputValue)) {
                            setPhone(inputValue)
                          }
                        }}
                        maxLength={10}
                        minLength={3}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        value={plz}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(
                            /[^0-9a-zA-Z9äöüÄÖÜßÄÖÜß\s'-]/g,
                            '',
                          )
                          setPlz(inputValue)
                        }}
                        placeholder="Pincode"
                        className="form-control"
                        maxLength={10}
                        minLength={3}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        value={ort}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(
                            /[^a-zA-Z9äöüÄÖÜßÄÖÜß\s'-]/g,
                            '',
                          ) // Allow only alphabetic characters, spaces, hyphens, and apostrophes
                          setOrt(inputValue)
                        }}
                        placeholder="City"
                        className="form-control"
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <div className="btn-wrapper d-flex w-100 m-0 justify-content-end">
                  <button className="btn btn-cancel" onClick={handleClose}>
                    {' '}
                    Cancel
                  </button>
                  <button className="btn btn-save ms-3" onClick={saveData}>
                    Create
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <Table
          rowKey="_id"
          // rowSelection={rowSelection}
          responsive
          columns={columns}
          dataSource={modifiedDataSource}
          pagination={false}
          showSorterTooltip={{
            target: 'sorter-icon',
          }}
        />
        <div className="container-fluid pagination-row">
          <div className="row">
            <div className="col-md-10 ps-md-0 text-center text-md-start">
              <Stack spacing={2}>
                <Pagination
                  count={countPage}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      text={
                        item.type === 'previous'
                          ? 'Previous'
                          : item.type === 'next'
                          ? 'Next'
                          : item.page
                      }
                    />
                  )}
                />
              </Stack>
            </div>
          </div>
        </div>
        <Modal
          show={isModalVisible}
          onHide={handleModalClose}
          centered
          className="modal-delete custom-modal"
        >
          <Modal.Title className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="53"
              viewBox="0 0 44 53"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9195 0C19.9917 0 24.0638 0 28.136 0C28.1981 0.0248302 28.2601 0.0620762 28.3222 0.0744913C30.5197 0.397284 32.295 2.30921 32.3943 4.50668C32.4316 5.13985 32.4564 5.77302 32.4813 6.44343C32.7171 6.44343 32.9282 6.44343 33.1268 6.44343C35.1753 6.46826 37.2362 6.4186 39.2847 6.51792C41.4201 6.62966 43.1582 8.35535 43.481 10.5032C43.7914 12.6634 42.5747 14.8236 40.5635 15.5561C40.1289 15.7175 40.0172 15.9286 40.0172 16.3631C40.0296 26.1586 40.0296 35.9541 40.0296 45.7496C40.0296 46.271 40.0048 46.78 39.9427 47.3015C39.6572 50.008 37.7204 52.2179 35.0884 52.851C34.9146 52.8883 34.7284 52.9503 34.5546 53C26.1992 53 17.8563 53 9.50094 53C9.40162 52.9628 9.3147 52.9131 9.21538 52.9007C8.03595 52.6896 6.99308 52.1806 6.11161 51.3488C4.59697 49.9211 4.00105 48.1333 4.00105 46.0848C4.00105 36.1651 4.00105 26.2455 4.01347 16.3258C4.01347 15.8913 3.88932 15.7051 3.47962 15.5685C2.62298 15.283 1.94014 14.7243 1.41871 13.9918C0.363427 12.4896 0.164787 10.8632 0.946937 9.19958C1.67943 7.62286 2.95818 6.61724 4.70871 6.51792C6.76961 6.40618 8.84293 6.45585 10.9163 6.43102C11.1149 6.43102 11.3135 6.43102 11.5742 6.43102C11.5742 5.922 11.5618 5.48747 11.5742 5.04053C11.5991 3.35207 12.195 1.91192 13.6103 0.955961C14.3056 0.521433 15.1498 0.310377 15.9195 0ZM37.5466 15.9286C27.1676 15.9286 16.8507 15.9286 6.50889 15.9286C6.50889 16.1024 6.50889 16.2389 6.50889 16.3755C6.50889 26.2952 6.50889 36.2148 6.50889 46.1345C6.50889 46.4821 6.53373 46.8297 6.5958 47.1649C6.90618 49.1637 8.44565 50.517 10.4445 50.517C18.1791 50.5294 25.9013 50.517 33.6359 50.517C34.6042 50.517 35.4609 50.219 36.181 49.561C37.2114 48.6175 37.5466 47.4008 37.5466 46.06C37.5466 36.19 37.5466 26.32 37.5466 16.45C37.5466 16.2886 37.5466 16.1272 37.5466 15.9286ZM21.9781 13.4083C27.4159 13.4083 32.8413 13.4083 38.2791 13.4083C38.5398 13.4083 38.8005 13.3959 39.0488 13.371C40.1041 13.2593 40.8863 12.4647 40.998 11.4219C41.1097 10.3542 40.489 9.36098 39.4709 9.06301C39.1357 8.96369 38.7633 8.93886 38.4033 8.93886C27.4904 8.92645 16.5651 8.93886 5.65226 8.93886C5.39154 8.93886 5.13082 8.95128 4.88252 8.98852C3.82724 9.14992 3.06991 10.0066 3.00784 11.0867C2.94576 12.0923 3.66584 13.0855 4.65905 13.3214C5.00667 13.4083 5.37912 13.4083 5.73916 13.4083C11.1397 13.4083 16.5651 13.4083 21.9781 13.4083ZM14.0449 6.40619C19.3958 6.40619 24.6598 6.40619 29.9238 6.40619C29.9238 5.7606 29.9734 5.16468 29.9113 4.56875C29.7872 3.41415 28.8561 2.50785 27.689 2.50785C23.9149 2.48302 20.1282 2.48302 16.3541 2.50785C15.2491 2.52026 14.318 3.31483 14.1442 4.40736C14.0324 5.05294 14.0697 5.72336 14.0449 6.40619Z"
                fill="#C20F0F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.932 32.2171C15.932 35.9789 15.932 39.7407 15.932 43.49C15.932 44.5577 15.5099 45.1288 14.7153 45.1412C13.9083 45.1537 13.449 44.5577 13.449 43.4776C13.449 35.9417 13.449 28.4057 13.449 20.8697C13.449 20.6339 13.4738 20.3856 13.5235 20.1497C13.6476 19.5786 14.107 19.231 14.6781 19.231C15.2367 19.2185 15.7209 19.5662 15.8575 20.1124C15.9196 20.3483 15.9196 20.5842 15.9196 20.8325C15.932 24.6191 15.932 28.4181 15.932 32.2171Z"
                fill="#C20F0F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7861 32.2047C20.7861 28.3809 20.7861 24.5446 20.7861 20.7208C20.7861 20.1497 20.9227 19.6655 21.4566 19.3675C22.1021 19.0075 22.9712 19.3551 23.1822 20.0628C23.2567 20.3235 23.2816 20.609 23.2816 20.8822C23.2816 28.4181 23.2816 35.9541 23.2816 43.49C23.2816 43.7259 23.2692 43.9742 23.2071 44.2101C23.0705 44.7812 22.5739 45.1661 22.0152 45.1537C21.469 45.1413 20.9848 44.7688 20.8606 44.2101C20.811 43.9742 20.7986 43.7259 20.7986 43.49C20.7861 39.7283 20.7861 35.9665 20.7861 32.2047Z"
                fill="#C20F0F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.1113 32.1551C28.1113 28.3933 28.1113 24.6315 28.1113 20.8822C28.1113 19.7896 28.5459 19.2186 29.3653 19.231C30.1598 19.2434 30.5943 19.8145 30.5943 20.8698C30.5943 28.4057 30.5943 35.9417 30.5943 43.4776C30.5943 44.5578 30.135 45.1537 29.328 45.1413C28.5334 45.1288 28.1113 44.5577 28.1113 43.4901C28.1113 39.7159 28.1113 35.9417 28.1113 32.1551Z"
                fill="#C20F0F"
              />
            </svg>
            <h4>user-record</h4>
          </Modal.Title>
          <p>Are you sure to delete record...</p>
          <div className="text-center">
            <button className="btn modal-btn delete-btn me-3" onClick={handleDeleteConfirm}>
              Delete
            </button>
            <button className="btn modal-btn close-btn" onClick={handleModalClose}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </>
  )
}

export default React.memo(CustomerList)
