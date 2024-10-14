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
      className="relative bg-white p-4 max-w-xl rounded-lg shadow-lg flex flex-col gap-4 sm:gap-8 border border-gray-100 mb-12 w-full sm:max-w-3xl mx-auto md:max-w-4xl lg:max-w-5xl"
    >
      <div>
        <h2 className="text-lg font-semibold sm:font-bold">
          Amsterdam
          {destinationInfo
            ? ` - ${destinationInfo.city}`
            : "Unknown Destination"}{" "}
          - {flight.flightNumber}
        </h2>
      </div>
      <div className="flex items-center justify-between ">
        <div>
          <div className="flex gap-2 font-semibold sm:font-bold ">
            {DepartureIcon()}Departure
          </div>
          <div>
            <p className="font-semibold sm:font-bold">{flight.scheduleDate}</p>
            <p className="font-semibold sm:font-bold">
              Departure: {formatDepartureTime(flight.scheduleTime)}
            </p>
          </div>
        </div>
        <div className="w-8 h-0.5 bg-black mx-2 sm:mx-4 sm:w-16"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="font-semibold sm:font-bold text-m sm:text-lg">
            {airlineInfo ? airlineInfo.publicName : "Unknown Airline"}
          </div>
          <div
            className={`transition-transform duration-300 transform ${
              hovered ? "translate-x-[20px]" : ""
            }`}
          >
            {PlaneIcon()}
          </div>
          <p className="text-m text-black font-semibold sm:font-bold sm:text-lg">
            Duration:{" "}
            {calculateDuration(
              formatDepartureTime(flight.scheduleTime),
              formatTime(flight.expectedTimeOnBelt)
            )}
          </p>
        </div>
        <div className="w-8 h-0.5 bg-black mx-2 sm:mx-4 sm:w-16"></div>
        <div className="flex flex-col">
          <div className="gap-2 flex font-semibold sm:font-bold">{ArrivalIcon()}Arrival</div>
          <div>
            <p className="font-semibold sm:font-bold">Airport: {flight.route.destinations[0]}</p>
            <p className="font-semibold sm:font-bold">
              Estimated Arrival: {formatTime(flight.expectedTimeOnBelt)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center font-semibold sm:font-bold">
        <p className="text-lg">Price: ${flight.price}</p>
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => openModal(flight)}
          className="bg-secondary px-6 py-2 sm:px-12 sm:py-4 text-white rounded-tl-lg rounded-bl-none rounded-tr-none rounded-br-lg absolute right-0 bottom-0 transition duration-200 hover:bg-secondary_light"
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
          className={`py-2 px-1 md:px-2  border rounded-md bg-gray-300 text-md text-secondary underline w-full flex items-center gap-2 hover:bg-gray-400 ${
            expandedFlight === index
              ? "bg-secondary text-white rounded-tl-none rounded-tr-none no-underline hover:bg-secondary_light"
              : ""
          }`}
        >
          {expandedFlight === index ? (
            <>
              Collapse Details {arrowLeft()}
              <div className="w-0.5 h-6 bg-white"></div>
              <div className="flex gap-1 sm:gap-2 md:gap-4 lg:gap-6 text-sm sm:text-lg">
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
