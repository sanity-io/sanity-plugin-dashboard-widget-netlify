import index from '../src/index'
import Widget from '../src/Widget'

describe('index', () => {
  it('has a name', () => {
    expect(index.name).toBe('netlify')
  })
  it('has a component', () => {
    expect(index.component).toBe(Widget)
  })
  it('has a layout', () => {
    expect(index.layout).toEqual({ width: 'medium' })
  })
})
