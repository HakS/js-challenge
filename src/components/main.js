import uuid from 'uuid';
import React from "react";
import ClipList from "./clip-list/clip-list";
import VideoItem from "./video-item/video-item";
import ClipForm from "./clip-form/clip-form"

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clips: [
        {
          id: uuid.v4(),
          name: 'The first clip',
          start: 4,
          end: 9,
          tags: [
            'foo', 'bar'
          ]
        }
      ],
      currentClip: null,
      modal: false
    }
  }

  render() {
    const {clips} = this.state;
    return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-4">
            <ClipList clips={clips} onDelete={this.deleteClip}></ClipList>
          </div>
          <div className="col-8">
            <VideoItem></VideoItem>
          </div>
        </div>
        <ClipForm modal={this.modal}></ClipForm>
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

  deleteClip = (id, e) => {
    e.stopPropagation();
    this.setState({
      clips: this.state.clips.filter(clip => clip.id !== id)
    })
  };
}
