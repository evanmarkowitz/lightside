import React from 'react';
import { shallow } from 'enzyme'
import CardContainer from './CardContainer'
import peopleData from '../../Data/PeopleTestData'

describe('CardContainer', () => {
  let wrapper, attributes;
  beforeEach(() => {
    attributes = ['name', 'birth_year', 'gender', 'height', 'eye_color']
    wrapper = shallow(<CardContainer data={peopleData.results} attributes={attributes}/>)
  })
  it('should exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})

