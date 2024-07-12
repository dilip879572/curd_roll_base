/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { LuFilePlus } from 'react-icons/lu'
import { IoMdAdd } from 'react-icons/io'

const Teams = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <div className="row card text-center">
        <LuFilePlus style={{ fontSize: '50px', marginTop: '100px' }} />
        <p>Keine Teams</p>
        <p>Get started by creating a new team.</p>
        <button
          style={{
            background: '#0b5995',
            color: 'white',
            textAlign: 'center',
            marginLeft: '38%',
          }}
          className="btn btn mb-3 w-25"
          onClick={handleShow}
        >
          <IoMdAdd />
          Team hinzufügen
        </button>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Neues Team erstellen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-6">
                <input type="text" className="form-control" placeholder="Name der Mannschaft" />
                <br />
                <select className="form-control">
                  <option>Teammitglieder</option>
                </select>
              </div>
              <div className="col-sm-6">
                <select className="form-control">
                  <option>Manager</option>
                </select>
              </div>
            </div>
            <br />
            <textarea
              name=""
              className="form-control"
              placeholder="Beschreibung des Teams"
              id=""
              rows="3"
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              style={{ background: '#d04545', color: 'white' }}
              onClick={handleClose}
            >
              Abbrechen
            </Button>
            <Button variant="primary" style={{ background: '#0b5995', color: 'white' }}>
              Erstellen
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Teams
