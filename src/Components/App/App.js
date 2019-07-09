import React, { Component } from 'react';
import './App.css';
import CardContainer from '../CardContainer/CardContainer.js'
import Home from '../Home/Home.js'
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink
 } from 'react-router-dom'
 import logo from  '../Images/starwarslogo.png'
 import newObjs from './App.helper'

class App extends Component {
  constructor() {
    super()
    this.state = {
      people: [],
      planets: [],
      vehicles: [],
      film: [],
      favorites: []
    }
  }

  componentDidMount() {
    fetch('https://swapi.co/api/people/')
      .then(response => response.json())
      .then(people => newObjs(people.results, ['name', 'birth_year', 'gender', 'height', 'eye_color'], 'people', this))
    fetch('https://swapi.co/api/planets/')
      .then(response => response.json())
      .then(planets => newObjs(planets.results, ['name', 'terrain', 'diameter', 'population'], 'planets', this))
    fetch('https://swapi.co/api/vehicles/')
      .then(response => response.json())
      .then(vehicles => newObjs(vehicles.results, ['name', 'model', 'vehicle_class', 'passengers'], 'vehicles', this))
    fetch(`https://swapi.co/api/films/${this.pickRandomFilm()}/`)
      .then(response => response.json())
      .then(film => this.setState({ film }))  
  }

  pickRandomFilm = () => {
    return (Math.floor(Math.random() * 7))
  }

  toggleFavorite = (name, category) => {
    const updatedData = this.state[category].map(item => {
      if (item.attributes.name === name  && !item.favorited) {
       item.favorited = !item.favorited
       this.setState({favorites: [...this.state.favorites, item]})
     } else if(item.attributes.name === name) {
        item.favorited = !item.favorited
        let favorites = this.state.favorites.filter(obj => obj.attributes.name !== item.attributes.name)
        this.setState({ favorites })
     }
     return item
    })
    this.setState({ [category]: updatedData })
  }

  render() {

    return(
      <Router>
      <main>
        <header>
          {/* <Link to ='/'><img src={logo} alt='star wars logo' className='logo'/></Link> */}
          <nav>
            <button><NavLink to='/people' activeClassName="selected" className='router__link'>People</NavLink></button>
            <button><NavLink to='/planets' activeClassName="selected" className='router__link'>Planet</NavLink></button>
            <Link to ='/'><img src={logo} alt='star wars logo' className='logo'/></Link>
            <button><NavLink to='/vehicles' activeClassName="selected" className='router__link'>Vehicles</NavLink></button>
            <button><NavLink to='/favorites' activeClassName="selected" className='router__link'>Favorites</NavLink></button>
          </nav>
        </header>
        <section className='card--section'>
          <Switch>
            <Route exact path='/' render={()=> <Home text={this.state.film.opening_crawl}/>}/>
            <Route path="/people" render={() => <CardContainer 
            data={this.state.people} 
            toggleFavorite={this.toggleFavorite}
            />}/>
            <Route path="/planets" render={() => <CardContainer 
            data={this.state.planets}
            toggleFavorite={this.toggleFavorite} 
            />} />
            <Route path="/vehicles" render={() => <CardContainer 
            data={this.state.vehicles} 
            toggleFavorite={this.toggleFavorite}/>} />
            <Route path="/favorites" render={() => <CardContainer 
            data={this.state.favorites} 
            toggleFavorite={this.toggleFavorite}/>} />
          </Switch>
        </section>
      </main>
      </Router>
    )
  }
}

export default App;
