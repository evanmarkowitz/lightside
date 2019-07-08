import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from './Card.js';

describe('Card', () => {
  let fakeData;
  let toggleFavorite;
  beforeEach(() => {
      fakeData = {
      diameter: "10200",
      name: "Yavin IV",
      population: "1000", 
      terrain: "jungle, rainforests"
    }
    toggleFavorite= jest.fn()
  });
  it('should match the snapshot with all data passed in correctly', () => {
    const wrapper = shallow( <Card
      data = {fakeData}
      id= "card1"
      isFavorited = {false}
      toggleFavorite={jest.fn()}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should match the snapshot with isFavorited true passed in correctly', () => {
    const wrapper = shallow( <Card
      data = {fakeData}
      id= "card1"
      isFavorited = {true}
      toggleFavorite={jest.fn()}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should call the toggleFavorite function when the card-image is clicked', () => {
    const wrapper = shallow( <Card
      data = {fakeData}
      id= "card1"
      isFavorited = {true}
      toggleFavorite={toggleFavorite}
      category = 'vehicle'
    />);
    wrapper.find('.card-image').simulate('click');
    expect(toggleFavorite).toBeCalledWith("Yavin IV", 'vehicle');
  });

  
});