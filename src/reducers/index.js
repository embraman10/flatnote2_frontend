import { combineReducers } from "redux";
import auth from "./auth";
import notes from './notes';
// import create from './notes/new';

export default combineReducers({
  auth: auth,
  notes: notes,
  // create: create
});

// export const handleSearch = (input) => {
//   return {
//     type: 'HANDLE_SEARCH',
//     input: input
//   }
// }