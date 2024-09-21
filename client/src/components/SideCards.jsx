import Card from "./Card";
import hotelImage from "../assets/hotelBanner.jpeg";
import carRental from "../assets/carRental.jpeg";
import travelLuggage from "../assets/travelLuggage.jpeg";

export default function Sidecards() {
  const carIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path d="M135.2 117.4L109.1 192l293.8 0-26.1-74.6C372.3 104.6 360.2 96 346.6 96L165.4 96c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32l181.2 0c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2l0 144 0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L96 400l0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L0 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
    </svg>
  );
  const hotelIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path d="M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
    </svg>
  );
  const luggageIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path d="M144 56c0-4.4 3.6-8 8-8l80 0c4.4 0 8 3.6 8 8l0 72-96 0 0-72zm176 72l-32 0 0-72c0-30.9-25.1-56-56-56L152 0C121.1 0 96 25.1 96 56l0 72-32 0c-35.3 0-64 28.7-64 64L0 416c0 35.3 28.7 64 64 64c0 17.7 14.3 32 32 32s32-14.3 32-32l128 0c0 17.7 14.3 32 32 32s32-14.3 32-32c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64zM112 224l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 128l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
    </svg>
  );

  return (
    <div className="sticky top-4 h-full ml-4">
      <div className="space-y-8">
        <Card imgSrc={hotelImage} logoSrc={hotelIcon} title="HOTELS" />
        <Card imgSrc={carRental} logoSrc={carIcon} title="CAR RENTALS" />
        <Card
          imgSrc={travelLuggage}
          logoSrc={luggageIcon}
          title="TRAVEL PACKAGES"
        />
      </div>
    </div>
  );
}
