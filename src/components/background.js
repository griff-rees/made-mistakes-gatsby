import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

import BackgroundImage from 'gatsby-background-image-es5'

const BackgroundSection = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "mountain-path.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )

  const imageData = data.desktop.childImageSharp.fluid

  return <BackgroundImage fluid={imageData}>{children}</BackgroundImage>
}

BackgroundSection.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BackgroundSection
