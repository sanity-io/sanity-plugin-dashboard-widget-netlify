import React from 'react'

import {act, fireEvent, render} from '@testing-library/react'
import {advanceBy, advanceTo, clear} from 'jest-date-mock'

import SiteItem, {IMAGE_PULL_INTERVAL} from '../src/components/SiteItem'
import {Site} from '../src/types'

import '@testing-library/jest-dom'
import {studioTheme, ThemeProvider} from '@sanity/ui'

describe('SiteItem', () => {
  beforeEach(() => {
    advanceTo('2020-01-01T00:00:00.000Z')
  })

  afterEach(() => {
    clear()
    jest.useRealTimers()
  })

  const defaultSite: Site = {id: 'Id', title: 'Title', name: 'Name', buildHookId: 'BuildHookId'}

  it('displays site title', () => {
    const {getByText} = render(<ThemeProvider scheme="light" theme={studioTheme}><SiteItem site={defaultSite} onDeploy={() => undefined} /></ThemeProvider>)

    expect(getByText('Title')).toBeVisible()
  })

  it(`refreshes badge image every ${IMAGE_PULL_INTERVAL}ms`, () => {
    jest.useFakeTimers()

    const {getByAltText} = render(<ThemeProvider scheme="light" theme={studioTheme}><SiteItem site={defaultSite} onDeploy={() => undefined} /></ThemeProvider>)

    const expectedSrc = `https://api.netlify.com/api/v1/badges/Id/deploy-status?${new Date().getTime()}`
    expect(getByAltText('Badge')).toHaveAttribute('src', expectedSrc)

    act(() => {
      advanceBy(IMAGE_PULL_INTERVAL - 1)
      jest.advanceTimersByTime(IMAGE_PULL_INTERVAL - 1)
    })

    expect(getByAltText('Badge')).toHaveAttribute('src', expectedSrc)

    act(() => {
      advanceBy(1)
      jest.advanceTimersByTime(1)
    })

    expect(getByAltText('Badge')).toHaveAttribute(
      'src',
      `https://api.netlify.com/api/v1/badges/Id/deploy-status?${new Date().getTime()}`
    )
  })

  it('displays links to preview and site admin', () => {
    const {queryByText, getByText, rerender} = render(<ThemeProvider scheme="light" theme={studioTheme}>
      <SiteItem site={defaultSite} onDeploy={() => undefined} /></ThemeProvider>
    )

    expect(queryByText('view')).not.toBeInTheDocument()
    expect(queryByText('admin')).not.toBeInTheDocument()

    rerender(<ThemeProvider scheme="light" theme={studioTheme}><SiteItem site={{...defaultSite, url: 'Url'}} onDeploy={() => undefined} /></ThemeProvider>)

    expect(getByText('(view)')).toBeVisible()
    expect(getByText('(view)')).toHaveAttribute('href', 'Url')

    rerender(<ThemeProvider scheme="light" theme={studioTheme}><SiteItem site={{...defaultSite, adminUrl: 'Url'}} onDeploy={() => undefined} /></ThemeProvider>)

    expect(getByText('(admin)')).toBeVisible()
    expect(getByText('(admin)')).toHaveAttribute('href', 'Url')

    rerender(<ThemeProvider scheme="light" theme={studioTheme}>
      <SiteItem
        site={{...defaultSite, adminUrl: 'AdminUrl', url: 'Url'}}
        onDeploy={() => undefined}
      /></ThemeProvider>
    )

    expect(getByText((_, node) => node?.textContent === '(view, admin)')).toBeVisible()

    expect(getByText('view')).toHaveAttribute('href', 'Url')
    expect(getByText('admin')).toHaveAttribute('href', 'AdminUrl')
  })

  it('triggers onDeploy and refreshes the badge image', () => {
    jest.useFakeTimers()
    const onDeploy = jest.fn()

    const {getByText, getByAltText} = render(<ThemeProvider scheme="light" theme={studioTheme}><SiteItem site={defaultSite} onDeploy={onDeploy} /></ThemeProvider>)

    expect(onDeploy).toHaveBeenCalledTimes(0)

    act(() => {
      fireEvent.click(getByText('Deploy'))
    })

    expect(onDeploy).toHaveBeenCalledWith(defaultSite)

    const expectedSrc = `https://api.netlify.com/api/v1/badges/Id/deploy-status?${new Date().getTime()}`
    expect(getByAltText('Badge')).toHaveAttribute('src', expectedSrc)

    act(() => {
      advanceBy(999)
      jest.advanceTimersByTime(999)
    })

    expect(getByAltText('Badge')).toHaveAttribute('src', expectedSrc)

    act(() => {
      advanceBy(1)
      jest.advanceTimersByTime(1)
    })

    expect(getByAltText('Badge')).toHaveAttribute(
      'src',
      `https://api.netlify.com/api/v1/badges/Id/deploy-status?${new Date().getTime()}`
    )
  })
})
