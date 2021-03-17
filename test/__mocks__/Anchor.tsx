import React from 'react'

export default function AnchorButton(props: any) {
  return <a href={props.href}>{props.children}</a>
}
