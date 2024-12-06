import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as ModuleService from "../services/module-services";

type Props = {
  moduleNo: Number;
  courseId: string;
};

const AddModuleCard = (props: Props) => {
  const date: Date = new Date();
  const courseID = props.courseId;
  const [uploadVideotext, setUploadVideoText] = useState("Upload Video");
  const [addModuletext, setAddModuleText] = useState("Add Module");
  const [isModuleAdded, setisModuleAdded] = useState(false);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    module_no: props.moduleNo,
    description: "",
    creationTime: date,
    videoId: "",
    courseId: courseID,
  });

  const [videoFile, setVideoFile] = useState<Blob>();

  const [isExpanded, setIsExpanded] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setAddModuleText("Add Module");
  };

  // Function to handle text area changes
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle file input changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setVideoFile(file);
      console.log("file" + file);
    }
  };

  const handleVideoUpload = async () => {
    setIsUploading(true);

    try {
      const videoFormData: FormData = new FormData();
      videoFormData.append("video", videoFile as Blob);

      const response = await fetch("http://localhost:4000/video", {
        method: "POST",
        body: videoFormData,
      });

      if (response.ok) {
        // Parse the response and update the state with the generated videoId
        const result = await response.json();
        const generatedVideoId = result.fileId;
        setFormData({ ...formData, videoId: generatedVideoId });
        setUploadVideoText("Video Uploaded");
        setIsVideoUploaded(true);
        setAddModuleText("Add Module");
      } else {
        console.error("Video upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleApiCall = () => {
    // Check if the video is uploaded before making the API call
    if (!isVideoUploaded) {
      setAddModuleText("Please Upload all files");
      return;
    }
    ModuleService.AddModule(JSON.stringify(formData))
      .then((response) => response.json())
      .then((data) => {
        setAddModuleText("Module Added");
        setisModuleAdded(true);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`m-2 flex flex-col rounded-3xl hover:shadow-lg items-center hover:cursor-pointer justify-normal py-5 px-8 border-2 bg-background_cream ${
        isExpanded ? "h-auto bg-white" : "h-20 bg-sky-100"
      } duration-500`}
    >
      <h3
        className="text-xl font-semibold leading-7 text-gray-900 cursor-pointer md:text-2xl"
        onClick={toggleExpansion}
      >
        Add Module
      </h3>
      {isExpanded && (
        <>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Add a new module.
          </p>

          <div className="mt-8 w-full max-w-md">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Module Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="input-field"
              placeholder="Enter module title"
              onChange={handleInputChange}
            />

            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Module Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="input-field"
              placeholder="Enter module description"
              onChange={handleTextChange}
            ></textarea>

            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Module Duration
            </label>
            <input
              id="duration"
              name="duration"
              required
              type="text"
              className="input-field"
              placeholder="Enter module duration"
              onChange={handleInputChange}
            ></input>

            <div className="mt-4">
              <label
                htmlFor="videoFile"
                className="block text-sm font-medium text-gray-700"
              >
                {uploadVideotext}
              </label>
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                required
                accept="video/*"
                className="input-field"
                onChange={handleFileChange}
              />
              {videoFile && (
                <button
                  className="submit-button"
                  //   If video is uploaded then handle video upload, if video is still uploading, then disable the upload button
                  onClick={!isVideoUploaded ? handleVideoUpload : undefined}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      {" Uploading..."}
                    </>
                  ) : (
                    "Upload Video"
                  )}
                </button>
              )}
            </div>
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={!isModuleAdded ? handleApiCall : undefined}
          >
            {addModuletext}
          </button>
        </>
      )}
    </div>
  );
};

export default AddModuleCard;
