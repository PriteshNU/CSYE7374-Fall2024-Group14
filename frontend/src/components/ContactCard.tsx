import React from "react";
import gaurav from "../resources/gaurav.jpg";
import sid from "../resources/sid.jpg";
import mit from "../resources/mit.jpg";
import vai from "../resources/vaibhav.jpg";
import neu from "../resources/Neu.png";

// ContactCard component displays information about the project team members
const ContactCard = () => {
  const teamMembers = [
    {
      name: "Gaurav Gunjal",
      linkedin: "https://www.linkedin.com/in/gaurav-gunjal-7b69b0217/",
      imageSrc: gaurav,
    },
    {
      name: "Siddharth Dumbre",
      linkedin: "https://www.linkedin.com/in/siddharth-dumbre/",
      imageSrc: sid,
    },
    {
      name: "Vaibhav Gohil",
      linkedin: "https://www.linkedin.com/in/vaibhav-gohil-3641161a0/",
      imageSrc: vai,
    },
    {
      name: "Mit Sheth",
      linkedin: "https://www.linkedin.com/in/mit-sheth-98662a16b/",
      imageSrc: mit,
    },
  ];

  // JSX structure for the ContactCard component
  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="italic font-semibold text-gray-700 mb-8">
          This project was a part of the Web Development and Design course
          curriculum under the guidance of{" "}
          <a
            className="hover:text-blue-500"
            href="https://www.linkedin.com/in/amuthanarulraj/"
          >
            Amuthan Arulraj
          </a>{" "}
          at Northeastern University, Boston.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <img
                src={member.imageSrc}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <div className="text-center">
                <p className="text-xl font-semibold mb-2">{member.name}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
        <hr className="mt-5 border-2" />
        <div className="mt-12 text-center">
          <img
            src={neu}
            alt="Northeastern University Logo"
            className="w-32 h-32 mx-auto"
          />
          <div className="mt-7 text-2xl font-semibold italic">Thank you</div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
