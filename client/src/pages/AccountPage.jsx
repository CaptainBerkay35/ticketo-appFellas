import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"}></Navigate>;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-secondary text-white rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 mb-8 gap-4">
        <Link to={"/account"} className={linkClasses("profile")}>
          My Profile
        </Link>
        <Link to={"/account/flights"} className={linkClasses("flights")}>
          My Flights
        </Link>
      </nav>
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
    </div>
  );
}
