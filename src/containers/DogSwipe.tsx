import React from "react";
import { Link, Route, Redirect, RouteComponentProps } from "react-router-dom";
import Axios from "axios";
import DogCard from "../components/dog/DogCard";

interface IProps extends RouteComponentProps<any> {
  userId: number;
}

interface dog {
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
}

interface IState {
  userId: number;
  dogImage: string;
  dogArray: Array<dog>;
  currentDog: number;
}

export default class DogSwipe extends React.Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  state = {
    userId: this.props.userId,
    dogImage: "",
    dogArray: [],
    currentDog: -1,
  };

  componentDidMount() {
    Axios.get(
      "http://localhost:8080/users/" + this.state.userId + "/dogs"
    ).then((resp) => {
      this.setState({ dogArray: resp.data });
      console.log(resp.data);
      this.getDogImage();
    });
  }

  handleLike = (dogId: number) => {
    Axios.get(
      "http://localhost:8080/users/" +
        this.state.userId +
        "/dogs/" +
        dogId +
        "/like"
    ).then((resp) => {
      this.getDogImage();
      this.setState({ currentDog: this.state.currentDog + 1 });
    });
  };

  handleDislike = (dogId: number) => {
    Axios.get(
      "http://localhost:8080/users/" +
        this.state.userId +
        "/dogs/" +
        dogId +
        "/dislike"
    ).then((resp) => {
      this.getDogImage();
      this.setState({ currentDog: this.state.currentDog + 1 });
    });
  };

  getDogImage = () => {
    // get random image -TODO: TIE TO SPECIFIC BREED!!!

    Axios.get("https://dog.ceo/api/breeds/image/random").then((resp) => {
      console.log(resp.data);
      this.setState({ dogImage: resp.data.message });
    });
  };

  getDogCard = () => {
    if (this.state.dogArray.length > 0) {
      return (
        <DogCard
          dogImage={this.state.dogImage}
          returnLike={this.handleLike}
          returnDislike={this.handleDislike}
          dogObject={this.state.dogArray[this.state.currentDog + 1]}
        />
      );
    } else {
      return <p>No Dog</p>;
    }
  };

  render() {
    return (
      <div>
        {console.log(this.state.userId)}
        <h1>Swipe Through Available Dogs!</h1>
        <div className="bg-gray-200 p-8 h-screen">
          <div>{this.getDogCard()}</div>
        </div>
      </div>
    );
  }
}
