import React, { useContext } from "react"
import { graphql } from "gatsby"
import PortableText from "../components/PortableText"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { I18nextContext } from "gatsby-plugin-react-i18next"
import ImageComponent from "../components/ImageComponent"
import HeaderName from "../components/HeaderName"

const Success = ({ data }) => {
  const { title, _rawSuccessText, contactPersons } = data.sanityContactsPage
  const { language } = useContext(I18nextContext)
  return (
    <Layout>
      <Seo lang={language} title={title[language]} />
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-6 sm:col-span-2 bg-gradient-to-b from-red-900 to-gray-800">
          <ImageComponent
            imageData={
              contactPersons[0].image.asset.localFile.childImageSharp
                .gatsbyImageData
            }
            imageAlt={contactPersons[0].name[language]}
            imageName={contactPersons[0].name[language]}
          />
        </div>
        <div className="relative col-span-6 sm:col-span-4 bg-gray-100 font-raleway">
          <HeaderName headerName={title[language]} />
          <div className="p-5 lg:p-10">
            <PortableText textData={_rawSuccessText[language]} />
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
    sanityContactsPage {
      title {
        en
        ru
      }
      _rawSuccessText(resolveReferences: { maxDepth: 10 })
      contactPersons {
        name {
          en
          ru
        }
        image {
          asset {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 90, width: 600)
              }
            }
          }
        }
      }
    }
  }
`
export default Success
