import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { getCars } from "../Api";
import { errorHandler } from "../utilities";

const Home = () => {
  const [cars, setCars] = useState([]);

  const getCarsPost = async () => {
    try {
      const cars = await getCars(3);
      setCars(cars.data);
    } catch (err) {
      errorHandler(err.message || err.response.message);
    }
  };

  useEffect(() => {
    getCarsPost();
  }, []);
  return (
    <Layout>
      <div className="h-full flex mt-10 md:mt-0 flex-col md:flex-row items-center">
        <div className=" px-4 md:px-16 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-8">
            Automobiles{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
              Finder
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Find automobiles easily from the comfort of your phone
          </p>
          <p className="mt-6">
            <Link
              to="/cars"
              className="btn font-semibold text-white bg-blue-600 w-full mb-4 sm:w-auto sm:mb-0 p-4 rounded-lg"
            >
              Get Started
            </Link>
          </p>
        </div>
        <div className="">
          {" "}
          <img src="/images/search.png" alt="header_image" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-10 md:pt-20">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 md:mb-8">
          Featured Cars
        </h2>
        <div className="lg:flex lg:items-center lg:justify-center">
          <div className="mx-2 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-6">
            {cars.reverse().map((car, idx) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Home;
