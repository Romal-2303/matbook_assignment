import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* {routes.map((route) => {
          const Component = route.component;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })} */}
      </Routes>
    </Router>
  );
};

export default App;
