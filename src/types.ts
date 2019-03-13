export interface SiteWidgetOption {
  siteId: string
  name?: string
  deployHookId?: string
}
export interface WidgetOptions {
  title?: string
  sites: SiteWidgetOption[]
}

export interface SiteAPIData {
  id: string
  name: string
  url: string
  admin_url: string
  deploy_id: string
  published_deploy: {
    id: string
    build_id: string
    published_at: string
    context: string
    public: boolean
    deploy_time: number
    summary: {
      status: string
    }
  }
  screenshot_url: string
  public: boolean
}

export interface Site {
  id: string
  name: string
  deployHookId?: string
  data?: SiteAPIData
  error?: Error
  isDeploying?: boolean
}

export interface Props {
  title?: string
  sites?: Site[]
  isLoading: boolean
  onDeploy: DeployAction
}

export type DeployAction = (site: Site) => void
