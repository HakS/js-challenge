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
      tags: null
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
    this.setState({ [event.target.id]: event.target.value });
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
    const {modal, currentClip, availableTags} = this.props;
    const {name, start, end, tags} = this.state;
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
              <input type="number" min={+start + 1} step="1" className="form-control" id="end"
              value={end}
              onChange={this.handleChange}
              placeholder="Enter the end time for this clip" />
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
      availableTags: state.availableTags
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
