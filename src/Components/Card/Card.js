import React from 'react'

const Card = ({data}) => {

  const showCards = Object.entries(data).map(entry => {
    return <li>{entry[0]}: {entry[1]}</li>
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