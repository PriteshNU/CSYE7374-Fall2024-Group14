import React from "react";
import Modules from "../models/modules";
import { FaCheck } from "react-icons/fa";

type ModuleCardProps = {
  module: Modules;
  completed: boolean;
};

const ModuleCard = (props: ModuleCardProps) => {
  const { module, completed } = props;

  return (
    <div className="flex hover:shadow-xl duration-300 items-center justify-between rounded-md p-2 ">
      <h1 className="m-2 px-2 text-xl">{module.title}</h1>
      {completed && <FaCheck color="green" className="mr-10" />}
    </div>
  );
};

export default ModuleCard;
