import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { fetchStockSuggestions, fetchStockData } from "@/lib/api";

interface SearchBarProps {
  watchlist: StockData[];
  handleAddStockToFirestore: (newStock: StockData) => Promise<void>;
}

interface StockData {
  id?: string;
  symbol: string;
  price: string;
  currency: string;
  historicalData?: any;
}

export default function SearchBar({
  watchlist,
  handleAddStockToFirestore,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<
    { symbol: string; name: string; currency: string }[]
  >([]);
  const [iconSrc, setIconSrc] = useState("/images/search.svg");
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSuggestions([]);
    } else {
      const newSuggestions = await fetchStockSuggestions(term);
      setSuggestions(newSuggestions || []);
    }
  };

  const handleMouseOver = () => {
    setIconSrc("/images/search.gif");
  };

  const handleMouseOut = () => {
    setIconSrc("/images/search.svg");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addStock = async (suggestion: {
    symbol: string;
    name: string;
    currency: string;
  }) => {
    // Check if the stock is already in the watchlist
    const isStockInWatchlist = watchlist.some(
      (stock) => stock.symbol === suggestion.symbol,
    );

    if (!isStockInWatchlist) {
      try {
        const stockData = await fetchStockData(suggestion);
        if (stockData) {
          // Call the function to add the stock to Firestore
          await handleAddStockToFirestore(stockData);
        }
      } catch (error) {
        console.error("Error fetching stock data: ", error);
      }
    }
  };

  return (
    <div ref={searchBarRef} className="relative w-[50vw]">
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
      {suggestions.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded mt-1 z-50 shadow-lg backdrop-filter backdrop-blur">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => addStock(suggestion)}
              // onClick={async () => {
              //   const stockData = await fetchStockData(suggestion);
              //   console.log(stockData);
              //   setWatchlist([...watchlist, stockData]);
              //   setSuggestions([]);
              // }}
            >
              <div>
                <strong>{suggestion.symbol}</strong> - {suggestion.name}
                <br />
                <small>{suggestion.currency}</small>
              </div>
              {watchlist.some((stock) => stock.symbol === suggestion.symbol) ? (
                <Image
                  src="/images/checkmark.svg"
                  alt="Checkmark"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/images/plus.svg"
                  alt="Add"
                  width={24}
                  height={24}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
