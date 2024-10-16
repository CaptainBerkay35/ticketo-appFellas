import Card from "./Card";
import hotelImage from "../../assets/hotelBanner.jpeg";
import carRental from "../../assets/carRental.jpeg";
import travelLuggage from "../../assets/travelLuggage.jpeg";
import { carIcon, hotelIcon, luggageIcon } from "../../icon";

export default function Sidecards() {
  return (
    <div className="sticky top-4 h-full ml-4 hidden lg:block">
      <div className="space-y-6 ">
        <Card imgSrc={hotelImage} logoSrc={hotelIcon()} title="HOTELS" linkTo="/discover/hotels" />
        <Card imgSrc={carRental} logoSrc={carIcon()} title="CAR RENTALS" linkTo="/discover/cars" />
        <Card imgSrc={travelLuggage} logoSrc={luggageIcon()} title="TRAVEL PACKAGES" linkTo="/discover/luggage" />
      </div>
    </div>
  );
}