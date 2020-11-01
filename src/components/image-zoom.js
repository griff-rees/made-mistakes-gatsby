import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Zoom from 'react-medium-image-zoom'

import styles from '../styles/image-zoom.module.css'
import 'react-medium-image-zoom/dist/styles.css'

const zoomWrapperStyle = {
  width: '100%',
  height: '100%',
}

const ImageZoom = props => {
  return (
    <Zoom
      styles={styles}
      overlayBgColorEnd="var(--background-color)"
      transitionDuration="350" // Default is 300
    >
      <Img style={zoomWrapperStyle} {...props} />
    </Zoom>
  )
}

ImageZoom.propTypes = {
  overlayBgColorStart: PropTypes.string,
}

export default ImageZoom
