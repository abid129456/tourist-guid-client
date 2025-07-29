// const Footer = () => {
//   return (
//     <footer className="bg-gray-100 text-center py-4 mt-10">
//       <p className="text-sm text-gray-600">
//         &copy; {new Date().getFullYear()} Tourist Guide. All rights reserved.
//       </p>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-6 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Logo + Name */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img
            src="https://i.ibb.co/T4yk5Qz/logo.png"
            alt="Tourist Guide Logo"
            className="h-8 w-8"
          />
          <span className="font-bold text-lg">Tourist Guide</span>
        </div>

        {/* Useful Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="https://github.com/yourgithubusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/yourtwitterhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Twitter
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Tourist Guide. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
