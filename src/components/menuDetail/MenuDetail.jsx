import "./menuDetail.css";

const MenuDetail = ({ menu }) => {
  return (
    <section className="card__menu">
      {/* title */}
      <section className="card_menu_header">
        <img src={menu.image} width={100} height={100} alt={menu.name} />
        <h3>{menu.name}</h3>
        <hr />
        <h4>{menu.title}</h4>
      </section>

      <section className="card__content">
        {/* entradas */}
        <section className="card_menu_body">
          <h2 className="card_menu_title">entradas</h2>

          {menu?.entradas.length > 0 ? (
            menu.entradas.map((menuItem, index) => (
              <section key={index} className="card_menu_body_item">
                <h3>{menuItem.name}</h3>
                <section className="card_prices">
                  {/* precios */}
                  {menuItem.prices.map((price, index) => (
                    <span key={index}>
                      s/ {price} {index != menuItem.prices.length - 1 && "➖"}{" "}
                    </span>
                  ))}
                </section>
              </section>
            ))
          ) : (
            <h2
              style={{
                color: "red",
                textAlign: "center",
                margin: "auto",
                width: "50%",
                padding: "10px",
              }}
            >
              No hay platos
            </h2>
          )}
        </section>
        {/* principal */}
        <section className="card_menu_body">
          <h2 className="card_menu_title">principales</h2>

          {menu.principal.length > 0 ? (
            menu.principal.map((menuItem, index) => (
              <section key={index} className="card_menu_body_item">
                <h3>{menuItem.name}</h3>
                <section className="card_prices">
                  {/* precios */}
                  {menuItem.prices.map((price, index) => (
                    <span key={index}>
                      {" "}
                      s/ {price} {index != menuItem.prices.length - 1 && "➖"}{" "}
                    </span>
                  ))}
                </section>
              </section>
            ))
          ) : (
            <h2
              style={{
                color: "red",
                textAlign: "center",
                margin: "auto",
                width: "50%",
                padding: "10px",
              }}
            >
              No hay platos
            </h2>
          )}
        </section>
      </section>
      <section className="card__content">
        {/* postres */}
        <section className="card_menu_body">
          <h2 className="card_menu_title">postres</h2>

          {menu.postres.length > 0 ? (
            menu.postres.map((menuItem, index) => (
              <section key={index} className="card_menu_body_item">
                <h3>{menuItem.name}</h3>
                <section className="card_prices">
                  {/* precios */}
                  {menuItem.prices.map((price, index) => (
                    <span key={index}>
                      {" "}
                      s/ {price} {index != menuItem.prices.length - 1 && "➖"}{" "}
                    </span>
                  ))}
                </section>
              </section>
            ))
          ) : (
            <h2
              style={{
                color: "red",
                textAlign: "center",
                margin: "auto",
                width: "50%",
                padding: "10px",
              }}
            >
              No hay platos
            </h2>
          )}
        </section>
        {/* especiales */}
        <section className="card_menu_body">
          <h2 className="card_menu_title">especialeses</h2>

          {menu.especiales.length > 0 ? (
            menu.especiales.map((menuItem, index) => (
              <section key={index} className="card_menu_body_item">
                <h3>{menuItem.name}</h3>
                <section className="card_prices">
                  {/* precios */}
                  {menuItem.prices.map((price, index) => (
                    <span key={index}>
                      {" "}
                      s/ {price} {index != menuItem.prices.length - 1 && "➖"}{" "}
                    </span>
                  ))}
                </section>
              </section>
            ))
          ) : (
            <h2
              style={{
                color: "red",
                textAlign: "center",
                margin: "auto",
                width: "50%",
                padding: "10px",
              }}
            >
              No hay platos
            </h2>
          )}
        </section>
      </section>
    </section>
  );
};
export default MenuDetail;
