import React from "react";
import Clip from "../clip/clip";
import "./clip-list.module.scss";
import { Button } from 'reactstrap';

export default ({clips, onDelete=() => {} }) => (
  <div className="card">
    <div className="card-header">
      <div className="d-flex">
        <span className="flex-grow-1">Main video</span>
        <div className="btn-group">
          <Button color="primary">P</Button>
        </div>
      </div>
    </div>
    <ul className="list-group list-group-flush">{clips.map(clip =>
      <li className="list-group-item" key={clip.id}>
        <Clip {...clip}></Clip>
      </li>
    )}</ul>
  </div>
);
