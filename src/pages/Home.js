import React, { Component } from "react";
import { Container, Card, Image, Form, Button, Icon } from "semantic-ui-react";
import { deleteNote } from "../actions/notes";
import { connect } from "react-redux";
import IndexCard from "../components/IndexCards";
// import Search from "../pages/Search";


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

  // handleSearchChange = (event) => {
  //   this.setState({ searchTerm: event.target.value })
  // }

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
        return <Image src='https://media.giphy.com/media/l0MYygru78omluZuE/giphy.gif' centered bordered rounded size='large' />;
      }
    };
    return (
      <Container text textAlign='center' style={{ padding: "10px 10px", textAlign: "center"}}>
        <h2 >Your Notecardz</h2>
        <div className="sub header">  ..</div>
        {/* <Search /> */}
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
