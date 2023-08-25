import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import "../form.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../state/authSlice";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../../utils/axiosConfig";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .min(5)
      .max(50)
      .email()
      .required("Este campo es requirido"),
    password: yup.string().min(5).max(50).required("Este campo es requirido"),
  });

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const loginSubmit = async (values, onSubmitProps) => {
    try {
      const respone = await axiosConfig.post("/users/login", values);

      const { token, user, qrFind, message } = respone.data;

      dispatch(
        setLogin({
          qr: qrFind,
          user,
          token,
        })
      );
      alert(message);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginSchema}
      onSubmit={loginSubmit}
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
          <button type="submit " disabled={isSubmitting}>
            Iniciar Sesion
          </button>
        </form>
      )}
    </Formik>
  );
};
export default LoginForm;
