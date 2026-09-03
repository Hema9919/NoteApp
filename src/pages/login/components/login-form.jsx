import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { loginSchema } from "../../../schema/auth-schema";
import { loginUser } from "../../../api/auth.api";
import { loginFormInputs } from './../../../data/login-form-inputs';

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { mutate } = useMutation({
    mutationFn: loginUser,
  });

  const onSubmit = (data) => {
    console.log(data);

    mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        navigate("/");
      },

      onError: (error) => {
        console.log(error.response?.data);
      },
    });
  };

  return (
    <div className="from-wrapper">
      <h2 className="text-3xl font-bold mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {loginFormInputs.map(({ type, name, placeholder }, idx) => (
          <div
            key={idx}
            className="input-wrapper flex flex-col gap-4 mb-5"
          >
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

        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white py-1 w-26 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>

          <p>
            Dont have an account?{" "}
            <Link className="text-blue-500" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;