import React from "react";
import { DotLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white dark:bg-black">
      <DotLoader color="#2563eb" size={60} />
    </div>
  );
};

export default Loading;
