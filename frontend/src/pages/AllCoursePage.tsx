import React, { useState, useEffect } from "react";
import * as CourseService from "../services/course-service";
import * as InstructorService from "../services/instructor-service";
import Course from "../models/Course";
import {
  useNavigate,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import * as Paths from "../resources/paths";
import * as AuthService from "../services/auth-service";
import CoursesGrid from "../components/CoursesGrid";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ToastContainer } from "react-toastify";

type AllCoursePageProps = {
  pageType: string;
};

// Home page to display all the courses to the user and instructor's all courses to the instructor
const AllCoursePage = (props: AllCoursePageProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const fetchData = async () => {
      // Fetch courses data for the homepage, for instructor show their specific courses, for user, show all courses
      try {
        if (currentUser?.userType === "instructor") {
          const data = await InstructorService.getInstructorCourses();
          // API call for getting instructor specific courses
          setCourses(data);
          setFilteredCourses(data);
        } else {
          const data = await CourseService.getCourses();
          // API call to get all courses
          setCourses(data);
          setFilteredCourses(data);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, []);

  const searchHandler = (query: string) => {
    // To handle the search query received from the searchbar, filter those courses and display
    console.log("search handler called");
    const searchedCourse = courses.filter((c) =>
      c.title.toLowerCase().includes(query.toLowerCase())
    );

    if (query !== "") {
      setFilteredCourses((prevCourses) => [...searchedCourse]);
    } else {
      setFilteredCourses((prevCourses) => [...courses]);
    }
  };


  const filterCoursesByCategory = (category: string) => {
    // Filter the courses according to the category user clicked on the sidebar
    const searchedCourse = courses.filter((c) =>
      c.category.toLowerCase().includes(category.toLowerCase())
    );

    if (category !== "") {
      setFilteredCourses((prevCourses) => [...searchedCourse]);
    } else {
      setFilteredCourses((prevCourses) => [...courses]);
    }
  };

  return (
    <div className=" bg-zinc-100 flex min-h-screen">
      <ToastContainer />
      <div className="flex flex-row min-h-full">
        <Sidebar category={filterCoursesByCategory} />
      </div>

      <div className="w-[95%] h-auto rounded-md bg-zinc-100 ab">
        <div>
          <Topbar onSearch={searchHandler} />
        </div>
        {props.pageType === "allCourses" ? (
          <CoursesGrid courses={filteredCourses} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AllCoursePage;
