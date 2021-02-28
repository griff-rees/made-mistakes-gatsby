import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

import style from '../styles/archive.module.css'

import site from '../../config/site'

const NotFoundPage = () => (
  <Layout>
    <SEO
      title={`Page not found - ${site.titleAlt}`}
      description="Where 404 art though?"
      metaImage={site.image}
    />
    <main id="main" className={style.main}>
      <div className={style.title}>
        <h1 className={style.heading}>
          <span>404: Not found</span>
        </h1>
      </div>
      <div className={style.content}>
        <p>
          Where 404{' '}
          <Link to="/art/" className="art">
            art
          </Link>{' '}
          though?
        </p>
      </div>
    </main>
  </Layout>
)

export default NotFoundPage
