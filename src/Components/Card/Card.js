import React from 'react'
import './Card.css'
import rebel from '../../images/rebel-2.png'
import empire from '../../images/Alliance_of_free_planets.png'
import PropTypes from 'prop-types'

const Card = ({data, id, toggleFavorite, category, isFavorited}) => {
  const showCards = Object.entries(data).map(entry => {
    let key = entry[0].replace('_', ' ')
    return <li 
      className='card-list-item' 
      key={entry[0]}>
      <span className="card-key">{key}:</span> <span className="card-entry">{entry[1]}</span>
      </li>
  })
  
  return(
    <article className="card" id={id}>
      <div className="card-header">
      <h2 className="card-title">{data.name}</h2>
      <img 
        src={isFavorited ? rebel : empire} 
        className='card-image' 
        onClick={() => toggleFavorite(data.name, category)}
        alt="dumb dumb"/>
      </div>
      <ul className="card-list">
      {showCards}
      </ul>
    </article>
  )

}

Card.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  toggleFavorite: PropTypes.func,
  category: PropTypes.string,
  isFavorited: PropTypes.bool
}

export default Card