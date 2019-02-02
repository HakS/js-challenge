import React from "react";
import VideoItem from "./video-item/video-item";

export default() => (
  <div className="container-fluid mt-3">
    <div className="row">
      <div className="col-4">
        list of items
      </div>
      <div className="col-8">
        <VideoItem></VideoItem>
      </div>
    </div>
  </div>
);
