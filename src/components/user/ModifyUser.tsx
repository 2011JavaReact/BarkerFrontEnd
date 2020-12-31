import React, { ComponentProps } from "react";
import { Location } from "history";
import { Link, Route, Redirect, RouteComponentProps } from "react-router-dom";
import Axios from "axios";
import { StaticContext } from "react-router";
import axios from "axios";

interface IProps extends RouteComponentProps<any> {
  userId: number;
}

interface IState {
  redirect: boolean;
  breeds: Array<string> | null;
  user: {
    userId: number;
    userName: string;
    email: string;
    preferencesSet: boolean;
    breedPreference: string;
    agePreference: string;
    sizePreference: string;
    genderPreference: string;
    goodWithPreference: string;
    coatLengthPreference: string;
    energyLevelPreference: string;
  };
}

export default class ModifyUser extends React.Component<
  IProps & ComponentProps<any>,
  IState
> {
  state = {
    redirect: false,
    breeds: [],
    user: {
      userId: -1,
      userName: "",
      email: "",
      preferencesSet: false,
      breedPreference: "any",
      agePreference: "any",
      sizePreference: "any",
      genderPreference: "any",
      goodWithPreference: "any",
      coatLengthPreference: "any",
      energyLevelPreference: "any",
    },
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void | undefined => {
    const newUser: any = { ...this.state.user };

    newUser[event.target.name] = event.target.value;

    this.setState({ user: newUser });
  };

  componentDidMount() {
    // Need to get userId from props and enter here...
    axios
      .get("http://localhost:8080/users/" + this.props.userId)
      .then((resp) => {
        const newUser: any = { ...this.state.user };
        newUser.userId = resp.data.id;
        newUser.userName = resp.data.userName;
        newUser.email = resp.data.email;
        newUser.preferencesSet = resp.data.preferencesSet;
        newUser.breedPreference = resp.data.breedPreference;
        newUser.agePreference = resp.data.agePreference;
        newUser.sizePreference = resp.data.sizePreference;
        newUser.genderPreference = resp.data.genderPreference;
        newUser.goodWithPreference = resp.data.goodWithPreference;
        newUser.coatLengthPreference = resp.data.coatLengthPreference;
        newUser.energyLevelPreference = resp.data.energyLevelPreference;

        this.setState({ user: newUser });

        axios.get("http://localhost:8080/dogs/breeds").then((resp) => {
          const sortedBreeds = resp.data.sort();
          this.setState({ breeds: sortedBreeds });
        });
      });
  }

  breedSelect = () => {
    return this.state.breeds.map((breed) => {
      return <option value={breed}>{breed}</option>;
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>): void | undefined => {
    event.preventDefault();

    Axios.put("http://localhost:8080/users/update", this.state.user).then(
      (resp) => {
        this.setState({ redirect: true });
      }
    );
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { userId: this.props.userId },
          }}
        />
      );
    } else {
      return (
        <div className="flex h-screen justify-center">
          <div className="m-12 w-30% ">
            <div className="text-3xl">Update User</div>
            <form className="flex flex-col" onSubmit={this.handleSubmit}>
              <div className="flex flex-row justify-between items-center">
                <div>Name</div>
                <div>
                  <input
                    className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                    type="text"
                    name="userName"
                    placeholder="Full Name"
                    onChange={this.handleChange}
                    value={this.state.user.userName}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Email</div>
                <div>
                  <input
                    className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.user.email}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Breed</div>
                <div>
                  <select
                    className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                    name="breedPreference"
                    onChange={this.handleChange}
                    value={this.state.user.breedPreference}
                  >
                    <option value="null">Any</option>
                    {this.breedSelect()}
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Age</div>
                <div>
                  <select
                    className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                    name="agePreference"
                    onChange={this.handleChange}
                    value={this.state.user.agePreference}
                  >
                    <option value="null">Any</option>
                    <option value="Puppy">Puppy</option>
                    <option value="Young">1-3 Years</option>
                    <option value="Adult">4-8 Years</option>
                    <option value="Senior">9+ Years</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Size</div>
                <div>
                  <select
                    className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                    name="sizePreference"
                    onChange={this.handleChange}
                    value={this.state.user.sizePreference}
                  >
                    <option value="null">Any</option>
                    <option value="Small">Under 15 lbs</option>
                    <option value="Medium">15 - 35 lbs</option>
                    <option value="Large">35 - 75 lbs</option>
                    <option value="Ex-Large">75+ lbs</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Gender</div>
                <div>
                  <select
                    className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                    name="genderPreference"
                    onChange={this.handleChange}
                    value={this.state.user.genderPreference}
                  >
                    <option value="null">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Good With</div>
                <div>
                  <select
                    className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                    name="goodWithPreference"
                    onChange={this.handleChange}
                    value={this.state.user.goodWithPreference}
                  >
                    <option value="null">Any</option>
                    <option value="Everyone">Everyone</option>
                    <option value="Kids">Kids</option>
                    <option value="Adults">Adults Only</option>
                    <option value="Family">Family Only</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Coat Length</div>
                <div>
                  <select
                    className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                    name="coatLengthPreference"
                    onChange={this.handleChange}
                    value={this.state.user.coatLengthPreference}
                  >
                    <option value="null">Any</option>
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Energy Level</div>
                <div>
                  <select
                    className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                    name="energyLevelPreference"
                    onChange={this.handleChange}
                    value={this.state.user.energyLevelPreference}
                  >
                    <option value="null">Any</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <button
                className="text-2xl rounded-full py-2 px-2 bg-blue-400"
                type="submit"
              >
                Save Updates
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}
