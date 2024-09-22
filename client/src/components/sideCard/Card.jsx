import { Link } from "react-router-dom";

export default function Card({ imgSrc, title, logoSrc, linkTo }) {
  return (
    <Link to={linkTo} className="relative bg-white shadow-lg rounded-lg overflow-hidden block">
      <img src={imgSrc} alt="Card Image" className="w-full h-48 object-cover" />
      <div className="absolute bottom-0 left-0 px-4 py-2 w-full z-10 bg-gradient-to-t from-black/50 to-transparent">
        {typeof logoSrc === "string" ? (
          <img src={logoSrc} alt="Card Logo" className="w-8 h-8 text-white" />
        ) : (
          <div className="w-8 h-8 text-white">{logoSrc}</div>
        )}
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
    </Link>
  );
}
