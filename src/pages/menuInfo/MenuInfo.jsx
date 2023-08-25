import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axiosConfig from "../../utils/axiosConfig";
import MenuDetail from "../../components/menuDetail/MenuDetail";

const MenuInfo = () => {
  const token = useSelector((state) => state.token);

  const { userId } = useParams();
  const [errorInfo, seterrorInfo] = useState("");
  const [menuInfo, setMenuInfo] = useState({});

  const getInfo = async () => {
    try {
      const response = await axiosConfig.get(`/menus/active/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMenuInfo(response.data.menu);
      seterrorInfo("");
    } catch (error) {
      if (error.response.data.message) {
        return seterrorInfo(error.response.data.message);
      }
      alert("Ocurrio un error");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <section>
      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "var(--secondary)" }}>
          Haz tu mejor seleccion{" "}
        </h2>
      </section>
      {errorInfo ? (
        <h2
          style={{
            color: "red",
            textAlign: "center",
            margin: "auto",
            width: "50%",
            padding: "10px",
          }}
        >
          {errorInfo}
        </h2>
      ) : (
        <>
          {menuInfo.name ? (
            <MenuDetail menu={menuInfo} />
          ) : (
            <h2
              style={{
                color: "var(--secondary)",
                textAlign: "center",
                margin: "auto",
                width: "50%",
                padding: "10px",
              }}
            >
              cargando menu...
            </h2>
          )}
        </>
      )}
    </section>
  );
};
export default MenuInfo;
