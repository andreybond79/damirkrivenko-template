import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import PortableText from "../components/PortableText"

const ImageComponent = ({
  imageData,
  imageAlt,
  richTextImageCapture,
  imageParameters,
  imageName,
}) => {
  return (
    <figure className="m-5 lg:m-10">
      <div className="w-full bg-white bg-opacity-80 rounded-t">
        <GatsbyImage
          image={imageData}
          className="categories-pics"
          alt={imageAlt || "Damir Krivenko"}
          width={400}
        />
      </div>
      {typeof richTextImageCapture != "undefined" && (
        <figcaption className="text-black font-raleway text-sm bottom-0 my-auto p-5 w-full bg-white bg-opacity-80 rounded-b flex items-center justify-center">
          <PortableText textData={richTextImageCapture} />
        </figcaption>
      )}
      {typeof imageName != "undefined" && (
        <figcaption className="my-auto p-5 w-full bg-white bg-opacity-80 rounded-b">
          <div className="text-black font-raleway text-sm font-bold">
            {imageName}
          </div>
          <div className="text-black font-raleway text-sm">
            {imageParameters}
          </div>
        </figcaption>
      )}
    </figure>
  )
}

export default ImageComponent
