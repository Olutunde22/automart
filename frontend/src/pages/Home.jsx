import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <div className="h-full flex mt-10 md:mt-0 flex-col md:flex-row items-center">
        <div className=" px-4 md:px-16">
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
          <div className="mx-2 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 mt-10">
            <div className="shadow-lg max-w-sm rounded-t-md overflow-hidden">
              <div className="">
                <img
                  className="w-full object-cover lg:h-60 h-40 rounded-t-lg"
                  src=""
                  alt=""
                />
                <div className=" block px-6 py-4">
                  <div className="">Hii</div>
                  <h3 className="text-xl font-bold leading-normal my-auto text-left text-blue-500">
                    Hell
                  </h3>
                </div>

                <div className="px-6">
                  <p className="text-sm text-left">hhhh</p>
                </div>
                <div className="py-4 px-6  text-left">
                  <Link to={`/car/`} className="text-blue-500">
                    Learn more...
                  </Link>
                </div>
                <div className="flex pt-4 pb-8 px-4 lg:px-6">
										<small className="bg-gray-200 rounded-full p-2">Nigerian Used</small>
										
									</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
