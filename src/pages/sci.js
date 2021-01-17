import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Octicon, { MarkGithub } from '@githubprimer/octicons-react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import BackgroundSection from '../components/background'
import Entry from '../components/entry'
import Repository from '../components/repository'

import style from '../styles/archive.module.css'

import site from '../../config/site'

const SciencePage = ({ data }) => {
  const {
    site: {
      siteMetadata: { author: siteAuthor },
    },
    backgroundImage,
    allMarkdownRemark: { edges: posts },
    githubData: { data: github },
  } = data
  return (
    <Layout>
      <SEO
        title={`Research - ${site.title}`}
        path="/sci/"
        description="Testing research hypotheses.
                     Occasional brushes with art."
        metaImage={site.image}
      />
      <main id="main" className={style.main}>
        <BackgroundSection backgroundImage={backgroundImage}>
          <div className={style.title}>
            <h1 className={style.heading}>
              <span className="sci">
                <span className={`${style.char} ${style.sci} accent`}>
                  &#8734;
                </span>
                Research
              </span>
            </h1>
            <div className={style.intro}>
              <p>
                Testing research hypotheses. Occasional brushes with{' '}
                <Link to="/art/" className={style.art}>
                  art
                </Link>
                .
              </p>
            </div>
          </div>
        </BackgroundSection>
        <div className={style.content}>
          <h2 className={style.subHeading}>
            <span>
              Featured<span className={style.sci}>Research</span>
            </span>
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
          <h2 className={style.subHeading}>
            <span>
              <Octicon
                icon={MarkGithub}
                verticalAlgin="middle"
                className={style.icon}
              />{' '}
              Open source contributions
            </span>
          </h2>
          {github && (
            <div>
              {github.viewer.repositories.nodes
                .map(repo => <Repository key={repo.name} repo={repo} />)
                .reverse()}{' '}
              {/* repro.name can be duplicates if a fork */}
              <a href={site.githubUrl} className="btn">
                See more on GitHub
              </a>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}

SciencePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query SciQuery {
    backgroundImage: file(
      relativePath: { eq: "newcastle-northern-ireland.jpg" }
    ) {
      ...BackgroundImageFragment
    }
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
        frontmatter: { categories: { in: "sci" }, published: { ne: false } }
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
    githubData {
      data {
        viewer {
          repositories {
            nodes {
              name
              description
              homepageUrl
              resourcePath
              updatedAt(formatString: "YYYY-MM-DD")
              languages {
                edges {
                  node {
                    name
                    color
                  }
                }
              }
              licenseInfo {
                name
              }
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`

export default SciencePage
