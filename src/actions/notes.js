export const getNotes = (notes) => {
  return {
    type: "GET_NOTES",
    notes: notes,
  };
};

export const wipeAllNotes = () => {
  return {
    type: "WIPE_ALL_NOTES",
  };
};

export const addNote = (notes) => {
  return {
    type: "ADD_NOTE",
    notes: notes,
  };
};

export const deleteNote = (notes) => {
  return {
    type: "DELETE_NOTE",
    notes: notes,
  };
};
export const updateNote = (notes) => {
  return {
    type: "UPDATE_NOTE",
    notes: notes,
  };
};
