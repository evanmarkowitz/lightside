import ReactDOM from 'react-dom'
import './index'
jest.mock('react-dom')


describe('Index', () => {
  
  it('Renders the application', () => {
    expect(ReactDOM.render).toBeCalled()
  })
})