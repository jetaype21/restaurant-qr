import { useDispatch } from "react-redux";
import { useState } from "react";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import "./login.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const handleTypePage = () => {
    setIsRegister(!isRegister);
    setIsLogin(!isLogin);
  };

  return (
    <section>
      <h2 className="title">
        <span>Crea tu cuenta o inicia sesión </span> Es momento de dar el primer
        paso
      </h2>

      <section className="form-container">
        {isRegister ? (
          <h3 className="start-title">Registrarse</h3>
        ) : (
          <h3 className="start-title">Iniciar sesion</h3>
        )}
        {isLogin ? <LoginForm /> : <RegisterForm />}

        {isRegister ? (
          <button className="button btn-handle-type" onClick={handleTypePage}>
            Ya tengo una cuenta
          </button>
        ) : (
          <button className="button btn-handle-type" onClick={handleTypePage}>
            Crear una cuenta
          </button>
        )}
      </section>
    </section>
  );
};

export default Login;
