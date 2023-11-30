import React, { useState, useEffect } from 'react'
import axios from 'axios'
import mockData from '../mock/mockData'
import AposDatePicker from './AposDatePicker'
import AposContainer from './AposContainer'
import { normalize } from './Helpers'
import { API_KEY } from '../api-key'

function App() {
  const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
  const [data, setData] = useState(null)
  const [date, setDate] = useState(new Date())
  // track fetching to display user feedback when changing the date
  const [fetchingData, setFetchingData] = useState(true)

  // use this code in place of the actual api while styling the project
  // const fetchMockData = () => {
  //   setFetchingData(true)
  //   setTimeout(() => {
  //     setFetchingData(false)
  //     setData(mockData)
  //   }, 1000)
  // }
  // useEffect(() => { fetchMockData()}, [])

  const fetchData = (url = API_URL) => {
    // TODO: Handle x-ratelimit-limit exceeded
    setFetchingData(true)
    axios.get(url)
      .then(res => {
        setData(res.data)
        setFetchingData(false)
      })
      .catch(err => {
        // at 12am the api is not updated immediately, resulting in 404, so...
        fetchYesterday()
        console.error(err)
      })
  }
  useEffect(() => {
    fetchData(`${API_URL}&date=${normalize(date)}`) // append &date=YYYY-MM-DD
  }, [date])

  const fetchYesterday = () => {
    // only fetch the previous day if the date state is set to today
    if (normalize(new Date()) === normalize(date)) {
      let yesterday = new Date();
      yesterday.setDate(new Date().getDate() - 1);
      setDate(yesterday)
    }
  }

  return (
    <div>
      <AposDatePicker 
        selectedDate={date} 
        setDate={setDate}>
      </AposDatePicker>
      <AposContainer 
        data={data}
        fetchingData={fetchingData}>
      </AposContainer>
    </div>
  )
}

export default App