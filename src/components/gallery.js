import React from 'react'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'

import style from '../styles/document.module.css'

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 20
}

class Gallery extends React.Component {
  constructor() {
    super()
    let postsToShow = 20
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }

    this.state = {
      showingMore: postsToShow > 20,
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
      this.setState(prevState => ({ postsToShow: prevState.postsToShow + 20 }))
    }
    this.ticking = false
  }

  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(e => e.node)
    const postsSize = this.props.data.allMarkdownRemark.edges.length

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
                  />
                </Link>
              </div>
            )
          })}
        </Masonry>
        {postsSize <= this.postsToShow ||
          (!this.state.showingMore && (
            <button
              type="button"
              data-testid="load-more"
              className={style.loadMore}
              onClick={() => {
                this.setState({
                  postsToShow: this.state.postsToShow + 20,
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
  data: PropTypes.object.isRequired,
  // gallery_category: PropTypes.string,
}

export const galleryQuery = useStaticQuery(graphql`
  query GalleryQuery($galleryCategory: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: $galleryCategory } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxHeight: 400, quality: 75) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            thumbnail {
              childImageSharp {
                fluid(maxHeight: 400, quality: 75) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`)

export default Gallery
