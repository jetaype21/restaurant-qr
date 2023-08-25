import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import MenuForm from "../../components/forms/menuForm/MenuForm";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setLogout, setMenus } from "../../state/authSlice";
import axiosConfig from "../../utils/axiosConfig";

const Dashboard = () => {
  const dispatch = useDispatch();

  const menus = useSelector((state) => state.menus);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const qr = useSelector((state) => state.qr);

  const [openModal, setOpenModal] = useState(false);

  const logout = () => {
    dispatch(setLogout());
  };

  const changeStatus = async (menuId) => {
    try {
      const { data } = await axiosConfig.patch(
        `/menus/${user._id}/${menuId}/active`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);
      // setMenuInfo(response.data.menu);
      // seterrorInfo("");
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      alert("Ocurrio un error");
    }
  };

  const getMenus = async () => {
    try {
      const { data } = await axiosConfig.get(`/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        setMenus({
          menus: data.menus,
        })
      );
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }

      alert("Ocurrio un error");
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <section>
      <section>
        <h2 className="">Empieza a organizar tu menú</h2>
        <p>
          {user.email} - <button onClick={logout}>cerrar sesion</button>
        </p>
      </section>
      <section className="menu-container">
        <div className="menus-container">
          <section className="btn-init" onClick={() => setOpenModal(true)}>
            <button> Agregar Menú </button>
          </section>
          <section className="btn-init btn-qr-init">
            <img src={qr} alt="codigo qr" />
            <a href={qr} download>
              {" "}
              descargar qr{" "}
            </a>
            <Link to={`/active/${user._id}`}>
              {" "}
              visualizar pagina de menu activa{" "}
            </Link>
          </section>
          {menus.length > 0 &&
            menus.map((menuItem, index) => (
              <section key={index}>
                <h2>{menuItem.name}</h2>
                <h3>{menuItem.title}</h3>
                <section className="menu-items">
                  <h4>Entradas - {menuItem.entradas.length} (platos) </h4>
                  <h4>Principal - {menuItem.principal.length} (platos) </h4>
                  <h4>Postres - {menuItem.postres.length} (platos) </h4>
                  <h4>Especiales - {menuItem.especiales.length} (platos) </h4>
                </section>
                <button
                  className="btn btn-active"
                  onClick={() => changeStatus(menuItem._id)}
                  disabled={menuItem.status}
                >
                  Activar
                </button>
                <Link
                  className="btn btn-detail"
                  to={`${user._id}/${menuItem._id}`}
                >
                  ver detalles
                </Link>
              </section>
            ))}
        </div>
      </section>
      {openModal && (
        <section className="cont">
          <section className="container-form-menu">
            <button onClick={() => setOpenModal(false)}>cerrar</button>
            <MenuForm />
          </section>
        </section>
      )}
    </section>
  );
};
export default Dashboard;
