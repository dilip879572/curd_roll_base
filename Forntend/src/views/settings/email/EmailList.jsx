import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GrEdit } from 'react-icons/gr'
import { Table } from 'antd'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEdit } from 'react-icons/md'
import { postFetchData } from 'src/Api'
import { RiDeleteBinLine } from 'react-icons/ri'

const EmailList = () => {
  const navigate = useNavigate()
  const [emailRecord, setEmailRecord] = useState([])
  const apiUrl = process.env.REACT_APP_API_URL
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState('')
  const handlePageChange = (event, value) => {
    setPage(value)
  }
  const getDetails = async () => {
    try {
      const result = await fetch(
        `${apiUrl}/email/get_email?page=${page}&resultPerPage=${itemsPerPage}`,
      )
      const data = await result.json()
      setCountPage(data?.pageCount)
      const activeRecords = data?.result?.filter((record) => record.is_deleted === 'active')
      setEmailRecord(activeRecords)
    } catch (error) {
      console.error('Error fetching customer record:', error)
    }
  }
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10))
    setPage(1)
  }
  const handleEdit = (record) => {
    let recordData = JSON.stringify(record)
    localStorage.setItem('EmailEditDetails', recordData)
    navigate(`/settings/email_info`)
  }

  useEffect(() => {
    getDetails()
  }, [page, itemsPerPage])
  const columns = [
    {
      title: 'Name des Kunden',
      dataIndex: 'designation',
      render: (text) => <a>{text}</a>,
      width: '100%',
    },
    {
      title: 'AKTION',
      dataIndex: 'action',
      render: (text, record) => (
        <>
          <button style={{ background: 'none', border: 'none' }} onClick={() => handleEdit(record)}>
            <MdOutlineEdit className="fs-5" style={{ color: '#5C86B4' }} />
            &nbsp;&nbsp;Bearbeiten
          </button>
          <button
            style={{ background: 'none', border: 'none' }}
            // onClick={() => handleDelete(record._id)}
            disabled
          >
            <RiDeleteBinLine className="text-danger text-bold fs-5" /> Löschen
          </button>
        </>
      ),
    },
  ]

  return (
    <div className="inner-page-wrap">
      <div className="row tab-content" style={{ borderRadius: '5px' }}>
        <div
          className="col-sm-12"
          style={{
            background: 'white',
            Height: '640px',
            // width: '1210px',
            borderRadius: '5px ',
          }}
        >
          <div className="tab-title">
            <h4>E-Mail-Vorlagen</h4>
          </div>
          <div className="mx-2">
            <Table
              columns={columns}
              pagination={false}
              dataSource={emailRecord}
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
                    />
                  </Stack>
                </div>
                <div className="col-md-2 pe-md-0 mt-3 mt-md-0 text-md-end">
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
            </div>
            <br />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default React.memo(EmailList)
