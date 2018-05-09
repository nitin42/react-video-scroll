# react-video-scroll

![size](https://img.shields.io/badge/size-4.59%20KB-brightgreen.svg)

> A React component to seek or control the video frame rate on scroll.

## Motivation

Go to [Oculus Go](https://www.oculus.com/go/) 😄

## Demo

<p align='center'>
  <img src='./scroll.gif' />
</p>

## Install

```
npm install react-video-scroll
```

or if you use yarn

```
yarn add react-video-scroll
```

## Usage

In order to use this component, you need to wrap the `video` element with a `source` tag under the `VideoScroll` component.

```js
import React, { Component } from 'react'
import { VideoScroll } from 'react-video-scroll'

class App extends Component {
  state = {
    frame: 0
  }

  onScroll = ({ currentFrame }) => this.setState({ frame: currentFrame })

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
        style={{ position: 'sticky' }}
      >
        <video
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
```

Download [oculus.mp4](blob:https://www.oculus.com/470a6ce6-b93a-4464-aa4e-707209ae04b9) and then run the example.
