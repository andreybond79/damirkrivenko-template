import React, { useContext } from "react"
import { graphql } from "gatsby"
import PortableText from "../components/PortableText"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { I18nextContext, useTranslation } from "gatsby-plugin-react-i18next"
import HeaderName from "../components/HeaderName"

const Privacy = ({ data }) => {
  const { language } = useContext(I18nextContext)
  const { t } = useTranslation()
  const { title, _rawBody, _updatedAt } = data.sanityPolicyPage
  return (
    <Layout>
      <Seo lang={language} title={title[language]} />
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-6 bg-gray-100 font-raleway">
          <HeaderName headerName={title[language]} />
          <div className="p-5 lg:p-10">
            <PortableText textData={_rawBody[language]} />
            <p className="text-right font-bold">
              {t("DATE OF PUBLICATION")}: {_updatedAt}
            </p>
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
    sanityPolicyPage {
      _rawBody(resolveReferences: { maxDepth: 10 })
      title {
        en
        ru
      }
      _updatedAt(formatString: "DD-MM-YYYY")
    }
  }
`

export default Privacy
