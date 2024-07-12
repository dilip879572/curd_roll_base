import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getFetch, putFetchData } from 'src/Api'
import { StoreContext } from 'src/StoreContext'

export default function EditUser({ setEdit, getEmployeeData }) {
  EditUser.propTypes = {
    setEdit: PropTypes.func.isRequired,
    getEmployeeData: PropTypes.func.isRequired,
  }
  let modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0,0,0,0.8)',
    maxHeight: '100%',
    color: 'black',
  }
  const { editUser, setEditUser } = useContext(StoreContext)
  let res = localStorage.getItem('UserEditDetails')
  let response = JSON.parse(res)
  const notify = (dataa) => toast(dataa)
  const [isAdminFullRights, setIsAdminFullRights] = useState(response?.isAdminFullRights)
  const apiUrl = process.env.REACT_APP_API_URL
  const [activeTab, setActiveTab] = useState('nav-home')
  const [roleList, setRoleList] = useState([])
  const [employee, setEmployee] = useState({
    username: response?.username,
    lname: response?.lname,
    street: response?.street,
    plz: response?.plz,
    city: response?.city,
    email: response?.email,
    location: response?.location,
    tel: response?.tel,
    mobile: response?.mobile,
    role: response?.role,
    password: '123456',
    user_type: 'employee',
    timezone: '5:30',
  })
  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }
  const handleChange = (e) => {
    const { name, value } = e.target

    setEmployee({ ...employee, [name]: value })
  }
  const close = () => {
    setEdit(false)
  }
  const getRole = async () => {
    try {
      const res = await getFetch(`${apiUrl}/role/get_roles`)
      setRoleList(res?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  const employeData = { ...employee, isAdminFullRights }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await putFetchData(
        `${apiUrl}/user/update/employeeData/${response?._id}`,
        employeData,
      )
      if (res?.status === 200) {
        // setLoadValue(false)
        // setEditEmployee(!editEmployee)
        setEditUser(!editUser)
        setEmployee({
          username: '',
          lname: '',
          street: '',
          plz: '',
          city: '',
          email: '',
          location: '',
          tel: '',
          mobile: '',
          role: '',
        })
        notify('Mitarbeiter erfolgreich aktualisiert')
        // getEmployeeData()
        // window.location.reload()
      } else {
        notify('Etwas ist schief gelaufen')
      }
      close()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRole()
  }, [editUser])
  return (
    <>
      <div className="modal modal-form edit-modal-form" tabIndex={-1} style={modalStyle}>
        <div className="modal-dialog  modal-dialog-centered modal-lg">
          <div className="modal-content">
            <Modal.Body>
              <div className=" row pt-5 px-5">
                <p className="fs-5">
                  <b>Super Verwalter</b>
                </p>
                <div className="col-sm-9">
                  <p>
                    Wenn Sie den Super-Admin-Zugang für den Benutzer aktivieren, erhalten Sie vollen
                    Zugriff auf alle Funktionen ohne jegliche Einschränkungen.
                  </p>
                </div>
                <div className="col-sm-3">
                  <div className="form-check mx-5 form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      name="isAdminFullRights"
                      checked={JSON.parse(isAdminFullRights)}
                      onChange={(e) => setIsAdminFullRights(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
              <div className="whiteBoxWithPdLR">
                <div className="container-fluid">
                  <div className="row" style={{ background: 'white' }}>
                    <div className="col-sm-12">
                      <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <button
                            className={`nav-link ${activeTab === 'nav-home' ? 'active' : ''}`}
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-selected={activeTab === 'nav-home'}
                            onClick={() => handleTabClick('nav-home')}
                            style={{ marginRight: '10px', marginLeft: '20px' }}
                          >
                            Benutzer
                          </button>
                          <button
                            className={`nav-link ${activeTab === 'nav-rollen' ? 'active' : ''}`}
                            id="nav-rollen-tab"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-controls="nav-rollen"
                            aria-selected={activeTab === 'nav-rollen'}
                            onClick={() => handleTabClick('nav-rollen')}
                            style={{ marginRight: '10px' }}
                          >
                            Passwort
                          </button>
                          <button
                            className={`nav-link ${
                              activeTab === 'nav-lokalisierung' ? 'active' : ''
                            }`}
                            id="nav-lokalisierung-tab"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-controls="nav-lokalisierung"
                            aria-selected={activeTab === 'nav-lokalisierung'}
                            onClick={() => handleTabClick('nav-lokalisierung')}
                            style={{ marginRight: '10px' }}
                          >
                            Lokalisierung
                          </button>
                          <button
                            className={`nav-link ${
                              activeTab === 'nav-benachrichtigungen' ? 'active' : ''
                            }`}
                            id="nav-benachrichtigungen-tab"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-controls="nav-benachrichtigungen"
                            aria-selected={activeTab === 'nav-benachrichtigungen'}
                            onClick={() => handleTabClick('nav-benachrichtigungen')}
                            style={{ marginRight: '10px' }}
                          >
                            Benachrichtigungen
                          </button>
                          <button
                            className={`nav-link ${
                              activeTab === 'nav-fortgeschrittene' ? 'active' : ''
                            }`}
                            id="nav-fortgeschrittene-tab"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-controls="nav-fortgeschrittene"
                            aria-selected={activeTab === 'nav-fortgeschrittene'}
                            onClick={() => handleTabClick('nav-fortgeschrittene')}
                            style={{ marginRight: '10px' }}
                          >
                            Fortgeschrittene
                          </button>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="tab-content" id="nav-tabContent">
                <div
                  className={`tab-pane fade ${activeTab === 'nav-home' ? 'show active' : ''}`}
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="row mx-3">
                    <div className="col-sm-6">
                      <input
                        className="form-control"
                        placeholder="Name"
                        type="text"
                        name="username"
                        value={employee.username}
                        onChange={handleChange}
                      />

                      <input
                        className="form-control"
                        placeholder="Straße mit Hausnummer"
                        type="text"
                        name="street"
                        value={employee.street}
                        onChange={handleChange}
                      />

                      <input
                        className="form-control"
                        placeholder="Stadt"
                        type="text"
                        name="city"
                        value={employee.city}
                        onChange={handleChange}
                      />

                      <input
                        className="form-control"
                        placeholder="Standort"
                        type="text"
                        name="location"
                        value={employee.location}
                        onChange={handleChange}
                      />

                      <select
                        className="form-control"
                        // type="text"
                        name="role"
                        value={employee.role}
                        onChange={handleChange}
                      >
                        <option value="">Select Role</option>
                        {roleList?.map((value) => {
                          const { role_name, _id } = value

                          return (
                            <option key={_id} value={_id}>
                              {role_name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <input
                        className="form-control"
                        placeholder="Vorname"
                        type="text"
                        name="lname"
                        value={employee.lname}
                        onChange={handleChange}
                      />

                      <input
                        className="form-control"
                        type="text"
                        placeholder="PLZ"
                        name="plz"
                        value={employee.plz}
                        onChange={handleChange}
                      />

                      <input
                        className="form-control"
                        placeholder="E-Mail Adresse"
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                      />

                      <input
                        className="form-control"
                        placeholder="Telefon"
                        maxLength={10}
                        minLength={2}
                        type="phone"
                        name="tel"
                        value={employee.tel}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/[^0-9+]/g, '')
                          if (/^\+?[0-9]*$/.test(inputValue)) {
                            handleChange({ target: { name: 'tel', value: inputValue } })
                          }
                        }}
                      />

                      <input
                        className="form-control"
                        placeholder="Mobil"
                        maxLength={10}
                        minLength={2}
                        type="tel"
                        name="mobile"
                        value={employee.mobile}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/[^0-9+]/g, '')
                          if (/^\+?[0-9]*$/.test(inputValue)) {
                            handleChange({ target: { name: 'mobile', value: inputValue } })
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${activeTab === 'nav-rollen' ? 'show active' : ''}`}
                  id="nav-rollen"
                  role="tabpanel"
                  aria-labelledby="nav-rollen-tab"
                ></div>
                <div
                  className={`tab-pane fade ${
                    activeTab === 'nav-mannschaften' ? 'show active' : ''
                  }`}
                  id="nav-mannschaften"
                  role="tabpanel"
                  aria-labelledby="nav-mannschaften-tab"
                ></div>
              </div>
            </Modal.Body>
            <div className="text-right m-3">
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                onClick={close}
                style={{ background: '#d04545', color: 'white', marginRight: '15px' }}
              >
                Abbrechen
              </button>

              <button
                type="button"
                className="btn"
                onClick={handleSubmit}
                style={{ background: '#015291', color: 'white', marginRight: '23px' }}
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
