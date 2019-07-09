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
 import {organizeData, setRandomFilm } from './App.helper'
 import Card from '../Card/Card'

class App extends Component {
  constructor() {
    super()
    this.state = {
      people: [],
      planets: [],
      vehicles: [],
      film: [],
      favorites: [],
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
            <Route exact path="/people" render={() => <CardContainer 
            data={this.state.people} 
            toggleFavorite={this.toggleFavorite}
            />}/>
            <Route exact path="/planets" render={() => <CardContainer 
            data={this.state.planets}
            toggleFavorite={this.toggleFavorite} 
            />} />
            <Route exact path="/vehicles" render={() => <CardContainer 
            data={this.state.vehicles} 
            toggleFavorite={this.toggleFavorite}/>} />
            <Route exact path="/favorites" render={() => <CardContainer 
            data={this.state.favorites} 
            toggleFavorite={this.toggleFavorite}/>} />
            <Route path="/people/:name" render={({match}) => {
              const { name } = match.params
              const data = this.state.people.find(person => `:${person.attributes.name}` === name)
              return <Card 
              data={data.attributes}
              key={data.attributes.name}  
              category={data.category}
              isFavorited={data.favorited}
              toggleFavorite={this.toggleFavorite}
              />
            }}/>
            <Route path="/planets/:name" render={({match}) => {
              const { name } = match.params
              const data = this.state.planets.find(planet => `:${planet.attributes.name}` === name)
              return <Card 
              data={data.attributes}
              key={data.attributes.name}  
              category={data.category}
              isFavorited={data.favorited}
              toggleFavorite={this.toggleFavorite}
            />
            }}/>
            <Route path="/vehicles/:name" render={({match}) => {
              const { name } = match.params
              const data = this.state.vehicles.find(vehicle => `:${vehicle.attributes.name}` === name)
              return <Card 
              data={data.attributes}
              key={data.attributes.name}  
              category={data.category}
              isFavorited={data.favorited}
              toggleFavorite={this.toggleFavorite}
            />
            }}/>
          </Switch>
        </section>
      </main>
      </Router>
    )
  }
}

export default App;
