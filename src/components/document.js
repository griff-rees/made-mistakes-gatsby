import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import ImageZoom from './image-zoom'
import FigureCaption from './figcaption.js'

import style from '../styles/document.module.css'

import ExtraDetail from './extra-detail'

const _ = require('lodash-addons')

const Document = ({
  title,
  hideMeta,
  creditVerb,
  datePublished,
  dateModified,
  dateFromNow,
  dateModifiedFromNow,
  image,
  imageTitle,
  fallbackRaster,
  alt,
  author,
  titleImageCredit,
  titleImageCreditURL,
  titleImageType,
  timeToRead,
  toc,
  tableOfContents,
  tags,
  extraDetails,
  html,
}) => {
  const presentedVerb = dateModified ? 'Updated' : creditVerb || 'Published'
  return (
    <article className={`${style.document} h-entry`}>
      <div className={style.title}>
        <h1 className={`${style.heading} p-name`}>{title}</h1>
        <div className={style.meta}>
          <div style={{ display: hideMeta && `none` }}>
            <span>
              {author && (
                <>
                  {presentedVerb}{' '}
                  <span style={{ display: 'none' }}>
                    by{' '}
                    <a className="p-author h-card" href={author.url}>
                      {author.name}
                    </a>
                  </span>
                </>
              )}
              {datePublished && (
                <span style={{ display: dateModified && `none` }}>
                  {' '}
                  <time className="dt-published" dateTime={datePublished}>
                    {dateFromNow}
                  </time>
                </span>
              )}
              {dateModified && (
                <>
                  {' '}
                  <time className="dt-updated" dateTime={dateModified}>
                    {dateModifiedFromNow}
                  </time>
                </>
              )}
            </span>
            {timeToRead && (
              <>
                {' '}
                <span className={style.readTime}>
                  {timeToRead}&nbsp;min&nbsp;read
                </span>
              </>
            )}
          </div>
          {tags ? (
            <div className={style.tags}>
              {tags.map(tag => (
                <Link
                  className={style.tag}
                  to={`/tag/${_.slugify(tag)}/`}
                  key={_.slugify(tag)}
                >
                  <span>#{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {image && (
        <figure>
          <ImageZoom
            imageSharp={image.childImageSharp}
            extension={image.extension}
            publicURL={image.publicURL}
            alt={alt}
            title={imageTitle || title}
            fallbackRaster={fallbackRaster}
          />
          <FigureCaption
            caption={imageTitle}
            creditType={titleImageType}
            creditName={titleImageCredit}
            creditURL={titleImageCreditURL}
          />
        </figure>
      )}
      {toc && (
        <details className={style.tocWrap}>
          <summary className={style.tocTitle}>Table of contents</summary>
          <div
            className={style.toc}
            dangerouslySetInnerHTML={{ __html: tableOfContents }}
          />
        </details>
      )}
      <div
        className={`${style.content} e-content`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {extraDetails && <ExtraDetail extraDetails={extraDetails} />}
    </article>
  )
}

Document.propTypes = {
  title: PropTypes.string,
  hideMeta: PropTypes.bool,
  creditVerb: PropTypes.string,
  datePublished: PropTypes.string,
  dateFromNow: PropTypes.string,
  dateModified: PropTypes.string,
  dateModifiedFromNow: PropTypes.string,
  image: PropTypes.object,
  fallbackRaster: PropTypes.object,
  imageTitle: PropTypes.string,
  alt: PropTypes.string,
  author: PropTypes.object,
  titleImageCredit: PropTypes.string,
  titleImageCreditURL: PropTypes.string,
  titleImageType: PropTypes.string,
  timeToRead: PropTypes.number,
  toc: PropTypes.bool,
  tableOfContents: PropTypes.string,
  html: PropTypes.string,
  tags: PropTypes.array,
  extraDetails: PropTypes.array,
}

export default Document
