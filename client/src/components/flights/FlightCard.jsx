import {
  PlaneIcon,
  ArrivalIcon,
  DepartureIcon,
  arrowLeft,
  arrowRight,
} from "../../icon.jsx";
import { useDestination } from "../../contexts/DestinationContext.jsx";

export default function FlightCard({
  flight,
  index,
  expandedFlight,
  toggleFlightDetails,
  openModal,
}) {
  const { destinations } = useDestination();
  const destinationInfo = destinations.find(
    (destination) => destination.iata === flight.route.destinations[0]
  );

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const timeParts = timeString.split("T")[1].split("+")[0].split(":");
    return `${timeParts[0].padStart(2, "0")}:${timeParts[1].padStart(2, "0")}`; // HH:mm formatı
  };

  const formatDepartureTime = (departureTime) => {
    if (!departureTime) return "N/A";
    const timeParts = departureTime.split(":");
    return `${timeParts[0].padStart(2, "0")}:${timeParts[1].padStart(2, "0")}`; // HH:mm formatı
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return "N/A";

    const departureDate = new Date(`1970-01-01T${departureTime}`);
    const arrivalDate = new Date(`1970-01-01T${arrivalTime}`);

    if (isNaN(departureDate) || isNaN(arrivalDate)) return "N/A";

    const duration = arrivalDate - departureDate;

    if (duration < 0) return "N/A";

    const hours = Math.floor((duration % 86400000) / 3600000);
    const minutes = Math.round(((duration % 86400000) % 3600000) / 60000);

    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      key={index}
      className="relative bg-white p-4 rounded-lg shadow-lg flex flex-col gap-8 border border-gray-100 mb-12"
    >
      <div>
        <h2 className="text-lg font-semibold">
          Amsterdam
          {destinationInfo
            ? ` - ${destinationInfo.city}`
            : "Unknown Destination"}{" "}
          - {flight.flightNumber}
        </h2>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2 font-bold">{DepartureIcon()}Departure</div>
          <div>
            <p className="text-sm text-gray-600 font-bold">
              {flight.scheduleDate}
            </p>
            <p className="text-sm text-gray-600 font-bold">
              Departure: {formatDepartureTime(flight.scheduleTime)}
            </p>
          </div>
        </div>
        <div className="w-16 h-0.5 bg-black mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="mb-2">{PlaneIcon()}</div>
          <p className="text-sm text-black font-bold">
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
            <p className="text-sm text-gray-600 font-bold">
              Airport: {flight.route.destinations[0]}
            </p>
            <p className="text-sm text-gray-600 font-bold">
              Estimated Arrival: {formatTime(flight.expectedTimeOnBelt)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center font-bold">
        <p>Price: ${flight.price}</p>
        <button
          onClick={() => openModal(flight)}
          className="bg-secondary px-12 py-4 text-white rounded-tl-lg rounded-bl-none rounded-tr-none rounded-br-lg absolute right-0 bottom-0 transition duration-200 hover:bg-opacity-80 hover:bg-secondary-light"
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
          className={`py-2 px-4 border rounded-md bg-gray-300 text-md text-secondary underline w-full flex items-center gap-2 ${
            expandedFlight === index
              ? "bg-secondary text-white rounded-tl-none rounded-tr-none no-underline"
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
