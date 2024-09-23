import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useDestination } from "../contexts/DestinationContext";
import axios from "axios";

export default function Modal({ flight, isOpen, onClose }) {
  const { user } = useContext(UserContext); // Get user from context
  const { destinations } = useDestination();
  const navigate = useNavigate();

  const destinationInfo = destinations.find(
    (destination) => destination.iata === flight?.route.destinations[0]
  );

  const handlePurchase = async () => {
    try {
      const city = destinationInfo.city;
      const response = await axios.post(
        "http://localhost:4000/purchase",
        {
          flightNumber: flight.flightNumber,
          departure: flight.scheduleDate,
          destination: flight.route.destinations[0],
          departureTime: flight.scheduleTime,
          city,
          price: flight.price,
          terminal: flight.terminal, // Add terminal info
          aircraft: flight.aircraftType.iataMain, // Add aircraft info
          visa: flight.visa ? "Yes" : "No", // Add visa info
          baggage: flight.baggageClaim.belts,
        },
        
        { withCredentials: true } // Send cookies for authentication
      );

      if (response.data.success) {
        alert("Ticket purchased successfully!");
        navigate("/account/flights");
        onClose(); // Close modal after successful purchase
      } else {
        alert("Failed to purchase ticket");
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      alert("Error occurred during ticket purchase.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-1/3">
        {user ? (
          <>
            <div className="">
              <h2 className="text-2xl font-bold mb-4">Flight Information</h2>
              <p>
                <strong>Flight Number:</strong> {flight.flightNumber}
              </p>
              <p>
                <strong>Departure:</strong> {flight.scheduleDate} -{" "}
                {flight.scheduleTime}
              </p>
              <p>
                <strong>Arrival:</strong> {destinationInfo.city} -{" "}
                {flight.route.destinations[0]}
              </p>

              <p>
                <strong>Aircraft:</strong> {flight.aircraftType.iataMain}
              </p>
              <p>
                <strong>Visa requirement:</strong> {flight.visa ? "Yes" : "No"}
              </p>
              <p>
                <strong>Baggage Claim:</strong> {flight.baggageClaim.belts}
              </p>
              <div className="">
                <p>
                  <strong>Price:</strong> ${flight.price}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="py-2 px-4 border rounded-lg bg-secondary text-white w-full transition duration-200 hover:bg-opacity-80"
                onClick={handlePurchase}
              >
                Buy Ticket
              </button>
              <button
                onClick={onClose}
                className="py-2 px-4 border rounded-lg bg-red-400 text-white transition duration-200 hover:bg-opacity-80"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Please log in or sign up to book your flight.
            </h2>
            <div className="mt-6 flex justify-center gap-2">
              <Link
                to="/login"
                className="py-2 px-4 w-full border rounded-lg text-center bg-secondary text-white transition duration-200 hover:bg-opacity-80"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="py-2 px-4 w-full text-center border rounded-lg bg-green-400 text-white transition duration-200 hover:bg-opacity-80"
              >
                Sign Up
              </Link>
              <button
                onClick={onClose}
                className="py-2 px-4 w-full border rounded-lg bg-red-400 text-white transition duration-200 hover:bg-opacity-80"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
