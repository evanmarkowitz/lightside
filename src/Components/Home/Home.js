import React from 'react'
import Crawl from 'react-star-wars-crawl'
import 'react-star-wars-crawl/lib/index.css'
import './Home.css'

const Home = () => {

  return (
    <article className='body'>
      <div class="fade"></div>
      <section class="star-wars">
        <div class="crawl">
          <div class="title">
            {/* <p>Episode IV</p> */}
            <h1>Welcome</h1>
          </div>
          <h2>to the Light Side.</h2>
          <p>Press a button to find out more.</p>
          {/* <p>Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, 
            custodian of the stolen plans that can save her people and restore freedom to the galaxy….</p> */}
        </div>
      </section>
    </article>
  )
}

export default Home
