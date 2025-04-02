import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { routes } from "./pages/Routes/routesConfig";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {routes.map((route) => {
            const Component = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Component />}
              />
            );
          })}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
