import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signupSchema } from "../../../schema/auth-schema";
import { signUpUser } from "../../../api/auth.api";

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
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: signUpUser,
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (err) => {
        console.log(err.response?.data);
      },
    });
  };

  return (
    <div className="from-wrapper">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {signupFormInputs.map(({ type, name, placeholder }, idx) => (
          <div key={idx} className="input-wrapper flex flex-col gap-4 mb-5">
            <label htmlFor={name}>{name}</label>

            <div className="space-y-2">
              <input
                type={type}
                id={name}
                placeholder={placeholder}
                className="input"
                {...register(name)}
              />

              {errors[name] && (
                <p className="text-red-500 font-bold">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Backend Error */}
        {error && (
          <p className="text-red-500 font-bold mb-4">
            {error.response?.data?.msg ||
              error.response?.data?.message ||
              "Something went wrong"}
          </p>
        )}

        <div className="flex justify-between items-center ">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white py-1 w-26 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Loading..." : "Sign Up"}
          </button>

          <p>
            Already have an account?{" "}
            <Link className="text-blue-500" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
