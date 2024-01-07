import React, { useState } from "react";
import SearchBar from "@/components/search-bar";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([
    { symbol: "META", price: "351.92", currency: "USD" },
    { symbol: "AAPL", price: "182.49", currency: "USD" },
  ]);

  const [selectedRow, setSelectedRow] = useState(0);

  const handleRowClick = (index: number) => {
    setSelectedRow(index);
  };

  const handleRemoveStock = (index: number) => {
    const newStocks = watchlist.filter((_, stockIndex) => stockIndex !== index);
    setWatchlist(newStocks);
  };

  return (
    <div className="bg-cream h-[90vh] flex flex-col justify-start items-center pt-10">
      <SearchBar watchlist={watchlist} setWatchlist={setWatchlist} />
      <div className="flex w-full mt-12">
        <div className="w-1/2 px-10 text-center">
          <h2 className="text-2xl font-bold">Watchlist</h2>
          <table className="min-w-full mt-4 shadow-sm backdrop-filter backdrop-blur">
            <thead>
              <tr className="bg-primary">
                <th className="px-2 py-2 text-center text-white border-none">
                  Symbol
                </th>
                <th className="px-2 py-2 text-center text-white border-none">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((stock, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${
                    index === selectedRow ? "bg-gray-200" : "bg-white"
                  }`}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="px-2 py-2 text-center border-none">
                    {stock.symbol}
                  </td>
                  <td className="px-2 py-2 text-center relative border-none">
                    {stock.currency} {stock.price}
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
