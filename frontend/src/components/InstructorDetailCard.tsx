import React, { useEffect, useState } from "react";
import Instructor from "../models/Instructor";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSuccess } from "../redux/user/userSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "../redux/store";
import * as InstructorService from '../services/instructor-service';

type InstructorDetailCardProps = {
  instructor: Instructor;
};

const InstructorDetailCard: React.FC<InstructorDetailCardProps> = ({
  instructor,
}) => {
  // State for controlling the edit mode
  const [isEditing, setIsEditing] = useState(false);
  // Redux dispatch function
  const dispatch = useDispatch();
  const [editedInstructor, setEditedInstructor] = useState<Instructor>({
    name: instructor.name,
    email: "",
    university: instructor.university,
    contactNumber: instructor.contactNumber,
    // Add other properties if needed
  });

  // Redux state to get the current user data
  const { currentUser } = useSelector((state: RootState) => state.user);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle input changes in the editing mode
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInstructor((prevInstructor) => ({
      ...prevInstructor,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      // Making a PUT request to update instructor data
      setIsEditing(false);
      const result = await InstructorService.saveInstructorDetails(JSON.stringify({
            name: editedInstructor.name,
            contactNumber: editedInstructor.contactNumber,
          }));
      if (result.ok) {
        const updatedInstructorData = await result.json();
        console.log(updatedInstructorData); // Log the updated user data
        setEditedInstructor(updatedInstructorData);
        console.log(editedInstructor);

        // Update Redux state with the updated data
        const storeData = {
          userName: updatedInstructorData.name,
          email: updatedInstructorData.email,
          contactNumber: updatedInstructorData.contactNumber,
          userType: "instructor",
        };

        dispatch(updateUserSuccess(storeData));
      } else {
        // Handle unsuccessful response
      }

      // Update Redux state with the updated data
    } catch (error) {
      console.error("Error updating instructor:", error);
      // Handle error, show error message, etc.
    }
  };

  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen flex items-center justify-end px-4 bg-background_cream pr-32">
      <div className="p-12 max-w-8xl bg-white w-3/4 rounded-lg shadow-xl">
        <div className="px-4 sm:px-0">
          <div className="p-2">
            <h3 className="text-2xl font-semibold leading-7 text-gray-900 ">
              {isEditing
                ? t("Edit Instructor")
                : currentUser?.userName || "instructor"}
            </h3>
          </div>
          <p className="mt-1 ml-2 max-w-2xl text-sm leading-6 text-gray-500">
            {t("Welcome to your profile.")}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Account Type
              </dt>
              <div className="mt-1 text-md leading-6 text-gray-700">
                Instructor
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("Full name")}
              </dt>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedInstructor.name}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {currentUser?.userName}
                </dd>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("Email")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {currentUser?.email}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("Contact Number")}
              </dt>
              {isEditing ? (
                <input
                  type="text"
                  name="contactNumber"
                  value={editedInstructor.contactNumber}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {currentUser?.contactNumber}
                </dd>
              )}
            </div>
          </dl>
        </div>
        <button
          className="mt-6 bg-orange-500 hover:bg-orange-700 text-white text-sm font-bold py-2 px-4 rounded"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? t("Save") : t("Edit")}
        </button>
      </div>
    </div>
  );
};

export default InstructorDetailCard;
