import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosConfig from "../../utils/axiosConfig";
import MenuDetail from "../../components/menuDetail/MenuDetail";

const InfoPages = () => {
  const token = useSelector((state) => state.token);

  const { userId, menuId } = useParams();
  const [errorInfo, seterrorInfo] = useState("");
  const [menuInfo, setMenuInfo] = useState({});

  const getInfo = async () => {
    try {
      const response = await axiosConfig.get(
        `/menus/${userId}/${menuId}/active`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
          Mira los detalles de menu{" "}
        </h2>
        <Link
          to={"/dashboard"}
          style={{ color: "var(--text)", background: "var(--accent)" }}
        >
          {" "}
          - Regresar a la lista de menus
        </Link>
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
export default InfoPages;
