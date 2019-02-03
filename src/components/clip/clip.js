import { connect } from "react-redux";
import React from "react";
import { Button } from 'reactstrap';

import { deleteClip } from '../../actions/index';

import "./clip.module.scss";

function mapDispatchToProps(dispatch) {
  return {
    deleteClip: clipId => dispatch(deleteClip(clipId))
  };
}

class Clip extends React.Component {
  constructor(props) {
    super(props);
    
    this.deleteClip = this.deleteClip.bind(this);
  }

  deleteClip(e) {
    this.props.deleteClip({
      id: this.props.id
    });
  }

  render() {
    const {name} = this.props;
    return (
      <div className="d-flex">
        <span className="flex-grow-1">{name}</span>
        <div className="btn-group">
          <Button color="primary">P</Button>
          <Button color="primary">E</Button>
          <Button color="danger" onClick={this.deleteClip}>D</Button>
        </div>
    </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Clip);
