import React from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import { getJSDocAugmentsTag } from "typescript";

interface IProps {
  shelterId: number;
}

interface IState{
    redirect: boolean,
    dog: {
        id: number,
        name: string,
        age: string,
        sex: string,
        breed: string,
        image: string,
        sheddingLevel: string,
        energyLevel: string,
        bio: string,
        isAdopted: boolean
    }
}


 export default class EditDogForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            redirect: false,
            dog: {
                id: -1,
                name: "",
                age: "",
                sex: "",
                breed: "",
                image: "",
                sheddingLevel: "",
                energyLevel: "",
                bio: "",
                isAdopted: false,
              }
        };
        this.getDog();
      }

      getDog = (): void => {
        Axios.get("http://54.215.186.163:8080/Barker-api/dogs/" + localStorage.getItem("dogId")).then((resp) => {
          console.log(resp.data);
          this.setState({ dog: resp.data })
          console.log("State: " + this.state.dog);
        }).catch(err => {alert("There was an error updating the dog")});    
  }

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    const newDog: any = { ...this.state.dog };
    newDog[event.target.name] = event.target.value;
    this.setState({ dog: newDog });
    console.log(this.state.dog);
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
    Axios.put(
      "http://54.215.186.163:8080/Barker-api/dogs/update",
      this.state.dog
    ).then((resp) => {
      console.log(resp.data);
      this.setState({redirect: true });
    });
  };

  getAdoptedValue = (adopted: boolean): string =>
  {
    return adopted ? "Adopted" : "Available";
  }

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/shelterDogs",
          }}
        />
      );
    } else {
      return (
        <div className="flex h-screen justify-center">
          <div className="m-12 w-40%">
            <div className="text-3xl">Update Dog</div>
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

            {/* <div>Is Adopted?</div>
              <select
                className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                name="isAdopted"
                required
                onChange={this.handleAdopted}
                value={this.state.dog.isAdopted}
              >
                <option value={0}>Available</option>
                <option value={1}>Adopted</option>
              </select> */}
              {/* <input type="checkbox" name='isAdopted' onChange={this.handleChecked}/> */}
              <button
                className="text-2xl rounded-md py-2 px-2 mt-5 mb-20 bg-blue-300"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}
