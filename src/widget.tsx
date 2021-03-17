import React from 'react'
import {streamingComponent} from 'react-props-stream'
import {map, switchMap} from 'rxjs/operators'
import {WidgetOptions} from './types'
import {props$} from './props'
import NetlifyWidget from './components/NetlifyWidget'

export default streamingComponent<WidgetOptions>((options$) =>
  options$.pipe(
    switchMap((options) =>
      props$(options).pipe(
        map((props) => {
          return <NetlifyWidget {...props} />
        })
      )
    )
  )
)
