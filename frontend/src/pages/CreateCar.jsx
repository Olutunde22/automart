import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import MDEditor from "@uiw/react-md-editor";
import { createCar } from "../Api";
import { errorHandler, successHandler } from "../utilities/index.js";
import AuthContext from "../Auth/AuthContext.js";
import Axios from "axios";
import { years, make, condition, body } from "../utilities/index.js";

const createCarSchema = Yup.object().shape({
  name: Yup.string().required("Car name is Required"),
  year: Yup.string().required("Please select a year"),
  condition: Yup.string().required("Please include the condition of the car"),
  make: Yup.string().required("Please include the make of the car"),
  body: Yup.string().required("Please include the body type of the car"),
  color: Yup.string().required("Please include the color of the car"),
  price: Yup.number("Price must be a number").required(
    "Please include the price of the car"
  ),
});

const CreateCar = () => {
  const { user, logout, accessToken } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [fileValue, setFileValue] = useState();
  const [createdCar, setCreatedCar] = useState();

  let navigate = useNavigate();

  const handleSubmit = async (
    { name, year, condition, make, body, color, price },
    { setSubmitting }
  ) => {
    setSubmitting(true);
    if (!fileValue) {
      return errorHandler("Please select an image");
    }
    if (description.length < 10) {
      return errorHandler("Description too short");
    }
    try {
      const carDetails = {
        name,
        year,
        condition,
        make,
        body,
        color,
        price,
        description,
        createdBy: user._id,
      };
      const formData = new FormData();
      formData.append("file", fileValue);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      formData.append("cloud_name", process.env.REACT_APP_CLOUDNAME);
      formData.append("folder", "automobiles");
      const response = await Axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/upload`,
        formData
      );
      carDetails.imageUrl = response.data.url;

      const savedCar = await createCar(carDetails, accessToken);
      setCreatedCar(savedCar.data);
      successHandler("Car Post created successfully");
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        logout();
        errorHandler("Session expired, kindly login again");
        navigate("/login");
      } else {
        errorHandler(err.response.data.message);
      }
    }
  };

  return (
    <Layout>
      <div className="h-full flex items-center justify-center bg-gray-100 py-12 px-4 xl:px-12 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 px-12 bg-white py-8 shadow-lg rounded-xl">
          <div>
            <h2 className="mt-6 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
              Create Car Form
            </h2>
          </div>
          <Formik
            initialValues={{
              name: "",
              year: "2020",
              condition: "Nigerian Used",
              make: "Toyota",
              body: "Van",
              color: "",
              price: "",
            }}
            validationSchema={createCarSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Name Of Car
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className={`relative block w-full px-3 py-3 border ${
                        errors.name && touched.name
                          ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      } text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm`}
                      placeholder="example@example.com"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      component="div"
                      name="name"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="year"
                    >
                      Year
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="year"
                      >
                        {years.map((year, idx) => (
                          <option key={idx} value={year}>
                            {year}
                          </option>
                        ))}
                      </Field>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="body"
                    >
                      Body
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="body"
                      >
                        {body.map((body, idx) => (
                          <option key={idx} value={body}>
                            {body}
                          </option>
                        ))}
                      </Field>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="body"
                    >
                      Make
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="make"
                      >
                        {make.map((make, idx) => (
                          <option key={idx} value={make}>
                            {make}
                          </option>
                        ))}
                      </Field>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="condition"
                    >
                      Condition
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="condition"
                      >
                        {condition.map((condition, idx) => (
                          <option key={idx} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </Field>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <Field
                      id="price"
                      name="price"
                      type="number"
                      className={`relative block w-full px-3 py-3 border ${
                        errors.price && touched.price
                          ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      } text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm`}
                      placeholder="example@example.com"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      component="div"
                      name="price"
                    />
                  </div>
                </div>

                <div className="w-full mb-6 md:mb-4" data-color-mode="light">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                    Description
                  </label>
                  <MDEditor value={description} onChange={setDescription} />
                </div>

                <div>
                  <input
                    className="block w-full mb-4 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFileValue(event.target.files[0]);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg
                      style={{ borderTopColor: "transparent" }}
                      className="animate-spin h-5 w-5 mr-3 rounded-full border-2 border-white border-solid"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                    </svg>
                  ) : null}
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>

                {createdCar && (
                  <p className="text-gray-600">
                    Click{" "}
                    <Link
                      className="text-blue-600"
                      to={`/car/${createdCar._id}`}
                    >
                      here
                    </Link>{" "}
                    to view post
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCar;
