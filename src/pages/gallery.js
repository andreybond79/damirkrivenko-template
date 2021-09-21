import React, { useContext } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ImageComponent from "../components/ImageComponent"
import SimpleReactLightbox from "simple-react-lightbox"
import { SRLWrapper } from "simple-react-lightbox"
import { I18nextContext, useTranslation } from "gatsby-plugin-react-i18next"
import { GatsbyImage } from "gatsby-plugin-image"
import HeaderName from "../components/HeaderName"
import SeeMoreButton from "../components/SeeMoreButton"

const GalleryPage = ({ data }) => {
  const { language } = useContext(I18nextContext)
  const { t } = useTranslation()
  const { title, catalogueList } = data.sanityGalleryPage

  const options = {
    settings: {
      autoplaySpeed: 1000,
      disableKeyboardControls: false,
      disablePanzoom: false,
      disableWheelControls: false,
      hideControlsAfter: 1000,
      lightboxTransitionSpeed: 0.6,
      lightboxTransitionTimingFunction: "linear",
      overlayColor: "rgba(0, 0, 0, 0.9)",
      slideSpringValues: [300, 200],
      slideTransitionSpeed: 0.6,
      slideTransitionTimingFunction: "linear",
    },
    buttons: {
      backgroundColor: "rgba(30,30,36,0.8)",
      iconColor: "rgba(255, 255, 255, 0.8)",
      iconPadding: "5px",
      showAutoplayButton: false,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: false,
      showNextButton: true,
      showPrevButton: true,
      showThumbnailsButton: false,
      size: "40px",
    },
    caption: {
      captionAlignment: "start",
      captionColor: "#FFFFFF",
      captionContainerPadding: "10",
      captionFontFamily: "inherit",
      captionFontSize: "inherit",
      captionFontStyle: "inherit",
      captionFontWeight: "inherit",
      captionTextTransform: "inherit",
      showCaption: true,
    },
    translations: {
      closeText: "Закрыть",
      nextText: "Вперед",
      previousText: "Назад",
    },
  }
  return (
    <Layout>
      <Seo lang={language} title={title[language]} />
      <div className="grid grid-cols-6 min-h-screen">
        {catalogueList.map((cataligueListItem, index) => (
          <React.Fragment key={index}>
            <div className="col-span-6 sm:col-span-2 bg-gradient-to-b from-green-900 to-gray-800">
              <div className="relative">
                <div className="w-full">
                  {cataligueListItem.heroImages.thumbnailImage.map(
                    (image, index) => (
                      <ImageComponent
                        key={index}
                        imageData={
                          image.mainImage.asset.localFile.childImageSharp
                            .gatsbyImageData
                        }
                        imageAlt={image.title[language]}
                        imageName={image.title[language]}
                        imageParameters={image.parameters[language]}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="relative col-span-6 sm:col-span-4 bg-gray-100 font-raleway">
              <HeaderName
                headerName={cataligueListItem.catalogueName[language]}
              />
              <div className="p-5 lg:p-10">
                <SimpleReactLightbox>
                  <SRLWrapper options={options}>
                    <div className="grid grid-cols-3 gap-5 ">
                      {cataligueListItem.heroImages.images.map(
                        (image, index) => (
                          <div className="gallery-card rounded" key={index}>
                            <GatsbyImage
                              image={
                                image.mainImage.asset.localFile.childImageSharp
                                  .gatsbyImageData
                              }
                              alt={
                                `${image.title[language]}, ${image.parameters[language]}` ||
                                "Damir Krivenko"
                              }
                              className="w-full h-40 rounded bg-white cursor-pointer"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </SRLWrapper>
                </SimpleReactLightbox>
              </div>
              <SeeMoreButton
                url={cataligueListItem.catalogueCategorySlug.current}
                buttonText={t("SEE MORE")}
              />
            </div>
          </React.Fragment>
        ))}
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
    sanityGalleryPage {
      title {
        en
        ru
      }
      catalogueList {
        catalogueName {
          en
          ru
        }
        catalogueCategorySlug {
          current
        }
        heroImages {
          thumbnailImage {
            mainImage {
              asset {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 400, quality: 90)
                  }
                }
              }
            }
            title {
              en
              ru
            }
            parameters {
              en
              ru
            }
          }
          images {
            mainImage {
              asset {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 1000, quality: 90)
                  }
                }
              }
            }
            title {
              en
              ru
            }
            parameters {
              en
              ru
            }
          }
        }
      }
    }
  }
`

export default GalleryPage
