import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
//import mockData from '../mock/mockData'
import ApodDatePicker from './ApodDatePicker'
import ApodContainer from './ApodContainer'
import { normalize } from './Helpers'
import { API_KEY } from '../api-key'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`

function App() {
  const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
  const [data, setData] = useState(null)
  const [date, setDate] = useState(new Date())
  // track fetching to display user feedback when changing the date
  const [fetchingData, setFetchingData] = useState(true)

  // Use during dev instead of fetchData
  // const fetchMockData = () => {
  //   setFetchingData(true)
  //   setTimeout(() => {
  //     setFetchingData(false)
  //     setData(mockData)
  //   }, 500)
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
    // only fetch the previous day if the date state slice is set to today
    if (normalize(new Date()) === normalize(date)) {
      let yesterday = new Date();
      yesterday.setDate(new Date().getDate() - 1);
      setDate(yesterday)
    }
  }

  return (
    <StyledApp>
      <ApodDatePicker 
        selectedDate={date} 
        setDate={setDate}>
      </ApodDatePicker>
      <ApodContainer 
        data={data}
        fetchingData={fetchingData}>
      </ApodContainer>
    </StyledApp>
  )
}

export default App