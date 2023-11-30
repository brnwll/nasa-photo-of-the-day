import React from 'react'

export default function AposDetails({ copyright, date, title, explanation }) {
  return (
    <div>
      <h2>{copyright}</h2>
      <p>{date}</p>
      <p>{title}</p>
      <p>{explanation}</p>
    </div>
  )
}