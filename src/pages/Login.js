import React, { Component } from "react";
import { Container, Button, Form, Message } from "semantic-ui-react";
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
      <Container text className="segment centered padded piled center aligned">
        <h1>Welcome Back!</h1>
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required>
            <label className="navbar-brand">E-mail</label>
            <input
              placeholder="E-mail"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </Form.Field>
          <Form.Field required>
            <label className="navbar-brand">Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Field>
          <Button className="btn btn-secondary my-2 my-sm-0" type="submit">Submit</Button>
        </Form>
        <br></br><h5>
        New to us? <a href='/signup'>Sign Up</a>
      </h5>
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
