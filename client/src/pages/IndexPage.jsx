import { useEffect, useState } from "react";
import axios from "axios";
import {
  PlaneIcon,
  ArrivalIcon,
  DepartureIcon,
  arrowLeft,
  arrowRight,
} from "../icon";
import Modal from "../components/Modal.jsx";

const getRandomPrice = () => {
  return Math.floor(Math.random() * (500 - 50 + 1)) + 50;
};

export default function IndexPage() {
  const [flights, setFlights] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [tripType, setTripType] = useState("one-way");
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFlightDetails = (index) => {
    if (expandedFlight === index) {
      setExpandedFlight(null); // Collapse if already expanded
    } else {
      setExpandedFlight(index); // Expand the selected flight
    }
  };

  const openModal = (flight) => {
    setSelectedFlight(flight); // Seçilen flight bilgilerini kaydet
    setIsModalOpen(true); // Modalı aç
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modalı kapat
  };

  useEffect(() => {
    axios
      .get("/flights") // Fetch flight data from Express API
      .then((response) => {
        const flightsWithPrices = response.data.flights.map((flight) => ({
          ...flight,
          price: getRandomPrice(), // Assign a random price to each flight
        }));
        setFlights(flightsWithPrices);
        console.log("flightData:", flightsWithPrices);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/destinations") // Express API'den uçuş bilgilerini çek
      .then((response) => {
        setDestinations(response.data.destinations);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <div className="w-full bg-white rounded-lg p-4 flex flex-col gap-4 mb-8">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <h1>Book your flight</h1>
          </div>
          <div className="flex">
            <button
              onClick={() => setTripType("one-way")}
              className={`border p-2 rounded-tl-lg rounded-bl-lg ${
                tripType === "one-way" ? "bg-secondary text-white" : ""
              }`}
            >
              One way
            </button>
            <button
              onClick={() => setTripType("round-trip")}
              className={`border p-2 rounded-tr-lg rounded-br-lg ${
                tripType === "round-trip" ? "bg-secondary text-white" : ""
              }`}
            >
              Round trip
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label htmlFor="departure" className="text-sm text-gray-600">
                From
              </label>
              <select id="departure" className="border py-2 px-8 rounded-lg">
                <option value="">Select Departure</option>
                <option value="AMS">Amsterdam (AMS)</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="destination" className="text-sm text-gray-600">
                To
              </label>
              <select id="destination" className="border py-2 px-8 rounded-lg">
                <option value="">Select Destination</option>
                {destinations.map(
                  (destination) =>
                    destination.city && (
                      <option
                        key={destination.iataCode}
                        value={destination.iataCode}
                      >
                        {destination.city}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label htmlFor="departure-date" className="text-sm text-gray-600">
                Departure Date
              </label>
              <input
                type="date"
                id="departure-date"
                className="border py-2 px-8  rounded-lg"
              />
            </div>
            {tripType === "round-trip" && (
              <div className="flex flex-col">
                <label htmlFor="return-date" className="text-sm text-gray-600">
                  Return Date
                </label>
                <input
                  type="date"
                  id="return-date"
                  className="border py-2 px-8  rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <button className="py-2 px-4 border rounded-lg bg-secondary text-white">
            Show Flights
          </button>
        </div>
      </div>

      {error && <p>Error: {error}</p>}
      <ul>
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div
              key={index}
              className="relative bg-white p-4 rounded-lg shadow-lg flex flex-col gap-8 border border-gray-100 mb-12"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  Amsterdam - {flight.route.destinations[0]} -{" "}
                  {flight.flightNumber}
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex gap-2">{DepartureIcon()}Departure</div>
                  <div>
                    <p className="text-sm text-gray-600 font-bold">
                      {flight.scheduleDate}
                    </p>
                    <p className="text-sm text-gray-600 font-bold">
                      Departure: {flight.scheduleTime}
                    </p>
                  </div>
                </div>
                <div className="w-16 h-0.5 bg-black mx-4"></div>
                <div className="flex items-center">{PlaneIcon()}</div>
                <div className="w-16 h-0.5 bg-black mx-4"></div>

                <div className="flex flex-col">
                  <div className="gap-2 flex">{ArrivalIcon()}Arrival</div>
                  <div>
                    <p className="text-sm text-gray-600 font-bold">
                      Arrival: {flight.arrivalTime}
                    </p>
                    <p className="text-sm text-gray-600 font-bold">
                      Airport: {flight.route.destinations[0]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center font-bold">
                <p> Price: ${flight.price}</p>
                <button onClick={() => openModal(flight)} className="bg-secondary px-12 py-4 text-white rounded-tl-lg rounded-bl-none rounded-tr-none rounded-br-lg absolute right-0 bottom-0 transition duration-200 hover:bg-opacity-80 hover:bg-secondary-light">
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
                  className={`py-2 px-4 border rounded-md bg-gray-300 text-md text-secondary underline  w-full flex items-center gap-2 
  ${
    expandedFlight === index
      ? "bg-secondary text-white rounded-tl-none rounded-tr-none no-underline"
      : ""
  }`}
                >
                  {expandedFlight === index ? (
                    <>
                      Collapse Details {arrowLeft()}
                      <div className="w-0.5 h-6 bg-white "></div>
                      <div className="flex  gap-8 ">
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
          ))
        ) : (
          <p className="text-gray-600 text-center"> No flights available</p>
        )}
      </ul>
      <Modal
          flight={selectedFlight}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
    </div>
  );
}
