import { Link } from "react-router-dom";
import food from "../../assets/comidas.svg";
import qrfoto from "../../assets/qr.svg";
import "./header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user);

  return (
    <header className="header">
      <section className="header-content">
        <h2 className="header-content-subtitle">
          Únete a la Revolución <span>Gastronómica Digital.</span> Crea tu
          Cuenta Hoy y Transforma tu Menú en una Experiencia Interactiva .
          ¡Comienza a Compartir tus Deliciosos Platillos a través de Códigos QR!
        </h2>

        <p className="text--add">
          Descubre una forma completamente nueva de presentar tus platos
          exquisitos al mundo. Convierte tu carta tradicional en un emocionante
          menú digital mediante simples códigos QR. Nuestra plataforma te brinda
          todas las herramientas necesarias para que tu restaurante entre en la
          era moderna de la gastronomía.
        </p>

        <section>
          <Link
            className="button button-account"
            to={user ? "/dashboard" : "/start"}
          >
            {user ? "Ir a dashboard" : "Empezar ya!"}
          </Link>
        </section>
      </section>

      <section className="menu-img menu-img-left">
        <img src={food} alt="imagen de comida en formato svg" />
      </section>
      <section className="menu-img menu-img-right">
        <img src={qrfoto} alt="imagen de una persona escaneando qr" />
      </section>
    </header>
  );
};
export default Header;
