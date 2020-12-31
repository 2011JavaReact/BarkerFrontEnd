import React from "react";
import { Link } from "react-router-dom";

// import happyDog from "../images/happy_dog.jpg";

const Home = () => {
  return (
    <div className="bg-happy-dog bg-opacity-10 bg-no-repeat bg-center bg-contain h-full flex flex-col justify-center items-center">
      <div className="text-5xl p-6">Find Your Companion!</div>
      <Link to="users/new">
        <button className="text-3xl rounded-full py-3 px-3 bg-red-400">
          CREATE ACCOUNT
        </button>
      </Link>
      <p>If you are looking for an awesome dog, you need to be on Barker!</p>
      <p>Barker makes it easy to find your perfect companion.</p>
      <p>Just create an account, specify your preferences, and look through</p>
      <p>dogs available for adoption in your area.</p>
      <p>You can "like" a dog and request adoption for your perfect dog.</p>
      <p>Create an account and get started today.</p>
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

export default Home;
