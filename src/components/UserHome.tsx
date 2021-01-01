import React from "react";
import { Link } from "react-router-dom";

// import happyDog from "../images/happy_dog.jpg";

const UserHome = () => {
  return (
    <div className="bg-happy-dog bg-opacity-10 bg-no-repeat bg-center bg-contain h-full flex flex-col justify-center items-center">
      <div className="text-5xl p-6">Welcome to Barker!</div>
      <Link to="/users/modify">
        <button className="text-3xl rounded-full py-3 px-3 bg-purple-300">
          Select Preferences
        </button>
      </Link>
      <Link to="/swipe">
        <button className="text-3xl rounded-full py-3 px-3 bg-purple-300">
          Look at Available Dogs
        </button>
      </Link>
      <Link to="/liked">
        <button className="text-3xl rounded-full py-3 px-3 bg-purple-300">
          Look at Available Dogs
        </button>
      </Link>
      <div className="bg-gradient-to-b from-red-400 via-purple-400 to-green-400 rounded-xl p-2 m-2">
        <p>Start by updating your preferences if desired.</p>
        <p>
          Choose "Swipe" to start looking at the dogs available for adoption.
        </p>
        <p>
          Choose "Liked Dogs" to see your potential companions and request an
          adoption.
        </p>
      </div>
      <div>
        <Link to="shelters/new">
          <button className="text-3xl rounded-full py-3 px-3 bg-green-400">
            CREATE SHELTER ACCOUNT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserHome;
