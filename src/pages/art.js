import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Entry from '../components/entry'

import style from '../styles/archive.module.css'

import site from '../../config/site'

const ArtPage = ({ data }) => {
  const {
    site: {
      siteMetadata: { author: siteAuthor },
    },
    allMarkdownRemark: { edges: posts },
  } = data
  return (
    <Layout>
      <SEO
        title={`Art - ${site.title}`}
        path="/art/"
        description="Theatre, film, poetry and design. Some
                     collaboration with research."
        metaImage={site.image}
      />
      <main id="main" className={style.main}>
        <div className={style.title}>
          <h1 className={style.heading}>
            <span className="art">§Art</span>
          </h1>
        </div>
        <div className={style.content}>
          <div className={style.intro}>
            <p>
              Theatre, film, poetry and design. Some collaboration with{' '}
              <Link to="/sci/" className="sci">
                research
              </Link>
              .
            </p>
          </div>
          <h2 className={style.subHeading}>
            <span>Featured art</span>
          </h2>
          <div className={style.gridList}>
            {posts.map(({ node }) => {
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
                  author={author || siteAuthor}
                  image={thumbnail || image}
                  alt={alt}
                  imageTitle={image_title}
                  excerpt={excerpt || autoExcerpt}
                />
              )
            })}
          </div>
        </div>
      </main>
    </Layout>
  )
}

ArtPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query ArtQuery {
    site {
      siteMetadata {
        author {
          name
          url
        }
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        fields: { sourceName: { ne: "comments" } }
        frontmatter: { categories: { in: "art" }, published: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt(format: HTML)
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
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
      }
    }
  }
`

export default ArtPage
