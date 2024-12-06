import React from "react";
import AddModuleCard from "../components/AddModuleCard";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Paths from "../resources/paths";
import Sidebar from "../components/Sidebar";

// Page for the instructor to add all modules
const AddModulePage = () => {
  const location = useLocation();
  const noOfModules = location.state.noOfModules;
  const CourseId = location.state.courseId;
  const navigate = useNavigate();
  const category = () => {};

  // Render module cards based on the number of modules instructor selected in AddCourse Page
  const renderModuleCards = () => {
    console.log("no of modules:" + noOfModules);
    const moduleCards = [];
    for (let i = 0; i < noOfModules; i++) {
      moduleCards.push(
        <AddModuleCard moduleNo={i + 1} courseId={`${CourseId}`} />
        // Render the module card for each module- starts from 1
      );
    }
    return moduleCards;
  };

  const handleSubmit = () => {
    navigate(Paths.allCoursesPath, { replace: true });
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex w-1/6 min-h-screen">
        <Sidebar category={category} />
      </div>
      <div className="flex flex-col ml-8 my-10 justify-between h-9 bg-white rounded-3xl p-8">
        {renderModuleCards()}
        <button className="submit-button w-24" onClick={handleSubmit}>
          Done
        </button>
      </div>
    </div>
  );
};

export default AddModulePage;
