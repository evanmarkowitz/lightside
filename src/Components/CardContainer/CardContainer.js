import React from 'react'
import Card from '../Card/Card.js'
import './CardContainer.css'

const CardContainer = ({data, attributes}) => {

  const allData = data.reduce((acc, person ) => {
    let personObj = {}
    attributes.forEach(item => {
      personObj[item] = person[item]
    })
    acc.push(personObj)
    return acc
  },[])

  const cardArray = allData.map(obj =>
    <Card data={obj} key={obj.name}/>
  )

  return(
    <section className="card-section">
      {cardArray}
    </section>
  )
}

export default CardContainer