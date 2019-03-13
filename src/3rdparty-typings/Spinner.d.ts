declare module 'part:@sanity/components/loading/spinner' {
  import * as React from 'react'
  interface Props {
    center?: boolean
    message?: string
  }
  export default class Spinner extends React.Component<Props, any> {}
}
