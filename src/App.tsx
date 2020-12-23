import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBarContainer from "./containers/NavBarContainer";
import Home from "./components/Home";
import FooterContainer from "./containers/FooterContainer";

function App() {
  return (
    <Router>
      <div className="App mx-auto text-2xl">
        <nav className="fixed inset-x-0 top-0 h-12 bg-gray-500">
          <NavBarContainer />
        </nav>
        <div className="main-container mt-12 mb-10 border-solid border-4 border-black">
          <Route path="/" component={Home} />
        </div>
        <footer className="fixed inset-x-0 bottom-0 h-8 bg-blue-500">
          <FooterContainer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
