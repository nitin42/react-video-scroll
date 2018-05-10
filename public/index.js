import React, { Component } from 'react'
import { render } from 'react-dom'

import { VideoScroll } from './react-video-scroll.min.js'

class App extends Component {
  state = {
    frame: 0
  }

  onScroll = props => this.setState({ frame: props.currentFrame })

  onLoad = ({ wrapper, playbackRate, el }) => {
    wrapper.style.marginTop = `calc(180% - ${Math.floor(el.duration) *
      playbackRate +
      'px'})`
    wrapper.style.marginBottom = `calc(180% - ${Math.floor(el.duration) *
      playbackRate +
      'px'})`
  }

  render() {
    return (
      <VideoScroll
        onLoad={this.onLoad}
        onScroll={this.onScroll}
        playbackRate={15}
        id="one"
        style={{ position: 'sticky' }}
      >
        <video
          id="v0"
          tabIndex="0"
          autobuffer="autobuffer"
          preload="preload"
          style={{ width: '100%', objectFit: 'contain' }}
          playsInline
        >
          <source type="video/mp4" src="./oculus.mp4" />
        </video>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>
          Current frame: {Math.floor(this.state.frame)}
        </h1>
      </VideoScroll>
    )
  }
}

render(<App />, document.getElementById('root'))
