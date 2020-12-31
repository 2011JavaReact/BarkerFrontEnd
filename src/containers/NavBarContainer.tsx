import React from "react";
import { NavLink } from "react-router-dom";

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

    if (this.props.userType == "User") {
      return (
        <div className="grid grid-cols-6 items-center h-full">
          <NavLink to="/">
            <div className="bg-blue-500">Barker</div>
          </NavLink>
          <div className="col-span-3 flex flex-row justify-around p-2">
            <NavLink to="/users/modify">
              <div className="bg-blue-500">Update User Preferences</div>
            </NavLink>
            <NavLink to="/swipe">
              <div className="bg-blue-500">Swipe</div>
            </NavLink>
            <NavLink to="/liked">
            <div className="bg-blue-500">Liked Dogs</div>
            </NavLink>
          </div>
          <div className="col-span-2 flex flex-row justify-around p-2">
            <div className="bg-blue-500">{this.props.user}</div>
            <NavLink to="/">
              <button
                className="rounded-md bg-white"
                onClick={this.props.onLogout}
              >
                LOGOUT
              </button>
            </NavLink>
          </div>
        </div>
      );
    } else if (this.props.userType == "Shelter") {
      return (
        <div className="grid grid-cols-6 items-center h-full">
          <NavLink to="/">
            <div className="bg-blue-500">Barker</div>
          </NavLink>
          <div className="col-span-3 flex flex-row justify-around p-2">
          <NavLink to="/shelterDogs">
            <div className="bg-blue-500">My Dogs</div>
            </NavLink>
            <NavLink to="/dog/new">
              <div className="bg-blue-500">Add Dog</div>
            </NavLink>
          </div>
          <div className="col-span-2 flex flex-row justify-around p-2">
            <NavLink to="/shelters/modify">
              <div className="bg-blue-500">{this.props.user}</div>
            </NavLink>
            <NavLink to="/">
              <button
                className="rounded-md bg-white"
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
          <NavLink to="/">
            <div className="bg-blue-500">Barker</div>
          </NavLink>
          <div></div>
          <div></div>
          <div></div>
          <div className="col-span-2 flex flex-row justify-around p-2">
            <NavLink to="/login">
              <button className="rounded-md bg-white">LOGIN</button>
            </NavLink>
          </div>
        </div>
      );
    }
  }
}
