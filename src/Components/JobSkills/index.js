import './index.css'

const JobSkills = props => {
  const {skill} = props
  const {name, imageUrl} = skill

  return (
    <li className="skill-image-container">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-paragraph">{name}</p>
    </li>
  )
}

export default JobSkills
