import React from "react";
import { RouteComponentProps } from "react-router-dom";
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
  shelter: string;
  shelterId: number;
}

interface IState {
  userId: number;
  // dogImage: string;
  dogArray: Array<dog>;
  currentDog: number;
}

export default class DogSwipe extends React.Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  state = {
    userId: this.props.userId,
    // dogImage: "",
    dogArray: [
      {
        adopted: false,
        age: 0,
        bio: "",
        breed: "",
        energyLevel: "",
        id: 0,
        image: "",
        location: "",
        name: "",
        sex: "",
        sheddingLevel: "",
        shelter: "",
        shelterId: 0,
      },
    ],
    currentDog: 0,
  };

  componentDidMount() {
    Axios.get(
      "http://54.215.186.163:8080/Barker-api/users/" +
        this.state.userId +
        "/dogs"
    ).then((resp) => {
      this.setState({ dogArray: resp.data });
      // if (this.state.dogArray.length > 0) {
      //   this.getDogImage(this.state.dogArray[this.state.currentDog].breed);
      // }
    });
  }

  handleLike = (dogId: number) => {
    Axios.get(
      "http://54.215.186.163:8080/Barker-api/users/" +
        this.state.userId +
        "/dogs/" +
        dogId +
        "/like"
    ).then((resp) => {
      // this.getDogImage();
      this.setState({ currentDog: this.state.currentDog + 1 });
      this.getDogObjectReady();
    });
  };

  handleDislike = (dogId: number) => {
    Axios.get(
      "http://54.215.186.163:8080/Barker-api/users/" +
        this.state.userId +
        "/dogs/" +
        dogId +
        "/dislike"
    ).then((resp) => {
      // this.getDogImage();
      this.setState({ currentDog: this.state.currentDog + 1 });
      this.getDogObjectReady();
    });
  };

  // getDogImage = (dogBreed: string) => {
  //   // get random image -TODO: TIE TO SPECIFIC BREED!!!
  //   const urlArray = dogBreed.split(" ");
  //   const newArray: Array<string> = [];

  //   for (let i = urlArray.length - 1; i >= 0; i--) {
  //     newArray.push(urlArray[i].toLowerCase());
  //   }

  //   Axios.get(
  //     "https://dog.ceo/api/breed/" + newArray.join("-") + "/images/random"
  //   )
  //     .then((resp) => {
  //       this.setState({ dogImage: resp.data.message });
  //       // this.setState({ currentDog: (this.state.currentDog += 1) });
  //     })
  //     .catch((err) => {
  //       Axios.get("https://dog.ceo/api/breeds/image/random").then((resp) => {
  //         this.setState({ dogImage: resp.data.message });
  //         // this.setState({ currentDog: (this.state.currentDog += 1) });
  //       });
  //     });
  // };

  getDogObjectReady = () => {
    if (
      this.state.currentDog + 1 < this.state.dogArray.length &&
      this.state.dogArray.length > 0
    ) {
      //this.getDogImage(this.state.dogArray[this.state.currentDog].breed);
    } else {
      return (
        <p>
          No more dogs available. Review your "liked" dogs or check back later
          to review additional dogs.
        </p>
      );
    }
  };

  getDogCard = () => {
    if (
      this.state.dogArray.length > 0 &&
      this.state.currentDog < this.state.dogArray.length
    ) {
      return (
        <DogCard
          // dogImage={[this.state.currentDog].}
          returnLike={this.handleLike}
          returnDislike={this.handleDislike}
          dogObject={this.state.dogArray[this.state.currentDog]}
        />
      );
    } else {
      return (
        <p>
          No more dogs available. Review your "liked" dogs or check back later
          to review additional dogs.
        </p>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="bg-gray-200 p-4 min-h-screen mx-auto">
          <h1>Swipe Through Available Dogs!</h1>
          <div>{this.getDogCard()}</div>
        </div>
      </div>
    );
  }
}
