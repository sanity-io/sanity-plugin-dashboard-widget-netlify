import React, {FunctionComponent, PropsWithChildren} from 'react'

const Link = (props: PropsWithChildren<{url: string}>) => {
  const {url, children} = props

  return (
    <span>
      <a href={url} target="_blank" rel="noreferrer">
        {children}
      </a>
    </span>
  )
}

type Props = {
  url?: string
  adminUrl?: string
}

const Links: FunctionComponent<Props> = (props) => {
  const {url, adminUrl} = props

  if (url && adminUrl) {
    return (
      <span>
        (<Link url={url}>view</Link>, <Link url={adminUrl}>admin</Link>)
      </span>
    )
  }

  if (url) {
    return <Link url={url}>(view)</Link>
  }
  if (adminUrl) {
    return <Link url={adminUrl}>(admin)</Link>
  }
  return null
}

export default Links
