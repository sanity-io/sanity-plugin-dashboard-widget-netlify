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

  render() {
    const { site } = this.props
    if (site.error) {
      return (
        <li className={styles.root}>
          <div className={styles.status}>
            <h4 className={styles.title}>{site.name}</h4>
            <p>{site.error.message}</p>
            <p>
              Please check your widget options, invalid <code>siteId</code>?
            </p>
          </div>
        </li>
      )
    }
    return (
      <li className={styles.root}>
        {!site.data && <div>Loading...</div>}
        {site.data && (
          <>
            <div className={styles.screenshot}>
              {/* Gives broken png! */}
              {site.data.screenshot_url && (
                <img src={site.data.screenshot_url} />
              )}
            </div>
            <div className={styles.status}>
              <h4 className={styles.title}>
                {site.name} (<a href={site.data.url}>view</a>,{' '}
                <a href={site.data.admin_url}>admin</a>)
              </h4>
              <div>
                <img src={this.getImageUrl()} ref={this.badge} />
              </div>
            </div>

            {site.deployHookId && (
              <div className={styles.actions}>
                <DefaultButton onClick={this.handleDeployButtonClicked}>
                  Deploy
                </DefaultButton>
              </div>
            )}
          </>
        )}
      </li>
    )
  }
}
