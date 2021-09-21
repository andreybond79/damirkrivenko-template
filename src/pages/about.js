import React, { useContext } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import YouTube from "react-youtube"
import getVideoId from "get-video-id"
import { I18nextContext } from "gatsby-plugin-react-i18next"
import ImageComponent from "../components/ImageComponent"
import PortableText from "../components/PortableText"
import HeaderName from "../components/HeaderName"

const AboutMe = ({ data }) => {
  const { language } = useContext(I18nextContext)
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  }
  const { title, thumbnailImage, youtubeLinks, _rawText } = data.sanityAboutPage
  return (
    <Layout>
      <Seo lang={language} title={title[language]} />
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-6 sm:col-span-2 bg-gradient-to-b from-red-900 to-gray-800">
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
          {youtubeLinks.map((youtubeLink, index) => (
            <React.Fragment key={index}>
              <div className="player-wrapper mx-5 lg:mx-10 bg-white bg-opacity-50 rounded-t">
                <YouTube
                  videoId={getVideoId(youtubeLink.url).id}
                  opts={opts}
                  className="react-player w-full h-full shadow rounded"
                />
              </div>
              <div className="mx-5 lg:mx-10 bg-white bg-opacity-50 rounded-b">
                <p className="p-5 text-sm text-black font-raleway">
                  {youtubeLink.alt[language]}
                </p>
              </div>
            </React.Fragment>
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

    sanityAboutPage {
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
      youtubeLinks {
        alt {
          en
          ru
        }
        url
      }
      _rawText(resolveReferences: { maxDepth: 10 })
    }
  }
`
export default AboutMe
