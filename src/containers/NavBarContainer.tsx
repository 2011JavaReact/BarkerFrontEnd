import React from "react";
import { NavLink } from "react-router-dom";

export default class NavBarContainer extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="grid grid-cols-6 items-center h-full">
        <NavLink to="/">
          <div className="bg-blue-500">Barker</div>
        </NavLink>
        <div className="col-span-3 flex flex-row justify-around p-2">
          <NavLink to="/users/preferences">
            <div className="bg-blue-500">User Preferences</div>
          </NavLink>
          <div className="bg-blue-500">Nav 2</div>
          <div className="bg-blue-500">Nav 3</div>
        </div>
        <div className="col-span-2 flex flex-row justify-around p-2">
          <button className="rounded-md bg-white">LOGIN</button>
          <div className="bg-blue-500">Username if logged in</div>
        </div>
      </div>
    );
  }
}
