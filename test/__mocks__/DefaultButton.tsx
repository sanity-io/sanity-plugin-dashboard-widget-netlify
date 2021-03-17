import React from 'react'

export default function DefaultButton(props: any) {
  return (
    <button type="button" onClick={props.onClick}>
      {props.children}
    </button>
  )
}
