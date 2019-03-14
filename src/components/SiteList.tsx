import React from 'react'
import styles from './NetlifyWidget.css'
import { DeployAction, Site } from '../types'
import SiteItem from './SiteItem'

interface Props {
  sites?: Site[]
  onDeploy: DeployAction
}

export default class SiteList extends React.Component<Props> {
  render() {
    const { onDeploy, sites } = this.props
    if (!sites || (sites && sites.length === 0)) {
      return (
        <div className={styles.containerWithPadding}>
          No sites are defined in widget options. Please check your config.
        </div>
      )
    }
    return (
      <ul className={styles.sites}>
        {sites.map((site, index) => {
          return <SiteItem onDeploy={onDeploy} site={site} key={`site-${index}`} />
        })}
      </ul>
    )
  }
}
