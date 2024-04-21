import React from "react";
import Image from "next/image";
import "../../../public/website_logo.jpg";

const WebsiteLogo = () => {
  return (
    <img
      src="/website_logo.jpg"
      alt="E-Commerce Website Logo"
      className="mx-auto mb-4 h-40 rounded-full"
    />
  );
};

export default WebsiteLogo;
