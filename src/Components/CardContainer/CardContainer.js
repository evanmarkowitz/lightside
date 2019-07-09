import React from 'react'
import Card from '../Card/Card.js'
import './CardContainer.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CardContainer = ({data, toggleFavorite}) => {

  const cardArray = data.map((obj, i) => {
    const linkAddress = `/${obj.category}/:${obj.attributes.name}`;
    return <Link to={linkAddress} key={obj.attributes.id}>
    <Card 
      data={obj.attributes} 
      key={obj.attributes.name}  
      category={data[0].category}
      isFavorited={data[i].favorited}
      toggleFavorite={toggleFavorite}
    />
    </Link>
  })

  return(
    <section className='card--container'>
      {cardArray}
    </section>
  )
}

CardContainer.propTypes = {
  data: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired
}

export default CardContainer