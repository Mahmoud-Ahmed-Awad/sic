import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } =
    useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn, openSignUp } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        return navigate("/educator");
      }
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message || "You are now an educator");
        navigate("/educator");
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while updating role");
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="cursor-pointer" onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignUp()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
          >
            Create Account
          </button>
        )}
      </div>
      {/* For Phone Screens */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate("/educator");
                }}
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
