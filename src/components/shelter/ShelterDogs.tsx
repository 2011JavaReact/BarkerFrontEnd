import React from "react";
import { Redirect, RouteComponentProps, Link } from "react-router-dom";
import Axios from "axios";

interface IProps {
  shelterId: number;
}
interface IState {
  dogs: Array<dog>;
}
interface dog {
  id: number;
  name: string;
  age: string;
  breed: string;
  image: string;
  sex: string;
  location: string;
  sheddingLevel: string;
  energyLevel: string;
  bio: string;
  adopted: boolean;
  shelterId: number;
}

export default class ShelterDogs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dogs: [],
    };
    this.getDogs();
  }

  editDog = (dogId: number): void => {
    localStorage.setItem("dogId", dogId.toString());
  }

  getAdoptedText = (adopted: boolean): string =>
  {
    return adopted ? "Adopted" : "Available";
  }

  getDogs = (): void => {
    Axios.get(
      "http://54.215.186.163:8080/Barker-api/shelters/" + this.props.shelterId
    )
      .then((resp) => {
        //console.log(resp.data.dogs);
        resp.data.dogs.forEach((value: dog) => {
          //console.log(value.bio);
          this.state.dogs.push(value);
        });
        this.setState({ dogs: this.state.dogs });
      })
      .catch((err) => {
        alert("There was an error getting the dogs");
      });
  };


  render(): React.ReactNode {
    return (
      <div>

        {this.state.dogs.length < 1 ? (
          <p className="text-yellow-400 text-3xl">
            No Dogs Yet - Select "Add Dog" to add your available dogs!
          </p>
        ) : null}
        {this.state.dogs.map(({ id, name, image, age, sex, adopted, sheddingLevel,energyLevel, bio }) => (
          <div key={id}>
            <p>
              {name}, {age}, {sex}, {this.getAdoptedText(adopted)}
            </p>
            <p>Shedding Level: {sheddingLevel}</p>
            <p>Energy Level: {energyLevel}</p>
            <p>{bio}</p>
            <img className="object-center mx-auto"
              width="200"
              height="100"
              src={image}
              alt={"Picture Unavailable"}
            />
              <Link to="/dog/modify">
              <button className="text-2xl rounded-full py-2 px-2 bg-red-400" onClick={this.editDog.bind(this, id)}>
                Edit Dog
              </button>
              </Link>
            <p> ------------------------- </p>
          </div>
        ))}
      </div>
    );
  }
}
