import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../Auth/AuthContext.js";
import { useNavigate, Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .required("Password is Required"),
});

const Login = () => {
  const [error, setError] = useState("");
  const { loginUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogin = async ({ email, password }, { setSubmitting }) => {
    setSubmitting(true);
    const response = await loginUser({ email, password });
    if (response.status === 200) {
      setSubmitting(false);
    } else {
      setError(response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 xl:px-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 px-12 bg-white py-8 shadow-lg rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Create an account
            </Link>
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {error ? (
                <div className="transform motion-safe:hover:scale-110 flex text-red-700 bg-red-100 py-2 px-4 rounded">
                  <div className="text-sm md:text-normal inline">{error}</div>{" "}
                </div>
              ) : null}

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
                <label htmlFor="password" className="text-gray-500 font-normal">
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

              <div className="my-2">
                <Link to="/forgot-password" className="text-xs text-gray-400">
                  Forgot Password?
                </Link>
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
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
