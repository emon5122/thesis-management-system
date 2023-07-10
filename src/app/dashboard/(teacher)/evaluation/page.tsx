import React from "react";

const Evaluation = () => {
  return (
    <div className="h-screen">
      <div
        className="m-auto pt-20 
     w-full max-w-xs"
      >
        <table className="m-auto border-2 ">
          <thead>
            <tr className="text-white">
              <th className="px-8 m-1 bg-cyan-700">Student Name</th>
              <th className="px-8 m-1 bg-cyan-700">Student Id</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-white text-lg text-center border-t-2 mb-2 cursor-pointer text-white-500 hover:text-green-700"
            >
            <td className="px-4 py-2 ">
        <a href="#">Fabiha Khan</a>
      </td>
              <td className="text-center px-8 ">19303004</td>
            </tr>
            <tr className="text-white text-lg text-center border-t-2 mb-2 cursor-pointer text-white-500 hover:text-green-700"
            >
            <td className="px-4 py-2 ">
        <a href="#">Fabiha Khan</a>
      </td>
              <td className="text-center px-8 ">19303004</td>
            </tr>
            <tr className="text-white text-lg text-center border-t-2 mb-2 cursor-pointer text-white-500 hover:text-green-700"
            >
            <td className="px-4 py-2 ">
        <a href="#">Fabiha Khan</a>
      </td>
              <td className="text-center px-8 ">19303004</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evaluation;