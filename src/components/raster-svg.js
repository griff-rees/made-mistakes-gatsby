import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const RasterOrSVG = props => {
  const { imageSharp, extension, publicURL, alt } = props
  if (extension === 'svg' && publicURL) {
    return <img src={publicURL} alt={alt} {...props} />
  }
  return <Img fluid={imageSharp.fluid} alt={alt} {...props} />
}

RasterOrSVG.propTypes = {
  imageSharp: PropTypes.object,
  extension: PropTypes.string,
  publicURL: PropTypes.string,
  alt: PropTypes.string,
}

export default RasterOrSVG
