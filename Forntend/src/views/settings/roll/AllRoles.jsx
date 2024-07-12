import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import EditRoleModal from './EditRoleModal'
import PropTypes from 'prop-types'
import { verifySettingDelPer, verifySettingEditPer } from 'src/components/verifyPermission'

const AllRoles = ({ data }) => {
  let lgUser = localStorage.getItem('record')
  let loginData = JSON.parse(lgUser)
  const [roleID, setRoleID] = useState('')
  const [openModal, setOpenModal] = useState(false)
  // const apiUrl = process.env.REACT_APP_API_URL

  const handleOpen = async (id) => {
    try {
      setOpenModal(true)
      setRoleID(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="row m-3">
        <div style={{ border: '1px solid lightgray', borderRadius: '5px' }}>
          <table className="table table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Role</th>
                {(loginData?.user?._id && verifySettingEditPer().includes('owned')) ||
                verifySettingEditPer().includes('yes') ||
                loginData?.user?.isAdminFullRights === 'true' ? (
                  <th>Edit</th>
                ) : (
                  ''
                )}

                {(loginData?.user?._id && verifySettingDelPer().includes('owned')) ||
                verifySettingDelPer().includes('yes') ||
                loginData?.user?.isAdminFullRights === 'true' ? (
                  <th>Delete</th>
                ) : (
                  ''
                )}
              </tr>
            </thead>
            <tbody>
              {data?.map((elem) => {
                // console.log('elem', elem)
                const { _id, role_name } = elem
                return (
                  <>
                    <tr>
                      <td>{_id?.slice(-6)}</td>
                      <td>{role_name}</td>
                      {(loginData?.user?._id && verifySettingEditPer().includes('owned')) ||
                      verifySettingEditPer().includes('yes') ||
                      loginData?.user?.isAdminFullRights === 'true' ? (
                        <td>
                          <button
                            className="btn"
                            style={{ background: 'none', border: 'none' }}
                            onClick={() => handleOpen(_id)}
                          >
                            Edit
                          </button>
                        </td>
                      ) : (
                        ''
                      )}

                      {(loginData?.user?._id && verifySettingDelPer().includes('owned')) ||
                      verifySettingDelPer().includes('yes') ||
                      loginData?.user?.isAdminFullRights === 'true' ? (
                        <th>Delete</th>
                      ) : (
                        ''
                      )}
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
      {openModal ? <EditRoleModal setOpenModal={setOpenModal} roleID={roleID} /> : ''}
    </>
  )
}

AllRoles.propTypes = {
  data: PropTypes.func.isRequired,
}

export default AllRoles
