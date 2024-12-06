import React, { useEffect, useState } from "react";
import * as UserSerivce from "../services/user-service";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Course from "../models/Course";
import CoursesGrid from "../components/CoursesGrid";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";

type Props = {};
// Show user's enrolled courses in the page
const UserCourses = (props: Props) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const { currentUser } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (currentUser) {
      const fetchRegisteredCourses = async () => {
        const response = await UserSerivce.getRegisteredCourses();
        setEnrolledCourses(response);
      };
      fetchRegisteredCourses();
    }
  }, []);
  return (
    <div className="">
      <ToastContainer />
      <div className="flex">
        <div className="flex h-screen">
          <Sidebar category={() => {}} />
        </div>
        <div className="w-[95%] h-screen rounded-md bg-background_cream ab ">
          {currentUser && enrolledCourses !== undefined ? (
            <CoursesGrid courses={enrolledCourses} />
          ) : (
            "Please Login to see enrolled courses"
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCourses;
