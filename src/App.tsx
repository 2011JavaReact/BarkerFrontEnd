import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import NavBarContainer from "./containers/NavBarContainer";
import Home from "./components/Home";
import FooterContainer from "./containers/FooterContainer";
import NewUserForm from "./components/user/NewUserForm";
import UserPreferences from "./components/user/UserPreferences";
import NewDogForm from "./components/dog/NewDogForm";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App mx-auto text-2xl">
          <nav className="fixed inset-x-0 top-0 h-12 bg-gray-500">
            <NavBarContainer />
          </nav>
          <div className="main-container h-screen mt-12 mb-10">
            <Route exact path="/" component={Home} />
            <Route exact path="/users/new" component={NewUserForm} />
            <Route
              exact
              path="/users/preferences"
              render={(routerProps) => <UserPreferences {...routerProps} />}
            />
            <Route exact path="/dog" component={ NewDogForm }/>
          </div>
          <footer className="fixed inset-x-0 bottom-0 h-8 bg-blue-500">
            <FooterContainer />
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
