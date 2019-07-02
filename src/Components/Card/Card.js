import React from 'react'
import './Card.css'

const Card = ({data}) => {

  const showCards = Object.entries(data).map(entry => {
    let key = entry[0].replace('_', ' ').split('')
    return <li>{key}: {entry[1]}</li>
  })
  
  return(
    <article className="card">
      <ul>
      {showCards}
      </ul>
    </article>
  )

}

export default Card