const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/post-template.js`)
  const catalogueTemplate = path.resolve(`src/templates/catalogue-template.js`)

  const result = await graphql(`
    {
      allSanityPost {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
      allSanityCataloguePages {
        edges {
          node {
            id
            catalogueCategorySlug {
              current
            }
          }
        }
      }
    }
  `)
  result.data.allSanityPost.edges.forEach(edge => {
    createPage({
      path: `/posts/${edge.node.slug.current}`,
      component: blogPostTemplate,
      context: {
        pathSlug: edge.node.slug.current,
      },
    })
  })
  result.data.allSanityCataloguePages.edges.forEach(edge => {
    createPage({
      path: `/gallery/${edge.node.catalogueCategorySlug.current}`,
      component: catalogueTemplate,
      context: {
        pathSlug: edge.node.catalogueCategorySlug.current,
      },
    })
  })
}
