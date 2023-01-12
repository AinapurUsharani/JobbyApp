import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMessage: false, Message: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = Error => {
    this.setState({
      showErrorMessage: true,
      Message: Error,
      username: '',
      password: '',
    })
  }

  checkCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  changeName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderInputPassword = () => {
    const {password} = this.state

    return (
      <div className="input-field-container">
        <label htmlFor="Password" className="labelElement">
          PASSWORD
        </label>
        <input
          type="password"
          id="Password"
          value={password}
          placeholder="Password"
          onChange={this.changePassword}
          className="input-element"
        />
      </div>
    )
  }

  renderInputName = () => {
    const {username} = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="Username" className="labelElement">
          USERNAME
        </label>
        <input
          type="text"
          id="Username"
          value={username}
          placeholder="Username"
          onChange={this.changeName}
          className="input-element"
        />
      </div>
    )
  }

  render() {
    const {showErrorMessage, Message} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.checkCredentials}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          {this.renderInputName()}
          {this.renderInputPassword()}
          <button type="submit" className="submit-button">
            Login
          </button>
          {showErrorMessage && <p className="error-paragraph">{Message}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
