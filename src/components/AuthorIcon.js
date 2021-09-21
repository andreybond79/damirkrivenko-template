import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const AuthorIcon = ({ imageData, imageAlt }) => {
  return (
    <figure>
      <div>
        <div className="w-full">
          <GatsbyImage
            image={imageData}
            className="rounded-full"
            alt={imageAlt || "Damir Krivenko"}
            width={300}
            quality={50}
          />
        </div>
      </div>
    </figure>
  )
}

export default AuthorIcon
