import uuid from 'uuid';
import React from "react";
import { connect } from "react-redux";
import CreatableSelect from 'react-select/lib/Creatable';
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

    this.initialState = {
      id: null,
      name: '',
      start: 0,
      end: 0,
      tags: null,
      valid: false
    };

    this.state = {...this.initialState};
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentClip !== prevProps.currentClip) {
      if (!this.props.currentClip) {
        this.setState({...this.initialState});
      } else {
        this.setState({...this.state, ...this.props.currentClip});
      }
    }
  }

  handleForm() {
    const {id, name, start, end, tags} = this.state;
    if (!this.state.id) {
      this.props.addClip({id: uuid.v4(), name, start, end, tags});
    } else {
      this.props.updateClip({id, name, start, end, tags});
    }
    this.setState({...this.initialState});
  }

  handleChange(event) {
    const name = event.target.id === 'name' ? event.target.value : this.state.name;
    const start = event.target.id === 'start' ? event.target.value : this.state.start;
    const end = event.target.id === 'end' ? event.target.value : this.state.end;
    this.setState({
      [event.target.id]: event.target.value,
      valid: name !== '' && !isNaN(+end - +start) && +start < +end && end <= this.props.videoLength
    });
  }

  toggle() {
    if (this.props.modal) {
      this.setState({...this.initialState});
    }
    this.props.toggle({
      modal: !this.props.modal
    });
  }

  handleSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'select-option' || actionMeta.action === 'create-option') {
      const tags = [...newValue];
      tags.map(tag => {
        delete tag.__isNew__;
        return tag;
      })
      this.setState({
        tags: tags
      });
    }
  };

  render() {
    const {modal, currentClip, availableTags, videoLength} = this.props;
    const {name, start, end, tags, valid} = this.state;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {currentClip ? 'Edit clip' : 'Add clip'}
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required
              className={`form-control ${(name == '') ? 'is-invalid' : ''}`}
              value={name}
              onChange={this.handleChange}
              placeholder="Enter a name for the clip" />
            </div>
            <div className="form-group">
              <label htmlFor="start">Start time</label>
              <input type="number" min="0" max={videoLength} step="1"
              className={`form-control ${(isNaN(start) || start >= end || start > (this.props.videoLength - 1)) ? 'is-invalid' : ''}`} id="start"
              value={start}
              onChange={this.handleChange}
              required
              placeholder="Enter the start time for this clip" />
              <small className="form-text text-muted">Maximun value: {videoLength}</small>
            </div>
            <div className="form-group">
              <label htmlFor="end">End time</label>
              <input type="number" min={+start + 1} max={videoLength} step="1" id="end"
              className={`form-control ${(isNaN(end) || start >= end || end > this.props.videoLength) ? 'is-invalid' : ''}`}
              value={end}
              onChange={this.handleChange}
              required
              placeholder="Enter the end time for this clip" />
              <small className="form-text text-muted">Minimun value: {+start < (videoLength - 1) ? +start + 1 : videoLength - 1}, maximun value: {videoLength}</small>
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              {(currentClip ? Array.isArray(tags) : true) &&
                <CreatableSelect
                  isMulti
                  onChange={this.handleSelectChange}
                  defaultValue={tags}
                  options={availableTags}
                />
              }
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleForm} disabled={!valid}>
              {currentClip ? 'Update' : 'Create'}
            </Button>
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
      availableTags: state.availableTags,
      videoLength: state.videoLength
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
