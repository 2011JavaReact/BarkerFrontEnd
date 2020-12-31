import Axios from "axios";
import React from "react";
import { Redirect, Link, RouteComponentProps } from "react-router-dom";

interface IProps {
    userId: number;
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

interface IState {
    shelterId: number;
}


export default class DogCard extends React.Component<IProps & RouteComponentProps<any>, IState> {

    handleLike = ( event: React.MouseEvent<HTMLButtonElement> ): void => {
        Axios.get(
            ""
        ).then()

    }

    handleDislike = ( event: React.MouseEvent<HTMLButtonElement>): void => {
        Axios.get(
            ""
        ).then()

    }

    render() {
        return (
            <div className="flex bg-gray-200 p-8 justify-center h-screen max-h-96 align-middle">
                <div className="flex w-11/12 bg-gradient-to-br from-gray-600 to-purple-600 rounded-xl p-8 justify-center">
                    <button 
                        className="inline-block my-auto"
                        onClick={(event) => {this.handleDislike}}
                    >Dislike</button>
                    <div className="flex w-11/12 bg-gradient-to-br from-gray-400 to-purple-400 rounded-xl p-8 justify-center">
                        <div className="flex-none w-32 relative">
                            <img src="/images/happy-dog.jpg" alt="" className="absolute inset-0 w-full object-cover"/>
                        </div>
                        <form className="flex-auto p-6">
                            <div className="flex flex-wrap mx-auto">
                                <h1 className="flex-auto text-xl font-semibold">{ this.props.dogObject.name + ", "} </h1>
                                <div className="text-xl font-semibold text-gray-700">{ this.props.dogObject.age + ", "}</div>
                                <div className="text-xl font-semibold text-gray-700">{ this.props.dogObject.sex + ", "}</div>
                                <div className="text-xl text-gray-700">{ this.props.dogObject.breed + " "}</div>
                            </div>
                            <div className="flex flex-wrap">
                                <h1 className="flex-auto text-xl font-semibold">Energy Level:</h1>
                                <div className="text-xl font-semibold text-gray-700">{ this.props.dogObject.energyLevel }</div>
                            </div>
                            <div className="flex flex-wrap">
                                <h1 className="flex-auto text-xl font-semibold">Shedding Level:</h1>
                                <div className="text-xl font-semibold text-gray-700">{ this.props.dogObject.sheddingLevel }</div>
                            </div>
                            <div className="flex flex-wrap">
                                <h1 className="flex-auto text-xl font-semibold">Bio:</h1>
                                <div className="text-xl font-semibold text-gray-700">{ this.props.dogObject.bio }</div>
                            </div>
                            <div className="flex flex-wrap">
                                <h1 className="flex-auto text-xl font-semibold">Located in Shelter #</h1>
                                <div className="text-xl font-semibold text-gray-700">{ this.state.shelterId }</div>
                            </div>
                        </form>
                    </div>
                    <button 
                        className="inline-block  my-auto"
                        onClick={(event) => {this.handleLike}}
                    >Like</button>
                </div>
                
            </div>
        );
    };
}