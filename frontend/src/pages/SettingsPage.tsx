import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Paths from "../resources/paths";
import * as AuthService from "../services/auth-service";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Sidebar from "../components/Sidebar";

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state: RootState) => state.user
  );

  const category = () => {};

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const { t } = useTranslation("common");

  const handleLogout = async () => {
    // Logout api call
    const response = await AuthService.logout();
    console.log(response);
    if (response !== null) {
      navigate(Paths.loginPath);
    }
  };

  const handleDeleteAccount = () => {
    navigate(Paths.loginPath);
  };

  const takeToLoginPage = () => {
    // Takes user to login page
    navigate(Paths.loginPath);
  };

  const goToUserAccountDetails = () => {
    navigate(Paths.userDetailsPath);
  };

  const goToInstructorAccountDetails = () => {
    navigate(Paths.instructorDetailsPath);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar category={category} />
      <div className="container p-8  w-full ml-12 mt-6">
        <h1 className="text-4xl font-semibold mb-6">{t("Settings")}</h1>

        <div className="bg-zinc-100 p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {t("Account Details")}
            </h2>
            {currentUser ? (
              currentUser.userType === "user" ? (
                <button
                  className="text-blue-500 hover:underline focus:outline-none"
                  onClick={() => goToUserAccountDetails()}
                >
                  {t("View Account Details")}
                </button>
              ) : (
                <button
                  className="text-blue-500 hover:underline focus:outline-none"
                  onClick={() => goToInstructorAccountDetails()}
                >
                  {t("View Account Details")}
                </button>
              )
            ) : (
              <div>
                Please{" "}
                <button
                  onClick={takeToLoginPage}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  Login
                </button>{" "}
                to get your account details
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{t("Theme")}</h2>
            <div className="flex items-center">
              <span className="mr-2">{t("Dark Mode")}</span>
              <button
                className={`${
                  darkMode ? "bg-blue-500" : "bg-gray-300"
                } text-white py-1 px-3 rounded-md transition duration-300 focus:outline-none`}
                onClick={toggleDarkMode}
              >
                {darkMode ? t("Turn off") : t("Turn on")}
              </button>
            </div>
          </div>

          {currentUser ? (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{t("Actions")}</h2>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 focus:outline-none mt-2"
                onClick={handleLogout}
              >
                {t("Logout")}
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                onClick={handleDeleteAccount}
              >
                {t("Delete Account")}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
