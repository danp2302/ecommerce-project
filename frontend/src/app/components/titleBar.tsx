import React from "react";
import Image from "next/image";
import "../../../public/next.svg";

const TitleBar = () => {
  return (
    <div className="text-center">
      <Image
        src="/next.svg"
        alt="E-Commerce Website Logo"
        height={100}
        width={100}
        className="mx-auto mb-4 w-24 h-24"
      />
      <h1 className="text-4xl font-bold text-gray-800">E-Commerce Website</h1>
    </div>
  );
};

export default TitleBar;
