import React from 'react'
import PropTypes from 'prop-types'

// https://github.com/kitze/conditional-wrap/blob/master/src/index.js
const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? React.cloneElement(wrap(children)) : children

ConditionalWrap.propTypes = {
  condition: PropTypes.string,
  wrap: PropTypes.function,
  children: PropTypes.string,
}

const ConditionalExternalLink = ({ externalURL, children }) => (
  <ConditionalWrap
    condition={externalURL}
    wrap={() => (
      <a href={externalURL} rel="noreferrer" target="_blank">
        {children}
      </a>
    )}
  >
    {children}
  </ConditionalWrap>
)

ConditionalExternalLink.propTypes = {
  externalURL: PropTypes.string,
  children: PropTypes.string,
}

export default ConditionalExternalLink
