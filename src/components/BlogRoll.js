import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const postStyle = {
      width: 320,
      height: 180,
      margin: "auto",
      lineHeight: 100,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    };

    return (
      <div
        className="feed"
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {posts &&
          posts.map(({ node: post }) => (
            <div className="post" key={post.id} style={postStyle}>
              <article
                className={`blog-list-item ${
                  post.frontmatter.featuredpost ? "is-featured" : ""
                  }`}
                style={{
                  width: "100%"
                }}
              >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      <div className="featured-thumbnail">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: post.frontmatter.title
                          }}
                        />
                      </div>
                    </Link>
                  ) : null}
                </header>
              </article>
            </div>
          ))}
        <Link className="btn" style={postStyle} to="/blog">
          Read more
        </Link>
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
