import { Link, useParams } from "react-router-dom";
import hotelBanner from "../assets/hotelBanner-2.jpg";
import carBanner from "../assets/carBanner.jpg";
import luggageBanner from "../assets/lugaggeBanner.jpg";

export default function DiscoverPage() {
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "hotels";
  }

  function linkClasses(type = null) {
    let classes = "py-4 px-6";
    if (type === subpage) {
      classes += " bg-white text-secondary font-bold rounded-lg";
    }
    return classes;
  }

  const pageData = {
    hotels: {
      imgSrc: hotelBanner,
      title: "Hotels",
      description: "Find the best hotels for your stay."
    },
    cars: {
      imgSrc: carBanner,
      title: "Car Rentals",
      description: "Rent a car for your next adventure."
    },
    luggage: {
      imgSrc: luggageBanner,
      title: "Travel Luggage",
      description: "Get the perfect luggage for your trip."
    }
  };

  const currentData = pageData[subpage];

  return (
    <div className="flex flex-col items-center ">
      <nav className="absolute top-24 rounded-lg flex justify-center gap-4 z-10 text-center shadow-md">
        <Link to="/discover/hotels" className={linkClasses("hotels")}>
          Hotels
        </Link>
        <div className="w-0.5 h-100% bg-secondary"></div>
        <Link to="/discover/cars" className={linkClasses("cars")}>
          Cars
        </Link>
        <div className="w-0.5 h-100% bg-secondary"></div>
        <Link to="/discover/luggage" className={linkClasses("luggage")}>
          Luggage
        </Link>
      </nav>

      <div className="w-full flex flex-col justify-center items-center border rounded-lg ">
        <div className="relative w-full h-[60vh] ">
          <img
            src={currentData.imgSrc}
            alt={currentData.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="text-center mt-8 max-w-4xl">
          <h2 className="text-3xl font-bold">{currentData.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{currentData.description}</p>
        </div>
      </div>
    </div>
  );
}
