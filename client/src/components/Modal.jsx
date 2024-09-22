import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Modal({ flight, isOpen, onClose }) {
  const { user } = useContext(UserContext); // Get user from context

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-1/3">
        {user ? (
          // If user is authenticated, show flight details and "Buy Ticket" button
          <>
            <h2 className="text-2xl font-bold mb-4">Flight Information</h2>
            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p><strong>Departure:</strong> {flight.scheduleDate} - {flight.scheduleTime}</p>
            <p><strong>Arrival:</strong> {flight.arrivalTime} - {flight.route.destinations[0]}</p>
            <p><strong>Price:</strong> ${flight.price}</p>
            <p><strong>Aircraft:</strong> {flight.aircraftType.iataMain}</p>
            <p><strong>Visa requirement:</strong> {flight.visa ? "Yes" : "No"}</p>
            <p><strong>Baggage Claim:</strong> {flight.baggageClaim.belts}</p>

            <div className="mt-6 flex justify-end gap-2">
              <button className="py-2 px-4 border rounded-lg bg-secondary text-white w-full transition duration-200 hover:bg-opacity-80">
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
            <h2 className="text-2xl font-bold mb-4 text-center">Please log in or sign up to book your flight.</h2>
            <div className="mt-6 flex justify-center gap-2">
              <Link to='/login' className="py-2 px-4 w-full border rounded-lg text-center bg-secondary text-white transition duration-200 hover:bg-opacity-80">
                Log In
              </Link>
              <Link to='/register' className="py-2 px-4 w-full text-center border rounded-lg bg-green-400 text-white transition duration-200 hover:bg-opacity-80">
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
