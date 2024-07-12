// import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
// // import { getFetch } from 'src/api/Api'
// const PatientAddNewRecord = ({ _id }) => {
//   console.log('_id', _id)
//   PatientAddNewRecord.propTypes = {
//     _id: PropTypes.func.isRequired,
//   }

//   const [patientById, setPatientById] = useState({})
//   const [problems, setProblems] = useState([
//     {
//       problem: 'pain',
//     },
//     {
//       problem: 'pain2',
//     },
//   ])
//   const [formData, setFormData] = useState({
//     diagnosis: [problems],
//     desc: '',
//   })
//   const [diagnosis, setDiagnosis] = useState(
//     problems.map((problem) => ({
//       problem: {
//         name: problem.problem,
//         scale1: '',
//         scale2: '',
//         scale3: '',
//       },
//       date: Date.now(),
//     })),
//   )

//   const handleCheckboxChange = (problemName, checked) => {
//     if (checked) {
//       setDiagnosis((prevDiagnosis) => [
//         ...prevDiagnosis,
//         {
//           problem: {
//             name: problemName,
//             scale1: '',
//             scale2: '',
//             scale3: '',
//           },
//           date: Date.now(),
//           // desc: '',
//         },
//       ])
//     } else {
//       setDiagnosis((prevDiagnosis) =>
//         prevDiagnosis.filter((item) => item.problem.name !== problemName),
//       )
//     }
//   }

//   const handleInputChange = (index, key, value) => {
//     setDiagnosis((prevDiagnosis) =>
//       prevDiagnosis.map((item, i) => {
//         if (i === index) {
//           return {
//             ...item,
//             problem: {
//               ...item.problem,
//               [key]: value,
//             },
//           }
//         }
//         return item
//       }),
//     )
//   }

//   // const getPatientById = async () => {
//   //   try {
//   //     // const data = await getFetch(`http://localhost:8090/api/patient/${_id}`)
//   //     setPatientById(data.data.data)
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }

//   const handleSubmit = (e) => {
//     try {
//       e.preventDefault()
//       const updatedFormData = {
//         ...formData,
//         diagnosis: diagnosis,
//       }
//       console.log('updatedFormData', updatedFormData)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     // getPatientById()
//   }, [])
//   return (
//     <div style={{ margin: '1rem auto 1rem 1rem' }}>
//       <div style={{ margin: '1rem auto 1rem 0' }}>
//         <h4>Diagnosis</h4>
//         <div className="row">
//           <div className="row">
//             <div className="col-md-4 alignCenterAndMiddle" style={{ border: '1px solid black' }}>
//               <h5 style={{ marginTop: '0.5rem' }}>Problems</h5>
//             </div>
//             <div className="col-md-8">
//               <div className="row" style={{ border: '1px solid black' }}>
//                 <div className="col-md-4 alignCenterAndMiddle">
//                   <h5 style={{ marginTop: '0.5rem' }}>LAS</h5>
//                 </div>
//                 <div className="col-md-4 alignCenterAndMiddle">
//                   <h5 style={{ marginTop: '0.5rem' }}>MPSJ</h5>
//                 </div>
//                 <div className="col-md-4 alignCenterAndMiddle">
//                   <h5 style={{ marginTop: '0.5rem' }}>OPI</h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <form>
//         {problems.map((problem, index) => (
//           <div key={index} style={{ alignItems: 'center', marginBottom: '10px' }}>
//             <div className="row">
//               <div className="col-md-4">
//                 <input
//                   type="checkbox"
//                   value={problem.problem}
//                   onChange={(e) => handleCheckboxChange(problem.problem, e.target.checked)}
//                 />
//                 <label>{problem.problem}</label>
//               </div>
//               <div className="col-sm-8">
//                 <div className="row">
//                   <div className="col-sm-4">
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Scale 1"
//                       value={
//                         diagnosis.find((item) => item.problem.name === problem.problem)?.problem
//                           .scale1 || ''
//                       }
//                       onChange={(e) => handleInputChange(index, 'scale1', e.target.value)}
//                     />
//                   </div>
//                   <div className="col-sm-4">
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Scale 2"
//                       value={
//                         diagnosis.find((item) => item.problem.name === problem.problem)?.problem
//                           .scale2 || ''
//                       }
//                       onChange={(e) => handleInputChange(index, 'scale2', e.target.value)}
//                     />
//                   </div>
//                   <div className="col-sm-4">
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Scale 3"
//                       value={
//                         diagnosis.find((item) => item.problem.name === problem.problem)?.problem
//                           .scale3 || ''
//                       }
//                       onChange={(e) => handleInputChange(index, 'scale3', e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </form>
//       <div>
//         <textarea
//           rows={4}
//           className="form-control col-12"
//           placeholder="prescription"
//           name="desc"
//           value={patientById.desc}
//           //   onChange={handleChange}
//         ></textarea>
//       </div>

//       <button onClick={handleSubmit}>submit</button>
//     </div>
//   )
// }

// export default PatientAddNewRecord

import React, { useState } from 'react'
import { DatePicker, Space, Button } from 'antd'

const { RangePicker } = DatePicker

const App = () => {
  const [selectedDates, setSelectedDates] = useState([])

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dates)
  }

  const handleSubmit = () => {
    const [startDate, endDate] = selectedDates
    console.log('Start Date:', startDate ? startDate.toISOString() : 'No start date selected')
    console.log('End Date:', endDate ? endDate.toISOString() : 'No end date selected')
  }

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={handleDateChange} />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Space>
  )
}

export default App
