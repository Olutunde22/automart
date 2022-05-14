import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../Auth/AuthContext.js";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { errorHandler, successHandler } from "../utilities/index.js";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Firstname is required"),
  lastName: Yup.string().required("Lastname is required"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .required("Password is Required"),
});

const Signup = () => {
  const { signUpUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleSignup = async (
    { firstName, lastName, email, password },
    { setSubmitting }
  ) => {
    setSubmitting(true);
    const response = await signUpUser({ firstName, lastName, email, password });
    if (response.status === 200) {
      setSubmitting(false);
      successHandler("Signup Successul!");
      navigate('/')
    } else {
      errorHandler(response.data.message);
    }
  };

  return (
    <Layout>
      <div className="h-full flex items-center justify-center bg-gray-100 py-12 px-4 xl:px-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 px-12 bg-white py-8 shadow-lg rounded-xl">
          <div>
            <h2 className="mt-6 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
              Sign up to create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in to your account
              </Link>
            </p>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="my-2">
                  <label htmlFor="email" className="text-gray-500 font-normal">
                    First name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`relative block w-full px-3 py-3 border ${
                      errors.firstName && touched.firstName
                        ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    } text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm`}
                    placeholder="John"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    component="div"
                    name="firstName"
                  />
                </div>

                <div className="my-2">
                  <label htmlFor="email" className="text-gray-500 font-normal">
                    Last name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={`relative block w-full px-3 py-3 border ${
                      errors.lastName && touched.lastName
                        ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    } text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm`}
                    placeholder="Doe"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    component="div"
                    name="lastName"
                  />
                </div>

                <div className="my-2">
                  <label htmlFor="email" className="text-gray-500 font-normal">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    className={`relative block w-full px-3 py-3 border ${
                      errors.email && touched.email
                        ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    } text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm`}
                    placeholder="example@example.com"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    component="div"
                    name="email"
                  />
                </div>
                <div className="my-2">
                  <label
                    htmlFor="password"
                    className="text-gray-500 font-normal"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={`relative block w-full px-3 py-3 border ${
                      errors.password && touched.password
                        ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    } text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm`}
                    placeholder="Password"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    component="div"
                    name="password"
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
                  {isSubmitting ? "Creating your account..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
