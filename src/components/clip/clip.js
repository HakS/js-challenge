import { connect } from "react-redux";
import React from "react";
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toggleModal, deleteClip, toggleVideoPlay } from '../../actions/index';

import "./clip.module.scss";

class Clip extends React.Component {
  constructor(props) {
    super(props);

    this.toggleVideoPlay = this.toggleVideoPlay.bind(this);
    this.changeFormData = this.changeFormData.bind(this);
    this.deleteClip = this.deleteClip.bind(this);
  }

  toggleVideoPlay() {
    this.props.toggleVideoPlay(this.props.id);
  }

  changeFormData() {
    const {id, name, start, end, tags} = this.props;
    this.props.changeFormData({id, name, start, end, tags});
  }

  deleteClip(e) {
    this.props.deleteClip({
      id: this.props.id
    });
  }

  render() {
    const {id, name, playing, readOnly, start, end} = this.props;
    const rOnly = readOnly || false;

    let playBtn;
    if (playing === id) {
      playBtn = <FontAwesomeIcon icon="stop" />;
    } else {
      playBtn = <FontAwesomeIcon icon="play" />;
    }

    return (
      <div className="d-flex">
        <span className="flex-grow-1">{name}</span>
        <div>
          <Button disabled={+start >= +end } color="primary" className="mr-1" onClick={this.toggleVideoPlay}>
            {playBtn}
          </Button>
          {!rOnly && <Button color="primary" className="mr-1" onClick={this.changeFormData}>
            <FontAwesomeIcon icon="pen" />
          </Button>}
          {!rOnly && <Button color="danger" onClick={this.deleteClip}>
            <FontAwesomeIcon icon="trash" />
          </Button>}
        </div>
    </div>
    );
  }
}

export default connect(
  state => {
    return {
      playing: state.playing
    }
  },
  dispatch => {
    return {
      changeFormData: formData => {
        dispatch(toggleModal({
          modal: true,
          currentClip: formData
        }));
      },
      deleteClip: payload => dispatch(deleteClip(payload)),
      toggleVideoPlay: play => dispatch(toggleVideoPlay(play))
    };
  }
)(Clip);
