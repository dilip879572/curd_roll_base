// import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'

// export default function DatePicker({ onChange, value, placeholder }) {
//   const [inputValue, setInputValue] = useState('')

//   useEffect(() => {
//     if (typeof value === 'string') {
//       const parsedDate = new Date(value)
//       if (!isNaN(parsedDate.getTime())) {
//         setInputValue(formatDate(parsedDate))
//       } else {
//         setInputValue('')
//       }
//     } else if (value instanceof Date && !isNaN(value.getTime())) {
//       setInputValue(formatDate(value))
//     } else {
//       setInputValue('')
//     }
//   }, [value])

//   // const handleInputChange = (e) => {
//   //   let inputValue = e.target?.value
//   //   let formattedValue = ''

//   //   inputValue = inputValue?.replace(/\D/g, '')

//   //   for (let i = 0; i < inputValue?.length; i++) {
//   //     if (i === 2 || i === 4) {
//   //       formattedValue += '.'
//   //     }
//   //     formattedValue += inputValue[i]
//   //   }

//   //   setInputValue(formattedValue)
//   // }
//   const handleInputChange = (e) => {
//     let inputValue = e.target?.value
//     let formattedValue = ''

//     inputValue = inputValue?.replace(/\D/g, '')

//     if (inputValue?.length > 8) {
//       inputValue = inputValue.slice(0, 8)
//     }

//     for (let i = 0; i < inputValue?.length; i++) {
//       if (i === 2 || i === 4) {
//         formattedValue += '.'
//       }
//       formattedValue += inputValue[i]
//     }

//     setInputValue(formattedValue)
//   }

//   const handleDateChange = (e) => {
//     const parts = inputValue?.split('.')?.map((part) => parseInt(part, 10))
//     let [day, month, year] = parts
//     if (parts?.length === 3) {
//       if (year < 100) {
//         year += 1900
//       } else if (year >= 2000 && year <= new Date().getFullYear()) {
//       } else {
//         year = year
//       }

//       const newDate = new Date(year, month - 1, day)
//       onChange(newDate)
//     } else if (parts?.length === 1) {
//       const year = parts[0]
//       if (year < 100) {
//         let fullYear
//         if (year < 50) {
//           fullYear = year + 2000
//         } else {
//           fullYear = year + 1900
//         }
//         const newDate = new Date(fullYear, 0, 1)
//         onChange(newDate)
//       }
//     }
//   }

//   const formatDate = (date) => {
//     const day = date?.getDate()?.toString()?.padStart(2, '0')
//     const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0')
//     const year = date?.getFullYear()?.toString()
//     return `${day}.${month}.${year}`
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         onChange={handleInputChange}
//         onBlur={handleDateChange}
//         value={inputValue}
//         placeholder={placeholder}
//         className="form-control"
//       />
//     </div>
//   )
// }

// DatePicker.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.instanceOf(Date).isRequired,
//   placeholder: PropTypes.string.isRequired,
// }

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export default function DatePicker({ onChange, value, placeholder, className, disabled }) {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (typeof value === 'string') {
      const parsedDate = new Date(value)
      if (!isNaN(parsedDate.getTime())) {
        setInputValue(formatDate(parsedDate))
      } else {
        setInputValue('')
      }
    } else if (value instanceof Date && !isNaN(value.getTime())) {
      setInputValue(formatDate(value))
    } else {
      setInputValue('')
    }
  }, [value])

  const handleInputChange = (e) => {
    let inputValue = e.target?.value
    let formattedValue = ''

    inputValue = inputValue?.replace(/\D/g, '')

    if (inputValue?.length > 8) {
      inputValue = inputValue.slice(0, 8)
    }

    for (let i = 0; i < inputValue?.length; i++) {
      if (i === 2 || i === 4) {
        formattedValue += '.'
      }
      formattedValue += inputValue[i]
    }

    setInputValue(formattedValue)
  }

  const handleDateChange = (e) => {
    const parts = inputValue?.split('.')?.map((part) => parseInt(part, 10))
    let [day, month, year] = parts

    if (parts?.length === 3) {
      if (year < 100) {
        year += 1900
      }

      if (month < 1) month = 1
      if (month > 12) month = 12

      const maxDays = new Date(year, month, 0).getDate()
      if (day < 1) day = 1
      if (day > maxDays) day = maxDays

      const newDate = new Date(year, month - 1, day)
      onChange(newDate)
    } else if (parts?.length === 1) {
      const year = parts[0]
      if (year < 100) {
        let fullYear
        if (year < 50) {
          fullYear = year + 2000
        } else {
          fullYear = year + 1900
        }
        const newDate = new Date(fullYear, 0, 1)
        onChange(newDate)
      }
    }
  }

  const formatDate = (date) => {
    const day = date?.getDate()?.toString()?.padStart(2, '0')
    const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0')
    const year = date?.getFullYear()?.toString()
    return `${day}.${month}.${year}`
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleInputChange}
        onBlur={handleDateChange}
        value={inputValue}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
    </div>
  )
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
}
