import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import App from './App';
import newObjs from './App.helper'
import peopleData from '../../Data/PeopleTestData'

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
})

describe('App Helper', () => {
  let newObjsFunc, attributes, wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />)
    attributes = ['name', 'birth_year', 'gender', 'height', 'eye_color'];
    newObjsFunc = newObjs(peopleData, attributes, 'people', wrapper)
  })
})
  