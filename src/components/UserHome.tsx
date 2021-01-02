import React from "react";
import { Link } from "react-router-dom";
import DogWalkImage from "../images/dog-walk.jpg";

const UserHome = () => {
  return (
    <div className="h-full flex flex-col items-center text-3xl">
      <div className="text-5xl p-6">Welcome to Barker!</div>

      <div className="rounded-xl p-2 m-2">
        <p className="m-2">Start by updating your preferences if desired.</p>
        <Link to="/users/modify">
          <button className="text-3xl rounded-full py-3 px-3 bg-purple-300">
            Select Dog Preferences
          </button>
        </Link>
      </div>
      <div className="rounded-xl p-2 m-2">
        <p className="m-2">
          Choose "Swipe" to start looking at the dogs available for adoption.
        </p>

        <Link to="/swipe">
          <button className="text-3xl rounded-full py-3 px-3 bg-purple-300">
            Look at Available Dogs
          </button>
        </Link>
      </div>
      <div className="rounded-xl p-2 m-2">
        <p className="m-2">
          Choose "Liked Dogs" to see your potential companions and request an
          adoption.
        </p>
        <Link to="/liked">
          <button className="text-3xl rounded-full py-3 px-3 bg-purple-300">
            View Liked Dogs
          </button>
        </Link>
      </div>
      <img className="rounded-lg" src={DogWalkImage} alt="Dog Wants Walk" />
    </div>
  );
};

export default UserHome;
