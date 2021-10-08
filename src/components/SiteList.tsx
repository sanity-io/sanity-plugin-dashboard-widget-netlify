import React from 'react'
import {DeployAction, Site} from '../types'
import SiteItem from './SiteItem'
import {Flex, Box, Card, Text, Spinner, Stack} from '@sanity/ui'

interface Props {
  isLoading: boolean
  sites?: Site[]
  onDeploy: DeployAction
}

export default function SiteList(props: Props) {
  const {isLoading, onDeploy, sites} = props
  if (isLoading) {
    return (
      <Card padding={4}>
        <Flex direction="column" justify="center" align="center">
          <Spinner muted />
          <Box marginTop={3}>
            <Text muted>Loading sites…</Text>
          </Box>
        </Flex>
      </Card>
    )
  }
  if (!sites || (sites && sites.length === 0)) {
    return (
      <Card tone="critical" padding={3}>
        <Text>No sites are defined in the widget options. Please check your config.</Text>
      </Card>
    )
  }
  return (
    <Box paddingY={2}>
      <Stack as="ul" space={2}>
        {sites.map((site, index) => {
          return <SiteItem onDeploy={onDeploy} site={site} key={`site-${index}`} />
        })}
      </Stack>
    </Box>
  )
}
