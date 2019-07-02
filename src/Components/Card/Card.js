import React from 'react'
import './Card.css'
import rebel from '../../images/rebel-2.png'

const Card = ({data, id, toggleFavorite, category}) => {
  const showCards = Object.entries(data).map(entry => {
    let key = entry[0].replace('_', ' ')
    return <li className={entry[0]} key={entry[0]}>{key}: {entry[1]}</li>
  })
  
  return(
    <article className="card" id={id}>
      <div className="card-header">
      <h2>{data.name}</h2>
      <img 
        src={rebel} 
        className='card-image' 
        onClick={() => toggleFavorite(data.name, category)}
        alt="dumb dumb"/>
      </div>
      <ul>
      {showCards}
      </ul>
    </article>
  )

}

export default Card