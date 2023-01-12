import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Job = props => {
  const {Details} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = Details

  return (
    <Link to={`/jobs/${id}`} className="link-item-decoration">
      <li className="each-job-container">
        <div className="logo-title-container">
          <img src={companyLogoUrl} alt="company logo" className="logo" />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar size="17" color="#fbbf24" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-type-container">
            <div className="location-container">
              <IoLocationSharp size="20" color="#ffffff" />
              <p className="location">{location}</p>
            </div>
            <div className="employmentType-type-container">
              <BsBriefcaseFill size="20" color="#ffffff" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="location1">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />

        <h1 className="DescriptionHeading">Description</h1>
        <p className="paragraph-des">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default Job
