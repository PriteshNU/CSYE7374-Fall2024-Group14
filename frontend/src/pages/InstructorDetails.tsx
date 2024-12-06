import React, { useState, useEffect } from "react";
import InstructorDetailCard from "../components/InstructorDetailCard";
import * as InstructorService from "../services/instructor-service";
import Instructor from "../models/Instructor";
import Sidebar from "../components/Sidebar";

// Instructor detail page to show, edit and save instructor details 
const InstructorDetail = () => {
  const [instructor, setInstructor] = useState<Instructor>({
    name: "",
    email: "",
    contactNumber: "",
    university: "",
  });

  const category = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await InstructorService.getInstructors();
        // get instructor details
        console.log(data);
        setInstructor(data);
      } catch (error) {
        console.error("Error fetching instructor data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row h-screen instructor-details-page">
      <Sidebar category={category} />
      <div className="w-screen instructor">
        <InstructorDetailCard instructor={instructor} />
      </div>
    </div>
  );
};

export default InstructorDetail;
