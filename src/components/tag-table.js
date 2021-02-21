import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import style from '../styles/archive.module.css'

const _ = require('lodash-addons')

const TagTable = ({ tags }) => {
  // Sort object alphabetically function
  const propComparator = (propName) => (a, b) =>
    a[propName].toLowerCase() === b[propName].toLowerCase()
      ? 0
      : a[propName].toLowerCase() < b[propName].toLowerCase()
      ? -1
      : 1

  return (
    <>
      <h2 className={style.subHeading}>
        <span>Browse</span>
      </h2>
      <div className={style.columnList} style={{ marginBottom: '3rem' }}>
        <ul>
          {tags.group.sort(propComparator(`fieldValue`)).map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${_.slugify(tag.fieldValue)}/`}>
                <strong>{tag.fieldValue}</strong>{' '}
                <span className={style.count}>{tag.totalCount}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

TagTable.propTypes = {
  tags: PropTypes.object,
}

export const CategoryTagsFragment = graphql`
  fragment CategoryTagsFragment on Query {
    categoryTags: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        fields: { sourceName: { ne: "comments" } }
        frontmatter: {
          published: { ne: false }
          categories: { in: [$category] }
        }
      }
      skip: $skip
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default TagTable
