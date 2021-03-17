import React from 'react'
import Widget from '../src/widget'

describe('Widget', () => {
  it('works', () => {
    const options = {sites: [], title: 'foo'}
    const widget = <Widget {...options} />
    expect(widget.props).toEqual(options)
  })
})
