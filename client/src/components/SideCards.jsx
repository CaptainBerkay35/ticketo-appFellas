import Card from "./Card";
import hotelImage from "../assets/hotelBanner.jpeg";
import carRental from "../assets/carRental.jpeg";
import travelLuggage from "../assets/travelLuggage.jpeg";
import {carIcon,hotelIcon ,luggageIcon} from "../icon";

export default function Sidecards() {
  return (
    <div className="sticky top-4 h-full ml-4">
      <div className="space-y-8">
        <Card imgSrc={hotelImage} logoSrc={hotelIcon()} title="HOTELS" />
        <Card imgSrc={carRental} logoSrc={carIcon()} title="CAR RENTALS" />
        <Card
          imgSrc={travelLuggage}
          logoSrc={luggageIcon()}
          title="TRAVEL PACKAGES"
        />
      </div>
    </div>
  );
}
