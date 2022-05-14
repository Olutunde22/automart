import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MDEditor from "@uiw/react-md-editor";
import { editCar } from "../Api";
import {
  years,
  make,
  condition,
  body,
  errorHandler,
  successHandler,
} from "../utilities/index.js";
import AuthContext from "../Auth/AuthContext";
import Axios from "axios";

const editCarSchema = Yup.object().shape({
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

const EditCarModal = ({ modal, onModalClose, carPost, setCarPost }) => {
  const { user, accessToken } = useContext(AuthContext);
  const [fileValue, setFileValue] = useState();
  const [postDetails, setpostDetails] = useState(carPost);
  const [description, setDescription] = useState(carPost.description);
  const [open, setOpen] = useState(modal);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  const handleSubmit = async (
    { name, year, condition, make, body, color, price },
    { setSubmitting }
  ) => {
    try {
      setSubmitting(true);
      const carDetails = {
        name,
        year,
        condition,
        make,
        body,
        color,
        price,
        description,
        userId: user._id,
      };
      if (fileValue) {
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
      } else {
        carDetails.imageUrl = carPost.imageUrl;
      }

      const savedCar = await editCar(carPost._id, carDetails, accessToken);
      setCarPost(savedCar.data);
      successHandler("Edited Car");
      onModalClose();
    } catch (err) {
      errorHandler(err.message || err.response.message);
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      {postDetails && description ? (
        <Dialog
          as="div"
          className="fixed z-30 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={onModalClose}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-top bg-white rounded-lg px-10 py-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-11/12">
                <div>
                  <h2 className="mt-6 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
                    Edit Car
                  </h2>
                </div>
                <Formik
                  initialValues={{
                    name: postDetails.name,
                    year: postDetails.year,
                    condition: postDetails.condition,
                    make: postDetails.make,
                    body: postDetails.body,
                    color: postDetails.color,
                    price: postDetails.price,
                  }}
                  validationSchema={editCarSchema}
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

                      <div
                        className="w-full mb-6 md:mb-4"
                        data-color-mode="light"
                      >
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                          Description
                        </label>
                        <MDEditor
                          value={description}
                          onChange={setDescription}
                        />
                      </div>

                      <div>
                        <small className="text-gray-500">
                          {carPost.imageUrl}
                        </small>
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
                    </Form>
                  )}
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      ) : null}
    </Transition.Root>
  );
};

export default EditCarModal;
