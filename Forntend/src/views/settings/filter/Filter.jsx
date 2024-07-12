import React, { useEffect, useRef, useState } from 'react'
import { Divider, Table } from 'antd'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { GrEdit } from 'react-icons/gr'
import { MdDelete, MdAdd } from 'react-icons/md'
import { BiFilterAlt } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const columns = [
  {
    title: 'NACHNAME',
    dataIndex: 'fname',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'VORNAMEN',
    dataIndex: 'lname',
  },
  {
    title: 'GEBURTSDATUM',
    dataIndex: 'dob',
  },
  {
    title: 'PLZ',
    dataIndex: 'plz',
  },
  {
    title: 'TELEFON',
    dataIndex: 'telephone',
  },
  {
    title: 'MOBIL',
    dataIndex: 'mobile',
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    render: (text, record) => (
      <div
        style={{
          color: 'white',
          background: text === 'PV-ALT' ? '#F6011F' : text === 'HVD-PV' ? '#55BC6E' : 'transparent',
          borderRadius: '20px',
          padding: '3px',
          width: '70px',
          textAlign: 'center',
        }}
      >
        <b style={{ fontSize: '12px' }}>{text}</b>
      </div>
    ),
  },
  {
    title: 'ID KLIENTINNEN',
    dataIndex: 'client_id',
  },
  {
    title: 'VERSAND NACHSTE MARKE',
    dataIndex: 'next_shipping',
  },
  {
    title: 'DAUERSPENDERINNEN',
    dataIndex: 'permanent_donors',
  },
]

const Filter = () => {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [filterRecord, setFilterRecord] = useState([])
  const apiUrl = process.env.REACT_APP_API_URL
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(0)
  const searchInputRef = useRef()
  const [itemsPerPage, setItemsPerPage] = useState('')
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10))
    setPage(1)
  }
  const getDetails = async () => {
    try {
      const result = await fetch(
        `${apiUrl}/filter/get_filter?page=${page}&resultPerPage=${itemsPerPage}`,
      )
      const data = await result.json()
      setCountPage(data?.pageCount)
      const activeRecords = data?.result?.filter((record) => record.is_deleted === 'active')
      setFilterRecord(activeRecords)
    } catch (error) {
      console.error('Error fetching customer record:', error)
    }
  }
  const handlePageChange = (event, value) => {
    setPage(value)
  }
  // console.log('aastha', filterRecord)
  useEffect(() => {
    getDetails()
  }, [page, itemsPerPage])

  const searchHandle = async () => {
    try {
      if (search === '') {
        return getDetails()
      }

      const response = await fetch(`${apiUrl}/filter/search/${search}`)
      const data = await response.json()

      const activeRecords = data.filter((record) => record.is_deleted === 'active')

      if (activeRecords.length > 0) {
        setFilterRecord(activeRecords)
      } else {
        getDetails()
        setFilterRecord(data)
      }
    } catch (error) {
      console.error('Error searching data:', error.message)
    }
  }

  return (
    <div>
      <div className="px-3" style={{ background: 'white', borderRadius: '5px' }}>
        <div className="container-fluid">
          <h4 className="px-3 pt-3">Filter</h4>
          <hr />
          <div className="search-filter-row" style={{ boxShadow: 'none' }}>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-6 mb-md-0 mb-3">
                  <div className="d-flex align-items-center">
                    <input
                      ref={searchInputRef}
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type="search"
                      id="form1"
                      placeholder="Ihre Suche eingeben"
                      className="form-control form-search-control"
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

                <div className="col-md-6 text-end">
                  <div className="d-flex align-items-center justify-content-between justify-content-md-end text-md-end flex-md-row flex-column"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Table
              rowKey={(record) => record._id}
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys, selectedRows) => {
                  // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                },
                getCheckboxProps: (record) => ({
                  disabled: record.name === 'Disabled User',
                  name: record.name,
                }),
              }}
              style={{ overflowX: 'auto' }}
              columns={columns}
              dataSource={filterRecord}
              pagination={false}
            />
            <div className="row d-flex">
              <div className="col-sm-10">
                {' '}
                <Stack spacing={2}>
                  <Pagination
                    count={countPage}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handlePageChange}
                  />
                </Stack>
              </div>
              <div className="col-sm-2 text-end">
                <select
                  className="form-control form-select"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value={10}>10 pro Seite</option>
                  <option value={20}>20 pro Seite</option>
                  <option value={50}>50 pro Seite</option>
                  <option value={100}>100 pro Seite</option>
                </select>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Filter)
