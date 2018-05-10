**WORK IN PROGRESS**

# react-video-scroll

![size](https://img.shields.io/badge/size-4.59%20KB-brightgreen.svg)

> A React component to seek or control the video frame rate on scroll.

## Motivation

Go to [Oculus Go](https://www.oculus.com/go/) 😄

## Demo

<p align='center'>
  <img src='./media/ReactVideoScroll.gif' />
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

In order to use this component, you will need to wrap the `video` element with a `source` tag under the `VideoScroll` component.

**Example**

```js
import React from 'react'
import { render } from 'react-dom'
import { VideoScroll } from 'react-video-scroll'

const setStyles = (wrapperEl, videoEl, playbackRate) => {
  wrapperEl.style.marginTop = `calc(180% - ${Math.floor(videoEl.duration) *
    playbackRate +
    'px'})`
  wrapperEl.style.marginBottom = `calc(180% - ${Math.floor(videoEl.duration) *
    playbackRate +
    'px'})`
}

function App() {
  return (
    <VideoScroll
      onLoad={props =>
        setStyles(props.wrapperEl, props.videoEl, props.playbackRate)
      }
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
    </VideoScroll>
  )
}

render(<App />, document.getElementById('root'))
```

Download [oculus.mp4](./public/oculus.mp4), place it in the public folder which you're serving and then run the example.

**OR**

[Checkout the live demo site](https://www.react-video-scroll.surge.sh)

## API

### `VideoScroll` Component

#### Props

##### `playbackRate`

**type**: `number`

**Description**: Set the playback rate when seeking the video on scroll.

```js
<VideoScroll playbackRate={20}>
  <video>
    <source type="video/mp4" source="some_file.mp4" />
  </video>
</VideoScroll>
```

##### `onScroll`

**type**: `function`

**Return type**: `void`

**Description**: `onScroll` is invoked when the page is scroll. It receives the following arguments -

* `wrapperEl` - Reference to video wrapper i.e `VideoScroll` component

* `videoEl` - Reference to video element

* `currentFrame` - Current frame / current time of video

* `playbackRate` - Playback rate

* `duration` - Duration of video

```js
const onScroll = (props) => {
  const { currentFrame } => props

  setState({ frame: Math.floor(currentFrame)})
}

<VideoScroll onScroll={onScroll}>
  <video><source type="video/mp4" src="some_file.mp4" /></video>
</VideoScroll>
```

##### `onLoad`

**type**: `function`

**Return type**: `void`

**Description**: `onLoad` is invoked when the video is finished loading. Use `onLoad` to update the height of video wrapper or video element, or applying some other styles to adjust the video on the page. It receives the following arguments -

* `wrapperEl` - Reference to video wrapper i.e `VideoScroll` component

* `videoEl` - Reference to the video element

* `playbackRate` - Playback rate of video

```js
const onLoad = (props) => {
  const { wrapper, playbackRate, el } = props

  wrapper.style.marginTop = `calc(180% - ${Math.floor(el.duration) *
    playbackRate +
    'px'})`
  wrapper.style.marginBottom = `calc(180% - ${Math.floor(el.duration) *
    playbackRate +
    'px'})`
}

<VideoScroll onLoad={onLoad}>
  <video><source type="video/mp4" src="some_file.mp4" /></video>
</VideoScroll>
```

##### `horizontalScroll`

**type**: `boolean`

**default**: `false`

**Description**: Set `horizontalScroll` to `true` for seeking the video on horizontal scroll. Set the styles of `wrapper` or `video` element using `onLoad` callback before setting the value for `horizontalScroll`.

By default, the video will seek on scrolling vertically.

```js
<VideoScroll horizontalScroll={true}>
  <video>
    <source type="video/mp4" src="some_file.mp4" />
  </video>
</VideoScroll>
```

##### `setCurrentFrame`

**type**: `Function`

**Return value**: `number`

**Description**: Use `setCurrentFrame` to set the current frame of video. By default, the frame rate is managed [internally]() using `pageXOffset` and `pageYOffset` value. `setCurrentFrame` receives the following arguments -

* `duration` - Duration of video

* `playbackRate` - Playback rate of video

**`setCurrentFrame` should return a number value for setting the current frame of a video.**

```js
const setFrame = (props) => {
  const { duration, playbackRate } = props

  return window.pageYOffset / 20 - playbackRate
}

<VideoScroll setCurrentFrame={setFrame} horizontalScroll={true}>
  <video>
    <source type="video/mp4" src="some_file.mp4" />
  </video>
</VideoScroll>
```
