import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";

const IndividualQuote = ({user}) => {
  const { userName, type, amount, interest } = useParams();
  const canBid = user.userName !== userName;
  
  const [showForm, setShowForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [bidInterest, setBidInterest] = useState("");
  const [userBid , setUserBid] = useState(null);
  const [bids, setBids] = useState([
    { bidder: "UserA", bidAmount: 950, bidInterest: 4.5 },
    { bidder: "UserB", bidAmount: 1000, bidInterest: 5 },
  ]);

  useEffect(() => {
    // Find the current user's bid, if it exists
    const currentUserBid = bids.find((bid) => bid.bidder === user.userName);
    setUserBid(currentUserBid);
  }, [bids, user.userName]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    // Perform any validation before submitting the bid
    if (bidAmount && bidInterest) {
      // Simulate submitting the bid to the backend
      // In a real application, you would send a request to your backend

      if (userBid) {
        // Update the existing bid
        const updatedBids = bids.map((bid) =>
          bid.bidder === user.userName
            ? { ...bid, bidAmount: parseFloat(bidAmount), bidInterest: parseFloat(bidInterest) }
            : bid
        );
        setShowForm(false);
        setBids(updatedBids);
      } else {
        // Submit a new bid
        const newBid = {
          bidder: user.userName, // Replace with the actual username
          bidAmount: parseFloat(bidAmount),
          bidInterest: parseFloat(bidInterest),
        };
        setShowForm(false);
        setBids([...bids, newBid]);
      }

      // Clear the input fields
      setBidAmount("");
      setBidInterest("");
    }
  };

  const handleBidDelete = () => {
    // Delete the user's bid
    const updatedBids = bids.filter((bid) => bid.bidder !== user.userName); // Replace with the actual username
    setBids(updatedBids);
    setUserBid(null);
  }; 

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex float-right gap-3 mt-5">
        {canBid && <button onClick={() => setShowForm(true)} className="text-xl font-bold w-fit p-2 bg-blue-600 rounded-lg hover:bg-blue-900">{userBid ? "Update your Bid" : "Place your Bid"}</button>}

        {/* Display options to delete the bid if the user has already submitted a bid */}
        {userBid && (
          <button
            onClick={handleBidDelete}
            className="w-fit p-2 text-xl font-bold bg-red-700 text-white rounded-lg hover:bg-red-900"
          >
            Delete Bid
          </button>
      )}
        </div>
      <h1 className="text-4xl font-bold mt-8">
        {type === "borrow" ? "Borrow" : "Lend"} Request - Amount: {amount}, Interest: {interest}% by {userName}
      </h1>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Bids:</h2>
        {bids.map((bid, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-md m-2">
              <p className="text-white">
                Bidder: {bid.bidder}, Amount: {bid.bidAmount}, Interest: {bid.bidInterest}%
              </p>
            </div>
          ))}
      </div>
      {showForm && (
        <form onSubmit={handleBidSubmit} className="flex flex-col items-center">
        <label htmlFor="bidAmount" className="block mb-2 text-white">
          Bid Amount:
          <input
            type="number"
            id="bidAmount"
            name="bidAmount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full p-2 rounded-md"
          />
        </label>
        <label htmlFor="bidInterest" className="block mb-2 text-white">
          Bid Interest:
          <input
            type="number"
            id="bidInterest"
            name="bidInterest"
            value={bidInterest}
            onChange={(e) => setBidInterest(e.target.value)}
            className="w-full p-2 rounded-md"
          />
        </label>
        <button type="submit" className="w-full h-12 bg-blue-700 text-white rounded-md hover:bg-blue-900">
          {userBid ? "Update Bid" : "Submit Bid"}
        </button>
      </form>
      )}

    </div>
  );
};

export default IndividualQuote;
