import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Dashboard from "./pages/dashboard/Dashboard";
import InfoPages from "./pages/infoPages/InfoPages";
import MenuInfo from "./pages/menuInfo/MenuInfo";

function App() {
  const user = useSelector((state) => state.user);
  // console.log(user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/start"
            element={user ? <Navigate to={"/dashboard"} /> : <Login />}
          />
          <Route path="/dashboard">
            <Route
              index
              element={user ? <Dashboard /> : <Navigate to={"/"} />}
            />
            <Route path=":userId/:menuId" element={<InfoPages />} />
          </Route>
          <Route path="/active/:userId" element={<MenuInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
