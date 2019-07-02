import React from 'react'
import Card from '../Card/Card.js'
import './CardContainer.css'

const CardContainer = ({data, toggleFavorite}) => {

  // const allData = data.reduce((acc, person ) => {
  //   let personObj = {}
  //   attributes.forEach(item => {
  //     personObj[item] = person[item]
  //   })
  //   acc.push(personObj)
  //   return acc
  // },[])

  const cardArray = data.map((obj, i) =>
    <Card 
      data={obj.attributes} 
      key={obj.attributes.name} 
      id={'card' + i} 
      category={data[0].category}
      isFavorited={data[i].favorited}
      toggleFavorite={toggleFavorite}/>
  )

  return(
    <section className='card--container'>
      {cardArray}
    </section>
  )
}

export default CardContainer