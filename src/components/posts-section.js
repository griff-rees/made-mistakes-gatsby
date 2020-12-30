import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Entry from './entry'

import style from '../styles/archive.module.css'

const PostsSection = ({ posts, sectionTitle, category, defaultAuthor }) => {
  return (
    <>
      <h2 className={style.subHeading}>
        <span>
          {sectionTitle || 'Posts'}
          {category && (
            <span className={style[category.toLowerCase()]}>Projects</span>
          )}
        </span>
      </h2>
      <div className={style.gridList}>
        {posts.edges.map(({ node }) => {
          const {
            id,
            excerpt: autoExcerpt,
            frontmatter: {
              title,
              path,
              author,
              image,
              thumbnail,
              alt,
              image_title,
              excerpt,
            },
          } = node

          return (
            <Entry
              key={id}
              title={title}
              path={path}
              author={author || defaultAuthor}
              image={thumbnail || image}
              alt={alt}
              imageTitle={image_title}
              excerpt={excerpt || autoExcerpt}
            />
          )
        })}
      </div>
    </>
  )
}

PostsSection.propTypes = {
  posts: PropTypes.object,
  sectionTitle: PropTypes.string,
  category: PropTypes.string,
  defaultAuthor: PropTypes,
}

export const PostsFragment = graphql`
  fragment postFragment on MarkdownRemark {
    id
    excerpt(format: HTML)
    timeToRead
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      date_pretty: date(formatString: "MMMM Do, YYYY")
      date_from_now: date(fromNow: true)
      path
      author
      excerpt
      featured
      categories
      alt
      image_title
      image {
        extension
        publicURL
        childImageSharp {
          fluid(maxWidth: 400, quality: 75) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      thumbnail {
        extension
        publicURL
        childImageSharp {
          fluid(maxWidth: 400, quality: 75) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  }

  fragment PaginatedPostsFragment on Query {
    paginatedPosts: allMarkdownRemark(
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
      limit: $limit
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      edges {
        node {
          ...postFragment
        }
      }
    }
  }

  fragment FeaturedPostsFragment on Query {
    featuredPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        fields: { sourceName: { ne: "comments" } }
        frontmatter: {
          published: { ne: false }
          featured: { eq: true }
          categories: { in: [$category] }
        }
      }
      limit: $limit
    ) {
      edges {
        node {
          ...postFragment
        }
      }
    }
  }
`

export default PostsSection
