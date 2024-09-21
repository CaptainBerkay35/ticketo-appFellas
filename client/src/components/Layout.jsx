import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideCards from "./SideCards";

export default function Layout() {
  const location = useLocation();
  
  // List of paths where SideCards should not appear
  const hideSideCardsOnPaths = ["/login", "/register"];

  const shouldHideSideCards = hideSideCardsOnPaths.includes(location.pathname);

  return (
    <div className="p-4 bg-primary flex flex-col min-h-screen">
      <Header />
      <div className="flex">
        <div className="flex-1">
          <Outlet />
        </div>
        {/* Conditionally render SideCards only if not on login or register pages */}
        {!shouldHideSideCards && <SideCards />} 
      </div>
    </div>
  );
}
