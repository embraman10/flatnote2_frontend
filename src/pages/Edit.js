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
      this.props.history.push(`/notes/${this.state.id}`);
    }
  };

  render() {
    return (
      <Container>
        <Form size="large" onSubmit={this.submitHandler}>
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
