import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, lang, meta, title }) {
  const { site, sanitySiteSettings } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        sanitySiteSettings {
          title
          description
          mainImage {
            asset {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    formats: WEBP
                    height: 600
                    width: 600
                    quality: 70
                  )
                }
              }
            }
          }
        }
      }
    `
  )

  const metaDescription =
    description ||
    sanitySiteSettings.description ||
    site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const ogImageUrl =
    sanitySiteSettings.mainImage.asset.localFile.childImageSharp.gatsbyImageData
      .images.fallback.src
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: ogImageUrl,
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: `twitter:image`,
          content: ogImageUrl,
        },
        {
          property: "og:twitter:width",
          content: "1200",
        },
        {
          property: `image`,
          content: ogImageUrl,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `ru`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
