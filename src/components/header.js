import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import logo from "../images/damir_InkSVG.svg"

import {
  Link,
  useI18next,
  useTranslation,
  I18nextContext,
} from "gatsby-plugin-react-i18next"
const Header = ({ siteTitle }) => {
  const { t } = useTranslation()
  const [isExpanded, toggleExpansion] = useState(false)
  const { originalPath } = useI18next()
  const { language } = useContext(I18nextContext)
  return (
    <header className="sticky top-0 z-20 h-16 bg-white max-w-none xl:max-w-screen-2xl mx-auto">
      <div className="flex-none bg-gray-900 hidden xl:flex justify-between items-center border-b-4 border-gray-600">
        <span className="pl-28">
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <img
              src={logo}
              alt="Damir Krivenko"
              className="absolute top-4 left-5"
              style={{ width: "270px", height: "40px" }}
            />
          </Link>
        </span>
        <div className="flex-grow text-right">
          <Link
            to="/"
            className="hover:bg-blue-400 rounded hover:bg-opacity-10 bg-opacity-5 p-2 mr-2 hover:text-gray-300"
            activeClassName="bg-blue-100 rounded activeLink"
          >
            <span className="menuItems">{t("MAIN")}</span>
          </Link>
          <Link
            to="/gallery"
            className="hover:bg-blue-400 hover:bg-opacity-10 bg-opacity-5 rounded p-2 mr-2 hover:text-gray-300"
            activeClassName="bg-blue-100 rounded activeLink"
          >
            <span className="menuItems">{t("GALLERY")}</span>
          </Link>
          <Link
            to="/about"
            className="hover:bg-blue-400 hover:bg-opacity-10 bg-opacity-5 rounded p-2 mr-2 hover:text-gray-300"
            activeClassName="bg-blue-100 rounded activeLink"
          >
            <span className="menuItems">{t("ABOUT ME")}</span>
          </Link>
          <Link
            to="/concept"
            className="hover:bg-blue-400 hover:bg-opacity-10 bg-opacity-5 rounded p-2 mr-2 hover:text-gray-300"
            activeClassName="bg-blue-100 rounded activeLink"
          >
            <span className="menuItems">{t("CONCEPT")}</span>
          </Link>
          <Link
            to="/publications"
            className="hover:bg-blue-400 hover:bg-opacity-10 bg-opacity-5 rounded p-2 mr-2 hover:text-gray-300"
            activeClassName="bg-blue-100 rounded activeLink"
          >
            <span className="menuItems">{t("PUBLICATIONS")}</span>
          </Link>
          <Link
            to="/events"
            className="hover:bg-blue-400 hover:bg-opacity-10 bg-opacity-5 rounded p-2 mr-2 hover:text-gray-300"
            activeClassName="bg-blue-100 rounded activeLink"
          >
            <span className="menuItems">{t("EVENTS")}</span>
          </Link>
          <Link
            to="/contacts"
            className="hover:bg-blue-400 hover:bg-opacity-10 bg-opacity-5 rounded p-2 mr-2 hover:text-gray-300"
            activeClassName="bg-blue-100 rounded activeLink"
          >
            <span className="menuItems">{t("CONTACTS")}</span>
          </Link>
        </div>
        <div className="flex-none flex items-center w-14 h-16 bg-gray-800">
          <div className="w-full text-center font-raleway font-bold text-white">
            <Link
              to={originalPath}
              language={language === "ru" ? "en" : "ru"}
              className="focus:outline-none focus:ring rounded-full"
            >
              {language === "ru" ? "ENG" : "RUS"}
            </Link>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className="flex-none bg-gray-900 max-w-screen-xl mx-auto flex xl:hidden justify-between items-center border-b-4 border-gray-600">
        <div className="w-full flex items-center justify-center">
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <img
              src={logo}
              alt="Damir Krivenko"
              className="absolute top-5 left-0"
              style={{ width: "270px", height: "40px" }}
            />
          </Link>
        </div>

        <div className="flex items-center w-16 h-16 bg-gray-800">
          <div className="w-full text-center font-raleway font-bold text-white">
            <button
              type="button"
              aria-label="mobile-menu"
              onClick={() => toggleExpansion(!isExpanded)}
              className={`${
                isExpanded ? `is-active` : `none`
              } hamburger hamburger--squeeze outline-none`}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="bg-gray-800 grid grid-cols-2">
          <div className="col-span-1">
            <Link to="/" activeClassName="activeLink">
              <div className="menuItemsMobile">{t("MAIN")}</div>
            </Link>
            <Link to="/gallery">
              <div className="menuItemsMobile">{t("GALLERY")}</div>
            </Link>
            <Link to="/about">
              <div className="menuItemsMobile">{t("ABOUT ME")}</div>
            </Link>
            <Link to="/concept">
              <div className="menuItemsMobile">{t("CONCEPT")}</div>
            </Link>
          </div>
          <div className="col-span-1">
            <Link to="/publications">
              <div className="menuItemsMobile">{t("PUBLICATIONS")}</div>
            </Link>
            <Link to="/events">
              <div className="menuItemsMobile">{t("EVENTS")}</div>
            </Link>
            <Link to="/contacts">
              <div className="menuItemsMobile">{t("CONTACTS")}</div>
            </Link>
          </div>
          <div className="col-span-2">
            <Link
              to={originalPath}
              language={language === "ru" ? "en" : "ru"}
              className="focus:outline-none focus:ring rounded-full"
            >
              <div className="right-0 flex-none flex items-center h-16 bg-blue-800 w-full">
                <div className="w-full text-center font-raleway font-bold text-white">
                  {language === "ru" ? "ENG" : "RUS"}
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
