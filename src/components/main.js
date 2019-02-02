import React from "react";
import ClipList from "./clip-list/clip-list";
import VideoItem from "./video-item/video-item";

export default() => (
  <div className="container-fluid mt-3">
    <div className="row">
      <div className="col-4">
        <ClipList></ClipList>
      </div>
      <div className="col-8">
        <VideoItem></VideoItem>
      </div>
    </div>
  </div>
);
