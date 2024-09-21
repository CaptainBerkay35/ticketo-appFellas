import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { DiscoverIcon, DealsIcon, ProfileIcon, HeaderIcon } from "../icon";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between mb-4">
      <Link to={"/"} href="" className="flex items-center gap-1">
        {HeaderIcon()}
        <span className="font-bold text-xl">Ticketo</span>
      </Link>
      <div className="flex gap-4">
        <div>
          <a href="" className="flex gap-2">
            {DealsIcon()}
            <span>Deals</span>
          </a>
        </div>
        <div>
          <a href="" className="flex gap-2">
            {DiscoverIcon()}
            <span>Discover</span>
          </a>
        </div>
        <Link to={user ? "/account" : "/login"}>
          <a href="" className="flex gap-2">
            {ProfileIcon()}
            {!!user && <div>{user.name}</div>}
          </a>
        </Link>
      </div>
    </header>
  );
}
