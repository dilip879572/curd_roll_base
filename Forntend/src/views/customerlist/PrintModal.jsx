import React, { useEffect, useRef, useState } from 'react'
import { putFetchData } from 'src/Api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'src/components/loader/Loader'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

const PrintModal = ({ setPrint, getDetails }) => {
  let modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // maxHeight: '100%',
    color: 'black',
  }
  PrintModal.propTypes = {
    setPrint: PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
  }

  const apiUrl = process.env.REACT_APP_API_URL
  let res = localStorage.getItem('CustomerRecord')
  let response = JSON.parse(res)
  console.log('aastha', response.email)
  const [data, setData] = useState({
    fname: response?.fname,
    lname: response?.lname,
    phone: response?.phone,
    statu: response?.statu,
    gender: response?.gender,
    email: response?.email,
    // customer_id: result?._id,
  })

  const close = () => {
    setPrint(false)
  }
  const [printRecord, setPrintRecord] = useState([])
  const [page, setPage] = useState(1)

  const getPrintDetails = async () => {
    try {
      const result = await fetch(`${apiUrl}/print/get_print?page=${page}`)
      const data = await result.json()
      const activeRecords = data?.result?.filter((record) => record.is_deleted === 'active')
      setPrintRecord(activeRecords)
    } catch (error) {
      console.error('Error fetching print details:', error)
    }
  }

  useEffect(() => {
    getPrintDetails()
  }, [page])

  return (
    <div id="body" className="modal" tabIndex={-1} style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header">
            <div className="text-end">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={close}
              />
            </div>
            <p>First Name : {data.fname}</p>
            <br />
            <p>Last Name : {data.fname}</p>
            <br />
            <p>Email Id : {data.fname}</p>
            <br />
            <p>Phone : {data.fname}</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PrintModal
