import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import BookingFlightCard from "../components/BookingFlightCard"; // Import the BookingFlightCard component

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  const [tickets, setTickets] = useState([]); // Biletler için state
  let { subpage } = useParams();

  // "flights" sayfasına gidildiğinde biletleri çek
  useEffect(() => {
    if (subpage === "flights") {
      axios.get("/profile").then(({ data }) => {
        setTickets(data.tickets); // Biletleri state'e ata
      });
    }
  }, [subpage]);

  const sortedTickets = tickets.sort((a, b) => {
    return new Date(a.departureTime) - new Date(b.departureTime);
  });

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
      <div className="flex justify-center ">
      <nav className="max-w-fit bg-white flex justify-center rounded-full my-4 gap-4 border-2 border-secondary">
        <Link to={"/account"} className={linkClasses("profile")}>
          Profile
        </Link>
        <Link to={"/account/flights"} className={linkClasses("flights")}>
          Flights
        </Link>
      </nav>
      </div>
     

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button
            className="bg-secondary rounded-full p-2 max-w-sm mt-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}

      {subpage === "flights" && (
        <div className="text-center  mx-auto">
          <h2 className="text-2xl mb-4 font-bold">My Flights</h2>
          <p className="mb-4 text-lg">Tickets are sorted by nearest Departure Time</p>
          {tickets.length > 0 ? (
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
                  <BookingFlightCard key={ticket._id} ticket={ticket} user={user} />
                ))}
            </ul>
          ) : (
            <p>You have no booked flights.</p>
          )}
        </div>
      )}
    </div>
  );
}
