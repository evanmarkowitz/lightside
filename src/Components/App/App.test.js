import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import App from './App';
import peopleData from '../../Data/PeopleTestData'
import { newObjs } from './App.helper'

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have be able to store people data in state', () => {
    expect(wrapper.state().people).toEqual([])
  })

  it('should be able to store planet data', () => {
    expect(wrapper.state().planets).toEqual([])
  })

  it('should be able to store vehicle data', () => {
    expect(wrapper.state().planets).toEqual([])
  })

  it('should match the screenshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should return a random number between 0 and 7', () => {
    expect(wrapper.instance().pickRandomFilm()).toBeGreaterThan(-1)
    expect(wrapper.instance().pickRandomFilm()).toBeLessThan(7)
  })

  it('should toggle favorite of an item', () => {
    newObjs(peopleData.results, ['name', 'birth_year', 'gender', 'height', 'eye_color'], 'people', wrapper)
    expect(wrapper.state().people[0].favorited).toEqual(false)
    wrapper.instance().toggleFavorite('Luke Skywalker', 'people')
    expect(wrapper.state().people[0].favorited).toEqual(true)
    wrapper.instance().toggleFavorite('Luke Skywalker', 'people')
    expect(wrapper.state().people[0].favorited).toEqual(false)
  })

  it('should add a favorited card to the favorites object in state', () => {
    newObjs(peopleData.results, ['name', 'birth_year', 'gender', 'height', 'eye_color'], 'people', wrapper)
    expect(wrapper.state().favorites.length).toEqual(0)
    wrapper.instance().toggleFavorite('Luke Skywalker', 'people')
    expect(wrapper.state().favorites.length).toEqual(1)
    wrapper.instance().toggleFavorite('Luke Skywalker', 'people')
    expect(wrapper.state().favorites.length).toEqual(0)
  })
})
