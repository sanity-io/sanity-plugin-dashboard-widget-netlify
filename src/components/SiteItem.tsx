import React from 'react'
import DefaultButton from 'part:@sanity/components/buttons/default'
import styles from './NetlifyWidget.css'
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

  render() {
    const { site } = this.props
    if (site.error) {
      return (
        <li className={styles.site}>
          <h4>{site.name}</h4>
          <p>{site.error.message}</p>
          <p>
            Please check your widget options, invalid <code>siteId</code>?
          </p>
        </li>
      )
    }
    return (
      <li className={styles.site}>
        <h4>{site.name}</h4>
        { /* Gives broken png! */}
        {/* site.data && site.data.screenshot_url && <img src={site.data.screenshot_url} /> */}
        <div>
          <img src={this.getImageUrl()} ref={this.badge} />
        </div>

        {site.deployHookId && (
          <div>
            <DefaultButton onClick={this.handleDeployButtonClicked}>Deploy</DefaultButton>
          </div>
        )}
      </li>
    )
  }
}
