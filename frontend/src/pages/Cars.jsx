import React, { Fragment, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { getCars } from "../Api";
import { errorHandler } from "../utilities";

const searchFilters = [
  { name: "Name", filter: "name" },
  { name: "Make", filter: "make" },
  { name: "Body", filter: "body" },
  { name: "Clear Filter", filter: "all" },
];

const Cars = () => {
  const [searchFilter, setSearchFilter] = useState(searchFilters[0].filter);
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([]);
  const [unfilteredCars, setUnfilteredCars] = useState([]);

  const getCarsPost = async () => {
    try {
      const cars = await getCars(50);
      setCars(cars.data);
      setUnfilteredCars(cars.data);
    } catch (err) {
      errorHandler(err.message || err.response.message);
    }
  };

  const handleFilter = (e) => {
    setSearch(e.target.value);
    let cars = unfilteredCars;
    if (searchFilter === "all") {
      setCars(cars);
    } else {
      setCars(
        cars.filter((c) =>
          c[searchFilter].toLowerCase().includes(e.target.value)
        )
      );
    }
  };
  useEffect(() => {
    getCarsPost();
  }, []);

  return (
    <Layout>
      <div className="bg-cars flex justify-center items-center">
        <div className="mb-4">
          <input
            className="appearance-none border w-full py-4 pl-4 pr-12 text-gray-700 leading-tight mb-2"
            id="search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleFilter(e)}
          />
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                {searchFilter ? searchFilter : "Options"}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {searchFilters.map((filter, idx) => (
                    <Menu.Item key={idx}>
                      <button
                        onClick={() => setSearchFilter(filter.filter)}
                        className="block text-left px-4 py-2 text-sm w-full"
                      >
                        {filter.name}
                      </button>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <h2 className="text-2xl font-bold leading-normal text-center my-14">
        List of available cars
      </h2>
      <div className="mx-2 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-6">
        {cars.map((car, idx) => (
          <div
            className="shadow-lg max-w-sm rounded-t-md overflow-hidden"
            key={idx}
          >
            <div className="">
              <img
                className="w-full object-cover lg:h-60 h-40 rounded-t-lg"
                src={car.imageUrl}
                alt={car.name}
              />
              <div className=" block px-6 py-4">
                <div className="">
                  {car.name} {car.year}
                </div>
                <h3 className="text-xl font-bold leading-normal my-auto text-left text-blue-500">
                  {car.color} colored {car.make}-{car.body} N
                  {car.price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>

              <div className="px-6">
                <p className="text-sm text-left">
                  {car.description.substring(0, 250)}...
                </p>
              </div>
              <div className="py-4 px-6  text-left">
                <Link to={`/car/${car._id}`} className="text-blue-500">
                  Learn more...
                </Link>
              </div>
              <div className="flex pt-4 pb-8 px-4 lg:px-6">
                <small className="bg-gray-200 rounded-full p-2">
                  {car.condition}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Cars;
