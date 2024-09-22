import { useState } from "react";
import FlightSearchForm from "../components/flights/FlightsSearchForm.jsx";
import FlightList from "../components/flights/FlightList.jsx";
import Modal from "../components/Modal.jsx";


export default function IndexPage() {
  const [tripType, setTripType] = useState("one-way");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null); // Seçilen destination
  const [showFlights, setShowFlights] = useState(false);

  const handleShowFlights = () => {
    setShowFlights(true); // Set flag to true when button is clicked
  }

  const openModal = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <FlightSearchForm
        tripType={tripType}
        setTripType={setTripType}
        setSelectedDestination={setSelectedDestination}
        onShowFlights={handleShowFlights}
      />
      <FlightList
        openModal={openModal}
        selectedDestination={selectedDestination}
        showFlights={showFlights}
      />
      <Modal
        flight={selectedFlight}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
