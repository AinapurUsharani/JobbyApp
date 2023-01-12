import './index.css'

const Employee = props => {
  const {Details, changeEmployment} = props
  const {label, employmentTypeId} = Details

  const changePerson = event => {
    changeEmployment(event.target.value)
  }

  return (
    <li className="list-item-with-square" key={employmentTypeId}>
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={changePerson}
        value={employmentTypeId}
      />
      <label className="list-para" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default Employee
