import React from 'react'
import DefaultButton from 'part:@sanity/components/buttons/default'
import styles from './SiteItem.css'
import { DeployAction, Site } from '../types'

interface Props {
  site: Site
  onDeploy: DeployAction
}

export default class SiteItem extends React.Component<Props> {
  private badge = React.createRef<HTMLImageElement>()
  private imgInterval?: any

  componentDidMount() {
    this.imgInterval = window.setInterval(() => {
      this.updateImage()
    }, 10000)
  }

  componentWillUnmount() {
    window.clearInterval(this.imgInterval)
  }

  handleDeployButtonClicked = (_: MouseEvent) => {
    this.props.onDeploy(this.props.site)
    setTimeout(() => {
      this.updateImage()
    }, 1000)
  }

  private getImageUrl() {
    const { site } = this.props
    return `https://api.netlify.com/api/v1/badges/${site.id}/deploy-status`
  }

  private updateImage() {
    const image = this.badge && this.badge.current
    if (image) {
      image.src = `${this.getImageUrl()}?${new Date().getTime()}`
    }
  }

  private renderLinks() {
    const { site } = this.props
    if (!(site.url || site.adminUrl)) {
      return null
    }
    return (
      <>
        {' ('}
        {site.url && (
          <span>
            <a href={site.url}>view</a>
          </span>
        )}
        {site.adminUrl && (
          <span>
            , <a href={site.adminUrl}>admin</a>
          </span>
        )}
        {')'}
      </>
    )
  }

  render() {
    const { site } = this.props
    return (
      <li className={styles.root}>
        <div className={styles.status}>
          <h4 className={styles.title}>
            {site.title}
            {this.renderLinks()}
          </h4>
          <div>
            <img src={this.getImageUrl()} ref={this.badge} />
          </div>
        </div>
        {site.buildHookId && (
          <div className={styles.actions}>
            <DefaultButton inverted onClick={this.handleDeployButtonClicked}>
              Deploy
            </DefaultButton>
          </div>
        )}
      </li>
    )
  }
}
