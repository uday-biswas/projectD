// Marketplace.jsx
import React from "react";
import { Link } from "react-router-dom";

const quotes = [
  { username: "@aditya", amount: 1000, interest: 5, type:"borrow", bidders: 3 },
  { username: "User2", amount: 800, interest: 4, type:"lend", bidders: 2 },
  // Add more quotes as needed
];

const Marketplace = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mt-8">Marketplace</h1>
      <div className="mt-4">
        {quotes.map((quote, index) => (
          <Link
            to={`/marketplace/${quote.username}/${quote.type}/${quote.amount}/${quote.interest}`}
            key={index}
          >
            <div className="bg-gray-800 p-4 rounded-md m-2 cursor-pointer">
              <p className="text-white">
                Username: {quote.username}, Amount: {quote.amount}, Interest: {quote.interest}%, Bidders: {quote.bidders}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
