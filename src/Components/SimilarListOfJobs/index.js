import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarListOfJobs = props => {
  const {Details} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = Details

  return (
    <li className="each-job-container ">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          className="logo"
          alt="similar job company logo"
        />
        <div className="title-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar size="17" color="#fbbf24" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="DescriptionHeading">Description</h1>

      <p className="paragraph-des">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarListOfJobs
