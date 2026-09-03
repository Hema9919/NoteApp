import LoginForm from "./components/login-form";
import authImg from "../../assets/imgs/auth.avif";

const Login = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <LoginForm />

          <div className="vector-wrapper">
            <img src={authImg} alt="auth" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
