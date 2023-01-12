import './index.css'

const NotFound = () => (
  <div className="failure-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFound-failure-image"
    />
    <h1 className="notFound-failure-heading">Page Not Found</h1>
    <p className="notFound-failure-paragraph">
      we are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
