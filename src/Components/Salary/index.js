import './index.css'

const Salary = props => {
  const {Details, changeSalary} = props
  const {label, salaryRangeId} = Details

  const changeMoney = event => {
    changeSalary(event.target.value)
  }

  return (
    <li className="list-item-with-square">
      <input
        type="radio"
        id={salaryRangeId}
        onChange={changeMoney}
        value={salaryRangeId}
        className="checkbox-element"
      />
      <label className="list-para" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default Salary
