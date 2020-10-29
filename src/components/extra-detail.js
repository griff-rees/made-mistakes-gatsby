import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import style from '../styles/extra-details.module.css'

const ExtraDetail = ({ extraDetails }) => {
  return extraDetails.map(extraDetail => (
    <details className={style.detailWrap}>
      <summary className={style.detailTitle}>{extraDetail.title}</summary>
      {console.log(extraDetail)}
      {extraDetail.items &&
        extraDetail.items.map(detailItem => (
          <dl className={style.detailContent}>
            <dt>{detailItem.item}</dt>
            <dd>
              {detailItem.url ? (
                <a href={detailItem.url}>
                  {detailItem.detail ? detailItem.detail : detailItem.url}
                </a>
              ) : (
                detailItem.detail
              )}
            </dd>
          </dl>
        ))}
    </details>
  ))
}

ExtraDetail.propTypes = {
  title: PropTypes.string,
  // url: PropTypes.string,
  // detail: PropTypes.string,
  // items: PropTypes.array,
  // extra_details: PropTypes.array,
  // text: PropTypes.array,
  extraDetails: PropTypes.array,
  extraDetail: PropTypes.object,
}

export const extraDetailsFragment = graphql`
  fragment detailsFragment on Frontmatter {
    extra_details {
      title
      items {
        item
        detail
        url
      }
    }
  }
`

export default ExtraDetail
