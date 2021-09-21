import React, { useContext } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { I18nextContext, useTranslation } from "gatsby-plugin-react-i18next"
import HeaderName from "../components/HeaderName"
import { StaticImage } from "gatsby-plugin-image"

const PageNotFound = () => {
  const { language } = useContext(I18nextContext)
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo lang={language} title={t("PAGE NOT FOUND")} />
      <div className="grid grid-cols-6">
        <div className="col-span-6 bg-white font-raleway">
          <HeaderName headerName=" " />
          <div className="flex items-center justify-center">
            <div className="py-10">
              <StaticImage src="../images/404.jpg" alt={t("PAGE NOT FOUND")} />
            </div>
          </div>
          <div className="py-10 w-full text-center text-3xl font-bold">
            {t("PAGE NOT FOUND")}
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
  }
`

export default PageNotFound
