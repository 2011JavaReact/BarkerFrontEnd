import React from "react";
import { Link } from "react-router-dom";
import Center from "../images/adopt-center.jpg";

const ShelterHome = () => {
  return (
    <div className="h-full flex flex-col items-center text-3xl">
      <div className="text-5xl p-6">Welcome Adoption Center!</div>

      <div className="rounded-xl p-2 m-2">
        <p className="m-2">
          Start by adding all your dogs available for adoption.
        </p>
        <Link to="/dog/new">
          <button className="text-3xl rounded-full py-3 px-3 bg-green-300">
            Add Dog
          </button>
        </Link>
      </div>
      <div className="rounded-xl p-2 m-2">
        <p className="m-2">Review and update your existing dogs.</p>

        <Link to="/shelterDogs">
          <button className="text-3xl rounded-full py-3 px-3 bg-green-300">
            Review Dogs
          </button>
        </Link>
      </div>
      <div className="rounded-xl p-2 m-2">
        <p className="m-2">Update Shelter Information.</p>
        <Link to="/shelters/modify">
          <button className="text-3xl rounded-full py-3 px-3 bg-green-300">
            Update Shelter
          </button>
        </Link>
      </div>
      <img className="w-3/4 rounded-lg" src={Center} alt="Dog Wants Walk" />
    </div>
  );
};

export default ShelterHome;
