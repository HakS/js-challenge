import React from "react";
import Clip from "../clip/clip";
import { connect } from "react-redux";
import Select from 'react-select';

import "./clip-list.module.scss";

class ClipList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: []
    };
  }

  handleSelectChange = (newValue, actionMeta) => {
    switch (actionMeta.action) {
      case 'clear':
      case 'remove-value':
      case 'select-option':
      this.setState({
        selectedTags: newValue
      })
      break;
    }
  }

  render() {
    const {clips, availableTags} = this.props;
    const {selectedTags} = this.state;
    return (
      <div className="card flex-grow-1">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Select
              isMulti
              onChange={this.handleSelectChange}
              options={availableTags}
            />
          </li>
          {clips
            .filter((clip,i) => {
              if (i === 0) return true;
              if (!selectedTags.length) return true;
              // TODO: there must be a more efficient way of making this filtering...
              const a = clip.tags.filter(clipTag => selectedTags.find(selTag => clipTag.value === selTag.value));
              return a.length > 0;
            })
            .map(clip =>
            <li className="list-group-item" key={clip.id}>
              <Clip {...clip}></Clip>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      availableTags: state.availableTags
    };
  }
)(ClipList);