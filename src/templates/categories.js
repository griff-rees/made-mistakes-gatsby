import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
// import Entry from '../components/entry'
import PostsSection from '../components/posts-section'
import BannerSection from '../components/banner'
import Pagination from '../components/pagination'
// import Github
// import instagram

import site from '../../config/site'

import style from '../styles/archive.module.css'

const _ = require('lodash-addons')

const Categories = ({
  data,
  pageContext: {
    nextPagePath,
    previousPagePath,
    humanPageNumber,
    numberOfPages,
    category,
  },
}) => {
  const {
    site: {
      siteMetadata: { author: siteAuthor },
    },
    taxonomyYaml: {
      name: taxonomyName,
      excerpt: taxonomyExcerpt,
      char: taxonomyImageChar,
      image: taxonomyImage,
      links: taxonomyLinks,
      show_featured: taxonomyFeatured,
    },
    allMarkdownRemark: { group, edges: posts },
    featuredPosts,
    paginatedPosts,
  } = data
  const paginationTitle =
    humanPageNumber === 1
      ? ''
      : ` - Page ${humanPageNumber} of ${numberOfPages}`
  const metaImage = site.image

  // Sort object alphabetically function
  const propComparator = (propName) => (a, b) =>
    a[propName].toLowerCase() === b[propName].toLowerCase()
      ? 0
      : a[propName].toLowerCase() < b[propName].toLowerCase()
      ? -1
      : 1

  return (
    <Layout>
      <SEO
        title={`${taxonomyName}${paginationTitle} - ${site.title}`}
        path={`/${_.slugify(category)}/`}
        description={
          taxonomyExcerpt || `An archive of posts related to ${taxonomyName}.`
        }
        metaImage={metaImage}
      />
      <main id="main" className={style.main}>
        <BannerSection
          name={taxonomyName}
          char={taxonomyImageChar}
          backgroundImage={taxonomyImage}
          excerpt={taxonomyExcerpt}
          paginationTitle={paginationTitle}
          humanPageNumber={humanPageNumber}
          links={taxonomyLinks}
        />
        <div className={style.content}>
          {taxonomyFeatured && (
            <PostsSection
              posts={featuredPosts}
              sectionTitle="Featured"
              category={taxonomyName}
              defaultAuthor={siteAuthor}
            />
          )}
          <h2 className={style.subHeading}>
            <span>Browse</span>
          </h2>
          <div className={style.columnList} style={{ marginBottom: '3rem' }}>
            <ul>
              {group.sort(propComparator(`fieldValue`)).map((tag) => (
                <li key={tag.fieldValue}>
                  <Link to={`/tag/${_.slugify(tag.fieldValue)}/`}>
                    <strong>{tag.fieldValue}</strong>{' '}
                    <span className={style.count}>{tag.totalCount}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <PostsSection
            posts={paginatedPosts}
            sectionTitle="Recent"
            defaultAuthor={siteAuthor}
          />
        </div>
      </main>
      <Pagination
        previousPath={previousPagePath}
        previousLabel="Newer posts"
        nextPath={nextPagePath}
        nextLabel="Older posts"
      />
    </Layout>
  )
}

Categories.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string,
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
    humanPageNumber: PropTypes.number,
    numberOfPages: PropTypes.number,
  }),
  paginatedPosts: PropTypes.object,
  featuredPosts: PropTypes.object,
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!, $category: String!) {
    site {
      siteMetadata {
        author {
          name
          url
        }
      }
    }
    taxonomyYaml(id: { eq: $category }) {
      ...BannerFragment
      show_featured
    }
    ...FeaturedPostsFragment
    ...PaginatedPostsFragment
    allMarkdownRemark(
      filter: {
        frontmatter: {
          categories: { in: [$category] }
          published: { ne: false }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      edges {
        node {
          id
          excerpt(format: HTML)
          timeToRead
          frontmatter {
            title
            date
            date_pretty: date(formatString: "MMMM Do, YYYY")
            date_from_now: date(fromNow: true)
            path
            author
            excerpt
            categories
            image {
              childImageSharp {
                fluid(maxWidth: 760, quality: 75) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Categories
