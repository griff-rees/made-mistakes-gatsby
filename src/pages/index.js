import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Entry from '../components/entry'
import BackgroundSection from '../components/background'

import style from '../styles/archive.module.css'

import site from '../../config/site'

const HomePage = ({ data }) => {
  const {
    site: {
      siteMetadata: { author: siteAuthor },
    },
    featuredPosts: { edges: featuredPosts },
    recentPosts: { edges: recentPosts },
    backgroundImage,
  } = data
  return (
    <Layout>
      <SEO
        title={`${site.title} - ${site.description}`}
        path="/"
        description={site.description}
        metaImage={site.image}
      />
      <main id="main" className={style.main}>
        <BackgroundSection backgroundImage={backgroundImage}>
          <div className={style.title}>
            <h1 className={style.heading}>
              <span>
                The{' '}
                <a href="/art/" className="art">
                  art
                </a>
                ,{' '}
                <a href="/sci/" className="sci">
                  research
                </a>{' '}
                and <a href="/thoughts/">thoughts</a> of{' '}
                <a href="/about/">Griffith&nbsp;Rees</a>
                <a href="http://box3spool5.org" className="accent">
                  .
                </a>
              </span>
            </h1>
            <div className={style.intro}>
              <p>
                Meanders through theatre, film, code, verse, and strands of
                research sprinkled with opinions all my own.
              </p>
            </div>
          </div>
        </BackgroundSection>
        <div className={style.content}>
          <h2 className={style.subHeading}>
            <span>Featured projects</span>
          </h2>
          <div className={style.gridList}>
            {featuredPosts.map(({ node }) => {
              const {
                id,
                excerpt: autoExcerpt,
                timeToRead,
                frontmatter: {
                  title,
                  date,
                  date_pretty,
                  path,
                  author,
                  excerpt,
                  image,
                  thumbnail,
                  alt,
                  image_title,
                },
              } = node
              return (
                <Entry
                  key={id}
                  title={title}
                  date={date}
                  datePretty={date_pretty}
                  path={path}
                  author={author || siteAuthor}
                  timeToRead={timeToRead}
                  image={thumbnail || image}
                  alt={alt}
                  imageTitle={image_title}
                  excerpt={excerpt || autoExcerpt}
                />
              )
            })}
          </div>
          <h2 className={style.subHeading}>
            <span>Recent posts</span>
          </h2>
          <div className={style.list}>
            {recentPosts.map(({ node }) => {
              const {
                id,
                excerpt: autoExcerpt,
                timeToRead,
                frontmatter: { title, date, date_pretty, path, excerpt },
              } = node

              return (
                <Entry
                  key={id}
                  title={title}
                  date={date}
                  datePretty={date_pretty}
                  path={path}
                  timeToRead={timeToRead}
                  excerpt={excerpt || autoExcerpt}
                />
              )
            })}
          </div>
          <h2 className={style.subHeading}>
            <span>Explore more on this site</span>
          </h2>
          <div>
            <ul className={`${style.gridListExpanded} ${style.navList}`}>
              <li key="art">
                <Entry
                  key="arts-home-link"
                  title="Art"
                  path="/art/"
                  excerpt="Theatre, film, writing and design. Some
                  collaboration with research."
                />
              </li>
              <li key="research">
                <Entry
                  key="research-home-link"
                  title="Research"
                  path="/research/"
                  excerpt="Testing hypotheses in social and data
                           sciences. Occasional brushes with art."
                />
              </li>
              <li key="thoughts">
                <Entry
                  key="thoughts-home-link"
                  title="Thoughts"
                  path="/thoughts/"
                  excerpt="Meanders, pondering and forays through and beyond
                  art and science."
                />
              </li>
              <li key="topics">
                <Entry
                  key="topics-home-link"
                  title="All topics"
                  path="/tag/"
                  excerpt="Archive of all posts organized by topic."
                />
              </li>
              <li key="about">
                <Entry
                  key="about-home-link"
                  title="About"
                  path="/about/"
                  excerpt="A bit of life and links to other stuff."
                />
              </li>
              <li key="contact">
                <Entry
                  key="contact-home-link"
                  title="Contact"
                  path="/contact/"
                  excerpt="<p>Preferred methods of sending questions, messages, and
                  riddles to me.</p>"
                />
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        author {
          name
          url
        }
      }
    }
    featuredPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        fields: { sourceName: { ne: "comments" } }
        frontmatter: {
          featured: { eq: true }
          published: { ne: false }
          output: { ne: false }
          categories: { in: ["art", "sci"] }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt(format: HTML)
          timeToRead
          frontmatter {
            title
            date
            date_pretty: date(formatString: "MMMM Do, YYYY")
            path
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
    recentPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        fields: { sourceName: { ne: "comments" } }
        frontmatter: {
          featured: { ne: true }
          published: { ne: false }
          output: { ne: false }
          categories: { nin: "work" }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          excerpt(format: HTML)
          timeToRead
          frontmatter {
            title
            date
            date_pretty: date(formatString: "MMMM Do, YYYY")
            path
            excerpt
          }
        }
      }
    }
    backgroundImage: file(relativePath: { eq: "mountain-path.jpg" }) {
      ...BackgroundImageFragment
    }
    aboutImage: file(relativePath: { eq: "dream_play.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 720, maxHeight: 480, quality: 75) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

export default HomePage
