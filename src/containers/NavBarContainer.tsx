import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/barker2.png";

interface IProps {
  user: string;
  userType: string;
  onLogout: () => void;
  //changeLogin: (newName: string) => void;
}

export default class NavBarContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      user: props.user,
      userType: props.userType,
    };
  }

  changeLogin(newName: string) {
    this.setState({ user: newName });
  }

  render() {
    //Three Conditions.
    //1. Not logged in.
    //2. Logged in as User.
    //3. Logged in as Shelter.

    if (this.props.userType === "User") {
      return (

        <div className="grid grid-cols-6 items-center h-full bg-purple-500">
          <Link to="/users/home">
            <div className="bg-blue-500 w-32 ml-2 p-1">
              <img src={logo} alt="Barker" />
            </div>
          </Link>
          <div className="col-span-3 flex flex-row justify-around p-2">
            <NavLink activeClassName="active" to="/users/modify">
              <div className="rounded-md bg-purple-400 p-0.5">Update User Preferences</div>
            </NavLink>
            <NavLink activeClassName="active" to="/swipe">
              <div className="rounded-md bg-purple-400 p-0.5">Swipe</div>
            </NavLink>
            <NavLink to="/liked">
              <div className="rounded-md bg-purple-400 p-0.5">Liked Dogs</div>
            </NavLink>
          </div>
          <div className="col-span-2 flex flex-row justify-around p-2">
            <div className="rounded-md bg-purple-400 p-0.5">{this.props.user}</div>
            <Link to="/logout">
              <button
                className="rounded-md bg-purple-400 p-0.5"
                onClick={this.props.onLogout}
              >
                LOGOUT
              </button>
            </Link>
          </div>
        </div>
      );
    } else if (this.props.userType === "Shelter") {
      return (
        <div className="grid grid-cols-6 items-center h-full">
          <Link to="/shelters/home">
            <div className="rounded-md bg-purple-400 w-32 ml-2 p-1">
              <img src={logo} alt="Barker" />
            </div>
          </Link>
          <div className="col-span-3 flex flex-row justify-around p-2">
            <NavLink activeClassName="active" to="/shelterDogs">
              <div className="rounded-md bg-purple-400 p-0.5">My Dogs</div>
            </NavLink>
            <NavLink activeClassName="active" to="/dog/new">
              <div className="rounded-md bg-purple-400 p-0.5">Add Dog</div>
            </NavLink>
          </div>
          <div className="col-span-2 flex flex-row justify-around p-2">
            <NavLink activeClassName="active" to="/shelters/modify">
              <div className="rounded-md bg-purple-400 p-0.5">{this.props.user}</div>
            </NavLink>
            <NavLink to="/logout">
              <button
                className="rounded-md bg-purple-400 p-0.5"
                onClick={this.props.onLogout}
              >
                LOGOUT
              </button>
            </NavLink>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-6 items-center h-full">
          <Link to="/">
            <div className="rounded-md bg-purple-400 w-32 ml-2 p-1">
              <img src={logo} alt="Barker" />
            </div>
          </Link>
          <div></div>
          <div></div>
          <div></div>
          <div className="col-span-2 flex flex-row justify-around p-2">
            <NavLink activeClassName="active" to="/login">
              <button className="rounded-md bg-purple-400">LOGIN</button>
            </NavLink>
          </div>
        </div>
      );
    }
  }
}
