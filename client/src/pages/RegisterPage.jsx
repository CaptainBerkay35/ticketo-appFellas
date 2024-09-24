import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [redirect, setRedirect] = useState(false);

  async function registerUser(event) {
    event.preventDefault();
    setLoading(true); 
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      setRedirect(true); 
    } catch (e) {
      console.error(e);
      alert("Registration failed, try again later.");
    } finally {
      setLoading(false); 
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />; // Redirect to login page
  }

  return (
    <div className="mt-4 grow flex flex-col items-center justify-around gap-4">
      <div>
        <h1 className="text-4xl text-center mb-4 font-bold">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full border my-2 py-2 px-3 rounded-2xl"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border my-2 py-2 px-3 rounded-2xl"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border my-2 py-2 px-3 rounded-2xl"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="my-2 py-2 px-3 border rounded-2xl bg-secondary w-full text-white hover:bg-secondary_light transition duration-200"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Register"} {/* Show loading text */}
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black font-bold" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
