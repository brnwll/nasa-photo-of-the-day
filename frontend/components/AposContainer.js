import React from 'react'
import AposMedia from './AposMedia'
import AposDetails from './AposDetails'
import Spinner from './Spinner'

export default function AposContainer({ fetchingData, data }) {
  const renderSpinner = () => (<Spinner></Spinner>)

  const renderAposComponents = () => (
    <div>
      <AposMedia 
        srcUrl={data.url} 
        title={data.title}
        mediaType={data.media_type}>
      </AposMedia>
      <AposDetails
        copyright={data.copyright} 
        date={data.date} 
        title={data.title} 
        explanation={data.explanation}>
      </AposDetails>
    </div>
  )

  return fetchingData
    ? renderSpinner()
    : renderAposComponents()
}
