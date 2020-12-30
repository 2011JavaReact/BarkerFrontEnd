import React, { ReactPropTypes } from "react";
import { Redirect, RouteComponentProps, Link } from "react-router-dom";
import Axios from "axios";

interface IProps {
  onLogin: (newName: string, id: number) => void;
}

export default class LoginForm extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  state = {
    redirect: false,
    user: {
      userName: "",
      password: "",
    },
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    const newUser: any = { ...this.state.user };
    newUser[event.target.name] = event.target.value;

    this.setState({ user: newUser });
  };

  //Change this to Login in. Needs error if login unsuccessful
  //And redirect with this state if successful
  handleSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    console.log(this.state);
    // Axios.post("http://localhost:8080/users", this.state.user).then((resp) => {
    //   console.log(resp.data);
    //   this.setState({ userId: resp.data.id, redirect: true });
    // });
    this.setState({ redirect: true });
    this.props.onLogin(this.state.user.userName, 3);
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    } else {
      return (
        <div className="flex h-screen justify-center">
          <div className="m-12 w-30% ">
            <div className="text-3xl">Login Form</div>
            <form className="flex flex-col" onSubmit={this.handleSubmit}>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="text"
                ref="username"
                name="userName"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.user.userName}
              ></input>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.user.password}
              ></input>
              <button
                className="text-2xl rounded-full py-2 px-2 bg-red-400"
                type="submit"
              >
                Login!
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}
