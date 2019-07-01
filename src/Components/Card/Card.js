import React from 'react'

const Card = ({data}) => {

  const showCards = Object.entries(data).map(entry => {
    let key = entry[0].replace('_', ' ').split('')
    return <li>{key}: {entry[1]}</li>
  })
  
  return(
    <article>
      <ul>
      {showCards}
      </ul>
    </article>
  )

}

export default Card