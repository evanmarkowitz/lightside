import React, { Component } from 'react';
import './App.css';
import CardContainer from '../CardContainer/CardContainer.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      people: [],
      planets: [],
      vehicles: []
    }
  }

  componentDidMount() {
    fetch('https://swapi.co/api/people/')
    .then(response => response.json())
    .then(people => this.setState({people: people.results}))
    fetch('https://swapi.co/api/planets/')
    .then(response => response.json())
    .then(planets => this.setState({planets: planets.results}))
    fetch('https://swapi.co/api/vehicles/')
    .then(response => response.json())
    .then(vehicles => this.setState({vehicles: vehicles.results}))
  }  

  render() {
    const peopleAttributes = ['name', 'birth_year', 'gender', 'height', 'eye_color']
    return(
      <main>
        <header>
          <button>People</button>
          <button>Planet</button>
          <button>Vehicles</button>
          <button>Favorites</button>
        </header>
        <section className='card--container'>
          <CardContainer data={this.state.people} attributes={peopleAttributes}/>
        </section>
      </main>
    )
  }
}

export default App;
