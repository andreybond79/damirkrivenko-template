import React, { useContext } from "react"
import { graphql } from "gatsby"
import PortableText from "../components/PortableText"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { I18nextContext } from "gatsby-plugin-react-i18next"
import ImageComponent from "../components/ImageComponent"
import HeaderName from "../components/HeaderName"

const Concerpt = ({ data }) => {
  const { title, thumbnailImage, _rawText } = data.sanityConceptPage
  const { language } = useContext(I18nextContext)
  return (
    <Layout>
      <Seo lang={language} title={title[language]} />
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-6 sm:col-span-2 bg-gradient-to-b from-purple-900 to-gray-800">
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
          <div className="p-5 lg:p-10">
            <PortableText textData={_rawText[language]} />
          </div>
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
    sanityConceptPage {
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
      _rawText(resolveReferences: { maxDepth: 10 })
    }
  }
`
export default Concerpt
