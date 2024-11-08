"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [view, setView] = useState("experience");
  const [activeButton, setActiveButton] = useState("experience");
  const barRef = useRef<HTMLDivElement>(null);

  // refs for buttons
  const ExpButRef = useRef<HTMLButtonElement>(null);
  const ProjButRef = useRef<HTMLButtonElement>(null);

  // Update the bar position and width by active button
  useEffect(() => {
    const activeButtonRef = activeButton === "experience" ? ExpButRef : ProjButRef;
    const barElement = barRef.current;

    if (activeButtonRef.current && barElement) {
      const { offsetWidth, offsetLeft } = activeButtonRef.current;

      // Set the bar width and position based on the active button
      barElement.style.width = `${offsetWidth}px`;
      barElement.style.left = `${offsetLeft}px`;
    }
  }, [activeButton]);

  // Handler to update both the active button and view
  const handleButtonClick = (button: string, newView: string) => {
    setActiveButton(button); // Set the active button for the animated bar
    setView(newView); // Set the new view
  };

  return (
    <div className="md:grid md:grid-cols-2 h-screen flex flex-col">
      {/* Profile Section */}
      <div className="bg-[#08090A] text-white p-6 flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-[#575A5E] mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">JaeMin Birdsall</h1>
        <p className="text-center mb-4">Computer Science Dropout</p>
        <div className="flex space-x-4">
          <span className="w-6 h-6 bg-[#575A5E] rounded-full"></span>
          <span className="w-6 h-6 bg-[#575A5E] rounded-full"></span>
          <span className="w-6 h-6 bg-[#575A5E] rounded-full"></span>
        </div>
      </div>

      {/* Right Side - Experience/Projects Section */}
      <div className="bg-[#F4F7F5] text-[#08090A] p-6">
        {/* Menu for Switching between Experience and Projects */}
        <div className="relative flex justify-center space-x-6 mb-6">
          {/* Animated Bar */}
          <div
            ref={barRef}
            className="absolute bottom-0 h-1 rounded bg-[#08090A] transition-all duration-300"
            style={{ width: "0px", left: "0px" }} // Initial width and position
          ></div>

          <button
            ref={ExpButRef}
            onClick={() => handleButtonClick("experience", "experience")}
            className={`px-4 py-2 ${
              view === "experience" ? "font-bold" : "text-[#575A5E]"
            }`}
          >
            Experience
          </button>
          <button
            ref={ProjButRef}
            onClick={() => handleButtonClick("projects", "projects")}
            className={`px-4 py-2 ${
              view === "projects" ? "font-bold" : "text-[#575A5E]"
            }`}
          >
            Projects
          </button>
        </div>

        {/* Content Section with CSS-Based Transitions */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            view === "experience" ? "opacity-100 translate-y-0" : "opacity-100 translate-x-0"
          } ${view === "projects" ? "text-right" : "text-left"}`}
        >
          {view === "experience" ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
              <ul className="space-y-2">
                <li>Job Title 1 - Company Name</li>
                <li>Job Title 2 - Company Name</li>
                <li>Job Title 3 - Company Name</li>
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              <ul className="space-y-2">
                <li>Project 1 - Description of Project 1</li>
                <li>Project 2 - Description of Project 2</li>
                <li>Project 3 - Description of Project 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
