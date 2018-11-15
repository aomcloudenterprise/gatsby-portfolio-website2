const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsBlog {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsBlog.edges.map(({ node: blog }) => {
        createPage({
          path: `blogs/${blog.slug}`,
          component: path.resolve(`./src/templates/blog.js`),
          context: {
            slug: blog.slug,
          },
        })
      })
      resolve()
    })
  })
}
