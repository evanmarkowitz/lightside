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
 import {organizeData, setRandomFilm, fetchData} from './App.helper'

class App extends Component {
  constructor() {
    super()
    this.state = {
      people: [],
      planets: [],
      vehicles: [],
      film: [],
      favorites: [],
      nextPeople: "https://swapi.co/api/people/?page=2",
      nextPlanets: "https://swapi.co/api/planets/?page=2",
      nextVehicles: "https://swapi.co/api/vehicles/?page=2",
      prevPeople: null,
      prevPlanets: null,
      prevVehicles: null,
      error: ''
    }
  }

  componentDidMount() {
    organizeData('https://swapi.co/api/people/', ['name', 'birth_year', 'gender', 'height', 'eye_color'], 'people', this)
    organizeData('https://swapi.co/api/planets/', ['name', 'terrain', 'diameter', 'population'], 'planets', this)
    organizeData('https://swapi.co/api/vehicles/', ['name', 'model', 'vehicle_class', 'passengers'], 'vehicles', this)
    setRandomFilm(`https://swapi.co/api/films/${this.pickRandomFilm()}/`, this)
  }

  pickRandomFilm = () => {
    return (Math.floor(Math.random() * 7))
  }

  changePage = (url,attributes, category, stateNext, statePrev) => {
    if (url !== null) {
      organizeData(url, attributes, category, this)
      fetchData(url)
      .then(response => this.setState({[stateNext]: response.next, [statePrev]: response.previous}))
    }
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
            <button><NavLink to='/favorites' activeClassName="selected" className='router__link'>Favorites  {this.state.favorites.length}
            </NavLink></button>
          </nav>
        </header>
        <section className='card--section'>
          <Switch>
            <Route exact path='/' render={()=> <Home text={this.state.film.opening_crawl}/>}/>
            <Route path="/people" render={() => <CardContainer 
            data={this.state.people} 
            toggleFavorite={this.toggleFavorite}
            showNextPage={() => this.changePage(this.state.nextPeople, ['name', 'birth_year', 'gender', 'height', 'eye_color'],
              'people', 'nextPeople', 'prevPeople')}
            showPrevPage={() => this.changePage(this.state.prevPeople, ['name', 'birth_year', 'gender', 'height', 'eye_color'],
            'people', 'nextPeople', 'prevPeople')}
            />}/>
            <Route path="/planets" render={() => <CardContainer 
            data={this.state.planets}
            toggleFavorite={this.toggleFavorite} 
            showNextPage={() => this.changePage(this.state.nextPlanets, ['name', 'terrain', 'diameter', 'population'] ,
              'planets', 'nextPlanets', 'prevPlanets')}
            showPrevPage={() => this.changePage(this.state.prevPlanets, ['name', 'terrain', 'diameter', 'population'] ,
            'planets', 'nextPlanets', 'prevPlanets')}
            />} />
            <Route path="/vehicles" render={() => <CardContainer 
            data={this.state.vehicles} 
            toggleFavorite={this.toggleFavorite}
            showNextPage={() => this.changePage(this.state.nextVehicles, ['name', 'model', 'vehicle_class', 'passengers'],
              'vehicles', 'nextVehicles', 'prevVehicles')}
            showPrevPage={() => this.changePage(this.state.prevVehicles, ['name', 'model', 'vehicle_class', 'passengers'],
            'vehicles', 'nextVehicles', 'prevVehicles')}
            />} />
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
