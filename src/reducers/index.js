import { combineReducers } from "redux";
import auth from "./auth";
import notes from './notes'

export default combineReducers({
  auth: auth,
  notes: notes
});

export const handleSearch = (input) => {
  return {
    type: 'HANDLE_SEARCH',
    input: input
  }
}