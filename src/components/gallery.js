import React from 'react'
import Masonry from 'react-masonry-component'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import RasterOrSVG from './raster-svg'
import ImageZoom from './image-zoom'

import site from '../../config/site'
import style from '../styles/document.module.css'

const MAX_POSTS_PER_RENDER = site.galleryImagePerPage
//
// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.picturesToShow = MAX_POSTS_PER_RENDER
}

class Gallery extends React.Component {
  constructor() {
    super()
    let picturesToShow = MAX_POSTS_PER_RENDER
    if (typeof window !== `undefined`) {
      picturesToShow = window.picturesToShow
    }

    this.state = {
      showingMore: picturesToShow > MAX_POSTS_PER_RENDER,
      picturesToShow,
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.picturesToShow = this.state.picturesToShow
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
      this.setState(prevState => ({
        picturesToShow: prevState.picturesToShow + MAX_POSTS_PER_RENDER,
      }))
    }
    this.ticking = false
  }

  render() {
    const posts = this.props.galleryPosts.edges.map(e => e.node)
    const frontmatterImages = this.props.galleryFrontmatter
      ? this.props.galleryFrontmatter.map(e => e)
      : []
    const gallery = posts.concat(frontmatterImages)
    const postsSize = this.props.galleryPosts.edges.length
    const gallerySize = postsSize + frontmatterImages.length

    return (
      <div className={style.gallery}>
        <Masonry className={style.imageGrid}>
          {gallery.slice(0, this.state.picturesToShow).map(picture => {
            const image = picture.image
              ? picture.image
              : picture.frontmatter.thumbnail
              ? picture.frontmatter.thumbnail
              : picture.frontmatter.image
            const backgroundColor = 'var(--input-background-color)'

            return (
              <div key={picture.id} className={style.gridItem}>
                {picture.frontmatter ? (
                  <Link to={picture.frontmatter.path}>
                    <RasterOrSVG
                      imageSharp={image.childImageSharp}
                      backgroundColor={backgroundColor}
                      title={picture.frontmatter.title}
                      alt={picture.frontmatter.excerpt}
                      extension={image.extension}
                      publicURL={image.publicURL}
                    />
                  </Link>
                ) : (
                  <ImageZoom
                    imageSharp={image.childImageSharp}
                    title={picture.title}
                    alt={picture.alt}
                    extension={image.extension}
                    publicURL={image.publicURL}
                  />
                )}
              </div>
            )
          })}
        </Masonry>
        {gallerySize <= this.picturesToShow ||
          (!this.state.showingMore && gallerySize > MAX_POSTS_PER_RENDER && (
            <button
              type="button"
              data-testid="load-more"
              className={style.loadMore}
              onClick={() => {
                this.setState({
                  picturesToShow:
                    this.state.picturesToShow + MAX_POSTS_PER_RENDER,
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
  galleryPosts: PropTypes.object,
  galleryFrontmatter: PropTypes.array,
}

export const galleries = graphql`
  fragment galleryByFrontmatterFragment on Frontmatter {
    gallery {
      title
      alt
      image {
        id
        extension
        publicURL
        childImageSharp {
          fluid(maxHeight: 400, quality: 75) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  }

  fragment galleryByCategory on MarkdownRemark {
    id
    frontmatter {
      title
      excerpt
      path
      image {
        id
        extension
        publicURL
        childImageSharp {
          fluid(maxHeight: 400, quality: 75) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      thumbnail {
        id
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

  fragment galleryPostsFragment on Query {
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
