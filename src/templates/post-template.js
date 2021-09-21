import React, { useContext } from "react"
import { graphql } from "gatsby"
import PortableText from "../components/PortableText"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  I18nextContext,
  Link,
  useTranslation,
} from "gatsby-plugin-react-i18next"
import ImageComponent from "../components/ImageComponent"
import AuthorIcon from "../components/AuthorIcon"
import { BsArrowBarUp } from "react-icons/bs"

const Post = ({ data }) => {
  const { title, _rawBody, mainImage, author, additionalPhotos, publishedAt } =
    data.sanityPost
  const { language } = useContext(I18nextContext)
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo lang={language} title={title[language]} />
      <div className="grid grid-cols-6  min-h-screen" id="scrolltop">
        <div className="col-span-6 sm:col-span-2 bg-gray-200 order-last md:order-first">
          <ImageComponent
            imageData={
              mainImage.asset.localFile.childImageSharp.gatsbyImageData
            }
            imageAlt={title[language]}
          />
          <div className="px-10">
            <h2>{t("OTHER ARTICLES")}</h2>
            {data.allSanityPost.nodes.map((post, index) => (
              <ul key={index}>
                <li className="font-raleway text-base font-semibold">
                  <Link
                    to={`/posts/${post.slug.current}`}
                    activeClassName="activeLink"
                  >
                    {post.title[language]}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="bg-white rounded min-h-screen">
            {/* <HeaderName headerName="" /> */}
            <div className="p-5 lg:px-10 font-raleway">
              {author != null && (
                <div className="grid grid-cols-6 gap-5 pt-5">
                  <div className="col-span-1">
                    <AuthorIcon
                      imageData={
                        author.image.asset.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      imageAlt={author.name[language]}
                    />
                  </div>

                  <div className="col-span-5 font-raleway font-bold">
                    <p className="text-gray-800 text-2xl font-raleway font-semibold">
                      {author.name[language]}
                    </p>
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: author._rawBio[language],
                      }}
                    />
                    <div className="text-sm">{publishedAt}</div>
                  </div>
                </div>
              )}
              <div className="pt-5">
                <h1>{title[language]}</h1>
              </div>
              <hr />
              <PortableText textData={_rawBody[language]} />
            </div>
            {additionalPhotos?.images.map((image, index) => (
              <ImageComponent
                key={index}
                imageData={
                  image.asset.localFile.childImageSharp.gatsbyImageData
                }
                imageAlt={title[language]}
              />
            ))}
          </div>
          <div className="w-full flex justify-end">
            <a href="#scrolltop">
              <BsArrowBarUp className="icon" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($pathSlug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    sanityPost(slug: { current: { eq: $pathSlug } }) {
      title {
        en
        ru
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
      mainImage {
        asset {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 400)
            }
          }
        }
      }
      author {
        _rawBio(resolveReferences: { maxDepth: 10 })
        name {
          en
          ru
        }
        image {
          asset {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 50)
              }
            }
          }
        }
      }
      additionalPhotos {
        images {
          asset {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 900)
              }
            }
          }
        }
      }
      publishedAt(formatString: "DD-MM-YYYY")
      _rawShortDescription(resolveReferences: { maxDepth: 10 })
    }
    allSanityPost {
      nodes {
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
export default Post
