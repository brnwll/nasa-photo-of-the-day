import React from 'react'

export default function AposPhoto({ srcUrl, title, mediaType }) {

  const image = <img src={srcUrl} alt={title} />
  const video = (
    <div>
      <iframe
        width="853"
        height="480"
        src={srcUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  )

  if (mediaType === 'image') return image
  if (mediaType === 'video') return video
  return <div>Unsupported media type.</div>
}