import React from 'react'
import ApodMedia from './ApodMedia'
import ApodDetails from './ApodDetails'
import Spinner from './Spinner'

export default function ApodContainer({ fetchingData, data }) {
  const renderSpinner = () => (<Spinner></Spinner>)

  const renderAposComponents = () => (
    <div>
      <ApodMedia 
        srcUrl={data.url} 
        title={data.title}
        mediaType={data.media_type}>
      </ApodMedia>
      <ApodDetails
        copyright={data.copyright} 
        date={data.date} 
        title={data.title} 
        explanation={data.explanation}>
      </ApodDetails>
    </div>
  )

  return fetchingData
    ? renderSpinner()
    : renderAposComponents()
}
