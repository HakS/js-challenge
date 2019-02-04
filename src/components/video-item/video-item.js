import { connect } from "react-redux";
import React from "react";

import "./video-item.module.scss";

class VideoItem extends React.Component {
  constructor(props) {
    super(props);

    this.mainVideo = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if ('playing' in prevProps && this.props.playing !== prevProps.currentClip) {
      if (this.props.playing !== '') {
        this.mainVideo.current.play();
      } else {
        this.mainVideo.current.pause();
      }
    }
  }

  render() {
    const {playing, videoStart, videoEnd} = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <video key={playing} controls id="mainVideo" ref={this.mainVideo}>
            <source
            src={`http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4#t=${videoStart},${videoEnd}`}
            type="video/mp4" />
          </video>
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      playing: state.playing,
      videoStart: state.videoStart,
      videoEnd: state.videoEnd,
    }
  }
)(VideoItem);