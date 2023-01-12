import {Component} from 'react'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {GoLinkExternal} from 'react-icons/go'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarListOfJobs from '../SimilarListOfJobs'
import JobSkills from '../JobSkills'

import './index.css'

const apiStatus = {
  initial: 'Initial',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    statusIcon: apiStatus.initial,
    currJobList: {},
    CurrentSkills: [],
    LifeInCompany: {},

    SimilarJobs: [],
  }

  componentDidMount() {
    this.JobDetails()
  }

  JobDetails = async () => {
    this.setState({
      statusIcon: apiStatus.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const currJob = data.job_details

      const currJobDetails = {
        companyLogoUrl: currJob.company_logo_url,
        companyWebsiteUrl: currJob.company_website_url,
        employmentType: currJob.employment_type,
        jobDescription: currJob.job_description,
        location: currJob.location,
        packagePerAnnum: currJob.package_per_annum,
        rating: currJob.rating,
        title: currJob.title,
      }

      const SkillList = currJob.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const LifeList = currJob.life_at_company
      const Life = {
        description: LifeList.description,
        imageUrl: LifeList.image_url,
      }

      const SimilarJobsList = data.similar_jobs
      const reqFetchList = SimilarJobsList.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))

      this.setState({
        currJobList: currJobDetails,
        statusIcon: apiStatus.success,
        CurrentSkills: SkillList,
        LifeInCompany: Life,
        SimilarJobs: reqFetchList,
      })
    } else {
      this.setState({statusIcon: apiStatus.failure})
    }
  }

  againRenderDetails = () => {
    this.JobDetails()
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="job-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We cannot seem to find the page you are looking for.
        </p>

        <button
          type="button"
          className="jobs-retry-button"
          onClick={this.againRenderDetails}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {currJobList, CurrentSkills, LifeInCompany, SimilarJobs} = this.state
    const {description, imageUrl} = LifeInCompany
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = currJobList

    return (
      <>
        <div className="separate-main-container">
          <Header />

          <div className="each-job-container ">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                className="logo"
                alt="job details company logo"
              />
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
            <div className="description-container">
              <h1 className="DescriptionHeading">Description</h1>
              <a href={companyWebsiteUrl} className="VisitLink">
                <p className="visit-para">
                  <p className="about-link">Visit</p>
                  <GoLinkExternal size="15" />
                </p>
              </a>
            </div>

            <p className="paragraph-des">{jobDescription}</p>
          </div>
          <h1 className="skills-heading">Skills</h1>
          <ul className="Skill-container">
            {CurrentSkills.map(each => (
              <JobSkills skill={each} key={each.name} />
            ))}
          </ul>
          <div className="life-style-container">
            <div className="life-style-heading-container">
              <h1 className="life-style-heading">Life at Company</h1>
              <p className="life-style-paragraph">{description}</p>
            </div>
            <div>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-style-image"
              />
            </div>
          </div>
          <h1>Similar Jobs</h1>
          <ul>
            {SimilarJobs.map(each => (
              <SimilarListOfJobs Details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {statusIcon} = this.state

    switch (statusIcon) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }
}

export default JobItemDetails
