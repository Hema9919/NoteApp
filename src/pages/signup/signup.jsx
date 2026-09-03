import SignupForm from "./components/signup-form";
import authImg from "../../assets/imgs/auth.avif";


const Signup = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="vector-wrapper">
            <img src={authImg} alt="auth" className="w-full" />
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
