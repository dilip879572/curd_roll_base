import React, { useState } from 'react'
import { putFetchData } from 'src/Api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'src/components/loader/Loader'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import JoditEditor from 'jodit-react'

const EditModal = ({ setEdit, getDetails }) => {
  const apiUrl = process.env.REACT_APP_API_URL
  let res = localStorage.getItem('PrintEditDetails')
  let response = JSON.parse(res)

  const [data, setData] = useState({
    content: response?.content,
    designation: response?.designation,
  })

  const [validated, setValidated] = useState(false)
  const [loadValue, setLoadValue] = useState(false)

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

  const notify = (dataa) => toast(dataa)

  const close = () => {
    setEdit(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await putFetchData(`${apiUrl}/print/get_print/edit/${response?._id}`, data)
      // console.log('document page', res)

      if (res?.status === 200) {
        setLoadValue(false)
        setData({
          content: '',
          designation: '',
        })
        toast.success('PrintTemplate erfolgreich aktualisiert')
        getDetails()
      } else {
        notify('Etwas ist schief gelaufen')
      }
      close()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="modal"
      tabIndex={-1}
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
        maxHeight: '100%',
        color: 'black',
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Dokument aktualisieren</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={close}
            />
          </div>
          <div>
            <div className="row px-4">
              <div className="col-sm-12">
                <label>Bezeichnung</label>
                <input
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value) // Fixed the function name here
                  }}
                  type="text"
                  className="form-control"
                  placeholder="{{ activity.title }} Aktivität ist fällig am {{ activity.due_date }}"
                />
              </div>
            </div>
            <div className="row px-4">
              <label>Inhalt</label>
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary w-25"
              data-bs-dismiss="modal"
              onClick={close}
              style={{ background: '#d04545', color: 'white' }}
            >
              Abbrechen
            </button>
            <button
              type="button"
              className="btn w-25"
              onClick={handleSubmit}
              style={{ background: '#015291', color: 'white' }}
            >
              {loadValue ? <Loader /> : 'Aktualisieren'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

EditModal.propTypes = {
  setEdit: PropTypes.func.isRequired,
  getDetails: PropTypes.func.isRequired,
}

export default EditModal
