import React from 'react';
import { shallow } from 'enzyme'
import CardContainer from './CardContainer'
import peopleData from '../../Data/PeopleTestData'
import { newObjs } from '../App/App.helper'
import App from '../App/App'

describe('CardContainer', () => {
  let wrapper, attributes, appWrapper;
  beforeEach(() => {
    attributes = ['name', 'birth_year', 'gender', 'height', 'eye_color']
    appWrapper = shallow(<App />)
    newObjs(peopleData.results, attributes, 'people', appWrapper)
    wrapper = shallow(<CardContainer 
      data={appWrapper.state().people} 
      attributes={attributes}
      toggleFavorite={jest.fn()}/>)
  })
  it('should exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})

