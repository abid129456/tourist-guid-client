import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">About The Developer</h1>

      <section className="mb-8">
        <p className="text-lg leading-relaxed">
          Welcome to The Tourist Guide website! This platform is built to help travelers explore the beautiful destinations of Bangladesh easily and efficiently.
          <br /><br />
          I am <strong>Millat Sarker Himel</strong>, the developer behind this project. I have a passion for building web applications that create great user experiences and bring useful solutions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projects I've Created</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Sports Club Management System</li>
          <li>Tourist Guide Website (this project)</li>
          <li>Personal Portfolio Website</li>
          <li>Simple Blog Platform</li>
          <li>Online Learning Management System</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
        <p>You can find my other projects and contact me via these links:</p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li>
            <a href="https://github.com/millatsarker" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              GitHub Profile
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/millatsarker" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              LinkedIn Profile
            </a>
          </li>
          <li>
            <a href="https://millatsarker.dev" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              Personal Website
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
