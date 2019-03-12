import React from 'react'
import styles from './NetlifyWidget.css'

interface Props {
}

export default class NetlifyWidget extends React.Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Netlify</h2>
        </header>
      </div>
    )
  }
}
