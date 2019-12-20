import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import styled from "styled-components"
import Typed from "typed.js";
import * as Vibrant from "node-vibrant";

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

import Svg from "../img/Arrow-down.svg";

var col1 = "#ffffff"
class Hero extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      palette: null
    }
    
  }
  componentDidMount() {
        var { image, title, subheading } = this.props;

       Vibrant.from("./" + image.publicURL).getPalette((err, palette) =>
         this.setState({ palette })
       );
  }
  render() { 
    var { image, title, subheading } = this.props;

    return (
      <div>
        <section
          className="hero"
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
            backgroundPosition: `top left`,
            backgroundAttachment: `fixed`,
            height: "100vh",
            minHeight: "300px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div className="title">
            <h1
              className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
              style={{
                boxShadow:
                  "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                backgroundColor: "rgb(255, 68, 0)",
                color:
                  this.state.palette != null
                    ? this.state.palette.Vibrant.bodyTextColor
                    : "white",
                lineHeight: "1",
                padding: "0.25em"
              }}
            >
              <TypedReact strings={[subheading, title]} />
            </h1>
          </div>
          <a onClick={() => console.log(col1) }>
            <img
              src={Svg}
              alt="Down"
              style={{
                width: 34,
                fill: col1
              }}
            />
          </a>
        </section>
      </div>
    );
  }
}

class TypedReact extends React.Component {
  componentDidMount() {

    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 100,
      loop: true
    };
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
          <span
            style={{ whiteSpace: "pre" }}
            ref={el => {
              this.el = el;
            }}
          />
    );
  }
}

export const IndexPageTemplate = ({
         image,
         title,
         heading,
         subheading,
         description,
         intro
       }) => (
         <div>
           <Hero image={image} title={title} subheading={subheading}></Hero>
           <BlogRoll />
           {/* <div className="column is-12">
             <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
             <p>{description}</p>
           </div>
           <Features gridItems={intro.blurbs} /> */}
         </div>
       );

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
