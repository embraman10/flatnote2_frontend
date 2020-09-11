import React, { Component } from "react";
import { Container, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { loginSuccess } from "../actions/auth";
import { getNotes } from "../actions/notes";

class Login extends Component {
  state = {
    email: "tester@gmail.com",
    password: "password",
    error: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };
    const res = await fetch("http://localhost:5000/api/v1/auth", reqObj);
    const data = await res.json();
    if (data.error) {
      this.setState({
        error: data.error,
      });
    } else {
      localStorage.setItem("flatbookToken", data.token);
      this.props.loginSuccess(data);
      this.fetchNotes();
      this.props.history.push("/notes");
    }
  };

  fetchNotes = async () => {
    const reqObj = {
      method: "GET",
      headers: {
        id: `${this.props.auth.id}`,
      },
    };
    const res = await fetch("http://localhost:5000/api/v1/notes", reqObj);
    const notes = await res.json();
    this.props.getNotes(notes);
  };

  componentDidMount() {
    const token = localStorage.getItem("flatbookToken");
    if (token) {
      this.props.history.push("/notes");
    }
  }

  render() {
    return (
      <Container text>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>E-mail</label>
            <input
              placeholder="E-mail"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Field>
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

const mapDispatchToProps = {
  loginSuccess,
  getNotes,
};

export default connect(setStateToProps, mapDispatchToProps)(Login);
