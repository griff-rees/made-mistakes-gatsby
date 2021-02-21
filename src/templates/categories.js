import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
// import Entry from '../components/entry'
import PostsSection from '../components/posts-section'
import BannerSection from '../components/banner'
import Pagination from '../components/pagination'
import TagTable from '../components/tag-table'
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
    featuredPosts,
    paginatedPosts,
    categoryTags,
  } = data
  const paginationTitle =
    humanPageNumber === 1
      ? ''
      : ` - Page ${humanPageNumber} of ${numberOfPages}`
  const metaImage = site.image

  return (
    <Layout>
      <SEO
        title={`${taxonomyName}${paginationTitle} - ${site.title}`}
        path={`/${_.slugify(category)}/`}
        description={taxonomyExcerpt || `Posts related to ${taxonomyName}.`}
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
          {taxonomyFeatured && humanPageNumber === 1 && (
            <PostsSection
              posts={featuredPosts}
              sectionTitle="Featured"
              category={taxonomyName}
              defaultAuthor={siteAuthor}
            />
          )}
          <TagTable tags={categoryTags} />
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
    ...CategoryTagsFragment
    ...FeaturedPostsFragment
    ...PaginatedPostsFragment
  }
`

export default Categories
