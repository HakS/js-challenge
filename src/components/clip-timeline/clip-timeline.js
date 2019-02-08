import React from 'react';
import { connect } from "react-redux";

import { toggleVideoPlay } from '../../actions/index';
import styles from './clip-timeline.module.scss';

class ClipTimeline extends React.Component {
  constructor(props) {
    super(props);

    this.toggleVideoPlay = this.toggleVideoPlay.bind(this);
  }

  toggleVideoPlay(id) {
    this.props.toggleVideoPlay(id);
  }

  render() {
    const {clips, videoLength} = this.props;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className={styles.timeline}>
            {clips.map(clip =>
              <div className={styles.timeline__item}
              onClick={() => {this.toggleVideoPlay(clip.id)}}
              style={{left: `${clip.start / videoLength * 100}%` }} key={clip.id}>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      clips: state.clips,
      videoLength: state.videoLength
    }
  },
  dispatch => {
    return {
      toggleVideoPlay: play => dispatch(toggleVideoPlay(play))
    };
  }
)(ClipTimeline);