import React from 'react'
import { Link } from 'gatsby'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">

                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                   
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
                      </a>
        
      </footer>
    )
  }
}

export default Footer
