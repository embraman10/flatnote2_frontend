import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import New from "./pages/New";
import Show from "./pages/Show";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Edit from "./pages/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/notes" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/notes/new" component={New} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <Route exact path="/notes/:id" component={Show} />
          <Route exact path="/notes/edit/:id" component={Edit} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
