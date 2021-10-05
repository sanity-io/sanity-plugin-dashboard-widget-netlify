import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react'
import {Button, Flex, Box, Card, Text, Stack, Label} from '@sanity/ui'
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
  const [hasBadgeError, setHasBadgeError] = useState(false)
  const {site, onDeploy} = props
  const {id, title, url, adminUrl, buildHookId} = site

  const [badge, updateBadge] = useBadgeImage(id)
  const handleDeploy = useDeploy(site, onDeploy, updateBadge)
  const handleBadgeError = () => {
    setHasBadgeError(true)
  }

  return (
    <Flex as="li">
      <Box flex={1} paddingY={2} paddingX={3}>
        <Stack space={2}>
          <Text as="h4">
            {title}
            <Links url={url} adminUrl={adminUrl} />
          </Text>

          <Flex justify="flex-start">
            {!hasBadgeError && <img src={badge} onError={handleBadgeError} alt="Badge" />}
            {hasBadgeError && <Card tone="critical" radius={2} padding={2}><Label size={0} muted>Failed to load badge</Label></Card>}
          </Flex>
        </Stack>
      </Box>

      {buildHookId ? (
        <Box paddingY={2} paddingX={3}>
          <Button mode="ghost" onClick={handleDeploy} text="Deploy" />
        </Box>
      ) : null}
    </Flex>
  )
}

export default SiteItem
