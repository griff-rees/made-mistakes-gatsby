import React from 'react'
import PropTypes from 'prop-types'
import ConditionalExternalLink from './conditional-wrapper.js'

const FigureCaption = ({ caption, creditName, creditURL, creditType }) => {
  const creditPrefix = `${creditType || 'Image'} by `
  if (caption || creditName) {
    return (
      <figcaption>
        <div dangerouslySetInnerHTML={{ __html: caption }} />
        {creditName && (
          <span>
            {creditPrefix}
            <credit>
              <ConditionalExternalLink externalURL={creditURL}>
                {creditName}
              </ConditionalExternalLink>
            </credit>
            .
          </span>
        )}
      </figcaption>
    )
  }
  return <></>
}

FigureCaption.propTypes = {
  caption: PropTypes.string,
  creditName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  creditURL: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  creditType: PropTypes.string,
}

export default FigureCaption
