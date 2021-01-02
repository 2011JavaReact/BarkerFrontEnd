import React, { ComponentProps } from "react";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import Axios from "axios";

interface IProps extends RouteComponentProps<any> {
  userId: string;
}

interface IState {
  redirect: boolean;
  preferences: {
    userId: number;
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

export default class UserPreferences extends React.Component<
  IProps & ComponentProps<any>,
  IState
> {
  state = {
    redirect: false,
    preferences: {
      userId: (this.props.location.state.userId as any) || "",
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
    const newPrefs: any = { ...this.state.preferences };

    newPrefs[event.target.name] = event.target.value;
    newPrefs.preferencesSet = true;
    console.log(newPrefs);
    this.setState({ preferences: newPrefs });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>): void | undefined => {
    event.preventDefault();

    Axios.put(
      "http://localhost:8080/users/preferences",
      this.state.preferences
    ).then((resp) => {
      this.setState({ redirect: true });
      console.log(resp.data);
    });
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/users/home",
            state: { userId: this.state.preferences.userId },
          }}
        />
      );
    } else {
      return (
        <div className="flex h-screen justify-center">
          <div className="m-12 w-30% ">
            <div className="text-3xl">Set Dog Preferences</div>
            <form className="flex flex-col" onSubmit={this.handleSubmit}>
              <div className="flex flex-row justify-between items-center">
                <div>Breed</div>

                {console.log("UserID State: ", this.state.preferences.userId)}
                <div>
                  <select
                    className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                    name="breedPreference"
                    onChange={this.handleChange}
                    value={this.state.preferences.breedPreference}
                  >
                    <option value="null">Any</option>
                    <option value="Golden Retreiver">Golden Retreiver</option>
                    <option value="Get List from DB">Get List from DB</option>
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
                    value={this.state.preferences.agePreference}
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
                    value={this.state.preferences.sizePreference}
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
                    value={this.state.preferences.genderPreference}
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
                    value={this.state.preferences.goodWithPreference}
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
                    value={this.state.preferences.coatLengthPreference}
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
                    value={this.state.preferences.energyLevelPreference}
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
                Save Preferences
              </button>
            </form>
            <Link className="text-2xl" to="/">
              Skip Preferences (all available dogs shown)
            </Link>
          </div>
        </div>
      );
    }
  }
}
