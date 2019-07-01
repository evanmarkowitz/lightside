import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return(
      <main>
        <header>
          <button>People</button>
          <button>Planet</button>
          <button>Vehicles</button>
          <button>Favorites</button>
        </header>
        <section className='card--container'>

        </section>
      </main>
    )
  }
}

export default App;
