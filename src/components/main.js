import React from "react";
import { connect } from "react-redux";
import { Button } from 'reactstrap';

import ClipList from "./clip-list/clip-list";
import VideoItem from "./video-item/video-item";
import ClipForm from "./clip-form/clip-form";
import { toggleModal } from '../actions/index';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.activateClipModal = this.activateClipModal.bind(this);
  }

  render() {
    const {clips} = this.props;
    return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-4">
            <ClipList clips={clips}></ClipList>
          </div>
          <div className="col-8">
            <VideoItem></VideoItem>
            <Button onClick={this.activateClipModal}>Add clip</Button>
          </div>
        </div>
        <ClipForm></ClipForm>
      </div>
    );
  }

  activateClipModal = (e) => {
    this.props.activateClipModal();
  }

}

export default connect(
  state => {
    return { clips: state.clips };
  },
  dispatch => {
    return {
      activateClipModal: () => dispatch(toggleModal({
        modal: true
      }))
    }
  }
)(Main);
