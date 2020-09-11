import React, { Component } from "react";
import { Container, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateNote } from "../actions/notes";

class Edit extends Component {
  state = { id: "", title: "", contents: "" };

  componentDidMount() {
    const path = this.props.location.pathname.split("/");
    const id = parseInt(path[path.length - 1]);
    this.setInitialState(id);
  }

  setInitialState = async (id) => {
    const res = await fetch(`http://localhost:5000/api/v1/notes/${id}`);
    const note = await res.json();
    this.setState({ id: id, title: note.title, contents: note.contents });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        contents: this.state.contents,
      }),
    };
    const res = await fetch(
      `http://localhost:5000/api/v1/notes/${this.state.id}`,
      reqObj
    );
    const updatedNote = await res.json();
    if (res.status === 200) {
      const prevNotes = this.props.notes.filter(
        (note) => note.id !== this.state.id
      );
      const allNotes = [...prevNotes, updatedNote];
      this.props.updateNote(allNotes);
      this.props.history.push(`/notes/`);
    }
  };

  render() {
    return (
      <Container>
        <Form size="large" className="segment centered padded piled center aligned" onSubmit={this.submitHandler}>
        <h1>Edit your note</h1>
            <svg className="book-shelf" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 84 94" height="94" width="84">
              <path fill="none" d="M37.612 92.805L4.487 73.71c-2.75-1.587-4.45-4.52-4.45-7.687L.008 27.877c-.003-3.154 1.676-6.063 4.405-7.634L37.558 1.167c2.73-1.57 6.096-1.566 8.835.013l33.124 19.096c2.75 1.586 4.45 4.518 4.45 7.686l.028 38.146c.002 3.154-1.677 6.063-4.406 7.634L46.445 92.818c-2.73 1.57-6.096 1.566-8.834-.013z"/>
              <g className="book-shelf__book book-shelf__book--one" fillRule="evenodd">
                <path fill="#5199fc" d="M31 29h4c1.105 0 2 .895 2 2v29c0 1.105-.895 2-2 2h-4c-1.105 0-2-.895-2-2V31c0-1.105.895-2 2-2z"/>
                <path fill="#afd7fb" d="M34 36h-2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1s-.448 1-1 1zm-2 1h2c.552 0 1 .448 1 1s-.448 1-1 1h-2c-.552 0-1-.448-1-1s.448-1 1-1z"/>
              </g>
              <g className="book-shelf__book book-shelf__book--two" fillRule="evenodd">
                <path fill="#ff9868" d="M39 34h6c1.105 0 2 .895 2 2v24c0 1.105-.895 2-2 2h-6c-1.105 0-2-.895-2-2V36c0-1.105.895-2 2-2z"/>
                <path fill="#d06061" d="M42 38c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z"/>
              </g>
              <g className="book-shelf__book book-shelf__book--three" fillRule="evenodd">
                <path fill="#ff5068" d="M49 32h2c1.105 0 2 .86 2 1.92v25.906c0 1.06-.895 1.92-2 1.92h-2c-1.105 0-2-.86-2-1.92V33.92c0-1.06.895-1.92 2-1.92z"/>
                <path fill="#d93368" d="M50 35c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1z"/>
              </g>
              <g fillRule="evenodd">
                <path className="book-shelf__shelf" fill="#ae8280" d="M21 60h40c1.105 0 2 .895 2 2s-.895 2-2 2H21c-1.105 0-2-.895-2-2s.895-2 2-2z"/>
                <path fill="#855f6d" d="M51.5 67c-.828 0-1.5-.672-1.5-1.5V64h3v1.5c0 .828-.672 1.5-1.5 1.5zm-21 0c-.828 0-1.5-.672-1.5-1.5V64h3v1.5c0 .828-.672 1.5-1.5 1.5z"/>
              </g>
            </svg>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Title"
              name="title"
              onChange={this.changeHandler}
              value={this.state.title}
            />
          </Form.Field>
          <Form.TextArea
            label="Content"
            name="contents"
            placeholder="Content..."
            onChange={this.changeHandler}
            value={this.state.contents}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

const setStateToProps = (state) => {
  return {
    notes: state.notes,
  };
};

const mapDispatchToProps = {
  updateNote,
};

export default withRouter(connect(setStateToProps, mapDispatchToProps)(Edit));
