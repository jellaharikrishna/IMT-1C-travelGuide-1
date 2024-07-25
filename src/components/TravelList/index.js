import './index.css'

const TravelList = props => {
  const {listDetails} = props
  const {name, description, imageUrl} = listDetails

  return (
    <li className="list-card">
      <img className="image" src={imageUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default TravelList
