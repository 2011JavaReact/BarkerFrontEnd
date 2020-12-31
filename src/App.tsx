import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
} from "react-router-dom";
import NavBarContainer from "./containers/NavBarContainer";
import Home from "./components/Home";
import FooterContainer from "./containers/FooterContainer";
import NewUserForm from "./components/user/NewUserForm";
import NewDogForm from "./components/dog/NewDogForm";
import UserPreferences from "./components/user/UserPreferences";
import DogCard from "./components/dog/DogCard";
import DogSwipe from "./containers/DogSwipe";

import { stringify } from "postcss";
import LoginForm from "./components/LoginForm";
import NewShelterForm from "./components/shelter/NewShelterForm";
import ModifyUser from "./components/user/ModifyUser";
import ModifyShelter from "./components/shelter/ModifyShelter";

interface IProps {}

interface IState {
  username: string;
  id: number;


class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    if (localStorage.getItem("username") == null) {
      localStorage.setItem("username", "none");
      localStorage.setItem("id", "-1");
      localStorage.setItem("userType", "none");
    }
    this.state = {
      username: localStorage.getItem("username")!,
      id: parseInt(localStorage.getItem("id")!, 10),
      userType: localStorage.getItem("userType")!,
    };
  }

  onLogin(newName: string, newId: number, newUserType: string) {
    this.setState({ username: newName, id: newId, userType: newUserType });
    localStorage.setItem("username", newName);
    localStorage.setItem("id", newId.toString());
    localStorage.setItem("userType", newUserType);
  }

  onLogout() {
    this.setState({ username: "none", id: -1, userType: "none" });
    localStorage.clear();

    //loginShelter(shelterName: string, shelterId: number) {
    //this.setState({ shelterName: shelterName, shelterId: shelterId });
  }

  render() {
    return (
      <Router>
        <div className="App mx-auto text-2xl">
          <nav className="fixed inset-x-0 top-0 h-12 bg-gray-500">
            <NavBarContainer
              userType={this.state.userType}
              user={this.state.username + ": " + this.state.id}
              onLogout={this.onLogout.bind(this)}
            ></NavBarContainer>
          </nav>
          <div className="main-container h-screen mt-12 mb-10">
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/users/new"
              render={(routerProps) => (
                <NewUserForm
                  {...routerProps}
                  onCreate={this.onLogin.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/shelters/new"
              render={(routerProps) => (
                <NewShelterForm
                  {...routerProps}
                  onCreate={this.onLogin.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/shelters/modify"
              render={(routerProps) => (
                <ModifyShelter {...routerProps} shelterId={this.state.id} />
              )}
            />

            <Route
              exact
              path="/login"
              render={(routerProps) => (
                <LoginForm {...routerProps} onLogin={this.onLogin.bind(this)} />
              )}
            />
            {/* <Route exact path="/logout"   render={(routerProps) => <LoginForm {...routerProps} onLogin = {this.onLogin.bind(this)} /> }  /> */}
            <Route
              exact
              path="/users/preferences"
              render={(routerProps) => <UserPreferences {...routerProps} />}
            />

            <Route exact path="/dog" component={ NewDogForm }/>
            <Route exact path="/dogs" component={ DogCard }/>

            <Route
              exact
              path="/users/modify"
              render={(routerProps) => (
                <ModifyUser {...routerProps} userId={this.state.id} />
              )}
            />

            <Route
              exact
              path="/dog/new"
              render={(routerProps) => (
                <NewDogForm {...routerProps} shelterId={this.state.id} />
              )}
            />

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
