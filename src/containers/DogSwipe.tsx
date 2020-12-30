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
  dogArray: Array<dog>;
  currentDog: number;
}

export default class DogSwipe extends React.Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  state = {
    userId: 1,
    dogArray: [],
    currentDog: -1,
  };

  componentDidMount() {
    Axios.get(
      "http://localhost:8080/users/" + this.state.userId + "/dogs"
    ).then((resp) => {
      this.setState({ dogArray: resp.data, currentDog: 0 });
      console.log(resp.data);
    });
  }

  getNextDog = () => {
    if (this.state.currentDog == 0) {
      return <DogCard dogObject={this.state.dogArray[0]} />;
    } else if (this.state.currentDog + 1 < this.state.dogArray.length) {
      return (
        <DogCard dogObject={this.state.dogArray[this.state.currentDog + 1]} />
      );
    }
  };

  render() {
    return (
      <div>
        {console.log(this.state.userId)}
        <h1>Dog swipe</h1>
        {this.getNextDog()}
      </div>
    );
  }
}
