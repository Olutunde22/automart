import React from "react";

const Loading = () => {
  return (
    <>
      <div className="flex items-center flex-col min-h-screen justify-center">
        <svg
          style={{ borderTopColor: "transparent" }}
          className="animate-spin h-20 w-20 rounded-full border-blue-700 border-4 border-solid"
          viewBox="0 0 24 24"
        ></svg>
        <span className="text-gray-500 text-2xl mt-4">Loading...</span>
      </div>
    </>
  );
};

export default Loading;
