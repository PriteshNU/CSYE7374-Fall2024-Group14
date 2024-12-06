import React from "react";
import RegisterDialog from "../components/RegisterDialog";
import LoginPage from "../components/LoginDialog";
import logo from "../resources/knowledgeForge.png";
import "./CSS/style.css";

type RegisterUserPageProps = {
  isLogin: boolean;
};
// Reuse the same page for login and register new user
// based on the inLogin paramter, either of the component is loaded
const RegisterUserPage: React.FC<RegisterUserPageProps> = ({ isLogin }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-background_cream min-h-screen">
      <div className="justify-center duration-300 hover:shadow-slate-700 w-full px-4 md:px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl flex flex-col md:flex-row items-center md:w-[1000px] md:h-[700px] p-4 md:p-8">
        <div className="m-2 w-full md:w-1/2">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover rounded-lg shine"
          />
        </div>
        <div className="duration-300 md:w-1/2 md:pl-8">
          {isLogin ? <LoginPage /> : <RegisterDialog />}
          {/* If isLogin parameter is true, render login page else render Register page */}
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPage;
