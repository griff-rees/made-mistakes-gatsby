import React from 'react'
import PropTypes from 'prop-types'
import Zoom from 'react-medium-image-zoom'
import RasterOrSVG from './raster-svg'

import styles from '../styles/image-zoom.module.css'
import 'react-medium-image-zoom/dist/styles.css'

const zoomImgEnforce = {
  width: '100%',
  height: '100%',
}

const ImageZoom = props => {
  const { imageSharp, extension, publicURL, alt } = props
  return (
    <Zoom
      styles={styles}
      overlayBgColorEnd="var(--background-color)"
      transitionDuration="350" // Default is 300
    >
      <RasterOrSVG
        imageSharp={imageSharp}
        extension={extension}
        publicURL={publicURL}
        alt={alt}
        style={zoomImgEnforce}
        {...props}
      />
    </Zoom>
  )
}

ImageZoom.propTypes = {
  overlayBgColorStart: PropTypes.string,
  imageSharp: PropTypes.object,
  extension: PropTypes.string,
  publicURL: PropTypes.string,
  alt: PropTypes.string,
}

export default ImageZoom
