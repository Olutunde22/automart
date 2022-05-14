import React, { Suspense } from "react";
import { Home, Login, Signup, Cars, Car, CreateCar, ForgotPassword, ResetPassword } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import PrivateRoute from "./Auth/PrivateRoute";

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/login" exact={true} element={<Login />} />
          <Route path="/forgot-password" exact={true} element={<ForgotPassword />} />
          <Route path="/reset-password/:resetId" element={<ResetPassword />} />
          <Route path="/signup" exact={true} element={<Signup />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:carId" element={<Car />} />
          <Route
            path="/create-car"
            exact={true}
            element={
              <PrivateRoute>
                <CreateCar />{" "}
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;