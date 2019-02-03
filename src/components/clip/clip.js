import { connect } from "react-redux";
import React from "react";
import { Button } from 'reactstrap';

import { toggleModal, deleteClip } from '../../actions/index';

import "./clip.module.scss";

function mapDispatchToProps(dispatch) {
  return {
    changeFormData: formData => {
      dispatch(toggleModal({
        modal: true,
        currentClip: formData
      }));
    },
    deleteClip: payload => dispatch(deleteClip(payload))
  };
}

class Clip extends React.Component {
  constructor(props) {
    super(props);

    this.changeFormData = this.changeFormData.bind(this);
    this.deleteClip = this.deleteClip.bind(this);
  }

  changeFormData() {
    const {id, name, start, end} = this.props;
    this.props.changeFormData({id, name, start, end});
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
          <Button color="primary" onClick={this.changeFormData}>E</Button>
          <Button color="danger" onClick={this.deleteClip}>D</Button>
        </div>
    </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Clip);
