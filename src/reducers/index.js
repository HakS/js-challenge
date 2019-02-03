import uuid from 'uuid';

const initialState = {
  clips: [
    {
      id: uuid.v4(),
      name: 'The first clip',
      start: 4,
      end: 9,
      tags: [
        'foo', 'bar'
      ]
    }
  ],
  currentClip: null,
  modal: false
};
function rootReducer(state = initialState, action) {
  if (action.type === "ADD_CLIP") {
    return Object.assign({}, state, {
      clips: state.clips.concat(action.payload)
    });
  }

  if (action.type === "DELETE_CLIP") {
    console.log(action);
    return Object.assign({}, state, {
      clips: state.clips.filter(clip => clip.id !== action.payload.id)
    });
  }

  return state;
};
export default rootReducer;
