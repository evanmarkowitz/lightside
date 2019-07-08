import React from 'react'
import './Home.css'
import PropTypes from 'prop-types'


const Home = ({text}) => {

  return (
    <article className='body'>
      <div className="fade"></div>
      <section className="star-wars">
        <div className="crawl">
          <div className="title">
            <h1>Welcome</h1>
          </div>
          <h2>to the Light Side.</h2>
          <p>Press a button to find out more.</p>
          <p>{text}</p>
        </div>
      </section>
    </article>
  )
}

export default Home

Home.propTypes = {
  text: PropTypes.string
}