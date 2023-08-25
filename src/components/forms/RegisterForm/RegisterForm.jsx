import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import "../form.css";
import axiosConfig from "../../../utils/axiosConfig";

const RegisterForm = () => {
  const registerSchema = yup.object().shape({
    name: yup.string().min(3).required("Este campo es requirido"),
    lastName: yup.string().min(3).required("Este Campo es requirido"),
    email: yup
      .string()
      .min(5)
      .max(50)
      .email()
      .required("Este campo es requirido"),
    password: yup.string().min(5).max(50).required("Este campo es requirido"),
  });

  const registerInitialValues = {
    email: "",
    password: "",
  };

  const regsiterSubmit = async (values, onSubmitProps) => {
    try {
      const respone = await axiosConfig.post("/users", values);

      const { user, message } = respone.data;

      alert(message, " - ya puedes iniciar sesion");
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={registerInitialValues}
      validationSchema={registerSchema}
      onSubmit={regsiterSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className="form-start">
          {/* name */}
          <section>
            <label htmlFor="name">Nombres: </label>
            <Field
              name="name"
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <ErrorMessage name="name" component={"span"} />
            )}
          </section>
          {/* lastName */}
          <section>
            <label htmlFor="lastName">Apellidos: </label>
            <Field
              name="lastName"
              type="text"
              id="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lastName && errors.lastName && (
              <ErrorMessage name="lastName" component={"span"} />
            )}
          </section>
          {/* email */}
          <section>
            <label htmlFor="email">Email: </label>
            <Field
              name="email"
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <ErrorMessage name="email" component={"span"} />
            )}
          </section>

          {/* password */}
          <section>
            <label htmlFor="password">Password: </label>
            <Field
              name="password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <ErrorMessage name="password" component={"span"} />
            )}
          </section>
          <button type="submit" disabled={isSubmitting}>
            Registrarse
          </button>
        </form>
      )}
    </Formik>
  );
};
export default RegisterForm;
