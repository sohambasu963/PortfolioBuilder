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

  const [stocks, setStocks] = useState([
    { symbol: "META", price: "USD 351.92" },
    { symbol: "AAPL", price: "USD 182.49" },
  ]);

  const [selectedRow, setSelectedRow] = useState(0);

  const handleRowClick = (index: number) => {
    setSelectedRow(index);
  };

  const handleRemoveStock = (index: number) => {
    const newStocks = stocks.filter((_, stockIndex) => stockIndex !== index);
    setStocks(newStocks);
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
      <div className="flex w-full mt-12">
        <div className="w-1/2 px-10 text-center">
          <h2 className="text-2xl font-bold">Watchlist</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-2 py-2 text-center">Symbol</th>
                <th className="px-2 py-2 text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${
                    index === selectedRow
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="border px-2 py-2 text-center">
                    {stock.symbol}
                  </td>
                  <td className="border px-2 py-2 text-center relative">
                    {stock.price}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveStock(index);
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white rounded-full h-6 w-6 flex items-center justify-center"
                    >
                      &minus;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2 text-center">
          <h2 className="text-2xl font-bold">Performance</h2>
        </div>
      </div>
    </div>
  );
}
