import React, { useContext } from "react"
import { graphql } from "gatsby"
import PortableText from "../components/PortableText"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { I18nextContext } from "gatsby-plugin-react-i18next"
import ImageComponent from "../components/ImageComponent"
import ContactForm from "../components/ContactForm"
import { FaVk } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import HeaderName from "../components/HeaderName"

const Contacts = ({ data }) => {
  const { title, _rawText, contactPersons } = data.sanityContactsPage
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
          <ContactForm />
          <div className="px-5 lg:px-10">
            <PortableText textData={_rawText[language]} />
            <div className="flex flex-wrap pb-5 lg:pb-10">
              <span>
                <a
                  href={contactPersons[0].facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  <FaFacebook className="icon" />
                </a>
              </span>
              <span className="ml-3">
                <a
                  href={contactPersons[0].vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="vkontakte"
                >
                  <FaVk className="icon" />
                </a>
              </span>
              <span className="ml-3">
                <a
                  href={contactPersons[0].instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="instagram"
                >
                  <RiInstagramFill className="icon" />
                </a>
              </span>
            </div>
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
      _rawText(resolveReferences: { maxDepth: 10 })
      contactPersons {
        name {
          en
          ru
        }
        vk
        instagram
        facebook
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
export default Contacts
