import React, { useEffect, useState, useCallback, useContext } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { getCar } from "../Api";
import { errorHandler } from "../utilities";
import moment from "moment";
import { PencilAltIcon } from "@heroicons/react/outline";
import AuthContext from "../Auth/AuthContext";
import MDEditor from "@uiw/react-md-editor";

const Car = () => {
  const { carId } = useParams();
  const [carPost, setCarPost] = useState();
  const { user } = useContext(AuthContext);

  const handleGetPost = useCallback(async () => {
    try {
      const response = await getCar(carId);
      setCarPost(response.data);
    } catch (err) {
      errorHandler(err);
    }
  }, [carId]);

  const handleEditCarPost = () => {};

  useEffect(() => {
    handleGetPost();
  }, [handleGetPost]);

  return (
    <Layout>
      {carPost && (
        <>
          <div className="h-96 flex justify-center">
            <img
              src={carPost.imageUrl}
              alt={Car.name}
              className="w-full object-cover"
            />
          </div>
          <div className="max-w-4xl mx-auto bg-white py-12 px-12 lg:px-24">
            <h2 className="mt-4 uppercase tracking-widest text-xs text-gray-600">
              {moment(carPost.createdAt).format("Do MMM, YYYY")}
            </h2>
            <h1 className="font-display text-2xl md:text-3xl text-gray-900 mt-4 flex">
              {carPost.name} - {carPost.year}{" "}
              {user && user._id === carPost.createdBy._id ? (
                <PencilAltIcon
                  onClick={() => handleEditCarPost()}
                  className="ml-2 h-8 w-8"
                />
              ) : null}
            </h1>
            <div className="prose prose-sm sm:prose lg:prose-lg mt-6">
              <h2>
                {carPost.color} colored {carPost.make}-{carPost.body} N
                {carPost.price.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </h2>
              <small className="bg-gray-200 rounded-full p-2">
                {carPost.condition}
              </small>
              <p data-color-mode="light">
                {" "}
                <MDEditor.Markdown source={carPost.description} />
              </p>
            </div>

            <div className="text-lg mt-10 font-bold">
              <p className="text-gray-900 leading-none">
                Created By :
                {user && user._id === carPost.createdBy._id
                  ? " You"
                  : carPost.createdBy.firstName +
                    " " +
                    carPost.createdBy.lastName}
              </p>
              <p className="text-gray-900 leading-none mt-4">
                Contact : {carPost.createdBy.email}
              </p>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Car;
