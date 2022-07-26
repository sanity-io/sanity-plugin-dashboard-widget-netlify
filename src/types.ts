export interface SiteWidgetOption {
  apiId: string
  name?: string
  title: string
  buildHookId: string
  url?: string
  branch?: string
}
export interface WidgetOptions {
  title?: string
  description?: string
  sites: SiteWidgetOption[]
}

export interface Site {
  title: string
  name?: string
  id: string
  url?: string
  adminUrl?: string
  buildHookId: string
  branch?: string
}

export interface Props {
  title?: string
  description?: string
  sites?: Site[]
  isLoading: boolean
  onDeploy: DeployAction
}

export type DeployAction = (site: Site) => void
