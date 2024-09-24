import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post("/login", { email, password });
      setUser(response.data);
      setRedirect(true);
    } catch (e) {
      console.error(e);
      alert("Login failed");
    } finally {
      setLoading(false); 
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4 font-bold">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border my-2 py-2 px-3 rounded-2xl"
          />
          <button
            className="my-2 py-2 px-3 border rounded-2xl bg-secondary w-full text-white text-lg hover:bg-secondary_light transition duration-200"
            disabled={loading} 
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black font-bold" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
