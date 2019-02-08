import React from 'react';
import { connect } from "react-redux";

class ClipTimeline extends React.Component {
  render() {
    const {clips} = this.props;
    return (
      <div className="card mt-3">
        <div className="card-body">{clips.map(clip =>
          <div className="" key={clip.id}>
            <h2>{clip.name}</h2>
          </div>
        )}</div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      clips: state.clips
    }
  }
)(ClipTimeline);