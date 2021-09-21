import React from "react"
import PortableText from "react-portable-text"
import Image from "gatsby-plugin-sanity-image"

const PortableTextComp = ({ textData }) => {
  const serializer = {
    marks: {
      strong: props => <strong className="text-red-900" {...props} />,
    },
    link: props => {
      const { href, children } = props
      return (
        <>
          <a
            href={href}
            className="text-red-900 font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        </>
      )
    },
    image: props => {
      return (
        <Image
          // pass asset, hotspot, and crop fields
          {...props}
          // tell Sanity how large to make the image (does not set any CSS)
          width={300}
          height={200}
          alt="Mina Voin"
          className="rounded"
          // style it how you want it
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )
    },
  }
  return <PortableText content={textData} serializers={serializer} />
}

export default PortableTextComp
