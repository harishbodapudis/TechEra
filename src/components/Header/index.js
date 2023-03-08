import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
      <nav className="nav-bar">
        <Link to="/" className="img-box">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
            className="web-logo"
          />
        </Link>
      </nav>
    )
  }
}

export default Header
