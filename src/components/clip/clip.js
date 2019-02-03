import React from "react";
import { Button } from 'reactstrap';

import "./clip.module.scss";

// export default class Clip extends React.Component {
//   constructor(props) {
//     super(props);

//     // this.state = {
//     //   modal: false
//     // };
//   }

//   render({clip}) {
//     return (
//       <div>
//         <h5>{clip.name}</h5>
//         <div>
//           <Button color="primary">P</Button>
//           <Button color="primary">E</Button>
//           <Button color="danger">D</Button>
//         </div>
//       </div>
//     );
//   }
// }

export default (clip) => (
  <div className="d-flex">
    <span className="flex-grow-1">{clip.name}</span>
    <div className="btn-group">
      <Button color="primary">P</Button>
      <Button color="primary">E</Button>
      <Button color="danger" onClick={clip.onDelete}>D</Button>
    </div>
  </div>
)