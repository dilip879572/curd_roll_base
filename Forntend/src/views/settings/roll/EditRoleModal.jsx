import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'
import { getFetch, putFetchData } from 'src/Api'
import { StoreContext } from 'src/StoreContext'

const EditRoleModal = ({ setOpenModal, roleID }) => {
  const { setEditEmployee, editEmployee } = useContext(StoreContext)
  const apiUrl = process.env.REACT_APP_API_URL
  const notify = (dataa) => toast(dataa)
  const [roleData, setRoleData] = useState({})
  const [rolePermission, setRolePermission] = useState('')
  const [permissionData, setPermissionData] = useState({
    p_edit: 'no',
    p_show: 'no',
    p_delete: 'no',
    p_export: 'no',
    section_name: 'Klientlnnen',
    ownership_check: 'false',
  })
  const [permissionDashboard, setPermissionDashboard] = useState({
    p_edit: 'no',
    p_show: 'no',
    p_delete: 'no',
    p_export: 'no',
    section_name: 'Dashboard',
    ownership_check: 'false',
  })
  const [permissionSetting, setPermissionSetting] = useState({
    p_edit: 'no',
    p_show: 'no',
    p_delete: 'no',
    p_export: 'no',
    section_name: 'Einstellungen',
    ownership_check: 'false',
  })
  const [role, setRole] = useState({
    role_name: '',
    permission: [],
    added_by: 'admin',
  })

  const handleSetName = (name) => {
    setPermissionData((prevData) => ({
      ...prevData,
      section_name: name,
    }))
  }

  const handleSetDashboardName = (name) => {
    setPermissionDashboard((prevData) => ({
      ...prevData,
      section_name: name,
    }))
  }

  const handleSetSettingName = (name) => {
    setPermissionSetting((prevData) => ({
      ...prevData,
      section_name: name,
    }))
  }

  const handlePermissionDataChange = (e) => {
    const { name, value } = e.target
    setPermissionData({ ...permissionData, [name]: value })
  }

  const handlePermissionDashboardChange = (e) => {
    const { name, value } = e.target
    setPermissionDashboard({ ...permissionDashboard, [name]: value })
  }

  const handlePermissionSettingChange = (e) => {
    const { name, value } = e.target
    setPermissionSetting({ ...permissionSetting, [name]: value })
  }

  // useEffect(() => {
  //   setRole((prevRole) => ({
  //     ...prevRole,
  //     role_name: rolePermission,
  //     permission: [permissionData, permissionDashboard, permissionSetting],
  //   }))
  // }, [rolePermission, permissionData, permissionDashboard, permissionSetting])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const res = await putFetchData(`${apiUrl}/role/get_role/${roleID}`, role)
      // console.log('updatedRole', res)
      if (res?.status === 200) {
        setEditEmployee(!editEmployee)
        notify('Rolle erfolgreich aktualisiert')
        setTimeout(() => {
          setOpenModal(false)
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getRoleById = async () => {
    try {
      const role = await getFetch(`${apiUrl}/role/get_role/${roleID}`)
      setRoleData(role?.data)
    } catch (error) {
      console.log(error)
    }
  }

  let clientPermission = roleData?.permission

  useEffect(() => {
    setRolePermission(roleData?.role_name)

    clientPermission?.map((elem) => {
      if (elem?.section_name === 'Klientlnnen') {
        setPermissionData({
          p_edit: elem?.p_edit || 'no',
          p_show: elem?.p_show || 'no',
          p_delete: elem?.p_delete || 'no',
          p_export: elem?.p_export || 'no',
          section_name: elem?.section_name || 'no',
          ownership_check: elem?.ownership_check || 'no',
        })
      } else if (elem?.section_name === 'Dashboard') {
        setPermissionDashboard({
          p_edit: elem?.p_edit || 'no',
          p_show: elem?.p_show || 'no',
          p_delete: elem?.p_delete || 'no',
          p_export: elem?.p_export || 'no',
          section_name: elem?.section_name || 'no',
          ownership_check: elem?.ownership_check || 'no',
        })
      } else if (elem?.section_name === 'Einstellungen') {
        setPermissionSetting({
          p_edit: elem?.p_edit || 'no',
          p_show: elem?.p_show || 'no',
          p_delete: elem?.p_delete || 'no',
          p_export: elem?.p_export || 'no',
          section_name: elem?.section_name || 'no',
          ownership_check: elem?.ownership_check || 'no',
        })
      }
    })
  }, [roleData])

  useEffect(() => {
    getRoleById()
  }, [])

  useEffect(() => {
    setRole((prevRole) => ({
      ...prevRole,
      role_name: rolePermission,
      permission: [permissionData, permissionDashboard, permissionSetting],
    }))
  }, [rolePermission, permissionData, permissionDashboard, permissionSetting])

  const close = () => {
    setOpenModal(false)
  }
  return (
    <div
      className="modal modal-form"
      tabIndex={-1}
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
        maxHeight: '100%',
        color: 'black',
      }}
    >
      <div className="modal-dialog modal-dialog-centered  ">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Rolle erstellen</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={close}
            />
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="rolePermission"
              value={rolePermission}
              onChange={(e) => {
                setRolePermission(e.target.value)
              }}
            />
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <h4 className="heading-4">Berechtigungen</h4>
                </div>
              </div>
            </div>

            <div className="container-fluid mt-2">
              <div className="row">
                <div className="col-12">
                  <h4 className="heading-4">Klientlnnen</h4>
                </div>
              </div>

              <div
                className="row d-flex justify-content-between align-items-center"
                onClick={() => handleSetName('Klientlnnen')}
              >
                <div className="col-sm-3 text-start">
                  <label> Anzeigen</label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      name="p_show"
                      value={permissionData.p_show}
                      onChange={handlePermissionDataChange}
                    >
                      {/* <option value="owned">Nur im Besitz</option> */}
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label> Bearbeiten</label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      name="p_edit"
                      value={permissionData.p_edit}
                      onChange={handlePermissionDataChange}
                    >
                      <option value="owned">Nur im Besitz</option>
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label> Löschen</label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      name="p_delete"
                      value={permissionData.p_delete}
                      onChange={handlePermissionDataChange}
                    >
                      <option value="owned">Nur im Besitz</option>
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label> Exportieren </label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      name="p_export"
                      value={permissionData.p_export}
                      onChange={handlePermissionDataChange}
                    >
                      <option value="owned">Nur im Besitz</option>
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="container-fluid mt-3"
              onClick={() => handleSetDashboardName('Dashboard')}
            >
              <div className="row">
                <div className="col-12">
                  <h4 className="heading-4">Dashboard</h4>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label> Anzeigen</label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      name="p_show"
                      value={permissionDashboard.p_show}
                      onChange={handlePermissionDashboardChange}
                    >
                      {/* <option value="owned">Nur im Besitz</option> */}
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label>Bearbeiten </label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      name="p_edit"
                      value={permissionDashboard.p_edit}
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      onChange={handlePermissionDashboardChange}
                    >
                      <option value="owned">Nur im Besitz</option>
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label>Löschen </label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      name="p_delete"
                      value={permissionDashboard.p_delete}
                      onChange={handlePermissionDashboardChange}
                    >
                      <option value="owned">Nur im Besitz</option>
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label>Exportieren</label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      name="p_export"
                      value={permissionDashboard.p_export}
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      onChange={handlePermissionDashboardChange}
                    >
                      <option value="owned">Nur im Besitz</option>
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="container-fluid mt-3"
              onClick={() => handleSetSettingName('Einstellungen')}
            >
              <div className="row">
                <div className="col-12">
                  <h4 className="heading-4">Setting</h4>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label>Anzeigen </label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      name="p_show"
                      value={permissionSetting.p_show}
                      onChange={handlePermissionSettingChange}
                    >
                      {/* <option value="owned">Nur im Besitz</option> */}
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label>Bearbeiten </label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      name="p_edit"
                      value={permissionSetting.p_edit}
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      onChange={handlePermissionSettingChange}
                    >
                      <option value="owned">Nur im Besitz</option>s
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label>Löschen </label>
                </div>

                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      name="p_delete"
                      value={permissionSetting.p_delete}
                      onChange={handlePermissionSettingChange}
                    >
                      <option value="owned">Nur im Besitz</option>
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-3 text-start">
                  <label> Exportieren </label>
                </div>
                {/*dropdown*/}
                <div className="col-sm-4 text-end">
                  <div className="input-group">
                    <select
                      name="p_export"
                      value={permissionSetting.p_export}
                      style={{ border: 'none' }}
                      className="form-control form-select text-primary m-0 p-0"
                      onChange={handlePermissionSettingChange}
                    >
                      <option value="owned">Nur im Besitz</option>
                      {/* <option value="Withdraw">Widerrufen</option> */}
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <div className="btn-wrapper d-flex w-100 m-0 justify-content-end">
              <button
                type="button"
                className="btn btn-cancel"
                data-bs-dismiss="modal"
                onClick={close}
              >
                Abbrechen
              </button>
              <button type="button" className="btn btn-save ms-3" onClick={handleSubmit}>
                Aktualisieren
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

EditRoleModal.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  roleID: PropTypes.func.isRequired,
}

export default EditRoleModal
