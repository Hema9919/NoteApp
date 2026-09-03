import { Link } from "react-router-dom";

export const signupFormInputs = [
  {
    type: "text",
    name: "name",
    placeholder: "john doe",
  },
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
  {
    type: "number",
    name: "age",
    placeholder: "enter your age",
  },
  {
    type: "tel",
    name: "phone",
    placeholder: "enter your phone",
  },
];
const SignupForm = () => {
  return (
    <form>
      {signupFormInputs.map(({ type, name, placeholder }, idx) => (
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
          Sign Up
        </button>

        <p>
          Already have an account?{" "}
          <Link className="text-blue-500" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
