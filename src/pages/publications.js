import React, { useContext } from "react"
import { graphql } from "gatsby"
import PortableText from "../components/PortableText"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { I18nextContext, Link } from "gatsby-plugin-react-i18next"
import ImageComponent from "../components/ImageComponent"
import HeaderName from "../components/HeaderName"

const Publications = ({ data }) => {
  const { title, thumbnailImage, listOfPublications } =
    data.sanityPublicationsPage
  const { language } = useContext(I18nextContext)
  return (
    <Layout>
      <Seo lang={language} title={title[language]} />
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-6 sm:col-span-2 bg-gradient-to-b from-gray-400 to-gray-800">
          {thumbnailImage.map((image, index) => (
            <ImageComponent
              key={index}
              imageData={
                image.mainImage.asset.localFile.childImageSharp.gatsbyImageData
              }
              imageAlt={image.title[language]}
              imageName={image.title[language]}
              imageParameters={image.parameters[language]}
            />
          ))}
        </div>
        <div className="relative col-span-6 sm:col-span-4 bg-gray-100 font-raleway">
          <HeaderName headerName={title[language]} />
          {listOfPublications.map((publication, index) => (
            <Link to={`/posts/${publication.slug.current}`} key={index}>
              <div className="grid grid-cols-6 gap-5 p-5 lg:px-10 hover:bg-gray-200 border-b rounded">
                <div className="col-span-6 sm:col-span-1">
                  <div className="w-full">
                    <GatsbyImage
                      image={
                        publication.mainImage.asset.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      className="categories-pics z-10"
                      alt={publication.title[language] || "Damir Krivenko"}
                      width={100}
                      quality={50}
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-5">
                  <span className="font-semibold border-b-2 border-gray-600">
                    {publication.title[language]}
                  </span>
                  <PortableText
                    textData={publication._rawShortDescription[language]}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    sanityPublicationsPage {
      title {
        en
        ru
      }
      thumbnailImage {
        title {
          en
          ru
        }
        parameters {
          en
          ru
        }
        shortDescription {
          ru
          en
        }
        mainImage {
          asset {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 90, width: 600)
              }
            }
          }
        }
      }
      listOfPublications {
        mainImage {
          asset {
            localFile {
              childImageSharp {
                gatsbyImageData(formats: AUTO)
              }
            }
          }
        }
        _rawShortDescription(resolveReferences: { maxDepth: 10 })
        title {
          en
          ru
        }
        slug {
          current
        }
      }
    }
  }
`
export default Publications
