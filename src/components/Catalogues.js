import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { I18nextContext, Link } from "gatsby-plugin-react-i18next"
import { CategoryCard } from "./CategoryCard"

const Catalogues = () => {
  const data = useStaticQuery(graphql`
    {
      sanityGalleryPage {
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
                      gatsbyImageData(width: 100, quality: 70)
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
  `)
  const { language } = useContext(I18nextContext)

  return (
    <div>
      <div className="mx-5 lg:mx-10 pb-5">
        {data.sanityGalleryPage.catalogueList.map((item, index) => (
          <Link
            to={`/gallery/${item.catalogueCategorySlug.current}`}
            key={index}
          >
            <CategoryCard
              categoryName={item.catalogueName[language]}
              categoryImage={
                item.heroImages.thumbnailImage[0].mainImage.asset.localFile
                  .childImageSharp.gatsbyImageData
              }
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Catalogues
