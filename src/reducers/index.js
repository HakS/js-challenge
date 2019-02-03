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
    return {...state, ...{
      clips: state.clips.concat(action.payload),
      modal: false,
      currentClip: null
    }}
  }

  if (action.type === "UPDATE_CLIP") {
    return {...state, ...{
      clips: state.clips.map(clip => {
        if (clip.id === action.payload.id) {
          return {...clip, ...action.payload}
        }
        return clip;
      }),
      modal: false,
      currentClip: null
    }}
  }

  if (action.type === "DELETE_CLIP") {
    return {...state, ...{
      clips: state.clips.filter(clip => clip.id !== action.payload.id),
      modal: false,
      currentClip: null
    }}
  }

  if (action.type === "TOGGLE_MODAL") {
    const newState = {...state, ...{
      modal: action.payload.modal
    }};
    newState.currentClip = action.payload.currentClip || null;
    return newState;
  }

  return state;
};
export default rootReducer;
