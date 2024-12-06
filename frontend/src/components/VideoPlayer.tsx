import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  videoID: string;
  className?: string;
};

const VideoPlayer = (props: VideoPlayerProps) => {
  const videoID = props.videoID;
  const [videoURL, setVideoURL] = useState(
    `http://localhost:4000/video/${videoID}`
  );

  // Use useEffect to update videoURL when videoID changes
  useEffect(() => {
    console.log("Video ID changed. Updating videoURL:", videoID);
    setVideoURL(`http://localhost:4000/video/${videoID}`);
  }, [videoID]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ReactPlayer
        url={videoURL}
        controls
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", // Disable download button
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
