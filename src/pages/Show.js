import React, { Component } from "react";
import { Container, Divider, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNote } from "../actions/notes";

class Show extends Component {
  deleteNote = async (id) => {
    const res = await fetch(`http://localhost:5000/api/v1/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === 200) {
      const updatedNotes = this.props.notes.filter((note) => note.id !== id);
      this.props.deleteNote(updatedNotes);
    }
  };

  render() {
    const path = this.props.location.pathname.split("/");
    const id = parseInt(path[path.length - 1]);
    const { notes } = this.props;
    const note = notes.find((note) => note.id === id);
    return (
      <Container text>
        {note === undefined ? (
          <h2>You need to create some notez!</h2>
        ) : (
          <div>
            <h1>{note.title}</h1>
            <Divider />
            <p className="showContents">{note.contents}</p>
            <Button.Group>
              <Button as={Link} to="/notes">
                All Notes
              </Button>
              <Button as={Link} to={`/notes/edit/${id}`}>
                Edit
              </Button>
              <Button negative onClick={() => deleteNote(id)}>
                Delete
              </Button>
            </Button.Group>
          </div>
        )}
      </Container>
    );
  }
}

const setStateToProps = (state) => {
  return {
    auth: state.auth,
    notes: state.notes,
  };
};

const setDispatchToProps = {
  deleteNote,
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Show));
