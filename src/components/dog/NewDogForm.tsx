import React from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import NewUserForm from "../user/NewUserForm";

export default class NewDogForm extends React.Component {
    state = {
        redirect: false,
        userId: "",
        dog: {
            dogId: "",
            dogName: "",
            dogAge: "",
            dogSex: "",
            dogBreed: "",
            dogImage: "",
            dogLocation: "",
            dogSheddingLevel: "",
            dogEnergyLevel: "",
            dogBio: "",
            dogIsAdopted: false,
        },
    };

    handleChange = ( event: React.ChangeEvent<HTMLInputElement> ): void | undefined => {
        const newDog: any = { ...this.state.dog };
        newDog[event.target.name] = event.target.value;
        this.setState({ dog: newDog });
    };

    handleSelect = ( event: React.ChangeEvent<HTMLSelectElement> ): void | undefined => {
        const newSelection: any = { ...this.state.dog };
        newSelection[event.target.name] = event.target.value;
        this.setState({ dog: newSelection });
    }

    handleSubmit = ( event: React.FormEvent<HTMLElement> ): void => {
        event.preventDefault();
        console.log(this.state);
        Axios.post("http://localhost:8080/dogs", this.state.dog).then((resp) => {
            console.log(resp.data);
            this.setState({ dogId: resp.data.id, redirect: true});
        });
    };
    
    render(): React.ReactNode {
        if(this.state.redirect) {
            return (
                <Redirect
                to = {{
                    pathname: "/",
                    state: { userId: this.state.userId }
                }}/>
            );
        } else {
            return (
                <div className="flex h-screen justify-center">
                    <div className="m-12 w-40%">
                        <div className="text-3xl">Create New Dog</div>
                        <form className="flex flex-col" onSubmit={ this.handleSubmit }>
                            <div>Name</div>
                            <input
                                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                                type="text"
                                name="dogName"
                                placeholder="Name"
                                onChange={ this.handleChange }
                                value={ this.state.dog.dogName }
                            ></input>
                            <div>Age</div>
                            <input
                                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                                type="number"
                                name="dogAge"
                                placeholder="Age (years)"
                                onChange={ this.handleChange }
                                value={ this.state.dog.dogAge }
                            ></input>
                            <div>Sex</div>
                            <select
                                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                                name="dogSex"
                                placeholder="Sex"
                                onChange={ this.handleSelect }
                                value={ this.state.dog.dogSex }
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <div>Breed</div>
                            <select
                                className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                                name="dogBreed"
                                placeholder="Breed"
                                onChange={ this.handleSelect }
                                value={ this.state.dog.dogBreed }
                            >
                                <option value="Alaskan Malamute">Alaskan Malamute</option>
                                <option value="Golden Retriever">Golden Retriever</option>
                                <option value="TODO">TODO: GET BREEDS FROM DB.</option>
                            </select>
                            <div>Image</div>
                            <div>Shedding Level</div>
                            <select
                                className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                                name="dogSheddingLevel"
                                placeholder="Shedding Level"
                                onChange={ this.handleSelect }
                                value={ this.state.dog.dogSheddingLevel }
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <div>Energy Level</div>
                            <select
                                className="m-2 p-2 w-60 rounded-md border-solid border-2 border-gray-400 text-left"
                                name="dogEnergyLevel"
                                placeholder="Energy Level"
                                onChange={ this.handleSelect }
                                value={ this.state.dog.dogEnergyLevel }
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <div>Bio</div>
                            <button
                                className="text-2xl rounded-md py-2 px-2 bg-blue-300"
                                type="submit"
                            >Create Dog</button>
                        </form>

                    </div>
                </div>

            )
        }
    }
}
