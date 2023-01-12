import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Salary from '../Salary'
import Employee from '../Employee'
import Job from '../Job'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileList: {},
    profileStatus: apiStatus.initial,
    jobsStatus: apiStatus.initial,
    employmentType: [],

    minimumPackage: '',
    search: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: apiStatus.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const newData = data.profile_details
      const fetchedData = {
        name: newData.name,
        profileImageUrl: newData.profile_image_url,
        shortBio: newData.short_bio,
      }
      this.setState({
        profileList: fetchedData,
        profileStatus: apiStatus.success,
      })
    } else {
      this.setState({profileStatus: apiStatus.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList

    return (
      <div className="Profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="person-name">{name}</h1>
        <p className="person-bio">{shortBio}</p>
      </div>
    )
  }

  againGetProfile = () => {
    this.getProfileDetails()
  }

  renderProfileFailure = () => (
    <div className="profile-failure-view">
      <button
        onClick={this.againGetProfile}
        type="button"
        className="profile-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiStatus.success:
        return this.renderProfileSuccess()

      case apiStatus.inProgress:
        return this.renderProfileLoading()
      case apiStatus.failure:
        return this.renderProfileFailure()

      default:
        return null
    }
  }

  changeEmployment = employmentTypeId => {
    const {employmentType} = this.state

    const newList = [...employmentType, employmentTypeId]
    this.setState({employmentType: newList}, this.getJobDetails)
  }

  getJobDetails = async () => {
    this.setState({jobsStatus: apiStatus.inProgress})
    const {employmentType, minimumPackage, search} = this.state
    const req = employmentType.join()

    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${req}&minimum_package=${minimumPackage}&search=${search}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const Data = await response.json()
      const fetchedData = Data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        id: eachJob.id,
      }))
      this.setState({jobsList: fetchedData, jobsStatus: apiStatus.success})
    } else {
      this.setState({jobsStatus: apiStatus.failure})
    }
  }

  renderJobDetailsSuccess = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-para">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }

    return (
      <ul>
        {jobsList.map(each => (
          <Job Details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  againRenderJobs = () => {
    this.setState(
      {
        employmentType: [],
        minimumPackage: '',
        search: '',
      },
      this.getJobDetails,
    )
  }

  renderJobDetailsFailure = () => (
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
        onClick={this.againRenderJobs}
      >
        Retry
      </button>
    </div>
  )

  renderProfileLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {jobsStatus} = this.state

    switch (jobsStatus) {
      case apiStatus.success:
        return this.renderJobDetailsSuccess()

      case apiStatus.inProgress:
        return this.renderProfileLoading()
      case apiStatus.failure:
        return this.renderJobDetailsFailure()

      default:
        return null
    }
  }

  changeInputValue = event => {
    this.setState({search: event.target.value})
  }

  changeInputContainValue = () => {
    this.getJobDetails()
  }

  renderInput = () => (
    <>
      <input
        type="search"
        placeholder="search"
        className="searchElement"
        onChange={this.changeInputValue}
      />
      <div className="searchIcon">
        <button
          data-testid="searchButton"
          onClick={this.changeInputContainValue}
          type="button"
          className="special-button-element"
        >
          <BsSearch size="20" color="#ffffff" />
        </button>
      </div>
    </>
  )

  renderEmploymentList = () => (
    <ul>
      {employmentTypesList.map(each => (
        <Employee
          Details={each}
          key={each.employmentTypeId}
          changeEmployment={this.changeEmployment}
        />
      ))}
    </ul>
  )

  changeSalary = salaryRangeId => {
    this.setState({minimumPackage: salaryRangeId}, this.getJobDetails)
  }

  renderSalaryList = () => (
    <ul>
      {salaryRangesList.map(each => (
        <Salary
          Details={each}
          key={each.salaryRangeId}
          changeSalary={this.changeSalary}
        />
      ))}
    </ul>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="small">
            <div className="search-container">{this.renderInput()}</div>

            <div className="profile-container-small-device">
              {this.renderProfile()}
            </div>

            <hr className="line" />

            <div className="list-container-small-devices">
              <h1 className="list-items-heading">Type of Employment</h1>
              {this.renderEmploymentList()}
            </div>
            <hr className="line" />

            <div className="list-container-small-devices">
              <h1 className="list-items-heading">Salary Range</h1>
              {this.renderSalaryList()}
            </div>
            <div className="jobs-details-container">{this.renderJobs()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
