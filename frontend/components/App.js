import React, { useState, useEffect } from 'react'
import axios from 'axios'
import mockData from '../mock/mockData'
import AposPhoto from './AposPhoto'
import AposDetails from './ApoDetails'
import LoadingSpinner from './LoadingSpinner'
import { API_KEY } from '../api-key'

function App() {
  const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
  const [data, setData] = useState(null)

  const fetchMockData = () => setTimeout(() => setData(mockData), 1500)
  useEffect(() => fetchMockData(), [])

  const fetchData = () => {
    // TODO: Handle x-ratelimit-limit exceeded
    // TODO: Gracefully catch error
    axios.get(API_URL)
      .then(res => setData(res.data))
      .catch(err => {
        console.error(err)
      })
  }
  //useEffect(() => fetchData(), [])

  const renderSpinner = () => (<LoadingSpinner></LoadingSpinner>)
  const renderApos = () => (
    <div>
      <AposPhoto srcUrl={data.url} alt={data.title}></AposPhoto>
      <AposDetails
        copyright={data.copyright} 
        date={data.date} 
        title={data.title} 
        explanation={data.explanation}>
      </AposDetails>
    </div>
  )

  return data ? renderApos() : renderSpinner()
}

export default App

/*
Stretch goal:
Notice the optional query param date? You can pass a different date in your url 
to get the APOD from a different date. Add a date dropdown or a date picker 
that allows you to select a different date and see that APOD. 
This will be quite a bit of work, but it will be a fantastic exercise to go 
through a little more complicated logic and interaction in your app. 
This is also a very common type of interaction, 
so it would be good to try this out.
*/