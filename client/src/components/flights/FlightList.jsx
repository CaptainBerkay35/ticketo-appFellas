import { useEffect, useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";
import { useDestination } from "../../contexts/DestinationContext";
import { useAirline } from "../../contexts/AirlineContext";

const getRandomPrice = () => Math.floor(Math.random() * (500 - 50 + 1)) + 50;

export default function FlightList({
  openModal,
  selectedDestination,
  showFlights,
}) {
  const [flights, setFlights] = useState([]);
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [error, setError] = useState(null);
  const { setDestinations } = useDestination();
  const { setAirlines } = useAirline();

  const toggleFlightDetails = (index) => {
    setExpandedFlight(expandedFlight === index ? null : index);
  };

  const filteredFlights =
    showFlights && selectedDestination
      ? flights.filter((flight) =>
          flight.route.destinations.includes(selectedDestination)
        )
      : flights;

  useEffect(() => {
    axios
      .get("/flights")
      .then(async (response) => {
        const flightsWithPrices = response.data.flights.map((flight) => ({
          ...flight,
          price: getRandomPrice(),
        }));
        setFlights(flightsWithPrices);

        const iataCodes = flightsWithPrices.map(
          (flight) => flight?.route?.destinations[0]
        );
        const destinationRequests = iataCodes.map((iataCode) =>
          axios.get(`/destinations/${iataCode}`)
        );

        try {
          const destinationResponses = await Promise.all(destinationRequests);
          const destinationData = destinationResponses.map((res) => res.data);
          setDestinations(destinationData);
        } catch (err) {
          console.error("Error fetching destination data:", err);
        }

        // Airlines bilgilerini almak için
        const airlineCodes = flightsWithPrices.map(
          (flight) => flight?.prefixIATA
        );
        const airlineRequests = airlineCodes.map((iatacode) =>
          axios.get(`/airlines/${iatacode}`)
        );
        try {
          // Tüm havayolu isteklerini aynı anda başlatıyoruz
          const airlineResponses = await Promise.allSettled(airlineRequests);

          // Başarılı olan istekleri filtreliyoruz
          const successfulAirlines = airlineResponses
            .filter((result) => result.status === "fulfilled") // Başarılı istekleri al
            .map((result) => result.value.data) // Yanıtın verisini çek
            .filter((data) => data && data.publicName); // publicName olmayanları da çıkar

          // Tekrarlayan havayolu verilerini temizle
          const uniqueAirlineData = Array.from(
            new Set(successfulAirlines.map((a) => a.iata))
          ).map((iata) => successfulAirlines.find((a) => a.iata === iata));

          setAirlines(uniqueAirlineData); // Havayolu bilgilerini state'e kaydet
        } catch (err) {
          console.error("Error fetching airline data:", err.message);
          setError("Error fetching airline data. Please try again later.");
        }
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <ul>
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <FlightCard
              key={index}
              flight={flight}
              index={index}
              expandedFlight={expandedFlight}
              toggleFlightDetails={toggleFlightDetails}
              openModal={openModal}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center">No flights available</p>
        )}
      </ul>
    </div>
  );
}
