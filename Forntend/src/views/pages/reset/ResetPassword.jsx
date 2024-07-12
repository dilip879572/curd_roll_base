import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import logo from '../../../assets/images/hvd-logo.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const apiUrl = process.env.REACT_APP_API_URL
  const [message, setMessage] = useState('')
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const notify = (dataa) => toast(dataa)

  const sendLink = async (e) => {
    e.preventDefault()

    if (email === '') {
      // Handle case when email is empty
      return notify('E-Mail ist erforderlich')
    } else if (!email.includes('@')) {
      // Handle case when email is invalid
      console.log('Ungültiges Email-Format')
      return
    }

    try {
      const edata = { email }
      localStorage.setItem('email', JSON.stringify(edata))
      const res = await fetch(`${apiUrl}/user/forgot-password`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(edata),
      })

      const data = await res.json()
      console.log('Response:', data)

      if (data.status === 200) {
        notify('Link zum Zurücksetzen des Passworts erfolgreich gesendet')
        setEmail('')
      } else if (data.status === 401) {
        console.log('Unauthorized error')
      } else if (data.status === 404) {
        notify('Invalid Email')
      } else {
        console.log('Unexpected status:', data.status)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const cancleData = () => {
    navigate('/')
  }
  return (
    <>
      <div
        className=" min-vh-100 d-flex flex-row align-items-center"
        style={{ background: '#015291' }}
      >
        <CContainer className="form-container">
          <CRow className="justify-content-center">
            <CCol md={4}>
              <img className="logo-login" src={logo} alt="..." />
              <CCardGroup className="mt-3">
                <CCard className="p-4">
                  {/* <CCardBody> */}
                  <div className="text-right cross-icon" onClick={cancleData}>
                    <RxCross2 />
                  </div>
                  <Form noValidate validated={validated}>
                    <h4 className="h4-heading border-b pb-3">Passwort vergessen?</h4>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label className="text-gray">
                          Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen
                        </Form.Label>
                        <Form.Control
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                          required
                          type="email"
                          placeholder="E-Mail"
                        />
                      </Form.Group>
                    </Row>
                    <div>
                      <button
                        className="form-control form-btn"
                        onClick={sendLink}
                        style={{ background: '#005291', color: 'white' }}
                      >
                        Senden
                      </button>
                    </div>
                  </Form>
                  {/* </CCardBody> */}
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      <ToastContainer />
    </>
  )
}

export default React.memo(ResetPassword)
