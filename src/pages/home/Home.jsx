import Header from "../../components/header/Header";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
    dispatch(setLogout());
  };

  return (
    <main>
      <h2 className="title">
        <span>QR Culinary: </span> Revoluciona tu Restaurante con Menús
        Digitales
      </h2>
      {user && (
        <p className="logout">
          {user.email}
          <button onClick={logout} className="button">
            cerrar sesión
          </button>
        </p>
      )}

      <Header />
    </main>
  );
};
export default Home;
