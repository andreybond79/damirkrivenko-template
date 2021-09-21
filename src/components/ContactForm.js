import React from "react"
import { navigate } from "gatsby"
import * as Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import { BiNotification } from "react-icons/bi"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

const ContactForm = () => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      terms: "",
      honeypot: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .strict(true)
        // .trim("Не включайте начальные и конечные пробелы")
        .matches(/^[a-zA-Za-яА-Я, ]+$/, t("Special characters filter"))
        .min(4, t("Name too short"))
        .max(12, t("Name too long"))
        .required(t("Required field")),
      email: Yup.string()
        .email(t("Incorrect email"))
        .required(t("Required field")),
      message: Yup.string()
        .strict(true)
        // .trim("Не пишите пробелы в начале и в конце")
        .min(10, t("Min text"))
        .max(300, t("Max text"))
        .required(t("Required field")),
      terms: Yup.bool()
        .oneOf([true], t("DPP must be accepted"))
        .required(t("Required field")),
      honeypot: Yup.bool().oneOf([false], "You shall not pass, bot!"),
    }),
    onSubmit: values => {
      axios({
        method: "post",
        url: "https://LINK TO ANY FORM BACKEND. SET YOUR OWN HERE",
        data: {
          name: values.name.trim(),
          email: values.email,
          message: values.message.trim(),
          terms: values.terms,
        },
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      navigate("/success/")
      formik.resetForm()
    },
  })

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit} className="p-5 lg:p-10">
        <div>
          <label className="font-body uppercase text-gray-700 mb-3">
            {t("Name")}
            {formik.touched.name && formik.errors.name ? (
              <small className="text-red-800 normal-case text-xs italic pl-3">
                {formik.errors.name}
              </small>
            ) : null}
            <input
              className="appearance-none w-full transition-all duration-150 bg-white shadow text-gray-700 border-b-2 border-gray-600  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder={t("Name placeholder")}
              {...formik.getFieldProps("name")}
            />
          </label>
        </div>

        <div>
          <label className="font-body uppercase text-gray-700 mb-3">
            {t("Email address")}
            {formik.touched.email && formik.errors.email ? (
              <small className="text-red-800 normal-case text-xs italic pl-3">
                {formik.errors.email}
              </small>
            ) : null}
            <input
              id="personEmail"
              className="appearance-none w-full transition-all duration-150 bg-white shadow  text-gray-700 border-b-2 border-gray-600  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="email"
              placeholder={t("Email address")}
              {...formik.getFieldProps("email")}
            />
          </label>
        </div>

        <div>
          <label className="font-body uppercase text-gray-700 mb-3">
            {t("Message")}
            {formik.touched.message && formik.errors.message ? (
              <small className="text-red-800 normal-case text-xs italic pl-3">
                {formik.errors.message}
              </small>
            ) : null}
            <textarea
              id="personMessage"
              className="appearance-none w-full transition-all duration-150 bg-white shadow  text-gray-700 border-b-2 border-gray-600  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              rows="5"
              {...formik.getFieldProps("message")}
            />
          </label>
        </div>
        <div className="mb-3">
          <div>
            {/* <input type="checkbox" {...formik.getFieldProps("terms")} /> */}
            <label className="font-body text-sm">
              <input
                type="checkbox"
                id="checkbox-large-example"
                className="h-4 w-4 text-gray-700 border-b-2 mr-2"
                {...formik.getFieldProps("terms")}
              />
              {t("Consent message")}
            </label>
            {formik.touched.terms && formik.errors.terms ? (
              <small className="text-red-800 normal-case text-xs italic pl-3">
                {formik.errors.terms}
              </small>
            ) : null}
          </div>
          <div className="opacity-0 absolute top-0 left-0 h-0 w-0 z-0">
            <input
              tabIndex="-10"
              label="Сладкий мед для ботов"
              type="checkbox"
              {...formik.getFieldProps("honeypot")}
            />
            {formik.touched.honeypot && formik.errors.honeypot ? (
              <small className="text-danger pl-2">
                {formik.errors.honeypot}
              </small>
            ) : null}
          </div>

          <button
            aria-label="submit-button"
            className="bg-red-800 hover:bg-red-900 p-3 mt-5 w-full rounded text-white"
            type="submit"
          >
            {t("Send")}
          </button>
        </div>
        <Link to="/privacy" className="font-body flex">
          <BiNotification className="text-2xl" />
          <span className="pl-1">{t("DPP")}</span>
        </Link>
      </form>
    </>
  )
}
export default ContactForm
