// @flow

import * as React from 'react'
import PropTypes from 'prop-types'

type Props = {
  // Controlling the playback rate when seeking the video on scroll
  playbackRate: number,
  // Should seek the video on horizontal scrolling ?
  horizontalScroll: boolean,
  // onScroll is invoked when the page is scroll along x or y axis
  onScroll: ({
    // 'div' wrapper element for video element
    wrapperEl: HTMLElement,
    // video element
    videoEl: HTMLElement,
    // Current frame / current time of video
    currentFrame: number,
    // Video duration
    duration: number,
    playbackRate: number
  }) => void,
  // onLoad is invoked when the video is finished loading.
  // Use this to update the height of wrapper or video element or applying some other styles.
  onLoad: ({
    wrapperEl: HTMLElement,
    videoEl: HTMLElement,
    playbackRate: number
  }) => void,
  // Function to set the current frame / current time and seek the video on scroll
  setCurrentFrame: ({
    duration: number,
    playbackRate: number
  }) => number,
  children: React.Node
}

const rAF = window.requestAnimationFrame

export class VideoScroll extends React.Component<Props, void> {
  // TODO: https://github.com/facebook/flow/pull/5920
  // $FlowFixMe
  videoRef: { current: HTMLVideoElement | null } = React.createRef()
  // TODO: https://github.com/facebook/flow/pull/5920
  // $FlowFixMe
  divWrapperRef: { current: HTMLElement | null } = React.createRef()

  static propTypes = {
    playbackRate: PropTypes.number,
    horizontalScroll: PropTypes.bool,
    onScroll: PropTypes.func,
    onLoad: PropTypes.func,
    setCurrentFrame: PropTypes.func
  }

  static defaultProps = {
    playbackRate: 10,
    horizontalScroll: false
  }

  componentDidMount() {
    this.videoRef.current.addEventListener('loadedmetadata', this.seek)
  }

  componentWillUnmount() {
    this.videoRef.current.removeEventListener('loadedmetadata', this.seek)
  }

  seek = () => {
    // Start the video from beginning
    let currentFrame = 0

    if (this.props.onLoad && typeof this.props.onLoad === 'function') {
      // Invoke the callback and apply any necessary styles or adjustments
      this.props.onLoad({
        wrapperEl: this.divWrapperRef.current,
        videoEl: this.videoRef.current,
        duration: this.videoRef.current.duration,
        playbackRate: this.props.playbackRate
      })
    }

    const startOnScroll = () => {
      // User defined function to set the current frame and seek the video on scroll
      if (
        this.props.setCurrentFrame &&
        typeof this.props.setCurrentFrame === 'function'
      ) {
        currentFrame = this.props.setCurrentFrame({
          playbackRate: this.props.playbackRate,
          duration: this.videoRef.current.duration
        })
      } else {
        const offset = this.props.horizontalScroll
          ? window.pageXOffset
          : window.pageYOffset

        currentFrame = offset / this.props.playbackRate
      }

      // Set the current frame when scroll along x or y axis
      this.videoRef.current.currentTime = currentFrame

      // Do some extra stuff here
      if (this.props.onScroll && typeof this.props.onScroll === 'function') {
        this.props.onScroll({
          wrapperEl: this.divWrapperRef.current,
          videoEl: this.videoRef.current,
          currentFrame: currentFrame,
          duration: this.videoRef.current.duration,
          playbackRate: this.props.playbackRate
        })
      }

      rAF(startOnScroll)
    }

    rAF(startOnScroll)
  }

  attachRefToVideoEl = () => {
    // For tracking the number of <video> elements which are children of <VideoScroll> component
    let count = 0

    return React.Children.map(
      this.props.children,
      (child: React.Element<any>, i: number): React.Node => {
        if (child.type === 'video') {
          count += 1

          // To seek more than one video, wrap the other video element inside an another VideoScroll component
          if (count > 1) {
            throw new Error(
              '<VideoScroll> component expected only one <video> element as its children but received more than one <video> element. To seek both the videos, wrap the other video element inside another <VideoScroll> component.'
            )
          } else if (count === 1) {
            return React.cloneElement(child, { key: i, ref: this.videoRef })
          }
        }

        return React.cloneElement(child, { key: i })
      }
    )
  }

  render(): React.Node {
    const {
      children,
      playbackRate,
      setCurrentFrame,
      horizontalScroll,
      onScroll,
      onLoad,
      ...rest
    } = this.props

    return (
      <div ref={this.divWrapperRef} {...rest}>
        {this.attachRefToVideoEl()}
      </div>
    )
  }
}
