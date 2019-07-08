import { organizeData, setRandomFilm, newObjs, setFavorite, fetchData } from './App.helper'
import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import peopleData from '../../Data/PeopleData'

describe('App Helper', () => {
  let wrapper, mockResponse;
  beforeEach(() => {
    wrapper = shallow(<App />)
    mockResponse = {results: peopleData}
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    });
  });

  it('should have a function that fetches data and returns a promise', async () => {
    const url = 'https://swapi.co/api/people/';
    const result = await fetchData(url)
    expect(result).toEqual(mockResponse)
  })

  it('should return an error if the promise fails to resolve', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    const url = 'https://swapi.co/api/people/';
    await expect(fetchData(url)).rejects.toEqual(Error('Error Fetching Data'))
  })

  it('should be able to filter through a dataset based on an array of attributes', () => {
    const attributes = ['name', 'birth_year', 'gender', 'height', 'eye_color']
    expect(newObjs(mockResponse.results, attributes, 'people', wrapper)[0].attributes).toEqual(
      {"birth_year": "19BBY", "eye_color": "blue", "gender": "male", "height": "172", "name": "Luke Skywalker"}
    )
  })

  it('should take a data object and add favorited and category keys', () => {
    setFavorite(mockResponse.results, 'people', wrapper)
    expect(wrapper.state().people[0].favorited).toEqual(false)
    expect(wrapper.state().people[0].category).toEqual('people')
    
  })

  it('should set the state with desired attributes', async () => {
    const url = 'https://swapi.co/api/people/';
    const attributes = ['name', 'birth_year', 'gender', 'height', 'eye_color']
    const result = await organizeData(url, attributes, 'people', wrapper)
    expect(wrapper.state().people[0]).toEqual(
      {"attributes": {"birth_year": "19BBY", "eye_color": "blue", "gender": "male", "height": "172", "name": "Luke Skywalker"}, "category": "people", "favorited": false}
    )
  })
})