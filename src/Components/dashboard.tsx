"use client";
import Link from "next/link";
import { useState } from "react";
import Modal from "./modal";
import { Fragment } from "react";
const Dashboard = () => {
   const [showModal,setShowModal]= useState(false);
  return (
    <Fragment>
      <div>
        <aside
          id="cta-button-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-cyan-700">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 rounded-lg text-white  hover:bg-cyan-600 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <hr></hr>
              <li>
                <a
                  href="../teacher/list"
                  className="flex items-center p-2 rounded-lg text-white  hover:bg-cyan-600 group"
                >
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Student list
                  </span>
                </a>
              </li>
              <hr></hr>
              <li>
                <a
                  href="../teacher/attendance2"
                  className="flex items-center p-2 rounded-lg text-white  hover:bg-cyan-600 group"
                >
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Attendance
                  </span>
                </a>
              </li>
              <hr></hr>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 rounded-lg  text-white  hover:bg-cyan-600 group"
                >
                  <span className="flex-1 ml-3 whitespace-nowrap">Task</span>
                </a>
              </li>
              <hr></hr>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2  rounded-lg  text-white  hover:bg-cyan-600 group"
                >
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Evaluation
                  </span>
                </a>
              </li>
              <hr></hr>
              <li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2  rounded-lg  text-white  hover:bg-cyan-600 group"
                  >
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Routine
                    </span>
                  </a>
                </li>
              </li>
              <hr></hr>
              <li>
                <a
                  href="/"
                  className="flex items-center p-2 rounded-lg text-white  hover:bg-cyan-600 group"
                >
                  <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
                </a>
              </li>
              <hr></hr>
            </ul>
          </div>
        </aside>

        <div className="h-screen bg-gradient-to-r from-slate-300 to-slate-500 ">
          <header className="w-screen flex fixed justify-between items-center py-4 bg-neutral-400 	">
            <Link href="/" className="flex ml-10 gap-2 cursor-pointer">
              <div className="text-4xl px-60 text-white">
                Thesis Management System
              </div>
            </Link>
            <button className="mr-20 text-white font-bold hover:text-green-800 underline" onClick={()=>setShowModal(true)}>
              <span className="flex-1  whitespace-nowrap">Notice</span>
            </button>
            <Modal isvisible={showModal} onClose={()=>setShowModal(false)}/>
          </header>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
