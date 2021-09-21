import React from "react"
import drippingPaint from "../images/dripping-paint.png"

const HeaderName = ({ headerName }) => {
  return (
    <div>
      <div className="h-16 pt-8 w-full bg-gray-800 bg-opacity-100 font-raleway text-xl font-semibold lg:text-3xl pl-5 lg:pl-10 text-white">
        {headerName}
      </div>
      <div className="h-3 w-full bg-gray-700 relative">
        <img
          src={drippingPaint}
          alt="dripping paint"
          className="absolute w-28"
        />
      </div>
      <div className="h-2 w-full bg-gray-500" />
    </div>
  )
}

export default HeaderName
