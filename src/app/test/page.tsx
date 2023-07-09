"use client"
import { useState } from "react";
import Dashboard from '@/Components/dashboard'
import Modal from "@/Components/modal";

const TestPage = () => {
  type customArray = {
    no: number;
    item: string;
  };
  const anArray: customArray[] = [
    { no: 1, item: "Dashboard" },
    { no: 2, item: "Student List" },
    { no: 3, item: "Teacher List" },
    { no: 4, item: "Assignment" },
  ];
  enum studentType {
    "Teacher",
    "Student",
    "Moderator",
  }
  const [userType, setUserType] = useState<String | undefined>("Student");
  const [input, setInput] = useState<string>();
  return (
    <div className="min-h-screen">
      <div>
        <div>User Type: {userType}</div>
        <input className="text-blue-400"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setUserType(input);
          }}
        >
          Change user type
        </button>
      </div>

      {userType === "Teacher" ? (
        <Modal showMe={true}/>
      ) : userType === "Student" ? (
        <Dashboard/>
      ) : (
        <div>Moderator</div>
      )}
    </div>
  );
};

export default TestPage;
