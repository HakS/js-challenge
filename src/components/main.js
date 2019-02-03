import React from "react";
import { connect } from "react-redux";

import ClipList from "./clip-list/clip-list";
import VideoItem from "./video-item/video-item";
import ClipForm from "./clip-form/clip-form"

const mapStateToProps = state => {
  return { clips: state.clips };
};

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {clips, modal} = this.props;
    return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-4">
            <ClipList clips={clips}></ClipList>
          </div>
          <div className="col-8">
            <VideoItem></VideoItem>
          </div>
        </div>
        <ClipForm modal={modal}></ClipForm>
      </div>
    );
  }

  activateClipModal = (clip, e) => {
    const receivedClip = clip || null;
    this.setState({
      currentClip: receivedClip,
      modal: true
    })
  }

}

export default connect(mapStateToProps)(Main);
