import { Outlet } from "react-router-dom";
import CustomerNavbar from "../common/CustomerNavbar";
import { AdminMenu } from "../../utils/Mock";
function PhotographerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Navbar (fixed height) */}
    <CustomerNavbar menuItems={AdminMenu} />

      {/* Outlet Area */}
      <div className="flex-1 w-full ">
        <Outlet />
      </div>
    </div>
  );
}

export default PhotographerLayout;
