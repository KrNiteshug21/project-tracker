import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

const navObj = [
  { name: "Employee", link: "/employee" },
  { name: "Projects", link: "/projects" },
  { name: "Task", link: "/task" },
];

const NavItems = ({ item }) => {
  const [hoverArrow, setHoverArrow] = useState(false);

  return (
    <Link
      className="flex items-center gap-4 hover:underline"
      onMouseEnter={() => setHoverArrow(true)}
      onMouseLeave={() => setHoverArrow(false)}
      to={item.link}
    >
      {item.name} {hoverArrow && <FaArrowRight />}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="top-4 sticky px-4">
      <div className="mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
        <div className="flex justify-between items-center border-2 border-primary backdrop-blur-md rounded-full">
          <div className="bg-primary dark:bg-light-background px-6 py-1 rounded-full text-2xl text-white">
            <Link className="" to="/">
              Project-Tracker
            </Link>
          </div>

          <div className="block sm:hidden px-4 text-lg">
            <div className="flex items-center gap-4">
              <GiHamburgerMenu
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
                size={24}
              />
            </div>
            {isMenuOpen && (
              <div className="top-0 right-0 left-0 absolute bg-primary p-4 rounded-lg text-white">
                <div className="flex flex-col items-start space-y-4">
                  <IoMdClose
                    className="ml-auto cursor-pointer"
                    size={24}
                    onClick={() => setIsMenuOpen(false)}
                  />
                  {navObj.map((item) => (
                    <NavItems key={item.name} item={item} />
                  ))}
                  {token ? (
                    <button onClick={handleSignout} className="hover:underline">
                      Signout
                    </button>
                  ) : (
                    <Link to="/login" className="hover:underline">
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="sm:flex sm:items-center sm:gap-4 hidden px-4 text-lg">
            {navObj.map((item) => (
              <Link className="hover:underline" key={item.name} to={item.link}>
                {item.name}
              </Link>
            ))}
            {token ? (
              <button onClick={handleSignout} className="hover:underline">
                Signout
              </button>
            ) : (
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
