import React from "react";
import "./video-item.module.scss";

export default () => (
  <div className="card">
    <div className="card-body">
      <video controls>
        <source src="http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
);