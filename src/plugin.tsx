import React from 'react'
import Widget from './widget'
import {WidgetOptions} from './types'
import {DashboardWidget, LayoutConfig} from '@sanity/dashboard'

export type NetlifyWidgetConfig = WidgetOptions & {layout?: LayoutConfig}

export function netlifyWidget(config: NetlifyWidgetConfig): DashboardWidget {
  return {
    name: 'netlify-widget',
    component: () => {
      return <Widget {...config} />
    },
    layout: config.layout ?? {width: 'medium'},
  }
}
