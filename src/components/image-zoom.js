import React from 'react'
import PropTypes from 'prop-types'
import Zoom from 'react-medium-image-zoom'
import RasterOrSVG from './raster-svg'
import FigureCaption from './figcaption.js'

import styles from '../styles/image-zoom.module.css'
import 'react-medium-image-zoom/dist/styles.css'

const zoomImgEnforce = {
  width: '100%',
  height: '100%',
}

const ImageZoom = props => {
  const {
    imageSharp,
    extension,
    publicURL,
    alt,
    title,
    caption,
    creditName,
    creditURL,
    creditType,
    customStyles,
    zoomElement,
  } = props
  // https://dear-dia11y.com/figure-and-figcaption-supporting-ie11-jaws-nvda-and-vo.html

  return (
    <Zoom
      styles={`${styles} ${customStyles}`}
      overlayBgColorEnd="var(--background-color)"
      transitionDuration="350" // Default is 300
      wrapElement={zoomElement}
      role={zoomElement || 'div'}
    >
      <RasterOrSVG
        imageSharp={imageSharp}
        extension={extension}
        publicURL={publicURL}
        alt={alt}
        style={zoomImgEnforce}
        title={title}
        {...props}
      />
      {zoomElement && (
        <FigureCaption
          caption={caption || title}
          creditName={creditName}
          creditURL={creditURL}
          creditType={creditType}
        />
      )}
    </Zoom>
  )
}

ImageZoom.propTypes = {
  overlayBgColorStart: PropTypes.string,
  imageSharp: PropTypes.object,
  customStyles: PropTypes.string,
  style: PropTypes.string,
  extension: PropTypes.string,
  publicURL: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  caption: PropTypes.string,
  creditName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  creditURL: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  creditType: PropTypes.string,
  zoomElement: PropTypes.string,
}

export default ImageZoom
