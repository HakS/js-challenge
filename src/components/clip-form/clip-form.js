import uuid from 'uuid';
import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import "./clip-form.module.scss";
import { addClip, updateClip, toggleModal } from '../../actions/index';

class ClipForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      id: null,
      name: '',
      start: 0,
      end: 0
    }
  }

  componentDidUpdate(prevProps) {
    if ('currentClip' in prevProps && this.props.currentClip !== prevProps.currentClip) {
      if (!this.props.currentClip) {
        this.setState({
          id: null,
          name: '',
          start: 0,
          end: 0
        });
      } else {
        this.setState({...this.state, ...this.props.currentClip});
      }
    }
  }

  handleForm() {
    const {id, name, start, end} = this.state;
    if (!this.state.id) {
      this.props.addClip({id: uuid.v4(), name, start, end});
    } else {
      this.props.updateClip({id, name, start, end});
    }
  }

  handleChange(event) {
    // this.props.updateModalData({ [event.target.id]: event.target.value });
    this.setState({ [event.target.id]: event.target.value });
  }

  toggle() {
    this.props.toggle({
      modal: !this.props.modal
    })
  }

  render() {
    const {modal, currentClip} = this.props;
    const {name, start, end} = this.state;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {currentClip ? 'Edit clip' : 'Add clip'}
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Enter a name for the clip" />
            </div>
            <div className="form-group">
              <label htmlFor="start">Start time</label>
              <input type="number" min="0" step="1" className="form-control" id="start"
              value={start}
              onChange={this.handleChange}
              placeholder="Enter the start time for this clip" />
            </div>
            <div className="form-group">
              <label htmlFor="end">End time</label>
              <input type="number" min="0" step="1" className="form-control" id="end"
              value={end}
              onChange={this.handleChange}
              placeholder="Enter the end time for this clip" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleForm}>
            {currentClip ? 'Update' : 'Create'}
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      modal: state.modal,
      currentClip: state.currentClip,
    };
  },
  dispatch => {
    return {
      toggle: modalData => dispatch(toggleModal(modalData)),
      addClip: modalData => dispatch(addClip(modalData)),
      updateClip: modalData => dispatch(updateClip(modalData))
    }
  }
)(ClipForm);
