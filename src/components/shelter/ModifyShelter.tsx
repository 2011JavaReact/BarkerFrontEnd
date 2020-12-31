import React from "react";
import { Redirect, RouteComponentProps, Link } from "react-router-dom";
import Axios from "axios";

interface IProps extends RouteComponentProps<any> {
  shelterId: number;
}

export default class ModifyShelter extends React.Component<IProps> {
  state = {
    redirect: false,
    shelter: {
      id: this.props.shelterId,
      shelterName: "",
      address: "",
      contactInfo: "",
      shelterPassword: "",
    },
  };

  componentDidMount() {
    Axios.get("http://localhost:8080/shelters/" + this.props.shelterId).then(
      (resp) => {
        const newShelter: any = { ...this.state.shelter };
        newShelter.shelterName = resp.data.shelterName;
        newShelter.address = resp.data.address;
        newShelter.contactInfo = resp.data.contactInfo;

        this.setState({ shelter: newShelter });
      }
    );
  }

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    const newShelter: any = { ...this.state.shelter };
    newShelter[event.target.name] = event.target.value;

    this.setState({ shelter: newShelter });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>): void | undefined => {
    event.preventDefault();
    console.log(this.state.shelter);
    Axios.put("http://localhost:8080/shelters/update", this.state.shelter).then(
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
            state: { shelterId: this.state.shelter.id },
          }}
        />
      );
    } else {
      return (
        <div className="flex h-screen justify-center">
          <div className="m-12 w-30% ">
            <div className="text-3xl">Update Shelter</div>
            <form className="flex flex-col" onSubmit={this.handleSubmit}>
              <div className="flex flex-row justify-between items-center">
                <div>Shelter Name</div>
                <div>
                  <input
                    className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                    type="text"
                    name="shelterName"
                    required
                    placeholder="Shelter Name"
                    onChange={this.handleChange}
                    value={this.state.shelter.shelterName}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Address</div>
                <div>
                  <input
                    className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                    type="text"
                    name="address"
                    required
                    placeholder="Address"
                    onChange={this.handleChange}
                    value={this.state.shelter.address}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Contact Information</div>
                <div>
                  <input
                    className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                    type="text"
                    name="contactInfo"
                    required
                    placeholder="Contact Information"
                    onChange={this.handleChange}
                    value={this.state.shelter.contactInfo}
                  ></input>
                </div>
              </div>

              <button
                className="text-2xl rounded-full py-2 px-2 bg-red-400"
                type="submit"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}
