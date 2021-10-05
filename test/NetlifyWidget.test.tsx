import React from 'react'
import NetlifyWidget from '../src/components/NetlifyWidget'
import {render} from '@testing-library/react'
import {studioTheme, ThemeProvider} from '@sanity/ui'
import '@testing-library/jest-dom'

const props = {
  title: 'Deployz',
  sites: [
    {
      id: '123',
      name: 'Foobar',
      buildHookId: 'abcd',
      title: 'Title',
    },
  ],
  isLoading: false,
  onDeploy: () => undefined,
}

describe('NetlifyWidget', () => {
  it('NetlifyWidget can be mounted', () => {
    const {getByText} = render(<ThemeProvider scheme="light" theme={studioTheme}><NetlifyWidget title={props.title} sites={props.sites} isLoading={props.isLoading} onDeploy={props.onDeploy} /></ThemeProvider>)

    expect(getByText('Deployz')).toBeVisible()
  })
})
