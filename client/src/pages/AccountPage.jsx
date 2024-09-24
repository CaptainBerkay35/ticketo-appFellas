import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import BookingFlightCard from "../components/BookingFlightCard";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [showTooltip, setShowTooltip] = useState(true);
  const [hovered, setHovered] = useState(false);
  let { subpage } = useParams();

  useEffect(() => {
    if (subpage === "flights" || subpage === "past-flights") {
      axios.get("/profile").then(({ data }) => {
        setTickets(data.tickets);
      });
    }
  }, [subpage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  // Bugünün tarihini "YYYY-MM-DD" formatında alıyoruz
  const today = new Date().toISOString().split("T")[0];

  const formatTicketDateTime = (ticket) => {
    // departure ve departureTime'ı birleştirip yeni bir Date objesi oluşturuyoruz
    return new Date(`${ticket.departure}T${ticket.departureTime}`);
  };

  // Bugünün tarihine eşit veya bugünden ileri olan uçuşlar future'a gidiyor
  const futureTickets = tickets.filter((ticket) => ticket.departure >= today);

  // Bugünün tarihinden eski olan uçuşlar past'e gidiyor
  const pastTickets = tickets.filter((ticket) => ticket.departure < today);

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6 text-lg text-secondary";
    if (type === subpage) {
      classes += " bg-secondary text-white rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="flex justify-center">
        <nav className="max-w-fit bg-white flex justify-center rounded-full my-4 border-2 border-secondary">
          <Link
            to={"/account"}
            className={`${linkClasses(
              "profile"
            )} transition duration-300 ease-in-out transform hover:scale-105`}
          >
            Profile
          </Link>
          <Link
            to={"/account/flights"}
            className={`${linkClasses(
              "flights"
            )} transition duration-300 ease-in-out transform hover:scale-105`}
          >
            Coming Flights
          </Link>
          <Link
            to={"/account/past-flights"}
            className={`${linkClasses(
              "past-flights"
            )} transition duration-300 ease-in-out transform hover:scale-105`}
          >
            Flight History
          </Link>
        </nav>
      </div>

      {subpage === "profile" && (
        <div className="text-center text-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button
            className="bg-red-500 rounded-lg text-white px-4 py-2 max-w-sm mt-2 transition duration-300 ease-in-out hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}

      {subpage === "flights" && (
        <div className=" text-center relative group">
          <div className="flex justify-center">
            <h2
              className="text-2xl mb-4 justify-center font-bold max-w-fit"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Coming Flights
            </h2>
          </div>

          {(showTooltip || hovered) && (
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 text-sm bg-gray-800 text-white z-20 p-2 rounded transition-opacity duration-300">
              Flights are sorted by departure time.
            </div>
          )}
          {futureTickets.length > 0 ? (
            <ul>
              {tickets
                .sort((a, b) => {
                  const timeA = a.departureTime.split(':').map(Number);
                  const timeB = b.departureTime.split(':').map(Number);
                  const totalSecondsA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
                  const totalSecondsB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];
                  return totalSecondsA - totalSecondsB;
                })
                .map((ticket) => (
                  <BookingFlightCard
                    key={ticket._id}
                    ticket={ticket}
                    user={user}
                  />
                ))}
            </ul>
          ) : (
            <p>You have no upcoming flights.</p>
          )}
        </div>
      )}

      {subpage === "past-flights" && (
        <div className="text-center mx-auto">
          <h2 className="text-2xl mb-4 font-bold">Flight History</h2>
          {pastTickets.length > 0 ? (
            <ul>
              {pastTickets
                .sort(
                  (a, b) => formatTicketDateTime(b) - formatTicketDateTime(a)
                ) // Geçmiş uçuşları sıralama
                .map((ticket) => (
                  <BookingFlightCard
                    key={ticket._id}
                    ticket={ticket}
                    user={user}
                  />
                ))}
            </ul>
          ) : (
            <p>You have no past flights.</p>
          )}
        </div>
      )}
    </div>
  );
}
