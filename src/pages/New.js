import React, { Component } from "react";
import { Container, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { addNote } from "../actions/notes";

class New extends Component {
  state = { title: "", contents: "", error: null };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: `${this.props.auth.id}`,
      },
      body: JSON.stringify(this.state),
    };
    const res = await fetch("http://localhost:5000/api/v1/notes", reqObj);
    const newNote = await res.json();
    if (newNote.error) {
      this.setState({ error: newNote.error });
    } else {
      const updatedNotes = [...this.props.notes, newNote];
      this.props.addNote(updatedNotes);
      this.props.history.push(`/notes/${newNote.id}`);
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
    auth: state.auth,
    notes: state.notes,
  };
};

const mapDispatchToProps = { addNote };

export default connect(setStateToProps, mapDispatchToProps)(New);
