import React, { useState, useEffect } from 'react'
import axios from 'axios'
import mockData from '../mock/mockData'
import { API_KEY } from '../api-key'

function App() {
  const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
  const [data, setData] = useState(null)
  useEffect(() => fetchMockData(), [])
  // useEffect(() => fetchData(), [])

  const fetchMockData = () => setData(mockData)
  const fetchData = () => {
    // TODO: Handle x-ratelimit-limit exceeded
    // TODO: Gracefully catch error
    axios.get(API_URL)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }

  return (
    <div></div>
  )
}

export default App
