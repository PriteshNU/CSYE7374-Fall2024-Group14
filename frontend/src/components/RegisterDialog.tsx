import React, { ChangeEvent, FormEvent, useState } from "react";
import User from "../models/UserModel";
import {
  useNavigate,
} from "react-router-dom";
import * as AuthService from "../services/auth-service";
import * as Paths from "../resources/paths";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

type Props = {};

const RegisterDialog = (props: Props) => {
  const [name, setname] = useState("");
  const [email, setEmailID] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const location =useLocation();
  const [activeTab, setActiveTab] = useState<string>(() => (location.state !== null ? location.state : "student"));
  console.log("Register user type:"+location.state)

  const navigate = useNavigate();

  const handleSuccessfulCreation = () => {
    toast.success("Account Created", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleFailedCreation = () => {
    toast.error("Invalid", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setname(value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailID(value);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactNumber(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword(value);
  };
  const handleUniversity = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUniversity(value);
  };
  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const takeToLoginPage = (userType:string) => {
    navigate(Paths.loginPath,{state:userType,replace:true});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (activeTab === "student") {
      try {
        const response = await AuthService.registerUser(
          JSON.stringify({ userName: name, email, contactNumber, password })
        );

        if (!response.ok) {
          handleFailedCreation();
          throw new Error("Network response was not ok");
        }
        if (response.status === 200) {
          navigate(Paths.loginPath);
          handleSuccessfulCreation();
        }
      } catch (error) {
        console.error("Error submitting data", error);
      }
    }
    if (activeTab === "instructor") {
      try {
        const response = await AuthService.registerInstructor(
          JSON.stringify({ name, email, contactNumber, password, university })
        );
        if (response.status === 200) {
          navigate("../user/login");
          handleSuccessfulCreation();
        } else {
          handleFailedCreation();
        }
      } catch (error) {
        console.error("Error submitting data", error);
      }
    }
  };

  return (
    <div>
      <div className="tabs duration-300 flex flex-row justify-between">
        <div
          className={`tab ${
            activeTab === "instructor" ? "active" : ""
          } w-1/2 border-t-2 border-r-2 p-2 transition text-center ${
            activeTab === "instructor"
              ? "border-stone-600 bg-sky-800 text-white font-semibold"
              : "border-transparent text-gray-700 hover:bg-sky-100"
          } rounded-tl-lg shadow-md`}
          onClick={() => handleTabClick("instructor")}
        >
          <button className="focus:outline-none transform transition-transform">
            Instructor Register
          </button>
        </div>
        <div
          className={`tab ${
            activeTab === "student" ? "active" : ""
          } w-1/2 border-t-2 border-l-2 p-2 transition text-center ${
            activeTab === "student"
              ? "border-stone-600 bg-sky-800 text-white font-semibold"
              : "border-transparent text-gray-700 hover:bg-sky-100"
          } rounded-tr-lg shadow-md`}
          onClick={() => handleTabClick("student")}
        >
          <button className="focus:outline-none transform transition-transform">
            Student Register
          </button>
        </div>
      </div>

      <div>
        {activeTab === "student" && (
          <div className="flex-column duration-300 justify-center items-center bg-[#fdebd7] w-full bg-white m-auto w-auto ">
            <form
              onSubmit={handleSubmit}
              className="p-8 mb-4 flex flex-col justify-center items-center "
            >
              <input
                className="input-field"
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={handleNameChange}
              />
              <br />
              <input
                className="input-field"
                type="email"
                name="email"
                value={email}
                placeholder="Email Id"
                onChange={handleEmailChange}
              />
              <br />
              <input
                className="input-field"
                type="text"
                name="number"
                value={contactNumber}
                placeholder="Contact Number"
                onChange={handleNumberChange}
              />
              <br />
              <input
                className="input-field"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <br />
              <br />
              <button className="submit-button" type="submit">
                Create Account
              </button>
              <br />
              <div className="text-center m-2">
                Already a user?{" "}
                <button className="text-light_blue"onClick={() => takeToLoginPage("student")}>
                  Log In
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "instructor" && (
          <div className="flex-column justify-center items-center bg-[#fdebd7] w-full bg-white m-auto w-auto">
            <form
              onSubmit={handleSubmit}
              className="p-8 mb-4 flex flex-col justify-center items-center "
            >
              <input
                className="input-field"
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={handleNameChange}
              />
              <br />
              <input
                className="input-field"
                type="email"
                name="email"
                value={email}
                placeholder="Email Id"
                onChange={handleEmailChange}
              />
              <br />
              <input
                className="input-field"
                type="text"
                name="number"
                value={contactNumber}
                placeholder="Contact Number"
                onChange={handleNumberChange}
              />
              <br />
              <input
                className="input-field"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <br />
              <input
                className="input-field"
                type="text"
                name="university"
                value={university}
                placeholder="University Name"
                onChange={handleUniversity}
              />
              <br />
              <br />
              <button className="submit-button" type="submit">
                Create Account
              </button>
              <br />
              <div className="text-center m-2">
                Already a user?{" "}
                <button className="text-light_blue" onClick={() => takeToLoginPage("instructor")}>
                  Log In
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterDialog;
