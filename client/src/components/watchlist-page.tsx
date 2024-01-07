import React, { useState } from "react";
import SearchBar from "@/components/search-bar";
import StockChart from "@/components/stock-chart";

export default function WatchlistPage() {
  // const [watchlist, setWatchlist] = useState([
  //   { symbol: "META", price: "351.92", currency: "USD" },
  //   { symbol: "AAPL", price: "182.49", currency: "USD" },
  // ]);
  const [watchlist, setWatchlist] = useState<
    { symbol: string; price: string; currency: string; historicalData: any }[]
  >([]);

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
          <h2 className="text-2xl mb-4 font-bold">Watchlist</h2>
          <table className="min-w-full shadow-sm backdrop-filter backdrop-blur">
            <thead>
              <tr className="bg-primary">
                <th className="px-2 py-2 text-center text-white border-none">
                  Symbol
                </th>
                <th className="px-2 py-2 text-center text-white border-none">
                  Currency
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
                  <td className="px-2 py-2 text-center border-none">
                    {stock.currency}
                  </td>
                  <td className="px-2 py-2 text-center relative border-none">
                    {stock.price}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveStock(index);
                      }}
                      className="absolute top-2 right-2 bg-red-400 hover:bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center"
                    >
                      &minus;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2 px-10 text-center">
          <h2 className="text-2xl mb-4 font-bold">Performance</h2>
          {watchlist[selectedRow] && (
            <StockChart
              historicalData={watchlist[selectedRow].historicalData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
