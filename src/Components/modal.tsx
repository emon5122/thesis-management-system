import { useState } from "react";

const Modal = ({showMe}:{showMe:boolean}) => {
  const [visible, setVisible]=useState<boolean>(showMe)
    if(!visible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex
    justify-center items-center"
    >
      <div className="w-[500px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={()=>setVisible(false)}>X</button>
        <div className="bg-white p-2 ml-8 rounded">
        <textarea className="w-full h-32 resize-y shadow appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          <button className="flex items-center m-auto mt-2 pr-4 rounded-lg border-2 border-cyan-800 text-cyan-800  hover:bg-gray-300 group" onClick={()=>setVisible(false)}>
            <span className="flex-1 ml-3 whitespace-nowrap">Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
