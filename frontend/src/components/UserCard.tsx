import React, { useEffect, useState } from "react";
import UserModel from "../models/UserModel";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSuccess } from "../redux/user/userSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "../redux/store";

type UserCardProps = {
  user: {
    userName: string;
    email: string;
    contactNumber: string;
  };
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  // State to manage the updated user data from the API response
  const [editedUser, setEditedUser] = useState<UserModel>({
    userName: user.userName,
    email: "",
    contactNumber: user.contactNumber,
    // password: '',
    // registeredCourses: '',
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const { currentUser } = useSelector((state:RootState)=>state.user);


  const handleSaveClick = async () => {
    try {
      // await updateUser(editedUser);
      setIsEditing(false);
      const result = await fetch("http://localhost:4000/user", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userName": editedUser.userName,
          "contactNumber": editedUser.contactNumber,
        }),
      });
      // console.log( result.json());
      // console.log(updatedUser);
      if (result.ok) {
        const updatedUserData = await result.json();
        // console.log(updatedUserData); // Log the updated user data
        // setUpdatedUser(updatedUserData);
        setEditedUser(updatedUserData);
        const storeData = {
          userName: updatedUserData.userName,
          email: updatedUserData.email,
          contactNumber: updatedUserData.contactNumber,
          userType: "user",
        };
        dispatch(updateUserSuccess(storeData));
        // console.log("User data:" + updatedUserData);
      } else {
        // Handle unsuccessful response
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error, show error message, etc.
    }
  };
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen flex items-center justify-end px-4 bg-background_cream pr-32">
      <div className="p-40 max-w-8xl bg-white w-3/4 rounded-lg shadow-xl">
        <div className="px-4 sm:px-0">
          <h3 className="text-3xl font-semibold leading-7 text-gray-900">
            {isEditing ? t("Edit User") : editedUser.userName}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {t("Welcome to your profile.")}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                Account Type
              </dt>
              <div className="mt-1 text-md leading-6 text-gray-700">
                Student
              </div>
            </div>
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                {t("Full name")}
              </dt>
              {isEditing ? (
                <input
                  type="text"
                  name="userName"
                  value={editedUser.userName}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <dd className="mt-1 text-md leading-6 text-gray-700">
                  {editedUser.userName}
                </dd>
              )}
            </div>
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                {t("Email")}
              </dt>
              <dd className="mt-1 text-md leading-6 text-gray-700">
                {currentUser?.email}
              </dd>
            </div>
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                {t("Contact")}
              </dt>
              {isEditing ? (
                <input
                  type="text"
                  name="contactNumber"
                  value={editedUser.contactNumber}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <dd className="mt-1 text-md leading-6 text-gray-700">
                  {editedUser.contactNumber}
                </dd>
              )}
            </div>
          </dl>
        </div>
        <div className="mt-5">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white text-sm font-bold py-2 px-4 rounded"
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? t("Save") : t("Edit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
