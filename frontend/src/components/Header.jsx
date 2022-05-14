import React, { useContext } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useLocation, Link } from "react-router-dom";
import AuthContext from "../Auth/AuthContext.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  let navigation = [
    {
      name: "Home",
      href: "/",
      current: location.pathname === "/" ? true : false,
    },
    {
      name: "Cars",
      href: "/cars",
      current: location.pathname.startsWith('/car') ? true : false,
    },
    {
      name: !user ? "Login" : "Create Car",
      href: !user ? "/login" : "/create-car",
      current: !user
        ? location.pathname === "/login"
          ? true
          : false
        : location.pathname === "/create-car"
        ? true
        : false,
    },
    {
      name: !user ? "Signup" : "My Cars",
      href: !user ? "/signup" : "/my-posts",
      current: !user
        ? location.pathname === "/signup"
          ? true
          : false
        : location.pathname === "/my-posts"
        ? true
        : false,
    },
  ];

  return (
    <>
      <Disclosure as="nav" className=" relative w-screen bg-white h-full z-20">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto py-2 sm:py-4 px-2">
              <div className="relative flex z-10 items-center justify-between h-16">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-stretch justify-start">
                  <div className="flex-shrink-0 flex items-center"></div>
                  <div className="hidden sm:block my-auto ml-auto lg:mr-12 lg:items-center lg:w-auto lg:space-x-12">
                    <div className="flex items-center space-x-4">
                      {navigation.map((item, idx) => (
                        <div key={idx}>
                          <Link
                            to={item.href}
                            key={item.name}
                            className={classNames(
                              item.current && "bg-blue-600 text-white ",
                              "px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}

                      {user && (
                        <button
                          onClick={() => logout()}
                          className="bg-red-600 text-white px-3 py-2 hover:bg-red-500"
                        >
                          Logout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Disclosure.Panel
                className={`sm:hidden bg-blue-50 fixed h-screen px-14 slider ${
                  open ? "slide-in" : "slide-out"
                }`}
              >
                <div className="px-2 animate-slideUp-header pt-2 pb-3 flex flex-col">
                  {navigation.map((item, idx) => (
                    <div key={idx}>
                      <Link
                        to={item.href}
                        key={item.name}
                        className={classNames(
                          item.current && "bg-blue-600 text-white",
                          " px-3 mx-auto self-start py-2 rounded-md text-base font-medium"
                        )}
                      >
                        <Disclosure.Button
                          as="div"
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    </div>
                  ))}
                  {user && (
                    <button
                      onClick={() => logout()}
                      className="bg-red-600 text-white px-3 py-2 hover:bg-red-500"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Header;
