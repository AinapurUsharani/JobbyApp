import {Link, withRouter} from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const moveToLogin = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="nav-container">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image-logo"
          />
        </li>
      </Link>

      <ul className="navigation-container-small-devices">
        <Link to="/">
          <li className="small-device-link-items">
            <AiOutlineHome size="32" color="#ffffff" />
          </li>
        </Link>
        <Link to="/jobs">
          <li className="small-device-link-items">
            <BsBriefcase size="32" color="#ffffff" />
          </li>
        </Link>
        <li className="logOut-icon-button">
          <button
            type="button"
            onClick={moveToLogin}
            className="logout-icon-button"
          >
            <FiLogOut size="32" color="#ffffff" />
          </button>
        </li>
      </ul>
      <ul className="navigation-container-large-devices">
        <Link to="/" className="onClick-link">
          <li className="home-link">Home</li>
        </Link>
        <Link to="/jobs" className="onClick-link">
          <li className="home-link">Jobs</li>
        </Link>
      </ul>
      <li className="logOut-button-list-item">
        <button type="button" onClick={moveToLogin} className="logout-button">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
