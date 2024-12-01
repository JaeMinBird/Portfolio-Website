"use client";

import { useState, useEffect, useRef } from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { experiences } from "../app/data/experience";
import { projects } from "../app/data/projects";

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
    setActiveButton(button);
    setView(newView);
  };

  return (
    <div
      className="md:grid md:grid-cols-2 h-screen"
      style={{ fontFamily: "Palatino, serif" }}
    >
      {/* Profile Section */}
      <div className="bg-[#08090A] text-white p-6 flex flex-col items-center justify-center overflow-y-auto">
        <div className="w-32 h-32 rounded-full bg-[#575A5E] mb-4"></div>
        <h1 className="text-3xl font-bold mb-2">JaeMin Birdsall</h1>
        <p className="text-lg text-center mb-4">Computer Science Dropout</p>
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
          style={{ fontFamily: "Georgia, serif" }}
        >
          <span className="text-md">View Resume</span>
          <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-[#F4F7F5] transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </a>
      </div>
  
      {/* Right Side - Experience/Projects Section */}
      <div className="bg-[#F4F7F5] text-[#08090A] p-6 overflow-y-auto">
        {/* Menu for Switching between Experience and Projects */}
        <div className="relative flex justify-center space-x-6 mb-6">
          <div
            ref={barRef}
            className="absolute bottom-0 h-[2px] rounded bg-[#08090A] transition-all duration-300"
            style={{ width: "0px", left: "0px" }}
          ></div>
  
          <button
            ref={ExpButRef}
            onClick={() => handleButtonClick("experience", "experience")}
            className={`px-4 py-2 text-2xl ${
              view === "experience" ? "font-bold" : "text-[#575A5E]"
            }`}
          >
            Experience
          </button>
          <button
            ref={ProjButRef}
            onClick={() => handleButtonClick("projects", "projects")}
            className={`px-4 py-2 text-2xl ${
              view === "projects" ? "font-bold" : "text-[#575A5E]"
            }`}
          >
            Projects
          </button>
        </div>
  
        {/* Experience Section */}
        <div
          className={`transition-all duration-500 transform ${
            view === "experience"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          {view === "experience" &&
            experiences.map((exp, index) => (
              <a
                key={index}
                className="relative group inline-block w-fit"
              >
                <div
                  className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6"
                >
                  {/* Timeline Structure */}
                  <div className="timeline-container">
                    <div className="timeline-dates">
                      <span className="timeline-date">{exp.endDate.month}</span>
                      <span className="timeline-date">{exp.endDate.year}</span>
                      <div className="timeline-line"></div>
                      <span className="timeline-date">{exp.startDate.month}</span>
                      <span className="timeline-date">{exp.startDate.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="content flex-1 w-full p-4">
                    <div>
                      <span className="text-xl font-bold">{exp.company}</span>
                      <span className="block text-lg text-gray-600">{exp.position}</span>
                    </div>
                    <div className="text-gray-700 mt-2 text-sm">
                      {exp.description}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm font-medium border border-gray-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
        </div>



        
        {/* Projects Section */}
        <div
          className={`transition-all duration-500 transform ${
            view === "projects"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          {view === "projects" &&
            projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-block w-fit"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                  {/* Timeline Structure */}
                  <div className="timeline-container">
                    <div className="timeline-dates">
                      <span className="timeline-date">{project.endDate.month}</span>
                      <span className="timeline-date">{project.endDate.year}</span>
                      <div className="timeline-line"></div>
                      <span className="timeline-date">{project.startDate.month}</span>
                      <span className="timeline-date">{project.startDate.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative w-full p-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 border border-[#08090A] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
                    <div className="relative">
                      <span className="text-xl font-bold inline-block relative">
                        {project.title}
                        <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-[#08090A] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                      </span>
                    </div>
                    <div className="text-gray-700 mt-2 text-sm">
                      {project.description}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm font-medium border border-gray-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
        </div>


      {/* Div Separation for Clarity*/}
      </div>
    </div>
  );
  
}