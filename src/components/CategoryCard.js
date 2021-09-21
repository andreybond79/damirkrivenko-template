import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

export const CategoryCard = ({ categoryName, categoryImage, categoryAlt }) => {
  return (
    <>
      <div className="grid grid-cols-6 mb-5 group">
        <div className="col-span-1 rounded-l">
          <GatsbyImage
            image={categoryImage}
            className="rounded-l h-16"
            alt={categoryAlt || "Damir Krivenko"}
          />
        </div>
        <div className="col-span-5 bg-white bg-opacity-60 group-hover:bg-opacity-100 rounded-r">
          <div className="flex rounded-r items-center justify-center font-raleway text-xs uppercase h-full text-black text-center w-full">
            {categoryName}
          </div>
        </div>
      </div>
    </>
  )
}
