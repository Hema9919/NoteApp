import { Link } from "react-router-dom";

export const loginFormInputs = [
  {
    type: "email",
    name: "email",
    placeholder: "johndoe@example.com",
  },
  {
    type: "password",
    name: "password",
    placeholder: "*****",
  },
];

const LoginForm = () => {
  return (
    <div className="from-wrapper">
      <h2 className="text-3xl font-bold mb-6">Login</h2>

      <form>
        {loginFormInputs.map(({ type, name, placeholder }, idx) => (
          <div key={idx} className="input-wrapper flex flex-col gap-4 mb-5">
            <label htmlFor={name}>{name}</label>

            <div className="space-y-2">
              <input
                type={type}
                id={name}
                placeholder={placeholder}
                className="input"
              />

              <p className="text-red-500 font-bold">{name} is required</p>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center ">
          <button
            // disabled={loadingState}
            className="bg-blue-500 text-white py-1 w-26 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>

          <p>
            Dont have an account?{" "}
            <Link className="text-blue-500" to={"/signup"}>
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
