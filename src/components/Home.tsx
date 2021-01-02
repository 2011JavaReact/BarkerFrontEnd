import React from "react";
import { Link } from "react-router-dom";

import happyDog from "../images/happy-dog.jpg";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-5xl p-6">Find Your Companion!</div>
      <Link to="users/new">
        <button className="text-3xl rounded-full py-3 px-3 bg-red-400">
          CREATE ACCOUNT
        </button>
      </Link>
      <div className="bg-gradient-to-b from-red-400 via-purple-400 to-green-400 rounded-xl p-2 m-2">
        <p>If you are looking for an awesome dog, you need to be on Barker!</p>
        <p>Barker makes it easy to find your perfect companion.</p>
        <p>
          Just create an account, specify your preferences, and look through
        </p>
        <p>dogs available for adoption in your area.</p>
        <p>You can "like" a dog and request adoption for your perfect dog.</p>
        <p>Create an account and get started today.</p>
      </div>
      <div>
        <Link to="shelters/new">
          <button className="text-3xl rounded-full py-3 px-3 bg-green-400">
            CREATE SHELTER ACCOUNT
          </button>
        </Link>
        {/* <div className="bg-happy-dog bg-opacity-10 bg-no-repeat bg-center bg-contain rounded-lg mt-2 h-600"></div> */}
        <img
          className="mt-2 p-12 w-screen max-w-screen-lg mx-auto rounded-lg"
          src={happyDog}
          alt="Dog and Family"
        />
      </div>
    </div>
  );
};

export default Home;
