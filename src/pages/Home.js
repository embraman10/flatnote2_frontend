import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { deleteNote } from "../actions/notes";
import { connect } from "react-redux";
import IndexCard from "../components/IndexCards";

class Home extends Component {
  state = { loading: true };
  componentDidMount() {
    const token = localStorage.getItem("flatbookToken");
    !token
      ? this.props.history.push("/login")
      : this.setState({ loading: false });
  }

  openNote = (id) => {
    this.props.history.push(`/notes/${id}`);
  };

  deleteNote = async (id) => {
    console.log("hit delete for id", id);
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
    const cards = () => {
      if (this.props.notes.length !== 0) {
        return this.props.notes.map((note) => (
          <IndexCard
            note={note}
            key={note.id}
            openNote={this.openNote}
            deleteNote={this.deleteNote}
          />
        ));
      } else {
        return <p>Make them notecardz</p>;
      }
    };
    return (
      <Container text textAlign='center'>
        <h2>Your Notecardz</h2>
        <Card.Group>{cards()}</Card.Group>
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

export default connect(setStateToProps, setDispatchToProps)(Home);
