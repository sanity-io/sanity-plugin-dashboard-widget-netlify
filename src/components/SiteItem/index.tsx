import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react'

import DefaultButton from 'part:@sanity/components/buttons/default'

import styles from './SiteItem.css'
import {DeployAction, Site} from '../../types'
import Links from './Links'

interface Props {
  site: Site
  onDeploy: DeployAction
}

export const IMAGE_PULL_INTERVAL = 10000

const getImageUrl = (siteId: string) => {
  const baseUrl = `https://api.netlify.com/api/v1/badges/${siteId}/deploy-status`
  const time = new Date().getTime()

  return `${baseUrl}?${time}`
}

const useBadgeImage = (siteId: string) => {
  const [src, setSrc] = useState(() => getImageUrl(siteId))
  const update = useCallback(() => setSrc(getImageUrl(siteId)), [siteId])

  useEffect(() => {
    const interval = window.setInterval(update, IMAGE_PULL_INTERVAL)
    return () => window.clearInterval(interval)
  }, [update])

  return [src, update] as const
}

const useDeploy = (site: Site, onDeploy: DeployAction, updateBadge: () => void) => {
  const timeoutRef = useRef(-1)
  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return useCallback(() => {
    onDeploy(site)
    timeoutRef.current = window.setTimeout(updateBadge, 1000)
  }, [site, onDeploy, updateBadge])
}

const SiteItem: FunctionComponent<Props> = (props) => {
  const {site, onDeploy} = props
  const {id, title, url, adminUrl, buildHookId} = site

  const [badge, updateBadge] = useBadgeImage(id)
  const handleDeploy = useDeploy(site, onDeploy, updateBadge)

  return (
    <li className={styles.root}>
      <div className={styles.status}>
        <h4 className={styles.title}>
          {title}
          <Links url={url} adminUrl={adminUrl} />
        </h4>

        <div>
          <img src={badge} alt="Badge" />
        </div>
      </div>

      {buildHookId ? (
        <div className={styles.actions}>
          <DefaultButton inverted onClick={handleDeploy}>
            Deploy
          </DefaultButton>
        </div>
      ) : null}
    </li>
  )
}

export default SiteItem
