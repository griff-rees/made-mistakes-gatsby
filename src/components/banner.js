import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import BackgroundSection from './background'

import style from '../styles/archive.module.css'

const TextWithLinks = ({ excerpt, links }) => {
  const splicedExcerpt = [excerpt]
  for (const link of links) {
    link.className = style[link.category]
    const localSplit = splicedExcerpt
      .pop(splicedExcerpt.length - 1)
      .split(link.text)
    splicedExcerpt.push(localSplit[0], link, localSplit[1])
  }
  return (
    <p>
      {splicedExcerpt.map((element) =>
        typeof element === 'string' ? (
          element
        ) : (
          <Link className={element.className} to={element.href}>
            {element.text}
          </Link>
        )
      )}
    </p>
  )
}

TextWithLinks.propTypes = {
  excerpt: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
      category: PropTypes.string,
    })
  ),
}

const BannerSection = ({
  name,
  char,
  backgroundImage,
  excerpt,
  paginationTitle,
  humanPageNumber,
  links,
}) => {
  const categoryStyle = style[name.toLowerCase()]
  return (
    <BackgroundSection backgroundImage={backgroundImage}>
      <div className={style.title}>
        <h1 className={style.heading}>
          <span className={categoryStyle}>
            {char && (
              <span className={`${style.char} ${categoryStyle}`}>{char}</span>
            )}
            {name} {paginationTitle}
          </span>
        </h1>
        {excerpt && humanPageNumber === 1 && (
          <div className={style.intro}>
            <TextWithLinks excerpt={excerpt} links={links} />
          </div>
        )}
      </div>
    </BackgroundSection>
  )
}

BannerSection.propTypes = {
  name: PropTypes.string,
  char: PropTypes.string,
  backgroundImage: PropTypes.object,
  excerpt: PropTypes.string,
  paginationTitle: PropTypes.string,
  humanPageNumber: PropTypes.number,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
      category: PropTypes.string,
    })
  ),
}

export const YamlBannerFragment = graphql`
  fragment BannerFragment on TaxonomyYaml {
    id
    name
    char
    image {
      ...BackgroundImageFragment
    }
    excerpt
    links {
      text
      href
      category
    }
  }
`

export default BannerSection
