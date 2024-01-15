import React, { useState, useEffect } from "react";
import SearchBar from "@/components/search-bar";
import StockChart from "@/components/stock-chart";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

interface IWatchlistItem {
  id?: string;
  symbol: string;
  price: string;
  currency: string;
  historicalData?: any;
}



export default function DashboardPage() {
  // const [watchlist, setWatchlist] = useState([
  //   { symbol: "META", price: "351.92", currency: "USD" },
  //   { symbol: "AAPL", price: "182.49", currency: "USD" },
  // ]);
  // const [watchlist, setWatchlist] = useState<
  //   { symbol: string; price: string; currency: string; historicalData: any }[]
  // >([]);
  const [watchlist, setWatchlist] = useState<IWatchlistItem[]>([]);
  const [selectedRow, setSelectedRow] = useState(0);

  const watchlistCollectionRef = collection(db, 'watchlist');

  useEffect(() => {
    const fetchWatchlist = async () => {
      const querySnapshot = await getDocs(watchlistCollectionRef);
      const stocks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IWatchlistItem[];
      setWatchlist(stocks);
    };

    fetchWatchlist();
  }, [watchlistCollectionRef]);

  const handleAddStockToFirestore = async (newStock: IWatchlistItem) => {
    try {
      await addDoc(watchlistCollectionRef, newStock);
      setWatchlist(prevWatchlist => [...prevWatchlist, newStock]);
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
    }
  };

  const handleRemoveStockFromFirestore = async (id: string) => {
    try {
      await deleteDoc(doc(watchlistCollectionRef, id));
      setWatchlist(prevWatchlist => prevWatchlist.filter(stock => stock.id !== id));
    } catch (error) {
      console.error("Error removing document from Firestore: ", error);
    }
  };

  const handleRowClick = (index: number) => {
    setSelectedRow(index);
  };

  const handleRemoveStock = (index: number) => {
    const stockToRemove = watchlist[index];
    if (stockToRemove && stockToRemove.id) {
      handleRemoveStockFromFirestore(stockToRemove.id);
    }
  };

  return (
    <div className="bg-cream h-[90vh] flex flex-col justify-start items-center pt-10">
      <SearchBar watchlist={watchlist} handleAddStockToFirestore={handleAddStockToFirestore} />
      <div className="flex w-full mt-12">
        <div className="w-2/5 px-10 text-center">
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
                      className="absolute top-1.5 right-1 bg-red-400 hover:bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center"
                    >
                      &minus;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-3/5 px-10 text-center h-full">
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
