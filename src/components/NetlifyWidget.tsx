import React from 'react'
import AnchorButton from 'part:@sanity/components/buttons/anchor'
import Spinner from 'part:@sanity/components/loading/spinner'
import styles from './NetlifyWidget.css'
import { Props } from '../types'
import SiteList from './SiteList'

export default class NetlifyWidget extends React.Component<Props> {
  render() {
    const netlifySitesUrl = 'https://app.netlify.com/account/sites'
    const { title, isLoading, sites, onDeploy } = this.props
    if (isLoading) {
      return <Spinner center message="Loading sites…" />
    }
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
        <SiteList onDeploy={onDeploy} sites={sites} />

        <div className={styles.buttonContainer}>
          <AnchorButton
            disabled={isLoading}
            href={isLoading ? undefined : netlifySitesUrl}
            bleed
            color="primary"
            kind="simple"
          >
            Manage sites at Netlify
          </AnchorButton>
        </div>
      </div>
    )
  }
}
