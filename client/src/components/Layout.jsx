import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideCards from "./sideCard/SideCards";

export default function Layout() {
  const location = useLocation();

  // List of paths where SideCards should not appear
  const hideSideCardsOnPaths = ["/login", "/register"];

  const shouldHideSideCards =
    hideSideCardsOnPaths.includes(location.pathname) ||
    location.pathname.startsWith("/discover");

  return (
    <div className="p-4 bg-primary flex flex-col min-h-screen min-w-fit">
      <Header />
      <div className="flex">
        <div className="flex-1">
          <Outlet />
        </div>
        {!shouldHideSideCards && <SideCards  />}
      </div>
    </div>
  );
}
