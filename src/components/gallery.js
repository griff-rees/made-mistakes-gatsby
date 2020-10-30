import React from 'react'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import style from '../styles/document.module.css'

const MAX_POSTS_PER_RENDER = 20
//
// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = MAX_POSTS_PER_RENDER
}

class Gallery extends React.Component {
  constructor() {
    super()
    let postsToShow = MAX_POSTS_PER_RENDER
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }

    this.state = {
      showingMore: postsToShow > MAX_POSTS_PER_RENDER,
      postsToShow,
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.pageYOffset + window.innerHeight)
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState(({ prevState }) => ({
        postsToShow: prevState.postsToShow + MAX_POSTS_PER_RENDER,
      }))
    }
    this.ticking = false
  }

  render() {
    const posts = this.props.galleryList.edges.map(e => e.node)
    const postsSize = this.props.galleryList.edges.length

    return (
      <div className={style.gallery}>
        <Masonry className={style.grid}>
          {posts.slice(0, this.state.postsToShow).map(post => {
            const image = post.frontmatter.thumbnail
              ? post.frontmatter.thumbnail
              : post.frontmatter.image

            return (
              <div key={post.id} className={style.gridItem}>
                <Link to={post.frontmatter.path}>
                  <Img
                    fluid={image.childImageSharp.fluid}
                    backgroundColor="var(--input-background-color)"
                    title={post.frontmatter.title}
                    alt={post.frontmatter.excerpt}
                  />
                </Link>
              </div>
            )
          })}
        </Masonry>
        {postsSize <= this.postsToShow ||
          (!this.state.showingMore && postsSize > MAX_POSTS_PER_RENDER && (
            <button
              type="button"
              data-testid="load-more"
              className={style.loadMore}
              onClick={() => {
                this.setState({
                  postsToShow: this.state.postsToShow + MAX_POSTS_PER_RENDER,
                  showingMore: true,
                })
              }}
            >
              Load more
            </button>
          ))}
      </div>
    )
  }
}

Gallery.propTypes = {
  galleryList: PropTypes.object,
}

export const galleryByCategory = graphql`
  fragment galleryByCategory on MarkdownRemark {
    id
    frontmatter {
      title
      excerpt
      path
      image {
        id
        childImageSharp {
          fluid(maxHeight: 400, quality: 75) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      thumbnail {
        id
        childImageSharp {
          fluid(maxWidth: 400, quality: 75) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  }

  fragment galleryFragment on Query {
    galleryPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { gallery_categories: { in: [$path] } } }
    ) {
      edges {
        node {
          ...galleryByCategory
        }
      }
    }
  }
`

export default Gallery
