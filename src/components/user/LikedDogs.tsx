import React from "react";
import { Redirect, RouteComponentProps, Link } from "react-router-dom";
import Axios from "axios";

interface IProps {
    userId: number;
  }
interface IState{
  dogs: Array<dog>;
}
interface dog{
    id: number,
    name: string,
    age: string,
    breed: string,
    image: string,
    sex: string,
    location: string,
    sheddingLevel: string,
    energyLevel: string,
    bio: string,
    adopted: boolean,
    shelterId: number
}


export default class LikedDogs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dogs: []
    }
    this.getDogs();
  }

    unLikeDog = (): void => {
      alert("Not implemented yet");
    }


    getDogs = (): void => {
          Axios.get("http://localhost:8080/users/" + this.props.userId).then((resp) => {
            //console.log(resp.data.dogs);
            resp.data.likedDogs.forEach( (value: dog) => {
                //console.log(value.bio);
                this.state.dogs.push(value);
            })
            this.setState({dogs: this.state.dogs});
          }).catch(err => {alert("There was an error getting the dogs")});
        
    }

  render(): React.ReactNode {
    return(
        <div>
        {this.state.dogs.map(({name, image, age, sex, adopted}) => (
          <div>
            <p>{name}, {age}, {sex}, {adopted.toString()}</p>
            <img
                width="200"
                height="100"
                src={image}
                alt={"Picture Unavailable"}
              />
              <button className="text-2xl rounded-full py-2 px-2 bg-red-400" onClick={this.unLikeDog}>
                Unlike Dog
                </button>
            <p> ------------------------- </p>
            </div>         
        ))}
        </div>
    );
}
}

