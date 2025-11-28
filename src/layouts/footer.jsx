import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-5">

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-start items-center text-gray-400 text-sm gap-4">
          <p>&copy; {currentYear} Property Genie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
