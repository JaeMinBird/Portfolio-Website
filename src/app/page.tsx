"use client";

import { useState, useEffect, useRef } from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { experiences } from "../app/data/experience"; // Import the data

export default function Home() {
  const [view, setView] = useState("experience");
  const [activeButton, setActiveButton] = useState("experience");
  const barRef = useRef<HTMLDivElement>(null);

  // refs for buttons
  const ExpButRef = useRef<HTMLButtonElement>(null);
  const ProjButRef = useRef<HTMLButtonElement>(null);

  // Update the bar position and width by active button
  useEffect(() => {
    const activeButtonRef =
      activeButton === "experience" ? ExpButRef : ProjButRef;
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
    <div
      className="md:grid md:grid-cols-2 h-screen flex flex-col"
      style={{ fontFamily: "Palatino, serif" }} // Use Palatino as the default font
    >
      {/* Profile Section */}
      <div className="bg-[#08090A] text-white p-6 flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-[#575A5E] mb-4"></div>
        <h1 className="text-3xl font-bold mb-2">JaeMin Birdsall</h1> {/* 1.5x larger */}
        <p className="text-lg text-center mb-4">Computer Science Dropout</p> {/* 1.5x larger */}
        {/* Icons Div */}
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="w-6 h-6 text-[#F4F7F5] hover:text-[#575A5E] transition" />
          </a>
          <a
            href="https://github.com/JaeMinBird"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6 text-[#F4F7F5] hover:text-[#575A5E] transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/JaeMinBirdsall/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6 text-[#F4F7F5] hover:text-[#575A5E] transition" />
          </a>
        </div>
        <a
          href="https://drive.google.com/file/d/1X_NxZ6edctZC7sPmI9y-HS4vbx-Q3Oeg/view"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-fit mt-3"
          style={{ fontFamily: "Georgia, serif" }} // Apply Georgia font
        >
          <span className="text-md">View Resume</span>
          <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-[#F4F7F5] transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </a>
      </div>

      {/* Right Side - Experience/Projects Section */}
      <div className="bg-[#F4F7F5] text-[#08090A] p-6">
        {/* Menu for Switching between Experience and Projects */}
        <div className="relative flex justify-center space-x-6 mb-6">
          {/* Animated Bar */}
          <div
            ref={barRef}
            className="absolute bottom-0 h-1 rounded bg-[#08090A] transition-all duration-300"
            style={{ width: "0px", left: "0px" }}
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

        {/* Content Section */}
        <div>
          {view === "experience" ? (
            <div>
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6"
                >
                  {/* Date Line */}
                  <div className="relative flex flex-col items-center text-center">
                    <span className="text-lg">{exp.endDate.month}</span>
                    <span className="text-lg">{exp.endDate.year}</span>
                    <div className="w-0.5 h-12 bg-gray-400 my-2"></div>
                    <span className="text-lg">{exp.startDate.month}</span>
                    <span className="text-lg">{exp.startDate.year}</span>
                  </div>

                  {/* Experience Details */}
                  <div className="w-full">
                    {/* Company and Position */}
                    <div>
                      <span className="text-xl font-bold">{exp.company}</span>
                      <span className="block text-lg text-gray-600">
                        {exp.position}
                      </span>
                    </div>

                    {/* Description */}
                    <div
                      className="text-gray-700 mt-2 text-sm"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {exp.description}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm font-medium border border-gray-400"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
