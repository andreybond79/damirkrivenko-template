import React, { useContext } from "react"
import { graphql } from "gatsby"
import PortableText from "../components/PortableText"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { I18nextContext, Link } from "gatsby-plugin-react-i18next"
import ImageComponent from "../components/ImageComponent"
import HeaderName from "../components/HeaderName"

const Events = ({ data }) => {
  const {
    title,
    thumbnailImage,
    pastEvents,
    upComingEvents,
    listOfUpcomingEvents,
  } = data.sanityEventPage
  const { language } = useContext(I18nextContext)
  return (
    <Layout>
      <Seo lang={language} title={title[language]} />
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-6 sm:col-span-2 bg-gradient-to-b from-green-900 to-gray-800">
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
          <h2 className="px-5 lg:px-10 pt-5">{upComingEvents[language]}</h2>
          {listOfUpcomingEvents.map((upcomingEvent, index) => (
            <Link to={`/posts/${upcomingEvent.slug.current}`} key={index}>
              <div className="grid grid-cols-6 gap-5 px-5 lg:px-10 lg:py-2 hover:bg-gray-200 rounded">
                <div className="col-span-6 sm:col-span-1">
                  <div className="w-full">
                    <GatsbyImage
                      image={
                        upcomingEvent.mainImage.asset.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      className="categories-pics z-10"
                      alt={upcomingEvent.title[language] || "Damir Krivenko"}
                      width={100}
                      quality={50}
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-5">
                  <span className="font-semibold border-b-2 border-gray-600">
                    {upcomingEvent.title[language]}
                  </span>
                  <PortableText
                    textData={upcomingEvent._rawShortDescription[language]}
                  />
                </div>
              </div>
            </Link>
          ))}
          <h2 className="px-5 lg:px-10 pt-5">{pastEvents[language]}</h2>
          {data.allSanityPost.nodes.map((pastEvent, index) => (
            <Link to={`/posts/${pastEvent.slug.current}`} key={index}>
              {!pastEvent.newEvent && (
                <div className="grid grid-cols-6 gap-5 px-5 lg:px-10 lg:py-2 hover:bg-gray-200 border-b rounded">
                  <div className="col-span-6 sm:col-span-1">
                    <div className="w-full pt-5 lg:pt-1">
                      <GatsbyImage
                        image={
                          pastEvent.mainImage.asset.localFile.childImageSharp
                            .gatsbyImageData
                        }
                        className="categories-pics z-10"
                        alt={pastEvent.title[language] || "Damir Krivenko"}
                        width={100}
                        quality={50}
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-5">
                    <span className="font-semibold border-b-2 border-gray-600">
                      {pastEvent.title[language]}
                    </span>
                    <small className="pl-5">{pastEvent.publishedAt}</small>
                    <PortableText
                      textData={pastEvent._rawShortDescription[language]}
                    />
                  </div>
                </div>
              )}
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
    allSanityPost(
      filter: { categories: { elemMatch: { title: { eq: "Event" } } } }
      sort: { order: DESC, fields: publishedAt }
    ) {
      nodes {
        categories {
          id
        }
        title {
          en
          ru
        }
        _rawShortDescription(resolveReferences: { maxDepth: 10 })
        publishedAt(formatString: "MM-YYYY")
        mainImage {
          asset {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 70, formats: AUTO)
              }
            }
          }
        }
        slug {
          current
        }
        newEvent
      }
    }
    sanityEventPage {
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
      pastEvents {
        en
        ru
      }
      upComingEvents {
        en
        ru
      }
      listOfUpcomingEvents {
        _rawShortDescription(resolveReferences: { maxDepth: 10 })
        mainImage {
          asset {
            localFile {
              childImageSharp {
                gatsbyImageData(formats: AUTO)
              }
            }
          }
        }
        slug {
          _key
          _type
          current
        }
        title {
          en
          ru
        }
      }
    }
  }
`
export default Events
