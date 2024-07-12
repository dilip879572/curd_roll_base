import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import logo from '../../../assets/images/hvd-logo.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const ForgotPassword = () => {
  let data = localStorage.getItem('email')
  let res = JSON.parse(data)
  let email = res?.email

  // const { id, token } = useParams()
  const apiUrl = process.env.REACT_APP_API_URL
  // const history = useNavigate()

  const [data2, setData] = useState(false)

  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const notify = (dataa) => toast(dataa)
  let total = { password, email }
  // const userValid = async () => {
  //   const res = await fetch(`${apiUrl}/user/forgotpassword`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })

  //   const data = await res.json()

  //   if (data.status === 201) {
  //     console.log('user valid')
  //   } else {
  //     history('*')
  //   }
  // }

  const setval = (e) => {
    setPassword(e.target.value)
  }

  const sendpassword = async (e) => {
    try {
      e.preventDefault()

      if (password === '') {
        return toast.error('password is required!', {
          position: 'top-center',
        })
      }
      if (password.length < 6) {
        return toast.error('password must be 6 char!', {
          position: 'top-center',
        })
      }

      const res = await fetch(`${apiUrl}/user/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(total),
      })

      const data = await res.json()
      console.log('dataa', data)
      if (data?.message === 'Password changed successfully.') {
        notify('Password Resest Successfully')
        localStorage.removeItem('email')
        return navigate('/')
      }

      notify('Please Verify Your Email First')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // userValid()
    setTimeout(() => {
      setData(true)
    }, 3000)
  }, [])

  return (
    <>
      {data2 ? (
        <>
          <div
            className=" min-vh-100 d-flex flex-row align-items-center"
            style={{ background: '#015291' }}
          >
            <CContainer className="form-container">
              <CRow className="justify-content-center">
                <CCol md={4}>
                  <img className="logo-login" src={logo} alt="..." />
                  <CCardGroup>
                    <CCard className="p-4">
                      <CCardBody>
                        <Form noValidate validated={validated}>
                          <p style={{ color: '#015291', fontSize: '30px', textAlign: 'center' }}>
                            Passwort vergessen?
                          </p>
                          <hr />
                          <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                              <Form.Label>
                                Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen
                              </Form.Label>
                              <Form.Control
                                type="password"
                                value={password}
                                onChange={setval}
                                name="passwort"
                                id="passwort"
                                placeholder="Passwort"
                              />
                            </Form.Group>
                          </Row>
                          <div>
                            <button
                              className="form-control btn"
                              onClick={sendpassword}
                              style={{ background: '#015291', color: 'white' }}
                            >
                              Senden
                            </button>
                          </div>
                        </Form>
                      </CCardBody>
                    </CCard>
                  </CCardGroup>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </>
      ) : (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
      <ToastContainer />
    </>
  )
}

export default React.memo(ForgotPassword)

// import React from 'react'

// const ForgotPassword = () => {
//   let data = localStorage.getItem('email')
//   let res = JSON.parse(data)
//   console.log(res)
//   return <div>ForgotPassword</div>
// }

// export default ForgotPassword
