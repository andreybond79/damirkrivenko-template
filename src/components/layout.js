import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Damir Krivenko`} />
      <div className="max-w-none xl:max-w-screen-2xl mx-auto">
        <main>{children}</main>
        <footer className="bg-gray-900 text-white font-raleway text-sm p-10">
          <div className="flex justify-between">
            <div>
              © {new Date().getFullYear()}, {data.site.siteMetadata.title} -{" "}
              {data.site.siteMetadata.description}
            </div>
            <div>
              Сайт разработан
              {` `}
              <a href="https://staminaweb.ru/" className="font-bold">
                StaminaWeb
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
