export default function notes(state = [], action) {
  switch (action.type) {
    case "GET_NOTES":
    case "ADD_NOTE":
    case "DELETE_NOTE":
    case "UPDATE_NOTE":
      return action.notes;
    case "WIPE_ALL_NOTES":
      return [];
    default:
      return state;
  }
}
