import React from "react";

interface IProps {
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
  return (
    <div>
      {console.log(props.dogObject)}
      <h1>Dog Card</h1>
      <p>{props.dogObject.name}</p>
      <p>{props.dogObject.breed}</p>
    </div>
  );
};

export default DogCard;
