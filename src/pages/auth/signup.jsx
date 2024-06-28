import React from "react";
import { useForm } from "react-hook-form";
import blogApi from "../../reduxApp/api";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createUser, { isLoading }] = blogApi.useCreateUserMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = async (data) => {
    try {
      const user = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await createUser(user).unwrap();
      toast.success("User signup successful!");
      navigate("/auth/login");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.originalStatus + " " + error.error);
    }
  };
  return (
    <div className="w-96 max-[399px]:w-[300px] shadow h-auto p-5">
      <div className="my-5">
        <h1 className="text-2xl font-bold uppercase ">Create an Account</h1>
        <p>Join us and see how awesome things are!</p>
      </div>
      <form
        className="flex flex-col items-start gap-7 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full">
          <label className="text-lg py-2" htmlFor="username">
            Username
          </label>
          <input
            type="username"
            {...register("username", { required: true })}
            id="username"
            className={`input input-bordered w-full rounded-none ${
              errors.username ? "border-red-500" : ""
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label className="text-lg py-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            id="email"
            className={`input input-bordered w-full rounded-none ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col w-full ">
          <label className="text-lg py-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register(
                "password",
                { required: true },
                { minLength: 5 },
                { maxLength: 20 }
              )}
              id="password"
              className={`input input-bordered w-full rounded-none ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
            <button
              data-tip="View password at your own risk!"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute tooltip right-2 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
        <div>
          Already have an account?
          <a href="/auth/login" className="text-base px-2">
            Login
          </a>
        </div>
        <button className="btn btn-square bg-black hover:bg-gray-800 text-white p-2 rounded-none w-full">
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
}

export default Signup;
