import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Loader } from '../../Components'

export const ReactPlayerCard = ({ url }: { url: string }) => {
  const [onEnded, setOnEnded] = useState<boolean>(false)

  return (
    <ReactPlayer
      url={`${url}`}
      controls={true}
      fallback={<Loader />}
      onEnded={() => setOnEnded(true)}
    />
  )
}
