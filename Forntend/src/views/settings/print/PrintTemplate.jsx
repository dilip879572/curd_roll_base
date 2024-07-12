import React, { useEffect, useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import { Divider, Radio, Table } from 'antd'
import Modal from 'react-bootstrap/Modal'
import { GrEdit } from 'react-icons/gr'
import { MdDelete, MdAdd, MdOutlineEdit } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { postFetchContent } from 'src/Api'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import { RiDeleteBinLine } from 'react-icons/ri'

const PrintTemplate = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const notify = (dataa) => toast(dataa)
  const [selectionType, setSelectionType] = useState('checkbox')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [printRecord, setPrintRecord] = useState([])
  const [hide, setHide] = useState(false)
  const [edit, setEdit] = useState(false)
  const [printId, setPrintId] = useState('')
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(0)
  const [show, setShow] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState('')
  const handlePageChange = (event, value) => {
    setPage(value)
  }
  // eslint-disable-next-line no-undef
  const handleClose = () => setShow(false)
  // eslint-disable-next-line no-undef
  const handleShow = () => setShow(true)
  // Move the function definition above its usage
  const handleDelete = (printId) => {
    setPrintId(printId)
    setHide(true)
  }

  const handleDeleteConfirm = () => {
    setIsModalVisible(false)
  }
  const handleEdit = (record) => {
    let recordData = JSON.stringify(record)
    localStorage.setItem('PrintEditDetails', recordData)
    setEdit(true)
  }

  const handleDeleteCancel = () => {
    setIsModalVisible(false)
    setSelectedRecord(null)
  }
  const [data, setData] = useState({
    content: '',
    designation: '', // Fixed the typo here
  })

  const { content, designation } = data // Destructure content and designation from data

  const setDesignation = (value) => {
    setData((prevData) => ({
      ...prevData,
      designation: value,
    }))
  }

  const setContent = (value) => {
    setData((prevData) => ({
      ...prevData,
      content: value,
    }))
  }
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
      render: (_, record) => (
        <>
          <button onClick={() => handleEdit(record)} style={{ background: 'none', border: 'none' }}>
            <MdOutlineEdit className="fs-5" style={{ color: '#5C86B4' }} />
            &nbsp;&nbsp;Bearbeiten
          </button>
          &nbsp;&nbsp;
          <button
            style={{ background: 'none', border: 'none' }}
            onClick={() => handleDelete(record._id)}
          >
            <RiDeleteBinLine className="text-danger text-bold fs-5" /> Löschen
          </button>
        </>
      ),
    },
  ]
  const editor = useRef(null)
  const placeholder = `Hallo {{ activity.user }}

  Ihre {{ activity.title }} Aktivität ist fällig am {{ activity.due_date }}
  
  {{#action_button}}Aktivität ansehen{{/action_button}}`

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
    }),
    [placeholder],
  )

  const saveData = async () => {
    try {
      const { content, designation } = data
      if (!content || !designation) {
        toast.warning('Bitte füllen Sie alle Angaben aus')
        return
      }
      const url = `${apiUrl}/print/create_print`
      const response = await postFetchContent(url, data)

      // console.log(response.status)
      if (response.status === 201) {
        toast.success('PrintTemplate-Daten erfolgreich gespeichert')
      }

      setData({
        content: '',
        designation: '',
      })
      getDetails()
      handleClose()
    } catch (error) {
      console.error(error)
      notify('Error saving data')
    }
    // console.log(data)
  }

  const getDetails = async () => {
    try {
      const result = await fetch(
        `${apiUrl}/print/get_print?page=${page}&resultPerPage=${itemsPerPage}`,
      )
      const data = await result.json()
      setCountPage(data?.pageCount)
      const activeRecords = data?.result?.filter((record) => record.is_deleted === 'active')
      setPrintRecord(activeRecords)
    } catch (error) {
      console.error('Error fetching customer record:', error)
    }
  }
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10))
    setPage(1)
  }
  console.log('perpage', itemsPerPage)
  // console.log('print data', printRecord)

  useEffect(() => {
    getDetails()
  }, [page, itemsPerPage])

  return (
    <div className="inner-page-warp">
      {hide ? <DeleteModal setHide={setHide} printId={printId} getDetails={getDetails} /> : ''}
      {edit ? <EditModal setEdit={setEdit} getDetails={getDetails} /> : ''}
      <div className="row tab-content">
        <div
          className="col-sm-12"
          style={{
            background: 'white',
            // Height: '640px',
            borderRadius: '5px ',
          }}
        >
          <div className="tab-title">
            <h4 className="mx-3 mt-2">Druckvorlage</h4>
          </div>
          <hr />
          <div>
            <div className="p-2" style={{ border: '1px solid lightgray', borderRadius: '5px' }}>
              <button
                className="btn btn m-2"
                style={{ background: '#0b5995', color: 'white' }}
                onClick={handleShow}
              >
                <MdAdd /> Neue Druckvorlage anlegen
              </button>
            </div>

            <Modal size="lg" show={show} onHide={handleClose} centered className="modal-form">
              <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title>Neue E-Mail-Vorlage anlegen</Modal.Title>
              </Modal.Header>
              <div className="row-wrap">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <div className=" p-2">
                        <div>
                          <label className="mb-2">Bezeichnung</label>
                          <input
                            value={designation}
                            onChange={(e) => {
                              setDesignation(e.target.value)
                            }}
                            type="text"
                            className="form-control"
                            placeholder="{{ activity.title }} Aktivität ist fällig am {{ activity.due_date }}"
                          />
                        </div>
                        <div>
                          <br />
                          <label className="mb-2">Inhalt</label>
                          <div className="col-sm-12">
                            {/* Assuming JoditEditor returns a value directly, if not, adjust accordingly */}
                            <JoditEditor
                              value={content}
                              onChange={(newContent) => {
                                setContent(newContent)
                              }}
                              // Other JoditEditor props
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Modal.Footer>
                <button style={{ border: 'none', background: 'none' }}></button>
                <div className="btn-wrap">
                  <button className="btn btn-cancel" onClick={handleClose}>
                    Abbrechen
                  </button>
                  <button className="btn btn-save ms-3" onClick={saveData}>
                    Speichern
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="mx-2">
            <Table
              dataSource={printRecord}
              columns={columns}
              pagination={false}
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
                <div className="col-sm-10 ps-md-0 text-center text-md-start">
                  <Stack spacing={2}>
                    <Pagination
                      count={countPage}
                      variant="outlined"
                      shape="rounded"
                      page={page}
                      onChange={handlePageChange}
                    />
                    <br />
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

            <Modal show={isModalVisible} onHide={handleDeleteCancel} centered size="sm">
              <Modal.Title>
                <svg
                  style={{ marginLeft: '130px', marginTop: '25px' }}
                  width="44"
                  height="53"
                  viewBox="0 0 44 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.9193 0C19.9914 0 24.0636 0 28.1357 0C28.1978 0.0248302 28.2599 0.0620762 28.322 0.0744913C30.5194 0.397284 32.2948 2.30921 32.3941 4.50668C32.4313 5.13985 32.4562 5.77302 32.481 6.44343C32.7169 6.44343 32.928 6.44343 33.1266 6.44343C35.1751 6.46826 37.236 6.4186 39.2845 6.51792C41.4199 6.62966 43.158 8.35535 43.4808 10.5032C43.7912 12.6634 42.5745 14.8236 40.5632 15.5561C40.1287 15.7175 40.017 15.9286 40.017 16.3631C40.0294 26.1586 40.0294 35.9541 40.0294 45.7496C40.0294 46.271 40.0046 46.78 39.9425 47.3015C39.6569 50.008 37.7202 52.2179 35.0882 52.851C34.9144 52.8883 34.7281 52.9503 34.5543 53C26.199 53 17.856 53 9.50069 53C9.40137 52.9628 9.31446 52.9131 9.21514 52.9007C8.03571 52.6896 6.99284 52.1806 6.11137 51.3488C4.59673 49.9211 4.0008 48.1333 4.0008 46.0848C4.0008 36.1651 4.00081 26.2455 4.01322 16.3258C4.01322 15.8913 3.88907 15.7051 3.47937 15.5685C2.62273 15.283 1.9399 14.7243 1.41847 13.9918C0.363183 12.4896 0.164543 10.8632 0.946693 9.19958C1.67918 7.62286 2.95794 6.61724 4.70846 6.51792C6.76937 6.40618 8.84269 6.45585 10.916 6.43102C11.1146 6.43102 11.3133 6.43102 11.574 6.43102C11.574 5.922 11.5616 5.48747 11.574 5.04053C11.5988 3.35207 12.1948 1.91192 13.6101 0.955961C14.3053 0.521433 15.1495 0.310377 15.9193 0ZM37.5464 15.9286C27.1674 15.9286 16.8504 15.9286 6.50865 15.9286C6.50865 16.1024 6.50865 16.2389 6.50865 16.3755C6.50865 26.2952 6.50865 36.2148 6.50865 46.1345C6.50865 46.4821 6.53348 46.8297 6.59556 47.1649C6.90593 49.1637 8.44541 50.517 10.4442 50.517C18.1788 50.5294 25.901 50.517 33.6356 50.517C34.604 50.517 35.4606 50.219 36.1807 49.561C37.2112 48.6175 37.5464 47.4008 37.5464 46.06C37.5464 36.19 37.5464 26.32 37.5464 16.45C37.5464 16.2886 37.5464 16.1272 37.5464 15.9286ZM21.9779 13.4083C27.4157 13.4083 32.841 13.4083 38.2789 13.4083C38.5396 13.4083 38.8003 13.3959 39.0486 13.371C40.1039 13.2593 40.886 12.4647 40.9978 11.4219C41.1095 10.3542 40.4887 9.36098 39.4707 9.06301C39.1355 8.96369 38.763 8.93886 38.403 8.93886C27.4901 8.92645 16.5649 8.93886 5.65201 8.93886C5.3913 8.93886 5.13058 8.95128 4.88228 8.98852C3.82699 9.14992 3.06967 10.0066 3.00759 11.0867C2.94552 12.0923 3.6656 13.0855 4.65881 13.3214C5.00643 13.4083 5.37888 13.4083 5.73891 13.4083C11.1395 13.4083 16.5649 13.4083 21.9779 13.4083ZM14.0446 6.40619C19.3955 6.40619 24.6595 6.40619 29.9235 6.40619C29.9235 5.7606 29.9732 5.16468 29.9111 4.56875C29.7869 3.41415 28.8558 2.50785 27.6888 2.50785C23.9146 2.48302 20.128 2.48302 16.3538 2.50785C15.2489 2.52026 14.3177 3.31483 14.1439 4.40736C14.0322 5.05294 14.0694 5.72336 14.0446 6.40619Z"
                    fill="#C20F0F"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.9322 32.217C15.9322 35.9787 15.9322 39.7405 15.9322 43.4899C15.9322 44.5576 15.5101 45.1287 14.7156 45.1411C13.9086 45.1535 13.4492 44.5576 13.4492 43.4775C13.4492 35.9415 13.4492 28.4055 13.4492 20.8696C13.4492 20.6337 13.474 20.3854 13.5237 20.1495C13.6479 19.5784 14.1072 19.2308 14.6783 19.2308C15.237 19.2184 15.7212 19.566 15.8577 20.1123C15.9198 20.3481 15.9198 20.584 15.9198 20.8323C15.9322 24.6189 15.9322 28.418 15.9322 32.217Z"
                    fill="#C20F0F"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.7852 32.2046C20.7852 28.3807 20.7852 24.5444 20.7852 20.7206C20.7852 20.1495 20.9217 19.6653 21.4556 19.3674C22.1012 19.0073 22.9702 19.3549 23.1813 20.0626C23.2558 20.3233 23.2806 20.6089 23.2806 20.882C23.2806 28.4179 23.2806 35.9539 23.2806 43.4899C23.2806 43.7257 23.2682 43.974 23.2061 44.2099C23.0695 44.781 22.5729 45.1659 22.0143 45.1535C21.468 45.1411 20.9838 44.7686 20.8597 44.2099C20.81 43.974 20.7976 43.7257 20.7976 43.4899C20.7852 39.7281 20.7852 35.9663 20.7852 32.2046Z"
                    fill="#C20F0F"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28.1113 32.1548C28.1113 28.393 28.1113 24.6312 28.1113 20.8819C28.1113 19.7893 28.5459 19.2183 29.3653 19.2307C30.1598 19.2431 30.5943 19.8142 30.5943 20.8695C30.5943 28.4054 30.5943 35.9414 30.5943 43.4773C30.5943 44.5574 30.135 45.1534 29.328 45.141C28.5334 45.1285 28.1113 44.5574 28.1113 43.4897C28.1113 39.7156 28.1113 35.9414 28.1113 32.1548Z"
                    fill="#C20F0F"
                  />
                </svg>
                <br />
                <br />
                <h4 style={{ marginLeft: '80px', color: 'black' }}>Sind Sie sicher?</h4>
              </Modal.Title>
              <Modal.Body>
                <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '30px' }}>
                  Dieser Vorgang kann nicht ruckgangig gemacht werden.
                </p>
                <div className="popupfooterBtn">
                  <button
                    className="btn btn"
                    style={{ background: '#d04545', border: '#d04545', color: 'white' }}
                    onClick={handleDeleteCancel}
                  >
                    Löschen
                  </button>
                  <button
                    className="btn btn"
                    style={{ background: '#015291', border: '#015291', color: 'white' }}
                    onClick={handleDeleteConfirm}
                  >
                    Abbrechen
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default React.memo(PrintTemplate)
