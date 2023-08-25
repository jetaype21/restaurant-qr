import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
import "../form.css";
import "./menuForm.css";
import { useSelector } from "react-redux";
import axiosConfig from "../../../utils/axiosConfig";

const MenuForm = () => {
  const user = useSelector((state) => state.user);

  const platoDetailSchema = yup.object().shape({
    name: yup.string().min(5).required("Este campo es requirido"),
    prices: yup
      .array()
      .of(
        yup
          .number()
          .min(1, "el precio no puede ser menor que 1")
          .required("Este campo es requirido")
      )
      .min(1),
  });

  const menuSchema = yup.object().shape({
    name: yup.string().min(5).required("Este campo es requirido"),
    title: yup.string().min(3).required("Este Campo es requirido"),
    entradas: yup.array().of(platoDetailSchema).optional(),
    principal: yup.array().of(platoDetailSchema).optional(),
    postres: yup.array().of(platoDetailSchema).optional(),
    especiales: yup.array().of(platoDetailSchema).optional(),
  });

  const initialValues = {
    name: "",
    title: "",
    entradas: [{ name: "", prices: [0] }],
    principal: [],
    postres: [],
    especiales: [],
  };

  const menuSubmit = async (values, onSubmitProps) => {
    try {
      const respone = await axiosConfig.post("/menus", {
        ...values,
        user_create: user._id,
      });

      const { menu, message } = respone.data;

      // limpiar fomulario
      onSubmitProps.resetForm();

      alert(message, ` - ${menu.title}`, ` - recargue por favor.`);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={menuSchema}
      onSubmit={menuSubmit}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="formMenu">
          <h2>Empieza a crear un menu</h2>

          <div>
            <label htmlFor="name">Nombre</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="cite" />
          </div>
          <div>
            <label htmlFor="title">Título</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="cite" />
          </div>

          {/* FieldArray for entradas */}
          <FieldArray name="entradas">
            {({ insert, remove, push }) => (
              <div>
                <h3>Entradas</h3>
                {values.entradas.map((entrada, index) => (
                  <div key={index} className="price-price">
                    <label htmlFor={`entradas[${index}].name`}>
                      Nombre plato
                    </label>
                    <Field
                      type="text"
                      id={`entradas[${index}].name`}
                      name={`entradas[${index}].name`}
                    />
                    <ErrorMessage
                      name={`entradas[${index}].name`}
                      component="cite"
                    />

                    {/* FieldArray for prices within each entrada */}
                    <FieldArray name={`entradas[${index}].prices`}>
                      {({ push: pushPrice, remove: removePrice }) => (
                        <div>
                          {entrada.prices.map((price, priceIndex) => (
                            <div key={priceIndex}>
                              <section className="container-prices">
                                <label
                                  htmlFor={`entradas[${index}].prices[${priceIndex}]`}
                                >
                                  Precio {priceIndex + 1}
                                </label>
                                <Field
                                  type="number"
                                  id={`entradas[${index}].prices[${priceIndex}]`}
                                  name={`entradas[${index}].prices[${priceIndex}]`}
                                />
                                {entrada.prices.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removePrice(entrada.prices.length - 1)
                                    }
                                  >
                                    Eliminar Precio
                                  </button>
                                )}
                              </section>
                              <ErrorMessage
                                name={`entradas[${index}].prices[${priceIndex}]`}
                                component="cite"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => pushPrice(0)}
                            className="add-price"
                          >
                            Agregar Precio
                          </button>
                        </div>
                      )}
                    </FieldArray>
                    {values.entradas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="delete-price"
                      >
                        Eliminar plato
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ name: "", prices: [] })}
                  className="btn-add-menu"
                >
                  Agregar plato
                </button>
              </div>
            )}
          </FieldArray>

          {/* FieldArray for principal */}
          <FieldArray name="principal">
            {({ insert, remove, push }) => (
              <div>
                <h3>principal</h3>
                {values.principal.map((princi, index) => (
                  <div key={index}>
                    <label htmlFor={`principal[${index}].name`}>
                      Nombre de plato:
                    </label>
                    <Field
                      type="text"
                      id={`principal[${index}].name`}
                      name={`principal[${index}].name`}
                    />
                    <ErrorMessage
                      name={`principal[${index}].name`}
                      component="cite"
                    />

                    {/* FieldArray for prices within each princi */}
                    <FieldArray name={`principal[${index}].prices`}>
                      {({ push: pushPrice, remove: removePrice }) => (
                        <div>
                          {princi.prices.map((price, priceIndex) => (
                            <div key={priceIndex}>
                              <section className="container-prices">
                                <label
                                  htmlFor={`principal[${index}].prices[${priceIndex}]`}
                                >
                                  Precio {priceIndex + 1}
                                </label>
                                <Field
                                  type="number"
                                  id={`principal[${index}].prices[${priceIndex}]`}
                                  name={`principal[${index}].prices[${priceIndex}]`}
                                />
                                {princi.prices.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removePrice(princi.prices.length - 1)
                                    }
                                  >
                                    Eliminar Precio
                                  </button>
                                )}
                              </section>
                              <ErrorMessage
                                name={`principal[${index}].prices[${priceIndex}]`}
                                component="cite"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => pushPrice(0)}
                            className="add-price"
                          >
                            Agregar Precio
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="delete-price"
                    >
                      Eliminar plato
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ name: "", prices: [0] })}
                  className="btn-add-menu"
                >
                  Agregar plato
                </button>
              </div>
            )}
          </FieldArray>

          {/* FieldArray for postres */}
          <FieldArray name="postres">
            {({ insert, remove, push }) => (
              <div>
                <h3>postres</h3>
                {values.postres.map((postre, index) => (
                  <div key={index}>
                    <label htmlFor={`postres[${index}].name`}>
                      Nombre plato
                    </label>
                    <Field
                      type="text"
                      id={`postres[${index}].name`}
                      name={`postres[${index}].name`}
                    />
                    <ErrorMessage
                      name={`postres[${index}].name`}
                      component="cite"
                    />

                    {/* FieldArray for prices within each postre */}
                    <FieldArray name={`postres[${index}].prices`}>
                      {({ push: pushPrice, remove: removePrice }) => (
                        <div>
                          {postre.prices.map((price, priceIndex) => (
                            <div key={priceIndex}>
                              <section className="container-prices">
                                <label
                                  htmlFor={`postres[${index}].prices[${priceIndex}]`}
                                >
                                  Precio {priceIndex + 1}
                                </label>
                                <Field
                                  type="number"
                                  id={`postres[${index}].prices[${priceIndex}]`}
                                  name={`postres[${index}].prices[${priceIndex}]`}
                                />

                                {postre.prices.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removePrice(postre.prices.length - 1)
                                    }
                                  >
                                    Eliminar Precio
                                  </button>
                                )}
                              </section>
                              <ErrorMessage
                                name={`postres[${index}].prices[${priceIndex}]`}
                                component="cite"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => pushPrice(0)}
                            className="add-price"
                          >
                            Agregar Precio
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="delete-price"
                    >
                      Eliminar plato
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ name: "", prices: [0] })}
                  className="btn-add-menu"
                >
                  Agregar plato
                </button>
              </div>
            )}
          </FieldArray>

          {/* FieldArray for especiales */}
          <FieldArray name="especiales">
            {({ insert, remove, push }) => (
              <div>
                <h3>especiales</h3>
                {values.especiales.map((especial, index) => (
                  <div key={index}>
                    <label htmlFor={`especiales[${index}].name`}>
                      Nombre plato
                    </label>
                    <Field
                      type="text"
                      id={`especiales[${index}].name`}
                      name={`especiales[${index}].name`}
                    />
                    <ErrorMessage
                      name={`especiales[${index}].name`}
                      component="cite"
                    />

                    {/* FieldArray for prices within each especial */}
                    <FieldArray name={`especiales[${index}].prices`}>
                      {({ push: pushPrice, remove: removePrice }) => (
                        <div>
                          {especial.prices.map((price, priceIndex) => (
                            <div key={priceIndex}>
                              <section className="container-prices">
                                <label
                                  htmlFor={`especiales[${index}].prices[${priceIndex}]`}
                                >
                                  Precio {priceIndex + 1}
                                </label>
                                <Field
                                  type="number"
                                  id={`especiales[${index}].prices[${priceIndex}]`}
                                  name={`especiales[${index}].prices[${priceIndex}]`}
                                />

                                {especial.prices.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removePrice(especial.prices.length - 1)
                                    }
                                    className="delete-price"
                                  >
                                    Eliminar Precio
                                  </button>
                                )}
                              </section>
                              <ErrorMessage
                                name={`especiales[${index}].prices[${priceIndex}]`}
                                component="cite"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => pushPrice(0)}
                            className="btn-price"
                          >
                            Agregar Precio
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="delete-price"
                    >
                      Eliminar plato
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ name: "", prices: [0] })}
                  className="btn-add-menu"
                >
                  Agregar plato
                </button>
              </div>
            )}
          </FieldArray>

          {/* Similar FieldArrays for principal, postres, and especiales */}
          {/* ... */}

          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};
export default MenuForm;
