export function addClip(payload) {
  return { type: "ADD_CLIP", payload }
};
export function updateClip(payload) {
  return { type: "UPDATE_CLIP", payload }
};
export function deleteClip(payload) {
  return { type: "DELETE_CLIP", payload }
};
export function playClip(payload) {
  return { type: "PLAY_CLIP", payload }
};
export function toggleModal(payload) {
  return { type: "TOGGLE_MODAL", payload }
};
