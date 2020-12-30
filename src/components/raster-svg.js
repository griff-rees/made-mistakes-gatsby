import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const svgWrapperStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
}

const RasterOrSVG = (props) => {
  const {
    imageSharp,
    extension,
    publicURL,
    alt,
    title,
    className,
    style,
    fallbackRaster,
  } = props
  if (extension === 'svg' && publicURL) {
    return (
      <div
        className={`${className} gatsby-image-wrapper`}
        style={svgWrapperStyle}
      >
        <picture>
          <source type="image/svg+xml" srcSet={publicURL} />
          <img
            src={fallbackRaster ? fallbackRaster.childImageSharp.fixed.src : ''}
            alt={alt}
            title={title}
            style={style}
          />
        </picture>
      </div>
    )
  }
  return <Img fluid={imageSharp.fluid} alt={alt} {...props} />
}

RasterOrSVG.propTypes = {
  imageSharp: PropTypes.object,
  fallbackRaster: PropTypes.object,
  extension: PropTypes.string,
  publicURL: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default RasterOrSVG
