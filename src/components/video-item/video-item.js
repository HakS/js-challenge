import { connect } from "react-redux";
import React from "react";
import { videoLoad, playControl } from '../../actions/index';

import "./video-item.module.scss";

class VideoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFinished: false
    }

    // Had to remove this from React's scope, since a single change in the state screws the video
    this.countdown = 3;

    this.mainVideo = React.createRef();
    this.countdownRef = React.createRef();
  }

  componentDidMount() {
    this.mainVideo.current.addEventListener('loadeddata', () => {
      this.props.videoLoad(this.mainVideo.current.duration);
    });
  }

  componentDidUpdate(prevProps) {
    if ('playing' in prevProps && this.props.playing !== prevProps.currentClip) {
      if (this.props.playing !== '') {
        this.mainVideo.current.play();
      } else {
        this.mainVideo.current.pause();
      }

      this.mainVideo.current.addEventListener('pause', () => {
        this.countdownRef.current.innerHTML = this.countdown;
        const countdownInt = setInterval(() => {
          this.countdown--;
          this.countdownRef.current.innerHTML = this.countdown;
          if (this.countdown === 0) {
            this.props.playControl('next');
            this.countdownRef.current.innerHTML = '';
            this.countdown = 3;
            clearInterval(countdownInt);
          }
        }, 1000);
      });
    }
  }

  render() {
    const {playing, videoStart, videoEnd} = this.props;
    const {videoFinished, countdown} = this.state;
    return (
      <div className="card flex-grow-1 bg-dark">
        <div className="card-body d-flex flex-column justify-content-center">
          <video key={playing} id="mainVideo" ref={this.mainVideo} className={videoFinished ? 'bg-danger' : 'd-block'}>
            <source
            src={`http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4#t=${videoStart},${videoEnd}`}
            type="video/mp4" />
          </video>
          <div ref={this.countdownRef} id="countdown" className='display-1 text-white text-center'></div>
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
  },
  dispatch => {
    return {
      videoLoad: length => dispatch(videoLoad(length)),
      playControl: direction => dispatch(playControl(direction))
    }
  }
)(VideoItem);