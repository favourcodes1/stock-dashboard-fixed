import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StockData } from '../types';
import { API_KEY } from './API_KEY';

const STOCKS = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'];
const Home = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStockData = async () => {
    try {
      const responses = await Promise.all(
        STOCKS.map(async (symbol) => {
          const res = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
          );
          return {
            symbol,
            price: res.data.c,
            changePercent: ((res.data.c - res.data.pc) / res.data.pc) * 100,
          };
        })
      );
      setData(responses);
    } catch (err) {
      setError('Failed to fetch stock data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📈 Stock Price Dashboard</h1>
      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto w-full max-w-3xl">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
                <th className="p-4">Symbol</th>
                <th className="p-4">Price ($)</th>
                <th className="p-4">Change (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((stock) => (
                <tr key={stock.symbol} className="border-t">
                  <td className="p-4 font-medium">{stock.symbol}</td>
                  <td className="p-4">{stock.price.toFixed(2)}</td>
                  <td
                    className={`p-4 ${
                      stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stock.changePercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
