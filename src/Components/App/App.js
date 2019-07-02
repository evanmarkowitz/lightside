import React, { Component } from 'react';
import './App.css';
import CardContainer from '../CardContainer/CardContainer.js'
import Home from '../Home/Home.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
 } from 'react-router-dom'
 import logo from  '../Images/starwarslogo.png'

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
    const planetAttributes = ['name', 'terrain', 'diameter', 'population']
    const vehicleAttributes = ['name', 'model', 'class', 'passengers']
    return(
      <Router>
      <main>
        <header>
          <Link to ='/'><img src={logo} alt='star wars logo' className='logo'/></Link>
          <nav>
            <button><Link to='/people' className='router__link'>People</Link></button>
            <button><Link to='/planets' className='router__link'>Planet</Link></button>
            <button><Link to='/vehicles' className='router__link'>Vehicles</Link></button>
            <button><Link to='/favorites' className='router__link'>Favorites</Link></button>
          </nav>
        </header>
        <section className='card--section'>
          <Switch>
            <Route exact path='/' Component={Home}/>
            <Route path="/people" render={() => <CardContainer data={this.state.people} attributes={peopleAttributes}/>} />
            <Route path="/planets" render={() => <CardContainer data={this.state.planets} attributes={planetAttributes}/>} />
            <Route path="/vehicles" render={() => <CardContainer data={this.state.vehicles} attributes={vehicleAttributes}/>} />
          </Switch>
        </section>
      </main>
      </Router>
    )
  }
}

export default App;
