import React, { Suspense } from "react";
import { Home, Login, Signup, Cars, Car, CreateCar} from "./routes";
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
          <Route path="/signup" exact={true} element={<Signup />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:carId" element={<Car />} />
          <Route
            path="/createcar"
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