import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Link, RouteComponentProps } from "react-router-dom";

interface IProps {
  dogImage: string;
  returnLike: Function;
  returnDislike: Function;
  dogObject: {
    adopted: boolean;
    age: number;
    bio: string;
    breed: string;
    energyLevel: string;
    id: number;
    image: string;
    location: string;
    name: string;
    sex: string;
    sheddingLevel: string;
    shelterId: number;
  };
}

const DogCard: React.FC<IProps> = (props) => {
  const handleLike = () => {
    props.returnLike(props.dogObject.id);
  };

  const handleDislike = () => {
    props.returnDislike(props.dogObject.id);
  };

  return (
    // <div className="flex bg-gray-200 p-8 justify-center h-screen max-h-96 align-middle">
    <div className="flex w-11/12 bg-gradient-to-br from-gray-600 to-purple-600 rounded-xl p-8">
      <div className="flex-none flex w-1/12">
        <button className="content-center" onClick={handleDislike}>
          Growl (Dislike)
        </button>
      </div>
      {/* This is the container for the dog image and information */}
      <div className="flex-none w-10/12 bg-gradient-to-br from-gray-400 to-purple-400 rounded-xl p-2">
        <div className="need">
          <img
            src={props.dogImage}
            alt="Dog Photo"
            className="mx-auto w-3/4 rounded-xl"
          />
        </div>

        {/* This is for the dog information */}
        <div className="flex flex-col w-3/4 mx-auto">
          {/* This is for the dog name and age */}
          <div className="flex text-2xl font-semibold">
            <span>Name: {props.dogObject.name + " ,"}</span>
            <span>&nbsp; Age: {props.dogObject.age}</span>
          </div>

          {/* This is for the other dog attributes */}
          <div className="flex text-xl font-semibold text-gray-700">
            <span>Breed: {props.dogObject.breed + " ,"}</span>
            <span>&nbsp; Gender: {props.dogObject.sex}</span>
          </div>

          <div className="flex text-xl font-semibold text-gray-700">
            <span>Energy Level: {props.dogObject.energyLevel + " ,"}</span>
            <span>&nbsp; Coat Type: {props.dogObject.sheddingLevel}</span>
          </div>
          <div className="text-left text-xl font-semibold text-gray-700">
            About Me: {props.dogObject.bio}
          </div>

          <div className="text-left text-xl font-semibold text-gray-700">
            Located in Shelter #: {props.dogObject.shelterId}
          </div>
        </div>
      </div>
      <div className="flex-none flex content-center w-1/12">
        <button className="none" onClick={handleLike}>
          Bark (Like)
        </button>
      </div>
    </div>
  );
};

export default DogCard;
