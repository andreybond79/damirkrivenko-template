import React from "react"
import { Link } from "gatsby"

const SeeMoreButton = ({ url, buttonText }) => {
  return (
    <div className="col-span-1 m-5">
      <Link to={`/gallery/${url}`}>
        <button className="bg-green-800 hover:bg-green-900 p-3 w-full rounded text-white">
          {buttonText}
        </button>
      </Link>
    </div>
  )
}

export default SeeMoreButton
