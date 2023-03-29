import React, { useEffect, useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { useWindowSize } from '@/hooks/useWindowSize'
import { toast } from 'react-toastify'

// Resize to 250 x 250 pixels using the 'fill' crop mode.
const initialState = {
  localWidth: '',
  localHeight: '',
  localSrc: '',
}
const ImageCloud = ({ width, height, src }) => {
  const [state, setState] = useState(initialState)
  const [windowWidth, windowHeight] = useWindowSize()
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'inam6530',
    },
  })
  const myImage = cld.image(state.localSrc)
  myImage.resize(fill().width(state.localWidth).height(state.localHeight))
  useEffect(() => {
    if (windowWidth < 762) {
      return setState({
        ...state,
        localWidth: windowWidth - 40,
        localHeight: windowWidth - 40,
        localSrc: src,
      })
    }

    if (!width || !height || !src) {
      return toast.warning('height width src is must')
    }
    setState({
      ...state,
      localWidth: width,
      localHeight: height,
      localSrc: src,
    })
  }, [windowWidth])
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
}

export default ImageCloud
