import React from "react";
import ContactCard from "../components/ContactCard";
import Sidebar from "../components/Sidebar";

const ContactUs = () => {
  const category = () => {};

  return (
    <div className="flex flex-row h-full">
      <Sidebar category={category} />
      <div className="w-screen instructor">
        <ContactCard />
      </div>
    </div>
  );
};

export default ContactUs;
