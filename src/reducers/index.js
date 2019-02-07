
const initialState = {
  clips: [],
  playing: '',
  videoStart: null,
  videoEnd: null,
  currentClip: null,
  modal: false,
  availableTags: []
};


function rootReducer(state = initialState, action) {
  const mergeTags = () => {
    const availableTags = [...state.availableTags];
    action.payload.tags.map(tag => {
      const exists = availableTags.find(avTag => avTag.value === tag.value);
      if (!exists) {
        availableTags.push(tag);
      }
    });
    return availableTags;
  }

  if (action.type === "ADD_CLIP") {
    return {...state, ...{
      clips: state.clips.concat(action.payload),
      modal: false,
      currentClip: null,
      availableTags: mergeTags()
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
      currentClip: null,
      availableTags: mergeTags()
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
    if (!action.payload.modal) {
      newState.currentClip = null;
    } else {
      newState.currentClip = action.payload.currentClip || null;
    }
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
