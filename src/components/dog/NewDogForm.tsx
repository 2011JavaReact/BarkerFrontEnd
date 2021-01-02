import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

interface IProps {
  shelterId: number;
}

export default class NewDogForm extends React.Component<IProps> {
  state = {
    redirect: false,
    shelterId: this.props.shelterId,
    dogId: -1,
    message: "",
    dog: {
      name: "",
      age: "",
      sex: "",
      breed: "",
      image: "",
      location: "",
      sheddingLevel: "",
      energyLevel: "",
      bio: "",
      isAdopted: false,
    },
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    const newDog: any = { ...this.state.dog };
    newDog[event.target.name] = event.target.value;
    this.setState({ dog: newDog });
  };

  handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void | undefined => {
    const newSelection: any = { ...this.state.dog };
    newSelection[event.target.name] = event.target.value;
    this.setState({ dog: newSelection });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    console.log(this.state);
    Axios.post(
      "http://54.215.186.163:8080/Barker-api/shelters/" + this.state.shelterId + "/dogs",
      this.state.dog
    ).then((resp) => {
      console.log(resp.data);
      this.setState({
        dogId: resp.data.id,
        message: "Dog Successfully Created!",
      });
      setTimeout(() => this.setState({ redirect: true }), 2000);
    });
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/shelters/home",
            state: { dogId: this.state.dogId },
          }}
        />
      );
    } else {
      return (
        <>
          <div className="text-green-400 text-4xl">{this.state.message}</div>
          <div className="flex h-screen justify-center">
            <div className="m-12 w-40%">
              <div className="text-3xl">Create New Dog</div>
              <form className="flex flex-col" onSubmit={this.handleSubmit}>
                <div>Name</div>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  onChange={this.handleChange}
                  value={this.state.dog.name}
                ></input>
                <div>Age</div>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="number"
                  name="age"
                  required
                  placeholder="Age (years)"
                  onChange={this.handleChange}
                  value={this.state.dog.age}
                ></input>
                <div>Gender</div>
                <select
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  name="sex"
                  required
                  onChange={this.handleSelect}
                  value={this.state.dog.sex}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div>Breed</div>
                <input
                  className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                  name="breed"
                  required
                  placeholder="Breed"
                  onChange={this.handleChange}
                  value={this.state.dog.breed}
                ></input>
                <div>Image Link</div>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="text"
                  name="image"
                  placeholder="Link to Image"
                  onChange={this.handleChange}
                  value={this.state.dog.image}
                ></input>
                <div>Shedding Level</div>
                <select
                  className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                  name="sheddingLevel"
                  required
                  onChange={this.handleSelect}
                  value={this.state.dog.sheddingLevel}
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div>Energy Level</div>
                <select
                  className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                  name="energyLevel"
                  required
                  onChange={this.handleSelect}
                  value={this.state.dog.energyLevel}
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div>Bio</div>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  onChange={this.handleChange}
                  value={this.state.dog.bio}
                ></input>

                <button
                  className="text-2xl rounded-md py-2 px-2 mt-5 mb-20 bg-blue-300"
                  type="submit"
                >
                  Create Dog
                </button>
              </form>
            </div>
          </div>
        </>
      );
    }
  }
}
