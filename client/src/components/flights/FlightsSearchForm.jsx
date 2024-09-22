import { useState, useEffect } from "react";
import axios from "axios";
import { useDestination } from "../../contexts/DestinationContext";
import { PlaneIcon } from "../../icon.jsx";

export default function FlightSearchForm({
  tripType,
  setTripType,
  setSelectedDestination,
  onShowFlights,
}) {
  const { destinations } = useDestination();
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios
      .get("/destinations")
      .then((response) => setDestinations(response.data.destinations))
      .catch((error) => setError(error.message));
  }, []);

  const handleDestinationChange = (event) => {
    const selectedIata = event.target.value;
    setSelected(selectedIata);
    setSelectedDestination(selectedIata);
  };

  const uniqueDestinations = destinations.reduce((acc, destination) => {
    if (!acc.find((item) => item.iata === destination.iata)) {
      acc.push(destination);
    }
    return acc;
  }, []);

  return (
    <div className="w-full bg-white rounded-lg p-4 flex flex-col gap-4 mb-8">
      <div className="flex justify-between">
        <div className="flex text-center gap-4">
          {PlaneIcon()}
          <h1 className="font-bold">Book your flight</h1>
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
            <select
              id="departure"
              className="border py-2 px-8 rounded-lg"
              value="AMS"
              disabled
            >
              <option value="AMS">Amsterdam (AMS)</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="destination" className="text-sm text-gray-600">
              To
            </label>
            <select
              id="destination"
              className="border py-2 px-8 rounded-lg"
              value={selected}
              onChange={handleDestinationChange}
            >
              <option value="">Select Destination</option>
              {uniqueDestinations.map((destination, index) => (
                <option key={index} value={destination.iata}>
                  {destination.country} - {destination.city}
                </option>
              ))}
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
              className="border py-2 px-8 rounded-lg"
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
                className="border py-2 px-8 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={onShowFlights} // Trigger filtering on button click
          className="py-2 px-4 border rounded-lg bg-secondary text-white transition duration-200 hover:bg-opacity-80 hover:bg-secondary-light"
        >
          Show Flights
        </button>
      </div>
    </div>
  );
}
