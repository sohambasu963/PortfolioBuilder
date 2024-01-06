import React, { useState } from "react";
import Image from "next/image";

export default function WatchlistPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [iconSrc, setIconSrc] = useState("/images/search.svg");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMouseOver = () => {
    setIconSrc("/images/search.gif");
  };

  const handleMouseOut = () => {
    setIconSrc("/images/search.svg");
  };

  return (
    <div className="bg-cream h-[90vh] flex flex-col justify-start items-center pt-10">
      <div className="relative w-[50vw]">
        <input
          type="text"
          className="w-full px-3 py-3 border border-gray-300 rounded"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute top-0 right-0 mt-3 mr-3">
          <Image
            src={iconSrc}
            alt="Search"
            width={24}
            height={24}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        </div>
      </div>
    </div>
  );
}
