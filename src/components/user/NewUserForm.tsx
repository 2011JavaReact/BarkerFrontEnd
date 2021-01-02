import React from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

interface IProps {
  onCreate: (newName: string, newId: number, newUserType: string) => void;
}

export default class NewUserForm extends React.Component<IProps> {
  state = {
    redirect: false,
    userId: "",
    message: "",
    user: {
      userName: "",
      email: "",
      password: "",
      preferencesSet: false,
    },
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    const newUser: any = { ...this.state.user };
    newUser[event.target.name] = event.target.value;

    this.setState({ user: newUser });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    Axios.post("http://54.215.186.163:8080/Barker-api/users", this.state.user)
      .then((resp) => {
        this.setState({ userId: resp.data.id });
        Axios.post("http://54.215.186.163:8080/Barker-api/login", this.state.user)
          .then((resp) => {
            this.setState({ message: "User Account Successfully Created!" });
            setTimeout(() => this.setState({ redirect: true }), 2000);
            this.props.onCreate(resp.data.userName, resp.data.id, "User");
          })
          .catch((err) => {
            alert("Invalid login");
          });
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to Create Account: Email Address must be unique.");
      });
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/users/home",
            state: { userId: this.state.userId },
          }}
        />
      );
    } else {
      return (
        <>
          <div className="text-green-500 text-4xl">{this.state.message}</div>
          <div className="flex h-screen justify-center">
            <div className="m-12 w-30% ">
              <div className="text-3xl">Create User Account</div>
              <form className="flex flex-col" onSubmit={this.handleSubmit}>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="text"
                  name="userName"
                  required
                  placeholder="Full Name"
                  onChange={this.handleChange}
                  value={this.state.user.userName}
                ></input>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.user.email}
                ></input>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={this.state.user.password}
                ></input>
                <button
                  className="text-2xl rounded-full py-2 px-2 bg-red-400"
                  type="submit"
                >
                  Sign Up!
                </button>
              </form>
              <Link className="text-2xl" to="/shelters/new">
                Create a Shelter Account Instead
              </Link>
            </div>
          </div>
        </>
      );
    }
  }
}
