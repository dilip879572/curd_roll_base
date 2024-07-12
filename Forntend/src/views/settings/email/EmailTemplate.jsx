import React, { useEffect, useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { putFetchData } from 'src/Api'

const EmailTemplate = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const placeholder = `Hallo {{ activity.user }}

  Ihre {{ activity.title }} Aktivität ist fällig am {{ activity.due_date }}
  
  {{#action_button}}Aktivität ansehen{{/action_button}}`

  const config = useMemo(
    () => ({
      readonly: false,
      removeButtons: ['about'], // Use removeButtons instead of removeAbout
      placeholder: placeholder,
    }),
    [placeholder],
  )
  let res = localStorage.getItem('EmailEditDetails')
  let response = JSON.parse(res)
  const [data, setData] = useState({
    content: response?.content,
    designation: response?.designation,
  })

  const handleChange = (value, name) => {
    if (name) {
      setData({ ...data, [name]: value })
    } else {
      setContent(value)
    }
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    e.preventDefault()
    try {
      const { content, designation } = data
      if (!content || !designation) {
        return
      }
      const res = await putFetchData(`${apiUrl}/email/get_email/${response?._id}`, data)
      if (res.status === 200) {
        setData({
          content: '',
          designation: '',
        })
        toast.success('EmailTemplate erfolgreich aktualisiert')
        setTimeout(() => {
          navigate('/settings/email')
        }, 3000)
      } else {
        toast.error('Etwas ist schief gelaufen')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const cancelData = () => {
    navigate('/settings/email')
  }
  return (
    <>
      <div className="card">
        <h5 className="mx-3">E-Mail Vorlage Anmeldung</h5>
        <hr />
        <span className="mx-3 mb-1">Inhalt</span>
        <div className="mx-3">
          <JoditEditor
            ref={editor}
            value={data.content}
            onChange={(value) => handleChange(value, 'content')}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <br />

        <span className=" mx-3 mb-2">Platzhalter</span>
        <div className="mx-3">
          <textarea
            value={data.designation}
            onChange={(e) => handleChange(e.target.value, 'designation')}
            name=""
            rows={25}
            cols={10}
            id=""
            className="form-control"
            placeholder={`
  {{ Aktivität.Titel }} - Titel

  {{ activity.type }} - Typ der Aktivität
  
  {{ activity.due_date }} - Fälligkeitsdatum

  {{ activity.end_date }} - Enddatum
  
  {{ activity.reminder_minutes_before }} - Erinnerung

  {{ activity.user }} - Besitzer

  {{ activity.guests }} - Gäste
  
  {{ activity.description }} - Beschreibung

  {{ activity.owner_assigned_date }} - Zugewiesenes Datum des Eigentümers

  {{{ activity.note }}} - Notiz

  {{ activity.creator }} - Erstellt von

  {{ activity.reminded_at }} - Datum der gesendeten Erinnerung

  {{ activity.completed_at }} - Erledigt am

  {{ activity.updated_at }} - Aktualisiert am
  `}
          ></textarea>
        </div>
        <br />
        <div className="text-right">
          <button
            type="button"
            className="btn btn"
            onClick={cancelData}
            style={{ background: '#d04545', color: 'white' }}
          >
            Abbrechen
          </button>
          &nbsp; &nbsp;
          <button
            type="button"
            onClick={handleSubmit}
            style={{ background: '#0b5995', color: 'white', marginRight: '15px' }}
            className="btn btn"
          >
            Speichern
          </button>
        </div>
        <br />
        <ToastContainer autoClose={2000} />
      </div>
    </>
  )
}

export default React.memo(EmailTemplate)
