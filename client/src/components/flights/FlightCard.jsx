import {
  PlaneIcon,
  ArrivalIcon,
  DepartureIcon,
  arrowLeft,
  arrowRight,
} from "../../icon.jsx";
import {
  formatTime,
  formatDepartureTime,
  calculateDuration,
} from "../../utils.js";
import { useDestination } from "../../contexts/DestinationContext.jsx";
import { useAirline } from "../../contexts/AirlineContext.jsx";
import { useState } from "react";

export default function FlightCard({
  flight,
  index,
  expandedFlight,
  toggleFlightDetails,
  openModal,
}) {
  const { destinations } = useDestination();
  const { airlines } = useAirline();
  const destinationInfo = destinations.find(
    (destination) => destination.iata === flight.route.destinations[0]
  );

  const airlineInfo = airlines.find(
    (airline) => airline.iata === flight.prefixIATA
  );

  const [hovered, setHovered] = useState(false);

  return (
    <div
      key={index}
      className="relative bg-white p-4 rounded-lg shadow-lg flex flex-col gap-8 border border-gray-100 mb-12"
    >
      <div>
        <h2 className="text-lg font-bold">
          Amsterdam
          {destinationInfo
            ? ` - ${destinationInfo.city}`
            : "Unknown Destination"}{" "}
          - {flight.flightNumber}
        </h2>
      </div>
      <div className="flex items-center justify-between ">
        <div>
          <div className="flex gap-2 font-bold ">
            {DepartureIcon()}Departure
          </div>
          <div>
            <p className="font-bold">{flight.scheduleDate}</p>
            <p className="font-bold">
              Departure: {formatDepartureTime(flight.scheduleTime)}
            </p>
          </div>
        </div>
        <div className="w-16 h-0.5 bg-black mx-4"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold text-lg">
            {airlineInfo ? airlineInfo.publicName : "Unknown Airline"}
          </div>
          <div
            className={`transition-transform duration-300 transform ${
              hovered ? "translate-x-[20px]" : ""
            }`}
          >
            {PlaneIcon()}
          </div>
          <p className="text-lg text-black font-bold">
            Duration:{" "}
            {calculateDuration(
              formatDepartureTime(flight.scheduleTime),
              formatTime(flight.expectedTimeOnBelt)
            )}
          </p>
        </div>
        <div className="w-16 h-0.5 bg-black mx-4"></div>
        <div className="flex flex-col">
          <div className="gap-2 flex font-bold">{ArrivalIcon()}Arrival</div>
          <div>
            <p className="font-bold">Airport: {flight.route.destinations[0]}</p>
            <p className="font-bold">
              Estimated Arrival: {formatTime(flight.expectedTimeOnBelt)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center font-bold">
        <p className="text-lg">Price: ${flight.price}</p>
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => openModal(flight)}
          className="bg-secondary px-12 py-4 text-white rounded-tl-lg rounded-bl-none rounded-tr-none rounded-br-lg absolute right-0 bottom-0 transition duration-200 hover:bg-secondary_light"
        >
          Book Flight
        </button>
      </div>
      <div
        className={`transition duration-800 absolute left-[0px] bottom-[-40px] ${
          expandedFlight === index ? "w-full" : "w-1/4"
        }`}
      >
        <button
          onClick={() => toggleFlightDetails(index)}
          className={`py-2 px-4 border rounded-md bg-gray-300 text-md text-secondary underline w-full flex items-center gap-2 hover:bg-gray-400 ${
            expandedFlight === index
              ? "bg-secondary text-white rounded-tl-none rounded-tr-none no-underline hover:bg-secondary_light"
              : ""
          }`}
        >
          {expandedFlight === index ? (
            <>
              Collapse Details {arrowLeft()}
              <div className="w-0.5 h-6 bg-white"></div>
              <div className="flex gap-8">
                <p>Terminal: {flight.terminal}</p>
                <p>Aircraft: {flight.aircraftType.iataMain}</p>
                <p>Visa requirement: {flight.visa ? "Yes" : "No"}</p>
                <p>Baggage Claim: {flight.baggageClaim.belts}</p>
              </div>
            </>
          ) : (
            <>Check the details {arrowRight()}</>
          )}
        </button>
      </div>
    </div>
  );
}
