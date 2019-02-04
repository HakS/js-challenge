
const initialState = {
  clips: [],
  playing: '',
  videoStart: null,
  videoEnd: null,
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

  if (action.type === "TOGGLE_VIDEO_PLAY") {
    const newState = {...state, ...{
      playing: action.payload
    }};
    const playingClip = state.clips.find(clip => clip.id === action.payload);
    if (playingClip) {
      newState.videoStart = playingClip.start;
      newState.videoEnd = playingClip.end;
    } else {
      newState.videoStart = null;
      newState.videoEnd = null;
    }
    return newState;
  }

  return state;
};
export default rootReducer;
