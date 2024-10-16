import { PlaneIcon } from "../icon.jsx";
import { formatDepartureTime } from "../utils.js";
export default function BookingFlightCard({ ticket, user }) {
  return (
    <div className="relative bg-white p-4 rounded-lg shadow-lg flex  border border-gray-100 mb-4 sm:mb-8 justify-between items-center ">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl">
          <strong>Flight Number:</strong> {ticket.flightNumber}
        </h2>
        {PlaneIcon()}
      </div>
      <div className="w-0.5 h-32 bg-black"></div>
      <div>
        <li className=" p-4 text-start ">
          <p>
            <strong>Departure Date:</strong> {ticket.departure} -{" "}
            {formatDepartureTime(ticket.departureTime)}
          </p>
          <p>
            <strong>Destination:</strong> {ticket.city} - {ticket.destination}
          </p>
          <p>
            <strong>Airline:</strong> {ticket.airline}
          </p>
          <p>
            <strong>Purchased by:</strong> {user.name}
          </p>
          <p>
            <strong>Purchase Date:</strong>{" "}
            {new Date(ticket.purchaseDate).toLocaleDateString()}{" "}
            {new Date(ticket.purchaseDate).toLocaleTimeString()}
          </p>
          <p>
            <strong>Price:</strong> ${ticket.price}
          </p>
        </li>
      </div>
      <div>
        <li className="p-4 text-start">
          <p>
            <strong>Aircraft:</strong> {ticket.aircraft}
          </p>
          <p>
            <strong>Visa Requirement:</strong> {ticket.visa}
          </p>
          <p>
            <strong>Baggage:</strong> {ticket.baggage}
          </p>
          <p>
            <strong>Terminal:</strong> {ticket.terminal}
          </p>
        </li>
      </div>
      <div className="w-16 h-16 bg-primary rounded-full mr-16"></div>
    </div>
  );
}
