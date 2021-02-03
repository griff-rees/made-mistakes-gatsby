import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image-es5'

import style from '../styles/background-image.module.css'

const BackgroundSection = ({ backgroundImage, children }) => {
  const image = backgroundImage.childImageSharp.fluid

  return (
    <BackgroundImage fluid={image} className={style.background}>
      {children}
    </BackgroundImage>
  )
}

BackgroundSection.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.object,
}

export const BackgroundImageFragment = graphql`
  fragment BackgroundImageFragment on File {
    extension
    publicURL
    childImageSharp {
      fluid(quality: 90, maxWidth: 1920) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`

export default BackgroundSection
