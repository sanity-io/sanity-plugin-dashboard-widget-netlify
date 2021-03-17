/// <reference types="react" />
declare module 'part:@sanity/components/buttons/default' {
  interface Props {
    children?: any
    onClick?: any
    inverted?: boolean
    kind?: 'default' | 'simple'
  }
  export default class DefaultButton extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/buttons/anchor' {
  interface Props {
    children?: any
    disabled?: boolean
    href?: string
    bleed?: boolean
    color?: string
    kind?: string
  }
  export default class AnchorButton extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/loading/spinner' {
  interface Props {
    center?: boolean
    message?: string
  }
  export default class Spinner extends React.Component<Props, any> {}
}
