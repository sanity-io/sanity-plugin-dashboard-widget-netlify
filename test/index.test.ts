import {netlifyWidget} from '../src'
const instance = netlifyWidget({
  sites: [],
})

describe('index', () => {
  it('has a name', () => {
    expect(instance.name).toBe('netlify-widget')
  })
  it('has a component', () => {
    expect(instance.component).toBeTruthy()
  })
  it('has a layout', () => {
    expect(instance.layout).toEqual({width: 'medium'})
  })
})
