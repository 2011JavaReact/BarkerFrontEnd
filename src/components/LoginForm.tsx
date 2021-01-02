import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

interface IProps {
  onLogin: (newName: string, id: number, newUserType: string) => void;
}

export default class LoginForm extends React.Component<IProps> {
  // constructor(props: IProps) {
  //   super(props);
  // }
  state = {
    placeholderValue: "Email",
    redirect: false,
    redirectTo: "/",
    userType: "User",
    message: "",
    user: {
      email: "",
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

  handleSelect = (): void => {
    this.setState({
      userType: this.state.userType === "User" ? "Shelter" : "User",
    });
    this.setState({
      placeholderValue:
        this.state.placeholderValue === "Email" ? "Username" : "Email",
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    if (this.state.userType === "User") {
      console.log(this.state);
      Axios.post("http://54.215.186.163:8080/Barker-api/login", this.state.user)
        .then((resp) => {
          console.log(resp.data);
          this.setState({ message: "Login Successful!" });
          setTimeout(() => this.setState({ redirect: true }), 2000);
          this.setState({ redirect: true, redirectTo: "/users/home" });
          this.props.onLogin(resp.data.userName, resp.data.id, "User");
        })
        .catch((err) => {
          alert("Invalid login");
        });
    } else if (this.state.userType === "Shelter") {
      Axios.post("http://54.215.186.163:8080/Barker-api/shelterLogin", {
        shelterName: this.state.user.email,
        shelterPassword: this.state.user.password,
      })
        .then((resp) => {
          console.log(resp.data);
          this.setState({ message: "Login Successful!" });
          setTimeout(() => this.setState({ redirect: true }), 2000);

          this.setState({ redirect: true, redirectTo: "/shelters/home" });
          this.props.onLogin(resp.data.shelterName, resp.data.id, "Shelter");
        })
        .catch((err) => {
          alert("Invalid login");
        });
    }
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirectTo,
          }}
        />
      );
    } else {
      return (
        <div className="flex h-screen justify-center">
          <div className="m-12 w-30% ">
            <div className="text-green-400 text-4xl">{this.state.message}</div>
            <div className="text-3xl">Welcome Bark!</div>
            <form className="flex flex-col" onSubmit={this.handleSubmit}>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="text"
                name="email"
                placeholder={this.state.placeholderValue}
                onChange={this.handleChange}
                value={this.state.user.email}
              ></input>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.user.password}
              ></input>
              <div>
                <input type="checkbox" onChange={this.handleSelect} />
                <label> Shelter Login?</label>
              </div>
              <button
                className="text-2xl rounded-full py-2 px-2 bg-red-400"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}
