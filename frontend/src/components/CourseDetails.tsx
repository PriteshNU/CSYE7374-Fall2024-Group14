import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as moduleService from "../services/module-services";
import Course from "../models/Course";
import ModuleCard from "./ModuleCard";
import Module from "../models/modules";
import VideoPlayer from "./VideoPlayer";
import * as UserService from "../services/user-service";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import sampleThumb from "../resources/placeholder.jpg";
import Sidebar from "./Sidebar";
import { FaStar, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Paths from "../resources/paths";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

const placeholderImage = sampleThumb;

const CourseDetails: React.FC<Props> = () => {
  // Function to show success toast when marking a module as done
  const markAsDone = () => {
    toast.success("Marked Done", {
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

  const location = useLocation();
  const course: Course = location.state;
  // State variables
  const [modules, setModules] = useState<Module[]>([]);
  const [doneButtonColor, setDoneButtonColor] = useState("bg-gray-500");
  const [doneButtonText, setDoneButtonText] = useState("Mark as Done");
  const [moduleNo, setModuleNo] = useState(1);
  const [completedModule, setCompletedModule] = useState<number[]>([1]);
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<Module | undefined>(
    undefined
  );
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  // Determine the URL for the course thumbnail, use a placeholder if there's an error or no thumbnail
  const [thumbnailError, setThumbnailError] = useState(false);

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const thumbnailUrl = thumbnailError
    ? placeholderImage
    : course.thumbnail || placeholderImage;

  // Effect to update done button appearance based on selected module and completed modules
  useEffect(() => {
    if (completedModule.includes(moduleNo)) {
      setDoneButtonColor("bg-green-500");
      setDoneButtonText("Done");
    } else {
      setDoneButtonColor("bg-gray-500");
      setDoneButtonText("Mark as Done");
    }
  }, [selectedModule, completedModule]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await moduleService.getModules(course._id);
        setModules(data);
        setSelectedModule(data[0]);
        // Move the checkProgress call here
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [course._id]);

  useEffect(() => {
    // Additional logic to handle video player update when selectedModule changes

    console.log("selectedModule module:" + moduleNo);
  }, [selectedModule]);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const response = await UserService.checkRegistration(course._id);
        setIsEnrolled(response.registered);
      } catch (error) {
        console.log(error);
      }
    };

    checkRegistration();
  }, []);

  // Effect to check registration status when component mounts
  useEffect(() => {
    const checkProgress = async () => {
      if (isEnrolled) {
        const response = await UserService.getCourseModuleProgress(course._id);
        if (response !== undefined) {
          const modNum: number = response;
          const newCompletedModules = Array.from(
            { length: modNum },
            (_, index) => index + 1
          );
          setCompletedModule(newCompletedModules);
          console.log("check progress");
          console.log("latest module:" + modNum);
        } else {
          console.log("  response undefined" + response);
        }
      } else {
        console.log("user not enrolled");
      }
    };
    checkProgress();
  }, [isEnrolled]);

  const changeSelectedModule = (mod: Module) => {
    console.log("module changed");
    setSelectedModule(mod);
  };

  const enrollForCourse = async () => {
    try {
      if (currentUser) {
        const response = await UserService.registerforCourse(
          JSON.stringify({}),
          course._id
        );
        if (response?.status === 200) {
          setIsEnrolled(true);
        }
      } else {
      }
    } catch (error) {
      console.error("Error enrolling for the course:", error);
    }
  };

  const ingore = () => {};

  const markModuleAsDone = async () => {
    try {
      // Add logic to mark the module as done (e.g., make an API call)
      // You can use the selectedModule?._id to identify the current module
      const response = await UserService.updateCourseProgress(
        JSON.stringify({
          courseId: course._id,
          moduleNo: moduleNo,
        })
      );
      if (response !== undefined && response.ok) {
        setCompletedModule((prevCompletedModules) => [
          ...prevCompletedModules,
          moduleNo,
        ]);
      }
      console.log("Module marked as done:", selectedModule);
      markAsDone();
    } catch (error) {
      console.error("Error marking module as done:", error);
    }
  };

  function areAllModulesCompleted(
    completedModules: number[],
    index: number
  ): boolean {
    // Generate an array of numbers from 1 to index
    const numbersToCheck = Array.from({ length: index }, (_, i) => i + 1);

    // Check if all numbers in the range are present in completedModules
    const allCompleted = numbersToCheck.every((num) =>
      completedModules.includes(num)
    );

    return allCompleted;
  }

  const takeToLogin = () => {
    navigate(Paths.loginPath);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <ToastContainer />
        <Sidebar category={ingore} />
        <div className="container mx-auto mt-10 p-4 ml-2 h-full">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl  mb-2">{course.title}</h1>
              <p className="text-sm md:text-base italic  text-gray-600 mb-4 mt-4">
                {course.description}
              </p>
              <div className="flex flex-row text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>

            <img
              className={`w-full md:w-1/2 h-36 object-cover shadow-lg rounded-lg md:ml-10 ${
                thumbnailError ? "h-36" : ""
              }`}
              alt="Course Thumbnail"
              src={thumbnailUrl}
              onError={handleThumbnailError}
            />
          </div>

          <hr className="w-full border-t-2 shadow-lg border-gray-300 my-6" />
          {currentUser ? (
            <>
              {isEnrolled || currentUser?.userType === "instructor" ? (
                <div className="md:flex md:justify-between mt-12">
                  <div className="mb-4 md:mb-0 md:w-2/3">
                    <div className="mb-4 font-bold text-3xl">
                      Lesson {selectedModule?.module_no}
                    </div>
                    <div className="border-2 w-11/12 h-96 rounded-lg shadow-xl overflow-auto">
                      <VideoPlayer videoID={`${selectedModule?.videoId}`} />
                    </div>
                    <div className="mt-6">
                      <ul>
                        <li className="mb-2 font-semibold text-3xl">
                          {selectedModule?.title}
                        </li>
                        <li className="text-base italic  text-gray-600 mt-4 mb-1">
                          {selectedModule?.description}
                        </li>
                        <li className="text-sm italic  text-gray-600 mb-4">
                          Duration: {selectedModule?.duration}
                        </li>
                      </ul>
                    </div>

                    <button
                      className={`${doneButtonColor} text-white px-4 py-2 rounded-lg mt-4`}
                      onClick={markModuleAsDone}
                    >
                      <div className="mr-2 flex flex-row">
                        <FaCheck className="mr-5 mt-1" />
                        {`${doneButtonText}`}
                      </div>
                    </button>
                  </div>

                  <div className="md:w-1/3 md:mr-8 flex flex-col items-center rounded-2xl">
                    <div className="w-full mb-4 ">
                      <h2 className="text-2xl bg-white font-bold text-gray-800 p-4">
                        List of Modules
                      </h2>
                      <hr className="border-t-2 shadow-lg border-gray-300" />
                      {modules.map((moduleItem: Module, index: number) => (
                        <div
                          key={moduleItem._id}
                          onClick={() => {
                            if (
                              areAllModulesCompleted(completedModule, index)
                            ) {
                              changeSelectedModule(moduleItem);
                              setModuleNo(index + 1);
                            }
                            console.log("Completed Modules:" + completedModule);
                          }}
                          className={`cursor-pointer bg-white shadow-md py-2 hover:shadow-lg transition duration-300 ${
                            selectedModule?._id === moduleItem._id
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <ModuleCard
                            module={moduleItem}
                            completed={completedModule.includes(index + 1)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center h-screen">
                  {" "}
                  {/* Render something for users who are not enrolled */}
                  <p className="text-lg mb-4">
                    You are not enrolled in this course.
                  </p>
                  <button
                    onClick={enrollForCourse}
                    className="bg-sky-800 font-semibold shadow-md duration-300 text-white px-4 py-2 rounded-lg hover:shadow-xl"
                  >
                    Enroll Now
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="h-screen">
                Please <button onClick={takeToLogin}>Login</button> using
                Student Id
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
