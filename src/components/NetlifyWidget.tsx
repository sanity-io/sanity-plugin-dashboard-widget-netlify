import React from 'react'
import {NetlifyWidgetProps} from '../types'
import SiteList from './SiteList'
import {DashboardWidgetContainer} from '@sanity/dashboard'
import {styled} from 'styled-components'
import {Button, Flex, Card, Text, Box} from '@sanity/ui'

const ContentCard = styled(Card)`
  min-height: 66px;
`

export default function NetlifyWidget(props: NetlifyWidgetProps) {
  const netlifySitesUrl = 'https://app.netlify.com/account/sites'
  const {title, description, isLoading, sites, onDeploy} = props

  const footer = (
    <Flex direction="column" align="stretch">
      <Button
        as="a"
        href={isLoading ? undefined : netlifySitesUrl}
        disabled={isLoading}
        paddingX={2}
        paddingY={4}
        mode="bleed"
        tone="primary"
        text="Manage sites at Netlify"
        loading={isLoading}
        target="_blank"
      />
    </Flex>
  )

  return (
    <DashboardWidgetContainer header={title} footer={footer}>
      <ContentCard paddingY={1}>
        {description && (
          <Box paddingY={3} paddingX={3}>
            <Text as="p" size={1} muted>
              <span dangerouslySetInnerHTML={{__html: description}} />
            </Text>
          </Box>
        )}
        <SiteList isLoading={isLoading} onDeploy={onDeploy} sites={sites} />
      </ContentCard>
    </DashboardWidgetContainer>
  )
}
